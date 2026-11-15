#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builder for Lote 21:
5 In-depth E-E-A-T Technical Articles:
1. 55_mouse-sensor-lift-off-distance-1mm-lod-and-motion-sync-benchmark
2. 56_arm-aiming-vs-wrist-aiming-ergonomics-and-ptfe-sleeve-friction
3. 57_7-step-psa-method-calculator-guide-perfect-sensitivity-approximation
4. 58_0-percent-vs-75-vs-100-monitor-distance-match-mdm-zoom-guide
5. 59_how-to-measure-mouse-dpi-deviation-with-10cm-ruler-analyzer
"""

import os
import re
import json
import zipfile
import io
from PIL import Image

ZIP_PATH = 'DCPROSENS_COMPLETE_120_EEAT_ARTICLES_155_IMAGES_18_EBOOKS_SEO_MASTER_PACK.zip'
OUTPUT_CHUNK = 'src/lib/posts-data/chunk-47.ts'

ARTICLES = [
    {
        'zip_path': '01B_30_EEAT_ANTI_AI_ARTICLES_WITH_TOC_AND_IMAGES/55_mouse-sensor-lift-off-distance-1mm-lod-and-motion-sync-benchmark.md',
        'img_src': '06_BLOG_IMAGES_PACK_JPG_AND_WEBP/jpg_original/127_razer-viper-v3-pro-and-deathadder-v3-pro-focus-pro-35k-calibration.jpg',
        'img_dest': 'public/blog/90_mouse-sensor-lift-off-distance-1mm-lod-and-motion-sync-benchmark.webp',
        'category': 'Guide',
        'read_time': '13 min read',
        'cta_title': 'Calibrate Mouse Sensor LOD (1.0mm) & Motion Sync',
        'cta_desc': 'Benchmark sensor tracking cut-off heights and eliminate 1-frame Motion Sync SPI buffer delay on PAW3950 optical sensors.',
        'cta_link': '/ebooks/zero-latency-pc-sensor-hardware-guide/',
        'cta_btn': 'Get Zero Latency Sensor Hardware Guide ($14.90) →',
        'sec_link': '/dpi/',
        'sec_btn': 'Test Mouse Sensor & Lift-Off Settings →'
    },
    {
        'zip_path': '01B_30_EEAT_ANTI_AI_ARTICLES_WITH_TOC_AND_IMAGES/56_arm-aiming-vs-wrist-aiming-ergonomics-and-ptfe-sleeve-friction.md',
        'img_src': '06_BLOG_IMAGES_PACK_JPG_AND_WEBP/jpg_original/91_arm-aiming-vs-wrist-aiming-ergonomics-and-ptfe-sleeve-friction.jpg',
        'img_dest': 'public/blog/91_arm-aiming-vs-wrist-aiming-ergonomics-and-ptfe-sleeve-friction.webp',
        'category': 'Guide',
        'read_time': '13 min read',
        'cta_title': 'Master Arm vs Wrist Aiming Biomechanics & Ergonomics',
        'cta_desc': 'Optimize 90-degree elbow pivot angles, neutral desk height, and PTFE compression sleeve dynamic friction.',
        'cta_link': '/ebooks/the-architect-of-precision/',
        'cta_btn': 'Get Architect of Precision Aim Guide ($14.90) →',
        'sec_link': '/mousepad-calculator/',
        'sec_btn': 'Calculate Arm Movement Runway Space →'
    },
    {
        'zip_path': '01B_30_EEAT_ANTI_AI_ARTICLES_WITH_TOC_AND_IMAGES/57_7-step-psa-method-calculator-guide-perfect-sensitivity-approximation.md',
        'img_src': '06_BLOG_IMAGES_PACK_JPG_AND_WEBP/jpg_original/92_7-step-psa-method-calculator-guide-perfect-sensitivity-approximation.jpg',
        'img_dest': 'public/blog/92_7-step-psa-method-calculator-guide-perfect-sensitivity-approximation.webp',
        'category': 'Guide',
        'read_time': '14 min read',
        'cta_title': 'Discover Your Natural Biological Sensitivity (PSA Method)',
        'cta_desc': 'Iterate through 7 rounds of binary search sensitivity testing to mathematically locate your optimal tracking baseline.',
        'cta_link': '/ebooks/the-architect-of-precision/',
        'cta_btn': 'Get Full Aim Mechanics & PSA Blueprint ($14.90) →',
        'sec_link': '/psa-calculator/',
        'sec_btn': 'Open Interactive 7-Step PSA Calculator →'
    },
    {
        'zip_path': '01B_30_EEAT_ANTI_AI_ARTICLES_WITH_TOC_AND_IMAGES/58_0-percent-vs-75-vs-100-monitor-distance-match-mdm-zoom-guide.md',
        'img_src': '06_BLOG_IMAGES_PACK_JPG_AND_WEBP/jpg_original/93_0-percent-vs-75-vs-100-monitor-distance-match-mdm-zoom-guide.jpg',
        'img_dest': 'public/blog/93_0-percent-vs-75-vs-100-monitor-distance-match-mdm-zoom-guide.webp',
        'category': 'Guide',
        'read_time': '14 min read',
        'cta_title': '0% vs 75% vs 100% Monitor Distance Matching (MDM) Guide',
        'cta_desc': 'Match tracking feel and flick accuracy from hipfire to 1x red dot, 2.5x ACOG, and 8x sniper optics.',
        'cta_link': '/ebooks/complete-esports-master-bundle/',
        'cta_btn': 'Get Complete Esports Calibration Manual ($29.90) →',
        'sec_link': '/ads/',
        'sec_btn': 'Calculate 0% & 100% MDM Zoom Sensitivity →'
    },
    {
        'zip_path': '01B_30_EEAT_ANTI_AI_ARTICLES_WITH_TOC_AND_IMAGES/59_how-to-measure-mouse-dpi-deviation-with-10cm-ruler-analyzer.md',
        'img_src': '06_BLOG_IMAGES_PACK_JPG_AND_WEBP/jpg_original/94_how-to-measure-mouse-dpi-deviation-with-10cm-ruler-analyzer.jpg',
        'img_dest': 'public/blog/94_how-to-measure-mouse-dpi-deviation-with-10cm-ruler-analyzer.webp',
        'category': 'Guide',
        'read_time': '12 min read',
        'cta_title': 'Measure Real Mouse DPI Deviation with Physical Ruler',
        'cta_desc': 'Detect factory lens placement tolerances and surface glide thickness causing real hardware CPI shifts.',
        'cta_link': '/ebooks/zero-latency-pc-sensor-hardware-guide/',
        'cta_btn': 'Download Sensor & Hardware Calibration Guide →',
        'sec_link': '/dpi-analyzer/',
        'sec_btn': 'Open 10cm Physical Ruler DPI Tool →'
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
            
        # Already HTML tags
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
    print('Starting Lote 21 Builder...')
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

    # Write chunk-47.ts
    chunk_content = "import type { BlogPost } from './types';\n\n"
    chunk_content += "export const postsChunk47: BlogPost[] = [\n"
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
