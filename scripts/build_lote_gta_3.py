#!/usr/bin/env python3
"""
Build Lote 3: Articles 11 to 15 of GTA VI from zip package into src/lib/posts-data/chunk-29.ts
"""

import zipfile
import re
import json
import os

ZIP_PATH = '/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/DCPROSENS_ULTIMATE_MASTER_PACKAGE_18_EBOOKS_IMAGES_SEO_AND_AI_BLUEPRINT.zip'
ZIP_PREFIX = '07_GTA_VI_LAUNCH_DOMINATION_PACK/20_full_ready_to_publish_articles/'
OUTPUT_CHUNK = '/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS/src/lib/posts-data/chunk-29.ts'

ARTICLES = [
    ('11_gta-6-drive-by-shooting-and-vehicle-camera-sensitivity.md', '24_gta-6-drive-by-aiming-pro-paddles-pvp-settings.webp', '8 min read'),
    ('12_gta-6-sniper-scope-and-ads-1-to-1-zoom-sensitivity.md', '09_1-to-1-ads-scope-sensitivity-calculator-mdm.webp', '8 min read'),
    ('13_gta-6-dualsense-edge-and-scuf-pro-controller-setup.md', 'gta-6-dualsense-edge-scuf-xbox-elite-controller-settings.webp', '8 min read'),
    ('14_gta-6-gyro-aiming-and-motion-sensor-calibration-ps5.md', 'gta-6-gyro-aiming-motion-sensor-settings-ps5.webp', '8 min read'),
    ('15_gta-6-jason-and-lucia-weapon-handling-and-recoil-guide.md', 'gta-6-jason-and-lucia-weapon-handling-recoil-aim-guide.webp', '8 min read')
]

def inline_format(text: str) -> str:
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)', r'<em>\1</em>', text)
    text = re.sub(r'`(.*?)`', r'<code>\1</code>', text)
    text = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2">\1</a>', text)
    return text

def md_table_to_html(table_lines):
    if not table_lines:
        return ''
    header_line = table_lines[0]
    data_lines = [l for l in table_lines[1:] if not re.match(r'^\s*\|[\s\-:|]+\|\s*$', l)]
    
    headers = [c.strip() for c in header_line.split('|')[1:-1]]
    
    res = '<div style="overflow-x: auto; margin: 1.5rem 0;">\n'
    res += '  <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px;">\n'
    res += '    <thead>\n      <tr style="background: rgba(0, 255, 157, 0.08); border-bottom: 2px solid rgba(0, 255, 157, 0.2); color: #00ff9d;">\n'
    for h in headers:
        res += f'        <th style="padding: 10px;">{inline_format(h)}</th>\n'
    res += '      </tr>\n    </thead>\n'
    res += '    <tbody>\n'
    for row in data_lines:
        cells = [c.strip() for c in row.split('|')[1:-1]]
        res += '      <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">\n'
        for c in cells:
            res += f'        <td style="padding: 10px;">{inline_format(c)}</td>\n'
        res += '      </tr>\n'
    res += '    </tbody>\n'
    res += '  </table>\n</div>\n'
    return res

