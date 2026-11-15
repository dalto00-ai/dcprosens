# 🎮 Guia de Banners para Parcerias — DCPROSENS

Este guia contém as **dimensões exatas**, **regras de design** e **prompts prontos para IA** (ChatGPT, Midjourney, FLUX, Leonardo AI, Canva) para você criar os banners dos seus patrocinadores e afiliados.

---

## 📐 1. Formatos e Dimensões Oficiais

Para cobrir 100% do layout do DCPROSENS com estética profissional:

| Formato | Dimensão Exata | Onde aparece? | Proporção / Aspect Ratio |
| :--- | :---: | :--- | :---: |
| **Leaderboard Topo (PC)** | **`728 x 90` px** | Abaixo do menu principal no topo da tela | Proporção ~8:1 |
| **Leaderboard Mobile** | **`320 x 50` px** | Versão mobile abaixo do menu | Proporção ~6:1 |
| **Retângulo Médio (In-Content)** | **`300 x 250` px** | No meio das páginas (DPI, FOV, Conversor) e pré-footer | Proporção 6:5 |
| **Skyscraper Lateral (Vertical)** | **`160 x 600` px** | Lateral da tela em monitores grandes (Desktop) | Proporção 1:4 (ou 9:16) |

> 💡 **Formato de imagem recomendado:** `.webp` ou `.png` (peso ideal < 80 KB para não prejudicar o SEO e o carregamento do site).

---

## 🎨 2. Identidade Visual do DCPROSENS (Para Harmonizar)

Para o banner não parecer intrusivo e converter muito:
* **Fundo Predominante:** Escuro (`#0a0b0e`, `#0d1117`, cinza chumbo, preto fosco com gradientes sutis).
* **Cores de Destaque / Neon:** Verde Neon (`#00ff9d`), Ciano Gamer (`#00e5ff`) ou Roxo Elétrico (`#7928ca`).
* **Estilo:** Gamer minimalista, futurista, limpo, alta tecnologia, esports profissional.

---

## 🤖 3. Prompts Prontos para Gerar os Banners (Copie e Cole)

### 🏆 Opção 1: Periféricos & Mouses Gamers (Estilo Logitech / Razer / Zowie)
> **Prompt para IA (DALL-E / Midjourney / FLUX):**  
> `High-end esports gaming mouse advertisement banner, futuristic sleek dark background with neon emerald green and cyan accent lighting, ultra-minimalist competitive esports setup, premium matte black texture, cinematic dramatic studio lighting, 8k resolution, professional commercial product photography, leave negative space on the right for text and discount code --ar 8:1`  
> *(Obs: para o banner 300x250 use `--ar 6:5`; para o vertical 160x600 use `--ar 1:4`)*

---

### ⚡ Opção 2: Bebida Energética / Suplemento Gamer
> **Prompt para IA:**  
> `Premium esports energy drink can advert banner, sleek frosted black can with glowing neon green electric aura and ice splash particles, dark carbon fiber background, high-energy gaming aesthetic, clean modern composition, hyperrealistic 3d render, leave negative space on the side for call to action button --ar 8:1`

---

### 🎯 Opção 3: Otimizador de Conexão / VPN / Redutor de Ping (Estilo ExitLag)
> **Prompt para IA:**  
> `Gaming network latency optimizer software ad banner, glowing fiber-optic digital speed lines, ping drop from 120ms to 15ms visualization, ultra-clean esports dark mode interface, neon cyan and mint green glow, professional tech commercial banner, minimalist design --ar 8:1`

---

### 🤝 Opção 4: Banner Genérico "Seja Nosso Parceiro / Anuncie Aqui"
> **Prompt para IA:**  
> `Futuristic esports sponsorship banner placeholder, sleek dark tech background with subtle neon grid, modern typography framing space with geometric glowing accents, clean competitive gaming aesthetic, ultra-sharp 8k, professional UI banner design --ar 8:1`

---

## 🚀 4. Como Subir os Banners Depois que Você Gerar:

Assim que você tiver as imagens prontas:
1. **Envie as imagens aqui no chat** (ou salve na pasta `public/partners/`).
2. **Me informe o link de destino** (ex: `https://link-do-parceiro.com?ref=dcprosens`).
3. Eu altero a configuração `PARTNERS_CONFIG` em `src/config/partners.ts`, coloco as imagens no ar e publico direto na Hostinger para você em instantes!
