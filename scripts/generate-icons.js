const fs = require('fs');
const path = require('path');

// This script generates placeholder icons
// In production, replace with actual generated icons

const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Create directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate simple SVG icons
const svg192 = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
  <rect width="192" height="192" rx="24" fill="#100624"/>
  <text x="96" y="120" font-family="Arial" font-size="72" font-weight="bold" text-anchor="middle" fill="#C52A9A">VC</text>
</svg>`;

const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="#100624"/>
  <text x="256" y="320" font-family="Arial" font-size="192" font-weight="bold" text-anchor="middle" fill="#C52A9A">VC</text>
</svg>`;

// Write SVG files (in production, convert to PNG)
fs.writeFileSync(path.join(iconsDir, 'icon-192x192.svg'), svg192);
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.svg'), svg512);

console.log('Icon files generated. Convert SVG to PNG for production use.');