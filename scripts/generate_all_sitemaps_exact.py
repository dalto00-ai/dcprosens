import os
import glob
import datetime

today = datetime.datetime.now().strftime("%Y-%m-%d")

# 1. READ ALL 152 URLS FROM URLS_PARA_INDEXACAO.TXT
urls_file = "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/URLS_PARA_INDEXACAO.txt"
with open(urls_file, "r", encoding="utf-8") as f:
    all_urls = [line.strip() for line in f if line.strip().startswith("https://")]

# -------------------------------------------------------------
# A. PUBLIC/SITEMAP.XML (All 152 URLs)
# -------------------------------------------------------------
sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
sitemap_xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for url in all_urls:
    priority = "1.0" if url == "https://dcprosens.com/" else ("0.9" if "/converter" in url or "/psa" in url else "0.8")
    sitemap_xml += f'  <url>\n'
    sitemap_xml += f'    <loc>{url}</loc>\n'
    sitemap_xml += f'    <lastmod>{today}</lastmod>\n'
    sitemap_xml += f'    <changefreq>weekly</changefreq>\n'
    sitemap_xml += f'    <priority>{priority}</priority>\n'
    sitemap_xml += f'  </url>\n'
sitemap_xml += '</urlset>\n'

with open("/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/sitemap.xml", "w", encoding="utf-8") as f:
    f.write(sitemap_xml)

# -------------------------------------------------------------
# B. PUBLIC/NEWS-SITEMAP.XML (All 114 Blog Posts)
# -------------------------------------------------------------
blog_urls = [u for u in all_urls if "/blog/" in u and u != "https://dcprosens.com/blog"]

news_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
news_xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
news_xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n'

for url in blog_urls:
    slug = url.split("/blog/")[-1]
    title = slug.replace("-", " ").title()
    news_xml += f'  <url>\n'
    news_xml += f'    <loc>{url}</loc>\n'
    news_xml += f'    <news:news>\n'
    news_xml += f'      <news:publication>\n'
    news_xml += f'        <news:name>DCPROSENS News</news:name>\n'
    news_xml += f'        <news:language>en</news:language>\n'
    news_xml += f'      </news:publication>\n'
    news_xml += f'      <news:publication_date>{today}</news:publication_date>\n'
    news_xml += f'      <news:title>{title}</news:title>\n'
    news_xml += f'    </news:news>\n'
    news_xml += f'  </url>\n'

news_xml += '</urlset>\n'

with open("/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/news-sitemap.xml", "w", encoding="utf-8") as f:
    f.write(news_xml)

# -------------------------------------------------------------
# C. PUBLIC/IMAGE-SITEMAP.XML (All Marketing & Feature Images)
# -------------------------------------------------------------
image_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
image_xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
image_xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'

# Add images for main page
image_xml += '  <url>\n'
image_xml += '    <loc>https://dcprosens.com/</loc>\n'
image_xml += '    <image:image>\n'
image_xml += '      <image:loc>https://dcprosens.com/marketing/play_store_feature_graphic.png</image:loc>\n'
image_xml += '      <image:title>DCPROSENS Aim Calibration Suite</image:title>\n'
image_xml += '    </image:image>\n'
image_xml += '    <image:image>\n'
image_xml += '      <image:loc>https://dcprosens.com/marketing/play_store_icon.png</image:loc>\n'
image_xml += '      <image:title>DCPROSENS Logo</image:title>\n'
image_xml += '    </image:image>\n'
image_xml += '    <image:image>\n'
image_xml += '      <image:loc>https://dcprosens.com/marketing/chrome_store_large_tile.png</image:loc>\n'
image_xml += '      <image:title>DCPROSENS Chrome Extension Tile</image:title>\n'
image_xml += '    </image:image>\n'
image_xml += '    <image:image>\n'
image_xml += '      <image:loc>https://dcprosens.com/marketing/chrome_store_small_tile.png</image:loc>\n'
image_xml += '      <image:title>DCPROSENS Store Small Tile</image:title>\n'
image_xml += '    </image:image>\n'
image_xml += '  </url>\n'

# Add images for blog posts
for url in blog_urls[:50]:
    image_xml += f'  <url>\n'
    image_xml += f'    <loc>{url}</loc>\n'
    image_xml += f'    <image:image>\n'
    image_xml += f'      <image:loc>https://dcprosens.com/marketing/play_store_feature_graphic.png</image:loc>\n'
    image_xml += f'      <image:title>DCPROSENS Esports Guide</image:title>\n'
    image_xml += f'    </image:image>\n'
    image_xml += f'  </url>\n'

image_xml += '</urlset>\n'

with open("/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/image-sitemap.xml", "w", encoding="utf-8") as f:
    f.write(image_xml)

# -------------------------------------------------------------
# D. PUBLIC/SITEMAP-INDEX.XML (Master Index)
# -------------------------------------------------------------
index_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
index_xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
index_xml += '  <sitemap>\n'
index_xml += '    <loc>https://dcprosens.com/sitemap.xml</loc>\n'
index_xml += f'    <lastmod>{today}</lastmod>\n'
index_xml += '  </sitemap>\n'
index_xml += '  <sitemap>\n'
index_xml += '    <loc>https://dcprosens.com/image-sitemap.xml</loc>\n'
index_xml += f'    <lastmod>{today}</lastmod>\n'
index_xml += '  </sitemap>\n'
index_xml += '  <sitemap>\n'
index_xml += '    <loc>https://dcprosens.com/news-sitemap.xml</loc>\n'
index_xml += f'    <lastmod>{today}</lastmod>\n'
index_xml += '  </sitemap>\n'
index_xml += '</sitemapindex>\n'

with open("/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/sitemap-index.xml", "w", encoding="utf-8") as f:
    f.write(index_xml)

print(f"Generated ALL sitemaps with EXACT counts:")
print(f"  - sitemap.xml: {len(all_urls)} URLs")
print(f"  - news-sitemap.xml: {len(blog_urls)} Blog URLs")
print(f"  - image-sitemap.xml: 51 Image URLs")
print(f"  - sitemap-index.xml: 3 Master Child Sitemaps")
