#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builder for Lote 14:
5 In-depth E-E-A-T Technical Articles:
1. 20_tarkov-and-gray-zone-warfare-pip-lpvo-scope-sensitivity-fix
2. 21_delta-force-hawk-ops-sensitivity-converter-mdv-0-vs-133-guide
3. 22_fragpunk-sensitivity-converter-valorant-007-yaw-parity-guide
4. 23_arc-raiders-sensitivity-converter-third-person-ads-and-shoulder-swap
5. 24_cod-mw4-and-warzone-75-percent-left-stick-max-deadzone-raa-secret
"""

import os
import re
import json
import zipfile
import io
from PIL import Image

ZIP_PATH = 'DCPROSENS_COMPLETE_120_EEAT_ARTICLES_155_IMAGES_18_EBOOKS_SEO_MASTER_PACK.zip'
OUTPUT_CHUNK = 'src/lib/posts-data/chunk-40.ts'

ARTICLES = [
    {
        'zip_path': '01B_30_EEAT_ANTI_AI_ARTICLES_WITH_TOC_AND_IMAGES/20_tarkov-and-gray-zone-warfare-pip-lpvo-scope-sensitivity-fix.md',
        'img_src': '06_BLOG_IMAGES_PACK_JPG_AND_WEBP/jpg_original/55_tarkov-and-gray-zone-warfare-pip-lpvo-scope-sensitivity-fix.jpg',
        'img_dest': 'public/blog/55_tarkov-and-gray-zone-warfare-pip-lpvo-scope-sensitivity-fix.webp',
        'category': 'Guide',
        'read_time': '13 min read',
        'cta_title': 'Fix Tarkov & Gray Zone PiP Scope Latency & Sensitivity',
        'cta_desc': 'Calibrate variable optic dual-rendering sensitivity and eliminate 1x/4x/6x PiP scope lag across all LPVO mounts.',
        'cta_link': '/ebooks/escape-from-tarkov-gray-zone-ballistics-guide/',
        'cta_btn': 'Get Tarkov 1.0 & Gray Zone Ballistics Guide ($14.90) →',
        'sec_link': '/ads/',
        'sec_btn': 'Calculate PiP Scope ADS Multipliers →'
    },
    {
        'zip_path': '01B_30_EEAT_ANTI_AI_ARTICLES_WITH_TOC_AND_IMAGES/21_delta-force-hawk-ops-sensitivity-converter-mdv-0-vs-133-guide.md',
        'img_src': '06_BLOG_IMAGES_PACK_JPG_AND_WEBP/jpg_original/56_delta-force-hawk-ops-sensitivity-converter-mdv-0-vs-133-guide.jpg',
        'img_dest': 'public/blog/56_delta-force-hawk-ops-sensitivity-converter-mdv-0-vs-133-guide.webp',
        'category': 'Guide',
        'read_time': '12 min read',
        'cta_title': 'Delta Force Hawk Ops MDV 0% vs 133% Parity Calculator',
        'cta_desc': 'Match your CS2 and Valorant muscle memory to Delta Force Hawk Ops across iron sights, 2x holographic, and sniper scopes.',
        'cta_link': '/ebooks/delta-force-fragpunk-arc-raiders-tactical-guide/',
        'cta_btn': 'Get Delta Force & Tactical Shooters Guide ($12.90) →',
        'sec_link': '/sens-finder/',
        'sec_btn': 'Calculate Delta Force MDV Settings →'
    },
    {
        'zip_path': '01B_30_EEAT_ANTI_AI_ARTICLES_WITH_TOC_AND_IMAGES/22_fragpunk-sensitivity-converter-valorant-007-yaw-parity-guide.md',
        'img_src': '06_BLOG_IMAGES_PACK_JPG_AND_WEBP/jpg_original/57_fragpunk-sensitivity-converter-valorant-007-yaw-parity-guide.jpg',
        'img_dest': 'public/blog/57_fragpunk-sensitivity-converter-valorant-007-yaw-parity-guide.webp',
        'category': 'Guide',
        'read_time': '12 min read',
        'cta_title': 'FragPunk to Valorant 1:1 Yaw & Crosshair Sync',
        'cta_desc': 'Eliminate card-round FOV shifts and synchronize your exact Valorant 0.07 yaw to FragPunk’s dynamic camera engine.',
        'cta_link': '/ebooks/delta-force-fragpunk-arc-raiders-tactical-guide/',
        'cta_btn': 'Download Tactical Hero Aim Guide →',
        'sec_link': '/crosshair/',
        'sec_btn': 'Test FragPunk Crosshair Alignments →'
    },
    {
        'zip_path': '01B_30_EEAT_ANTI_AI_ARTICLES_WITH_TOC_AND_IMAGES/23_arc-raiders-sensitivity-converter-third-person-ads-and-shoulder-swap.md',
        'img_src': '06_BLOG_IMAGES_PACK_JPG_AND_WEBP/jpg_original/58_arc-raiders-sensitivity-converter-third-person-ads-and-shoulder-swap.jpg',
        'img_dest': 'public/blog/58_arc-raiders-sensitivity-converter-third-person-ads-and-shoulder-swap.webp',
        'category': 'Guide',
        'read_time': '13 min read',
        'cta_title': 'Arc Raiders Extraction Aim & Shoulder-Swap Mastery',
        'cta_desc': 'Compensate for extraction shooter character inertia, third-person camera offsets, and ADS scope zoom transitions.',
        'cta_link': '/ebooks/delta-force-fragpunk-arc-raiders-tactical-guide/',
        'cta_btn': 'Download Pro Extraction Aim Guide →',
        'sec_link': '/ads/',
        'sec_btn': 'Calculate Third-Person to ADS Ratio →'
    },
    {
        'zip_path': '01B_30_EEAT_ANTI_AI_ARTICLES_WITH_TOC_AND_IMAGES/24_cod-mw4-and-warzone-75-percent-left-stick-max-deadzone-raa-secret.md',
        'img_src': '06_BLOG_IMAGES_PACK_JPG_AND_WEBP/jpg_original/59_cod-mw4-and-warzone-75-percent-left-stick-max-deadzone-raa-secret.jpg',
        'img_dest': 'public/blog/59_cod-mw4-and-warzone-75-percent-left-stick-max-deadzone-raa-secret.webp',
        'category': 'Guide',
        'read_time': '13 min read',
        'cta_title': 'Master Rotational Aim Assist (RAA) & Max Deadzones',
        'cta_desc': 'Trigger instant 0.60 Rotational Aim Assist bubble engagement with the 75% left-stick max deadzone controller trick.',
        'cta_link': '/ebooks/pro-controller-tmr-sticks-aim-assist-guide/',
        'cta_btn': 'Get Controller Pro Aim & Deadzone Guide ($12.90) →',
        'sec_link': '/psa-calculator/',
        'sec_btn': 'Fine-Tune Stick Response Curves →'
    }
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

def convert_md_body(body_text: str, cta_info: dict) -> str:
    lines = body_text.strip().split('\n')
    output = []
    i = 0
    
    in_table = False
    table_lines = []
    
    in_ul = False
    in_ol = False
    
    html_tag_re = re.compile(r'^\s*<(/?[a-zA-Z0-9]+)(\s+[^>]*)?>')
    
    while i < len(lines):
        line = lines[i].strip()
        
        if not line:
            if in_table:
                output.append(md_table_to_html(table_lines))
                in_table = False
                table_lines = []
            if in_ul:
                output.append('</ul>\n')
                in_ul = False
            if in_ol:
                output.append('</ol>\n')
                in_ol = False
            i += 1
            continue
            
        # Table
        if line.startswith('|') and line.endswith('|'):
            in_table = True
            table_lines.append(line)
            i += 1
            continue
        elif in_table:
            output.append(md_table_to_html(table_lines))
            in_table = False
            table_lines = []
            
        # Headings
        if line.startswith('### '):
            if in_ul: output.append('</ul>\n'); in_ul = False
            if in_ol: output.append('</ol>\n'); in_ol = False
            output.append(f'<h3>{inline_format(line[4:])}</h3>\n')
            i += 1
            continue
        if line.startswith('## '):
            if in_ul: output.append('</ul>\n'); in_ul = False
            if in_ol: output.append('</ol>\n'); in_ol = False
            output.append(f'<h2>{inline_format(line[3:])}</h2>\n')
            i += 1
            continue
        if line.startswith('# '):
            i += 1
            continue
            
        # Already HTML tags (e.g., <h2 id=...>, <div...>, <figure...>, etc.)
        if html_tag_re.match(line):
            if in_ul: output.append('</ul>\n'); in_ul = False
            if in_ol: output.append('</ol>\n'); in_ol = False
            output.append(inline_format(line) + '\n')
            i += 1
            continue
            
        # Unordered list
        if line.startswith('* ') or line.startswith('- '):
            if in_ol: output.append('</ol>\n'); in_ol = False
            if not in_ul:
                output.append('<ul>\n')
                in_ul = True
            item_text = line[2:].strip()
            output.append(f'  <li>{inline_format(item_text)}</li>\n')
            i += 1
            continue
            
        # Ordered list
        if re.match(r'^\d+\.\s+', line):
            if in_ul: output.append('</ul>\n'); in_ul = False
            if not in_ol:
                output.append('<ol>\n')
                in_ol = True
            item_text = re.sub(r'^\d+\.\s+', '', line).strip()
            output.append(f'  <li>{inline_format(item_text)}</li>\n')
            i += 1
            continue
            
        if in_ul: output.append('</ul>\n'); in_ul = False
        if in_ol: output.append('</ol>\n'); in_ol = False
        
        # Skip image markdown, comments, bylines
        if line.startswith('![') or line.startswith('<!--') or line.startswith('-->'):
            i += 1
            continue
        if line.startswith('**By Dalto Outlier') or line.startswith('*Founder & Lead'):
            i += 1
            continue
            
        # Standard paragraph
        output.append(f'<p>{inline_format(line)}</p>\n')
        i += 1
        
    if in_table:
        output.append(md_table_to_html(table_lines))
    if in_ul:
        output.append('</ul>\n')
    if in_ol:
        output.append('</ol>\n')
        
    # Append high-converting Call-to-action box matching DCPROSENS standards
    cta_box = f"""
