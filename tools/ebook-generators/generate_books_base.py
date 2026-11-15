import os
import subprocess

BASE_DIR = "/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS"
EBOOKS_DIR = os.path.join(BASE_DIR, "ebooks")
os.makedirs(EBOOKS_DIR, exist_ok=True)

# Common HTML header
def get_header(title):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} — DCPROSENS</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-page: #06080d;
            --bg-card: #0c101a;
            --bg-card-alt: #101624;
            --primary: #00ff9d;
            --primary-glow: rgba(0, 255, 157, 0.25);
            --secondary: #00e5ff;
            --secondary-glow: rgba(0, 229, 255, 0.2);
            --accent-red: #ff2a5f;
            --accent-amber: #ffb703;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --text-dim: #64748b;
            --border-subtle: rgba(255, 255, 255, 0.07);
            --border-primary: rgba(0, 255, 157, 0.25);
            --border-secondary: rgba(0, 229, 255, 0.25);
        }}

        @page {{
            size: A4 portrait;
            margin: 0;
        }}

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #030407;
            color: var(--text-main);
            -webkit-font-smoothing: antialiased;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }}

        .page {{
            width: 210mm;
            height: 297mm;
            max-height: 297mm;
            min-height: 297mm;
            box-sizing: border-box;
            padding: 13mm 15mm 11mm 15mm;
            background: var(--bg-page);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-after: always;
            break-after: page;
        }}

        .page::before {{
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: 
                radial-gradient(circle at 85% 15%, rgba(0, 229, 255, 0.04) 0%, transparent 40%),
                radial-gradient(circle at 15% 85%, rgba(0, 255, 157, 0.04) 0%, transparent 40%),
                linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
            background-size: 100% 100%, 100% 100%, 20px 20px, 20px 20px;
            pointer-events: none;
            z-index: 0;
        }}

        .page > * {{
            position: relative;
            z-index: 1;
        }}

        /* Running Header & Footer */
        .page-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 2.8mm;
            border-bottom: 1px solid var(--border-subtle);
            margin-bottom: 3.2mm;
        }}

        .header-tag {{
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 7.8pt;
            font-weight: 600;
            letter-spacing: 0.12em;
            color: var(--primary);
            text-transform: uppercase;
        }}

        .header-tag::before {{
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            background: var(--primary);
            border-radius: 50%;
            box-shadow: 0 0 6px var(--primary);
        }}

        .header-sub {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 7.5pt;
            letter-spacing: 0.08em;
            color: var(--text-dim);
            text-transform: uppercase;
        }}

        .page-footer {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 2.8mm;
            border-top: 1px solid var(--border-subtle);
            font-family: 'JetBrains Mono', monospace;
            font-size: 7.5pt;
            letter-spacing: 0.06em;
            color: var(--text-dim);
        }}

        .footer-brand {{ color: var(--text-muted); font-weight: 600; }}
        .footer-brand span {{ color: var(--primary); }}
        .footer-num {{ color: var(--secondary); font-weight: 700; }}

        /* Titles & Text */
        .title-block {{ margin-bottom: 3.2mm; }}
        .section-label {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 7.5pt;
            font-weight: 700;
            color: var(--secondary);
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 1mm;
        }}
        .page-title {{
            font-family: 'Space Grotesk', sans-serif;
            font-size: 19pt;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.02em;
            line-height: 1.15;
            margin-bottom: 1.5mm;
        }}
        .page-desc {{
            font-size: 8.8pt;
            color: var(--text-muted);
            line-height: 1.4;
        }}

        /* Cards & Layout */
        .grid-2 {{ display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }}
        .grid-3 {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5mm; }}
        .grid-4 {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 2mm; }}

        .card {{
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 6px;
            padding: 3mm 4mm;
        }}
        .card.glow-primary {{ border-color: var(--border-primary); box-shadow: 0 0 15px rgba(0, 255, 157, 0.04); }}
        .card.glow-secondary {{ border-color: var(--border-secondary); box-shadow: 0 0 15px rgba(0, 229, 255, 0.04); }}

        .card-title {{
            font-family: 'Space Grotesk', sans-serif;
            font-size: 10pt;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        .card-num {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 8pt;
            color: var(--primary);
            font-weight: 700;
        }}
        .card-desc {{
            font-size: 8.2pt;
            color: var(--text-muted);
            line-height: 1.35;
        }}

        /* Steps */
        .step-list {{ display: flex; flex-direction: column; gap: 2.2mm; }}
        .step-item {{
            display: flex;
            align-items: flex-start;
            gap: 3mm;
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 6px;
            padding: 2.5mm 3.5mm;
        }}
        .step-num {{
            width: 20px;
            height: 20px;
            min-width: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(0, 255, 157, 0.2), rgba(0, 229, 255, 0.2));
            border: 1px solid var(--primary);
            color: var(--primary);
            font-family: 'JetBrains Mono', monospace;
            font-size: 8pt;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
        }}
        .step-content h4 {{ font-size: 9pt; font-weight: 700; color: #ffffff; margin-bottom: 0.8mm; }}
        .step-content p {{ font-size: 8pt; color: var(--text-muted); line-height: 1.35; }}

        /* Tables */
        .spec-table {{
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid var(--border-subtle);
            background: var(--bg-card);
            font-size: 8pt;
        }}
        .spec-table th {{
            background: var(--bg-card-alt);
            font-family: 'JetBrains Mono', monospace;
            font-size: 7.2pt;
            font-weight: 700;
            color: var(--secondary);
            text-align: left;
            padding: 2.2mm 3mm;
            border-bottom: 1px solid var(--border-subtle);
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }}
        .spec-table td {{
            padding: 2.2mm 3mm;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            color: var(--text-muted);
            line-height: 1.3;
        }}
        .spec-table tr:last-child td {{ border-bottom: none; }}
        .spec-table td strong {{ color: #ffffff; font-weight: 600; }}

        /* Callouts */
        .callout {{
            border-left: 3px solid var(--primary);
            background: linear-gradient(90deg, rgba(0, 255, 157, 0.06), transparent);
            border-radius: 0 6px 6px 0;
            padding: 2.5mm 3.2mm;
            font-size: 8.2pt;
            color: var(--text-muted);
            line-height: 1.35;
        }}
        .callout strong {{ color: #ffffff; }}
        .callout.alert-red {{ border-left-color: var(--accent-red); background: linear-gradient(90deg, rgba(255, 42, 95, 0.08), transparent); }}
        .callout.alert-cyan {{ border-left-color: var(--secondary); background: linear-gradient(90deg, rgba(0, 229, 255, 0.06), transparent); }}

        /* Worksheet Fields */
        .form-row {{ display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm; margin-bottom: 2mm; }}
        .field-box {{
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 5px;
            padding: 1.8mm 2.8mm;
        }}
        .field-label {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 6.8pt;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 1.2mm;
        }}
        .field-line {{
            height: 16px;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
            font-family: 'JetBrains Mono', monospace;
            font-size: 7.5pt;
            color: var(--primary);
        }}

        /* Checklists */
        .check-item {{
            display: flex;
            align-items: flex-start;
            gap: 2.5mm;
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 5px;
            padding: 2.2mm 3mm;
            margin-bottom: 1.8mm;
        }}
        .check-box-mock {{
            width: 13px;
            height: 13px;
            min-width: 13px;
            border: 1.5px solid var(--primary);
            border-radius: 3px;
            margin-top: 1.5px;
        }}
        .check-text h5 {{ font-size: 8.5pt; font-weight: 700; color: #ffffff; margin-bottom: 0.5mm; }}
        .check-text p {{ font-size: 7.5pt; color: var(--text-muted); line-height: 1.25; }}

        .progress-pill {{
            background: var(--bg-card-alt);
            border: 1px solid var(--border-primary);
            border-radius: 5px;
            padding: 2.2mm 3mm;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'JetBrains Mono', monospace;
            font-size: 7.5pt;
        }}
        .progress-val {{ color: var(--primary); font-weight: 700; }}

        /* Cover Page Styling */
        .cover-page {{
            padding: 0;
            background: #06080d;
            position: relative;
        }}
        .cover-bg-img {{
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            object-fit: cover;
            z-index: 1;
        }}
        .cover-overlay {{
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(180deg, rgba(6,8,13,0.85) 0%, rgba(6,8,13,0.2) 40%, rgba(6,8,13,0.1) 65%, rgba(6,8,13,0.95) 100%);
            z-index: 2;
        }}
        .cover-inner {{
            position: relative;
            z-index: 3;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 14mm 16mm 12mm 16mm;
        }}
        .cover-logo-brand {{
            font-family: 'Space Grotesk', sans-serif;
            font-size: 13pt;
            font-weight: 800;
            letter-spacing: 0.15em;
            color: #ffffff;
        }}
        .cover-logo-brand span {{ color: var(--primary); }}
        .cover-badge-pill {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 7.5pt;
            letter-spacing: 0.12em;
            color: var(--secondary);
            border: 1px solid var(--border-secondary);
            padding: 1.5mm 3.5mm;
            border-radius: 20px;
            background: rgba(0, 229, 255, 0.08);
        }}
        .cover-footer-box {{
            background: rgba(12, 16, 26, 0.88);
            border: 1px solid var(--border-primary);
            border-radius: 8px;
            padding: 4.5mm 5.5mm;
            backdrop-filter: blur(12px);
        }}
        .cover-footer-box h1 {{
            font-family: 'Space Grotesk', sans-serif;
            font-size: 25pt;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.05;
            letter-spacing: -0.02em;
            margin-bottom: 2mm;
            text-transform: uppercase;
        }}
        .cover-footer-box h1 span {{
            background: linear-gradient(135deg, #00ff9d 0%, #00e5ff 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }}
        .cover-footer-box p {{
            font-size: 9.5pt;
            color: var(--text-muted);
            line-height: 1.4;
            margin-bottom: 3mm;
        }}
        .cover-meta-bar {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid var(--border-subtle);
            padding-top: 2.5mm;
            font-family: 'JetBrains Mono', monospace;
            font-size: 7.5pt;
            color: var(--text-dim);
        }}
        .cover-meta-bar span {{ color: var(--primary); font-weight: 700; }}
    </style>
</head>
<body>
"""

def get_footer():
    return """</body></html>"""

print("Base generator template initialized.")
