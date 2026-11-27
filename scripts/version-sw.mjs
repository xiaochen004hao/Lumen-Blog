import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('../dist/', import.meta.url));
const files = [];

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collect(fullPath);
    } else if (entry.isFile()) {
      const relativePath = path.relative(distDir, fullPath).split(path.sep).join('/');
      if (relativePath !== 'sw.js') files.push({ fullPath, relativePath });
    }
  }
}

await collect(distDir);
files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));

const hash = createHash('sha256');
for (const file of files) {
  hash.update(file.relativePath);
  hash.update('\0');
  hash.update(await readFile(file.fullPath));
  hash.update('\0');
}

const version = hash.digest('hex').slice(0, 16);
const swPath = path.join(distDir, 'sw.js');
const source = await readFile(fileURLToPath(new URL('../public/sw.js', import.meta.url)), 'utf8');
if (!source.includes('__BUILD_VERSION__')) {
  throw new Error('dist/sw.js is missing the build version placeholder.');
}

await writeFile(swPath, source.replace('__BUILD_VERSION__', version));
console.log(`Service Worker cache version: lumen-shell-${version}`);
