import { readFile, writeFile, readdir, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const prefix = '/karaoke-app';

// Utility to update asset paths
function updateAssetPaths(content) {
  // Fix href="/assets/...", src="/assets/...", and url(/assets/...) — with or without quotes
  return content.replace(
    /(?:href|src)=["']\/(assets\/[^"']+)["']|url\((["']?)(\/assets\/[^"')]+)\1\)/g,
    (match, hrefSrcPath, quote, urlPath) => {
      if (urlPath) {
        // It's a url(...)
        return `url(${quote}${prefix}${urlPath}${quote})`;
      } else if (hrefSrcPath) {
        // It's href="/assets/..." or src="/assets/..."
        return `="${prefix}/${hrefSrcPath}"`;
      }
      return match;
    }
  );
}

// Update index.html
async function fixIndexHtml() {
  try {
    const data = await readFile(indexHtmlPath, 'utf8');
    const updated = updateAssetPaths(data);
    await writeFile(indexHtmlPath, updated, 'utf8');
    console.log('✔ Updated paths in index.html');
  } catch (err) {
    console.error('❌ Error updating index.html:', err);
  }
}

// Recursively update all .css files in dist/assets
async function fixCssFiles(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const entryStat = await stat(fullPath);

      if (entryStat.isDirectory()) {
        await fixCssFiles(fullPath);
      } else if (entry.name.endsWith('.css')) {
        try {
          const css = await readFile(fullPath, 'utf8');
          const updatedCss = updateAssetPaths(css);
          await writeFile(fullPath, updatedCss, 'utf8');
          console.log(`✔ Updated paths in ${fullPath}`);
        } catch (err) {
          console.error(`❌ Error processing ${fullPath}:`, err);
        }
      }
    }
  } catch (err) {
    console.error(`❌ Error reading directory ${dir}:`, err);
  }
}

// Run both tasks
await fixIndexHtml();
await fixCssFiles(path.join(distDir, 'assets'));