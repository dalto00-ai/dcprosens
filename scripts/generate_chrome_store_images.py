import os
from PIL import Image

def resize_no_alpha(src_path, dest_path, target_width, target_height):
    print(f"Processing {src_path} -> {dest_path} ({target_width}x{target_height})...")
    img = Image.open(src_path)
    
    # Convert to RGB to strip alpha channel ("sem alfa" requirement)
    if img.mode != 'RGB':
        # Create black background if RGBA to avoid black transparent artifacts
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            background = Image.new('RGB', img.size, (11, 11, 15)) # #0b0b0f dark theme bg
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        else:
            img = img.convert('RGB')
            
    # Resize with high-quality Lanczos resampling
    resized = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
    resized.save(dest_path, format='PNG', optimize=True)
    print(f"Saved: {dest_path} ({target_width}x{target_height}, RGB, No Alpha)")

output_dir = "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/CHROME_STORE_FILES"
os.makedirs(output_dir, exist_ok=True)

# 1. Ícone da Store (128x128)
resize_no_alpha(
    "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/marketing/play_store_icon.png",
    os.path.join(output_dir, "1_ICONE_DA_STORE_128x128.png"),
    128, 128
)

# 2. Print / Screenshot (1280x800)
resize_no_alpha(
    "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/marketing/play_store_feature_graphic.png",
    os.path.join(output_dir, "2_PRINT_OU_SCREENSHOT_1280x800.png"),
    1280, 800
)

# 3. Bloco Promocional Pequeno (440x280)
resize_no_alpha(
    "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/marketing/chrome_store_small_tile.png",
    os.path.join(output_dir, "3_BLOCO_PROMOCIONAL_PEQUENO_440x280.png"),
    440, 280
)

# 4. Bloco Promocional de Letreiro (1400x560)
resize_no_alpha(
    "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/marketing/chrome_store_large_tile.png",
    os.path.join(output_dir, "4_BLOCO_PROMOCIONAL_LETREIRO_1400x560.png"),
    1400, 560
)

print("All Chrome Web Store graphics generated successfully!")