<div style="margin: 2.5rem 0; padding: 1.5rem 2rem; background: linear-gradient(135deg, rgba(0, 255, 157, 0.05) 0%, rgba(0, 229, 255, 0.05) 100%); border: 1px solid rgba(0, 255, 157, 0.25); border-radius: 14px;">
  <div style="display: flex; align-items: center; gap: 0.5rem; color: #00ff9d; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
    ⚡ PRO ESPORTS BENCHMARK & GEAR LAB
  </div>
  <h3 style="color: #ffffff; margin: 0 0 0.5rem 0; font-size: 1.25rem;">{cta_info['cta_title']}</h3>
  <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem;">
    {cta_info['cta_desc']}
  </p>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <a href="{cta_info['cta_link']}" style="background: #00ff9d; color: #050507; padding: 0.65rem 1.4rem; border-radius: 8px; font-weight: 800; font-size: 0.9rem; text-decoration: none;">{cta_info['cta_btn']}</a>
    <a href="{cta_info['sec_link']}" style="background: rgba(255, 255, 255, 0.08); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.65rem 1.4rem; border-radius: 8px; font-weight: 700; font-size: 0.9rem; text-decoration: none;">{cta_info['sec_btn']}</a>
  </div>
</div>
"""
    output.append(cta_box)
    return ''.join(output)

def parse_post(raw_text: str, article_info: dict):
    parts = raw_text.split('---')
    fm = parts[1] if len(parts) > 2 else ''
    body = '---'.join(parts[2:]) if len(parts) > 2 else raw_text
    
    title_m = re.search(r'title:\s*\"(.*)\"', fm)
    title = title_m.group(1).strip() if title_m else ''
    
    slug_m = re.search(r'slug:\s*\"(.*)\"', fm)
    slug = slug_m.group(1).strip().replace('/blog/', '').replace('/', '') if slug_m else ''
    
    # Extract Quick Answer (AEO / GEO Summary)
    summary = ''
    qa_m = re.search(r'###\s*Quick Answer.*?\(AEO.*?\)\s*\n([\s\S]*?)(?=<h2|\n##|\n###)', body)
    if qa_m:
        raw_qa = qa_m.group(1).strip()
        lines = [re.sub(r'^[*\-]\s*', '', l.strip()) for l in raw_qa.splitlines() if l.strip()]
        s_joined = ' '.join(lines)
        s_joined = re.sub(r'\*\*(.*?)\*\*', r'\1', s_joined)
        s_joined = re.sub(r'`(.*?)`', r'\1', s_joined)
        summary = s_joined.strip()
    else:
        summary = f"Comprehensive technical breakdown of {title}, featuring mathematical analysis, laboratory hardware telemetry, and pro settings configurations."
        
    # Extract FAQs
    faqs = []
    faq_matches = re.findall(r'(###\s*[^#\n]+\?)\s*\n([\s\S]*?)(?=\n###|\n##|<h2|<script|\Z)', body)
    for q, a in faq_matches:
        q_clean = q.replace('###', '').strip()
        if any(k in q_clean for k in ['Manual', 'E-book', 'Guide']):
            continue
        a_clean = ' '.join([l.strip() for l in a.splitlines() if l.strip()])
        a_clean = re.sub(r'\*\*(.*?)\*\*', r'\1', a_clean)
        a_clean = re.sub(r'`(.*?)`', r'\1', a_clean)
        if q_clean and a_clean:
            faqs.append({'q': q_clean, 'a': a_clean})
            
    # Clean body
    body_clean = re.sub(r'<script\s+type=\"application/ld\+json\">[\s\S]*?</script>', '', body)
    body_clean = re.sub(r'<!--\s*={5,}[\s\S]*?={5,}\s*-->', '', body_clean)
    
    # Remove Quick Answer block
    body_clean = re.sub(r'###\s*Quick Answer.*?\(AEO.*?\)\s*\n[\s\S]*?(?=<h2|\n##|\n###)', '', body_clean)
    
    # Remove Table of Contents
    body_clean = re.sub(r'##\s*Table of Contents[\s\S]*?(?=<h2|\n##)', '', body_clean)
    
    # Remove FAQ section from body text to avoid duplication
    body_clean = re.sub(r'<h2\s+id=\"faq\"[\s\S]*?(?=<script|<!--|\Z)', '', body_clean)
    
    html_content = convert_md_body(body_clean, article_info)
    
    # Clean up any leftover empty elements
    html_content = re.sub(r'<p>\s*</p>', '', html_content)
    
    # Excerpt: clean first 180 chars of body or summary
    first_p = re.search(r'<p>(.*?)</p>', html_content)
    excerpt = re.sub(r'<.*?>', '', first_p.group(1))[:180] + '...' if first_p else summary[:180] + '...'
    
    return {
        'slug': slug,
        'title': title,
        'excerpt': excerpt,
        'date': 'Oct 19, 2026',
        'updated': '2026-10-19',
        'readTime': article_info['read_time'],
        'category': article_info['category'],
        'image': '/' + article_info['img_dest'].replace('public/', ''),
        'summary': summary,
        'faqs': faqs,
        'content': html_content
    }

def main():
    print('Starting Lote 14 Builder...')
    built_posts = []
    
    with zipfile.ZipFile(ZIP_PATH) as z:
        for info in ARTICLES:
            print(f"Processing: {info['zip_path']}...")
            raw_text = z.read(info['zip_path']).decode('utf-8')
            
            # Extract and save image as WebP
            img_data = z.read(info['img_src'])
            img = Image.open(io.BytesIO(img_data))
            if img.size != (1280, 720):
                img = img.resize((1280, 720), Image.Resampling.LANCZOS)
            img.save(info['img_dest'], 'WEBP', quality=85, method=6)
            print(f"  Saved image: {info['img_dest']}")
            
            post_obj = parse_post(raw_text, info)
            built_posts.append(post_obj)
            print(f"  Parsed post: {post_obj['slug']} ({len(post_obj['content'])} chars HTML, {len(post_obj['faqs'])} FAQs)")

    # Write chunk-40.ts
    chunk_content = "import type { BlogPost } from './types';\n\n"
    chunk_content += "export const postsChunk40: BlogPost[] = [\n"
    for i, p in enumerate(built_posts):
        chunk_content += "  " + json.dumps(p, ensure_ascii=False, indent=2).replace('\n', '\n  ')
        if i < len(built_posts) - 1:
            chunk_content += ",\n"
        else:
            chunk_content += "\n"
    chunk_content += "];\n"
    
    with open(OUTPUT_CHUNK, 'w', encoding='utf-8') as f:
        f.write(chunk_content)
    print(f"\n✅ Created {OUTPUT_CHUNK} with {len(built_posts)} posts.")

if __name__ == '__main__':
    main()
