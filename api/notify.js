import nodemailer from 'nodemailer';

const MAX_NAME_LEN = 100;

// ---- abuse protection (same pattern as /api/kai.js) ----
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_PER_MINUTE = 5;
const RATE_LIMIT_HOUR_MS = 60 * 60_000;
const RATE_LIMIT_MAX_PER_HOUR = 20;
const requestLog = new Map();

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_HOUR_MS);
  const lastMinute = recent.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (lastMinute.length >= RATE_LIMIT_MAX_PER_MINUTE || recent.length >= RATE_LIMIT_MAX_PER_HOUR) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  if (requestLog.size > 5000) {
    const oldestKey = requestLog.keys().next().value;
    requestLog.delete(oldestKey);
  }
  return false;
}

function isAllowedOrigin(req) {
  const host = req.headers.host;
  if (!host) return false;
  const matchesHost = (value) => {
    if (!value) return false;
    try {
      return new URL(value).host === host;
    } catch {
      return false;
    }
  };
  return matchesHost(req.headers.origin) || matchesHost(req.headers.referer);
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 200;
}

function isValidName(name) {
  return typeof name === 'string' && name.trim().length > 0 && name.length <= MAX_NAME_LEN;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Requests must come from the site itself.' });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ error: 'Too many requests — please wait a minute and try again.' });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) {
    console.error('GMAIL_USER / GMAIL_APP_PASSWORD not set in the environment.');
    return res.status(500).json({ error: 'Email notifications are not configured yet.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const { name, email } = body || {};

  if (!isValidName(name) || !isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid name and email are required.' });
  }

  const safeName = name.trim().slice(0, MAX_NAME_LEN);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `"Kai — Basu's AI Assistant" <${gmailUser}>`,
      to: email,
      replyTo: gmailUser,
      subject: "Basu got your message!",
      text:
        `Hi ${safeName},\n\n` +
        `This is Kai, Basu's AI assistant. Your message just came through, and Basu Singh has received it — he'll personally get back to you shortly.\n\n` +
        `Thanks for reaching out!\n\n` +
        `— Kai, on behalf of Kumar Basu Singh\n` +
        `AI Agent Engineer · basusingh.vercel.app`,
      html:
        `<p>Hi ${safeName},</p>` +
        `<p>This is <strong>Kai</strong>, Basu's AI assistant. Your message just came through, and <strong>Basu Singh</strong> has received it — he'll personally get back to you shortly.</p>` +
        `<p>Thanks for reaching out!</p>` +
        `<p>— Kai, on behalf of Kumar Basu Singh<br/>AI Agent Engineer · <a href="https://basusingh.vercel.app">basusingh.vercel.app</a></p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('notify handler error:', err);
    return res.status(502).json({ error: "Couldn't send the confirmation email right now." });
  }
}
