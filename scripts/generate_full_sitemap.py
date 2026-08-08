import os
import datetime

output_file = "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/URLS_PARA_INDEXACAO.txt"
with open(output_file, "r", encoding="utf-8") as f:
    lines = [line.strip() for line in f if line.strip().startswith("https://")]

today = datetime.datetime.now().strftime("%Y-%m-%d")

xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

for url in lines:
    priority = "1.0" if url == "https://dcprosens.com/" else ("0.9" if "/converter" in url or "/psa" in url else "0.8")
    xml_content += f'  <url>\n'
    xml_content += f'    <loc>{url}</loc>\n'
    xml_content += f'    <lastmod>{today}</lastmod>\n'
    xml_content += f'    <changefreq>weekly</changefreq>\n'
    xml_content += f'    <priority>{priority}</priority>\n'
    xml_content += f'  </url>\n'

xml_content += '</urlset>\n'

with open("/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/sitemap.xml", "w", encoding="utf-8") as f:
    f.write(xml_content)

print(f"Updated public/sitemap.xml with all {len(lines)} URLs!")
