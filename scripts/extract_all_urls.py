import os

out_dir = "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/out"
urls = []

for root, dirs, files in os.walk(out_dir):
    for file in files:
        if file.endswith(".html"):
            rel_path = os.path.relpath(os.path.join(root, file), out_dir)
            if rel_path == "index.html":
                url = "https://dcprosens.com/"
            elif rel_path.endswith("/index.html"):
                path_without_index = rel_path[:-11]
                url = f"https://dcprosens.com/{path_without_index}"
            else:
                path_without_ext = rel_path[:-5]
                url = f"https://dcprosens.com/{path_without_ext}"
            
            # Filter out 404, _not-found, ads
            if not any(x in url for x in ['/404', '/_not-found', '/ads']):
                urls.append(url)

urls = sorted(list(set(urls)))

output_file = "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/URLS_PARA_INDEXACAO.txt"
with open(output_file, "w", encoding="utf-8") as f:
    f.write(f"====================================================================\n")
    f.write(f"  DCPROSENS — LISTA COMPLETA DE TODAS AS {len(urls)} URLS PARA INDEXAÇÃO\n")
    f.write(f"====================================================================\n\n")
    for url in urls:
        f.write(f"{url}\n")

print(f"Extracted {len(urls)} full production URLs into {output_file}")
