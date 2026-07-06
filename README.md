# Basu Singh — AI Agent Engineer Portfolio

A scroll-driven portfolio with a persistent 3D "AI world," Kai (a 3D AI assistant + working chatbot), and 11 content sections — built with React, Vite, and Three.js (via React Three Fiber).

---

## 1. What's inside

- `src/` — the website (React + Vite)
- `api/kai.js` — Kai's chatbot backend (a Vercel serverless function). This is where your **Groq API key** is used — it never touches the browser.
- `public/docs/` — your resume PDF
- `.env.example` — template for your API key

---

## 2. Before you start — install the tools (one-time)

You need **Node.js** installed. If you don't have it:
1. Go to https://nodejs.org and install the **LTS** version.
2. Restart VS Code after installing.

You'll also use the **Vercel CLI** so you can test Kai's chatbot locally exactly as it will run in production. Install it once, globally:

```bash
npm install -g vercel
```

---

## 3. Open the project in VS Code

1. Unzip the project folder you received.
2. Open VS Code → File → Open Folder → select the project folder (`basu-portfolio`).
3. Open a terminal inside VS Code: Terminal → New Terminal.

---

## 4. Install dependencies

In the VS Code terminal:

```bash
npm install
```

This downloads everything the project needs (React, Three.js, etc.) into a `node_modules` folder. This can take a minute or two.

---

## 5. Add your Groq API key (this is where YOU put the key)

1. In the project root, find the file `.env.example`.
2. Make a copy of it and rename the copy to exactly `.env` (just `.env`, no `.example`).
   - In VS Code: right-click `.env.example` → Copy, then Paste, then rename the copy to `.env`.
3. Open `.env` and replace the placeholder with your real key:

```
GROQ_API_KEY=your_real_key_here
```

4. Save the file.

**Important:** `.env` is already excluded from Git (see `.gitignore`), so your key will never accidentally get pushed to GitHub or exposed publicly. It is only ever read on the server side, inside `api/kai.js` — it is never sent to the browser.

---

## 6. Run it locally

You have two ways to run the site locally. Use **Option A** for full testing (recommended, since it includes Kai's chatbot).

### Option A — Full local test, including Kai's chatbot (recommended)

```bash
vercel dev
```

- First time only: it will ask you to log in / link a project — follow the prompts (choose "no" if asked to link to an existing project, just set it up fresh, defaults are fine).
- Once it's running, it will print a local URL like `http://localhost:3000`. Open that in your browser.
- This runs the **exact same setup** as production: the website *and* the `/api/kai` chatbot backend together.

### Option B — Quick frontend-only preview (Kai's chatbot will NOT work here)

```bash
npm run dev
```

- Opens at `http://localhost:5173`.
- Good for quickly checking layout/animation changes.
- Kai's chat widget will open and let you type, but will show "couldn't connect" — that's expected, since this mode doesn't run the `/api` backend. Use Option A to test Kai for real.

---

## 7. What to test locally before deploying

Go through this checklist in your browser at the local URL:

- [ ] Loading screen plays, Kai intro text appears, progress bar completes
- [ ] Hero section: Kai visible, both buttons work ("Explore My Agents" scrolls down, "Download Resume" downloads the PDF)
- [ ] Header: links scroll to the right section; on mobile width (resize your browser narrow, or use DevTools device mode), the menu becomes a hamburger and opens a vertical menu
- [ ] Scroll through every section: Stats, About, Expertise, Projects (Live Demo + GitHub links open correctly), Why I Built These, Workflow (steps expand on click), Real Example diagram, Certifications, Education, Resume & Contact
- [ ] Resume section: click to preview the PDF, and test the Download button (file should download named `Kumar Basu Singh's Resume.pdf`)
- [ ] Contact form: fill it in and submit — you should receive the message at **basueps@gmail.com** via Formspree (this works even with `npm run dev`, since Formspree is called directly from the browser)
- [ ] Kai chat widget (bottom-right): open it, ask a question like *"What projects has Basu built?"* — with `vercel dev` running, you should get a real answer grounded in your knowledge base
- [ ] Footer: social icons (GitHub, LinkedIn, Email) work

If anything looks or behaves wrong, tell me exactly what you see and I'll fix it before you deploy.

---

## 8. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio build"
```

Then create a new repository on GitHub (via github.com → New repository), and follow GitHub's instructions to push, typically:

```bash
git remote add origin https://github.com/mr-basu-singh/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

Your `.env` file will **not** be included in this push (it's git-ignored) — this is correct and intentional.

---

## 9. Deploy to Vercel (free)

1. Go to https://vercel.com and sign in with GitHub.
2. Click "Add New Project" → import the GitHub repo you just pushed.
3. Before clicking Deploy, open **Environment Variables** and add:
   - Key: `GROQ_API_KEY`
   - Value: your real Groq key
4. Click Deploy.
5. Vercel will give you a live URL (e.g. `your-project.vercel.app`) — Kai's chatbot will work there automatically, using the key you just set.

---

## 10. Security — what's already handled

- Your Groq API key lives only in `.env` locally and in Vercel's encrypted environment variables in production — it is **never** included in any file sent to the browser.
- `api/kai.js` validates every incoming message (length limits, type checks) before using it.
- Kai's system prompt explicitly refuses to reveal its own instructions, ignores attempts to override its behavior via user messages, and only answers from the approved knowledge base — it will not invent facts or go off-topic.
- `.env` is excluded from Git via `.gitignore`, so it can never be pushed to a public GitHub repo by accident.

If you ever accidentally commit a real key, treat it as compromised: generate a new key in the Groq console and delete the old one, and update your Vercel environment variable.

---

## 11. If something doesn't look right

Come back and tell me what's wrong (a screenshot helps a lot) — I'll fix the exact file rather than rebuilding from scratch.
