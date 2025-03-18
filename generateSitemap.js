const SitemapGenerator = require('sitemap-generator');
const path = require('path');
const fs = require('fs');

const sitemapPath = path.join(__dirname, 'sitemap.xml');

const generator = SitemapGenerator('https://shorelinelake.com', {
    stripQuerystring: false,
    maxDepth: 4,
});

let urls = [];

generator.on('add', (url) => {
    if (url.endsWith('.html')) {
        urls.push(url);
    }
});

// When done, write a proper XML formatted sitemap
generator.on('done', () => {
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map(url => 
        `  <url>\n` +
        `    <loc>${url}</loc>\n` +
        `  </url>`
      ).join("\n") +
      `\n</urlset>`;
  
    fs.writeFileSync(sitemapPath, sitemapXml, { encoding: 'utf8' });
    console.log(`Sitemap generated successfully: ${sitemapPath}`);
  });

generator.start();
