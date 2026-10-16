import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import sharp from "sharp";

const width = 1200;
const height = 630;
const projectRoot = process.cwd();
const logo = await readFile(
  resolve(projectRoot, "public/brand/aston-cyber-logo-dark.svg"),
);

const background = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#121821" />
        <stop offset="0.62" stop-color="#0b0f14" />
        <stop offset="1" stop-color="#07131f" />
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#4b9cd2" />
        <stop offset="1" stop-color="#223e55" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#background)" />
    <rect x="0" y="0" width="12" height="630" fill="url(#accent)" />
    <path d="M760 80H1120M820 140H1120M880 200H1120" fill="none" stroke="#223e55" stroke-width="2" opacity="0.65" />
    <circle cx="1120" cy="80" r="5" fill="#4b9cd2" />
    <circle cx="1120" cy="140" r="5" fill="#4b9cd2" opacity="0.8" />
    <circle cx="1120" cy="200" r="5" fill="#4b9cd2" opacity="0.6" />
    <text x="100" y="405" fill="#f3f6f9" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" letter-spacing="-1">Systems Modernization</text>
    <text x="100" y="474" fill="#67afe0" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="600">Modern Technology. Intelligent Operations. Secure by Design.</text>
    <line x1="100" y1="528" x2="1100" y2="528" stroke="#2a3543" stroke-width="2" />
  </svg>
`);

await sharp({
  create: {
    background: "#0b0f14",
    channels: 4,
    height,
    width,
  },
})
  .composite([
    { input: background, left: 0, top: 0 },
    {
      input: await sharp(logo).resize({ width: 420 }).png().toBuffer(),
      left: 88,
      top: 92,
    },
  ])
  .png({ compressionLevel: 9, palette: true, quality: 100 })
  .toFile(
    resolve(
      projectRoot,
      "public/images/social/aston-cyber-systems-modernization.png",
    ),
  );
