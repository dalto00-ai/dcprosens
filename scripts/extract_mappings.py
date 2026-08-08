import os
import re

dir_path = "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/src/lib/posts-data/"
mapping = {}

for filename in os.listdir(dir_path):
    if filename.endswith(".ts") and filename.startswith("chunk-"):
        file_path = os.path.join(dir_path, filename)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
            # Find all blocks between { and }
            blocks = re.findall(r"\{[^{}]+\}", content)
            for block in blocks:
                slug_match = re.search(r"slug:\s*'([^']+)'", block)
                image_match = re.search(r"image:\s*'([^']+)'", block)
                if slug_match and image_match:
                    slug = slug_match.group(1)
                    img = image_match.group(1)
                    img_name = os.path.basename(img)
                    mapping[slug] = img_name

print("<?php")
print("$slug_image_mapping = [")
for slug, img in sorted(mapping.items()):
    print(f"    '{slug}' => '{img}',")
print("];")
