/**
 * compress-images.js
 *
 * Resizes and compresses images in public/images to the same settings used
 * for project-1/2/4.png — 900px wide, palette-quantized PNG (~200 colors).
 * Cuts file size roughly 5-7x with no visible quality loss for illustration
 * -style graphics like the project cards.
 *
 * USAGE:
 *   1. npm install sharp --save-dev
 *   2. node compress-images.js
 *
 * By default it processes project-3.png, project-5.png, project-6.png in
 * public/images — edit the FILES array below if you want to run it on
 * different files (it overwrites each file in place).
 */

import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const TARGET_WIDTH = 900;

const FILES = ['project-3.png', 'project-5.png', 'project-6.png'];

async function compress(file) {
  const fullPath = path.join(IMAGES_DIR, file);
  if (!fs.existsSync(fullPath)) {
    console.log(`skip (not found): ${file}`);
    return;
  }

  const before = fs.statSync(fullPath).size;
  const buffer = await sharp(fullPath)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .png({ palette: true, colors: 200, quality: 82, compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(fullPath, buffer);
  const after = fs.statSync(fullPath).size;
  console.log(
    `${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`
  );
}

async function run() {
  console.log('Compressing images in', IMAGES_DIR, '\n');
  for (const file of FILES) {
    await compress(file);
  }
  console.log('\nDone.');
}

run().catch((err) => {
  console.error('Something went wrong:', err.message);
  process.exit(1);
});