def convert_md_body(body_text: str) -> str:
    lines = body_text.strip().split('\n')
    output = []
    i = 0
    
    in_table = False
    table_lines = []
    
    in_ul = False
    in_ol = False
    
    while i < len(lines):
        line = lines[i].strip()
        
        if not line:
            if in_table:
                output.append(md_table_to_html(table_lines))
                table_lines = []
                in_table = False
            if in_ul:
                output.append('</ul>\n')
                in_ul = False
            if in_ol:
                output.append('</ol>\n')
                in_ol = False
            i += 1
            continue
            
        if line.startswith('|') and line.endswith('|'):
            if in_ul:
                output.append('</ul>\n')
                in_ul = False
            if in_ol:
                output.append('</ol>\n')
                in_ol = False
            in_table = True
            table_lines.append(line)
            i += 1
            continue
        elif in_table:
            output.append(md_table_to_html(table_lines))
            table_lines = []
            in_table = False
            
        if line.startswith('## '):
            if in_ul:
                output.append('</ul>\n')
                in_ul = False
            if in_ol:
                output.append('</ol>\n')
                in_ol = False
            output.append(f'<h2>{inline_format(line[3:].strip())}</h2>\n')
            i += 1
            continue
            
        if line.startswith('### '):
            if in_ul:
                output.append('</ul>\n')
                in_ul = False
            if in_ol:
                output.append('</ol>\n')
                in_ol = False
            output.append(f'<h3>{inline_format(line[4:].strip())}</h3>\n')
            i += 1
            continue
            
        if line.startswith('#### '):
            if in_ul:
                output.append('</ul>\n')
                in_ul = False
            if in_ol:
                output.append('</ol>\n')
                in_ol = False
            output.append(f'<h4>{inline_format(line[5:].strip())}</h4>\n')
            i += 1
            continue
            
        ol_match = re.match(r'^\d+\.\s+(.*)$', line)
        if ol_match:
            if in_ul:
                output.append('</ul>\n')
                in_ul = False
            if not in_ol:
                output.append('<ol>\n')
                in_ol = True
            output.append(f'  <li>{inline_format(ol_match.group(1))}</li>\n')
            i += 1
            continue
        elif in_ol:
            output.append('</ol>\n')
            in_ol = False
            
        ul_match = re.match(r'^[*\-]\s+(.*)$', line)
        if ul_match:
            if in_ol:
                output.append('</ol>\n')
                in_ol = False
            if not in_ul:
                output.append('<ul>\n')
                in_ul = True
            output.append(f'  <li>{inline_format(ul_match.group(1))}</li>\n')
            i += 1
            continue
        elif in_ul:
            output.append('</ul>\n')
            in_ul = False
            
        if line.startswith('```'):
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith('```'):
                code_lines.append(lines[i])
                i += 1
            i += 1
            code_text = '\n'.join(code_lines)
            output.append(f'<pre><code>{code_text}</code></pre>\n')
            continue
            
        output.append(f'<p>{inline_format(line)}</p>\n')
        i += 1
        
    if in_table:
        output.append(md_table_to_html(table_lines))
    if in_ul:
        output.append('</ul>\n')
    if in_ol:
        output.append('</ol>\n')
        
    cta_box = """
<div style="margin: 2.5rem 0; padding: 1.5rem 2rem; background: linear-gradient(135deg, rgba(0, 255, 157, 0.05) 0%, rgba(0, 229, 255, 0.05) 100%); border: 1px solid rgba(0, 255, 157, 0.25); border-radius: 14px;">
  <div style="display: flex; align-items: center; gap: 0.5rem; color: #00ff9d; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
    🎮 GTA VI PRECISION CALIBRATION SUITE
  </div>
  <h3 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1.25rem;">Dial In Your Aim Before Grand Theft Auto VI Launches</h3>
  <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">
    Calibrate your stick drift, deadzones, and mouse cm/360 with our <a href="/" style="color: #00ff9d; font-weight: 700;">1:1 Universal Sensitivity Converter</a> and master precision aiming mechanics in our <a href="/ebooks/controller-precision-guide/" style="color: #00e5ff; font-weight: 700;">Controller Precision Guide</a>.
  </p>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <a href="/ebooks/controller-precision-guide/" style="background: #00ff9d; color: #050507; padding: 0.65rem 1.4rem; border-radius: 8px; font-weight: 800; font-size: 0.9rem; text-decoration: none;">Get Controller Precision Guide ($14.99) →</a>
    <a href="/psa-calculator/" style="background: rgba(255, 255, 255, 0.08); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.65rem 1.4rem; border-radius: 8px; font-weight: 700; font-size: 0.9rem; text-decoration: none;">Run 7-Step PSA Calculation →</a>
  </div>
</div>
"""
    output.append(cta_box)
    return ''.join(output)

