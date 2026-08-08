import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

output_dir = "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/PLAY_STORE_FILES"
os.makedirs(output_dir, exist_ok=True)
tmp_dir = "/tmp/ps_raw_screenshots"
os.makedirs(tmp_dir, exist_ok=True)

# 1. Capture real mobile web screenshots using headless Chrome
screens = [
    ("converter", "https://dcprosens.com", "UNIVERSAL SENSITIVITY CONVERTER", "Convert sensitivity between 15+ FPS games instantly"),
    ("psa", "https://dcprosens.com/psa-calculator/", "PSA METHOD CALCULATOR", "Find your perfect sensitivity in 7 simple steps"),
    ("pros", "https://dcprosens.com/pros/", "PRO PLAYER DATABASE", "Compare sensitivity, eDPI & gear from top pros"),
    ("gear", "https://dcprosens.com/mouse-database/", "GAMING GEAR DATABASE", "Compare mouse specs, DPI, sensors & weight")
]

ua = "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"

print("Capturing real app UI screenshots with Headless Chrome...")
for name, url, _, _ in screens:
    raw_path = os.path.join(tmp_dir, f"raw_{name}.png")
    cmd = [
        "google-chrome", "--headless", "--disable-gpu", "--hide-scrollbars",
        f"--user-agent={ua}", "--window-size=1080,2200",
        f"--screenshot={raw_path}", url
    ]
    subprocess.run(cmd, check=True)
    print(f"Captured real UI: {raw_path}")

# Helper: Convert icon & feature graphic
def process_base_graphic(src_path, dest_path, width, height):
    img = Image.open(src_path)
    if img.mode != 'RGB':
        bg = Image.new('RGB', img.size, (11, 11, 15))
        bg.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
        img = bg
    resized = img.resize((width, height), Image.Resampling.LANCZOS)
    resized.save(dest_path, format='PNG', optimize=True)
    print(f"Saved base graphic: {dest_path} ({width}x{height})")

# 1. Icon (512x512)
process_base_graphic(
    "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/marketing/play_store_icon.png",
    os.path.join(output_dir, "1_ICONE_DA_APLICACAO_512x512.png"),
    512, 512
)

# 2. Feature Graphic (1024x500)
process_base_graphic(
    "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/public/marketing/play_store_feature_graphic.png",
    os.path.join(output_dir, "2_GRAFICO_DE_FUNCIONALIDADES_1024x500.png"),
    1024, 500
)

# 3, 4, 5, 6: Format 1080x1920 phone screenshots with real app UI
def create_framed_screenshot(raw_img_path, output_path, title, subtitle):
    # Canvas size: 1080x1920 (Standard Play Store portrait ratio 9:16)
    W, H = 1080, 1920
    canvas = Image.new("RGB", (W, H), (11, 11, 15)) # #0b0b0f
    draw = ImageDraw.Draw(canvas)

    # Top accent line (Green #00ff9d)
    draw.rectangle([0, 0, W, 12], fill=(0, 255, 157))

    # Try loading default font or PIL basic font
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 44)
        sub_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 26)
    except Exception:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    # Header text
    draw.text((W // 2, 70), title, fill=(0, 255, 157), font=title_font, anchor="mm")
    draw.text((W // 2, 130), subtitle, fill=(180, 180, 190), font=sub_font, anchor="mm")

    # Load raw app screenshot
    raw_img = Image.open(raw_img_path)
    
    # Scale & crop raw screenshot to fit nicely into frame below header
    # Target frame size: 960 width x 1650 height
    target_w = 960
    target_h = 1680
    
    # Resize keeping width
    aspect = raw_img.height / raw_img.width
    new_h = int(target_w * aspect)
    resized_raw = raw_img.resize((target_w, new_h), Image.Resampling.LANCZOS)
    
    # Crop to target_h if taller
    if resized_raw.height > target_h:
        resized_raw = resized_raw.crop((0, 0, target_w, target_h))

    # Draw subtle phone frame border / shadow
    frame_x = (W - target_w) // 2
    frame_y = 180

    # Draw dark border around UI screen
    draw.rounded_rectangle([frame_x - 6, frame_y - 6, frame_x + target_w + 6, frame_y + target_h + 6], radius=16, outline=(42, 42, 50), width=4)
    
    # Paste real app UI
    canvas.paste(resized_raw, (frame_x, frame_y))
    canvas.save(output_path, format="PNG", optimize=True)
    print(f"Saved Play Store Screenshot: {output_path} (1080x1920)")

# Generate the 4 compliant mobile screenshots
for idx, (name, _, title, subtitle) in enumerate(screens, start=1):
    raw_path = os.path.join(tmp_dir, f"raw_{name}.png")
    out_name = f"{idx + 2}_PRINT_TELEMOVEL_{idx}_1080x1920.png"
    out_path = os.path.join(output_dir, out_name)
    create_framed_screenshot(raw_path, out_path, title, subtitle)

print("\nSUCCESS! All Google Play Store graphics & screenshots updated with REAL UI!")