def parse_post(raw_text: str, dedicated_img: str, read_time: str):
    parts = raw_text.split('---')
    fm = parts[1] if len(parts) > 2 else ''
    body = '---'.join(parts[2:]) if len(parts) > 2 else raw_text
    
    title_m = re.search(r'title:\s*\"(.*)\"', fm)
    title = title_m.group(1).strip() if title_m else ''
    
    slug_m = re.search(r'slug:\s*\"(.*)\"', fm)
    slug = slug_m.group(1).strip().replace('/blog/', '').replace('/', '') if slug_m else ''
    
    # Extract Quick Reference Summary (TL;DR)
    summary = ''
    tldr_m = re.search(r'###\s*Quick Reference Summary \(TL;DR\)\s*\n([\s\S]*?)(?=\n##\s|\n#\s|$)', body)
    if tldr_m:
        raw_tldr = tldr_m.group(1).strip()
        lines = [re.sub(r'^[*\-]\s*', '', l.strip()) for l in raw_tldr.splitlines() if l.strip()]
        s_joined = ' '.join(lines)
        s_joined = re.sub(r'\*\*(.*?)\*\*', r'\1', s_joined)
        s_joined = re.sub(r'`(.*?)`', r'\1', s_joined)
        summary = s_joined.strip()
        
    # Extract FAQs
    faqs = []
    faq_sec_m = re.search(r'##\s*\d*\.?\s*Frequently Asked Questions \(FAQ\)\s*\n([\s\S]*?)(?=\n##\s|\n#\s|$)', body)
    if faq_sec_m:
        faq_text = faq_sec_m.group(1)
        qa_pairs = re.findall(r'###\s*(.*?)\n([\s\S]*?)(?=\n###|\Z)', faq_text)
        for q, a in qa_pairs:
            q_clean = q.strip()
            a_clean = ' '.join([l.strip() for l in a.splitlines() if l.strip()])
            a_clean = re.sub(r'\*\*(.*?)\*\*', r'\1', a_clean)
            a_clean = re.sub(r'`(.*?)`', r'\1', a_clean)
            if q_clean and a_clean:
                faqs.append({'q': q_clean, 'a': a_clean})
                
    # Remove Structured Data section
    body = re.sub(r'##\s*\d*\.?\s*Structured Data[\s\S]*?(?=\n##\s|\Z)', '', body)
    
    # Remove FAQ and TLDR from body text
    body_clean = re.sub(r'##\s*\d*\.?\s*Frequently Asked Questions \(FAQ\)[\s\S]*?(?=\n##\s|\Z)', '', body)
    body_clean = re.sub(r'###\s*Quick Reference Summary \(TL;DR\)[\s\S]*?(?=\n##\s|\Z)', '', body_clean)
    
    # Strip top H1, author byline, and markdown image embed
    body_clean = re.sub(r'^\s*#\s+[^\n]+\n*', '', body_clean)
    body_clean = re.sub(r'^\s*\*Written and bench-tested by[^\n]+\*\n*', '', body_clean)
    body_clean = re.sub(r'^\s*!\[[^\n]*\]\([^\n]*\)\n*', '', body_clean)
    body_clean = body_clean.lstrip()
    
    # Excerpt from first paragraph
    first_p = ''
    for p in body_clean.split('\n\n'):
        p = p.strip()
        if p and not p.startswith('#') and not p.startswith('!') and not p.startswith('*Written'):
            first_p = p
            break
    first_p_clean = re.sub(r'\*\*(.*?)\*\*', r'\1', first_p)
    first_p_clean = re.sub(r'`(.*?)`', r'\1', first_p_clean)
    excerpt = first_p_clean[:180] + '...' if len(first_p_clean) > 180 else first_p_clean
    
    html_content = convert_md_body(body_clean)
    
    return {
        'slug': slug,
        'title': title,
        'excerpt': excerpt,
        'date': 'Oct 18, 2026',
        'updated': '2026-10-18',
        'readTime': read_time,
        'category': 'Guide',
        'image': f'/blog/{dedicated_img}',
        'summary': summary,
        'faqs': faqs,
        'content': html_content
    }

def main():
    parsed_posts = []
    with zipfile.ZipFile(ZIP_PATH) as z:
        for fname, dedicated_img, rtime in ARTICLES:
            raw_txt = z.read(ZIP_PREFIX + fname).decode('utf-8', errors='ignore')
            post = parse_post(raw_txt, dedicated_img, rtime)
            parsed_posts.append(post)
            print(f'Processed: {post["slug"]} | Image: {post["image"]} | FAQs: {len(post["faqs"])}')
            
    # Write to chunk-29.ts
    with open(OUTPUT_CHUNK, 'w', encoding='utf-8') as out:
        out.write("import type { BlogPost } from './types';\n\n")
        out.write("export const postsChunk29: BlogPost[] = ")
        out.write(json.dumps(parsed_posts, indent=2, ensure_ascii=False))
        out.write(";\n")
        
    print(f'Successfully generated {OUTPUT_CHUNK} with {len(parsed_posts)} articles!')

if __name__ == '__main__':
    main()
