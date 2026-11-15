# AUDITORIA TÉCNICA BRUTALMENTE SINCERA — DCPROSENS (`dcprosens.com`)

> **Data da Auditoria:** 29 de Outubro de 2026
> **Escopo:** Código-fonte completo (`/home/usuario/Documentos/GOOGLE ANTIGRAVIY/DCPROSENS`) + Produção ao vivo (`https://dcprosens.com`)
> **Arquitetura Identificada:** Next.js 16.3.0 (`output: "export"`, Static Site Generation com `trailingSlash: true`) hospedado em LiteSpeed/Hostinger + Endpoints Backend em PHP (`public/api/*.php`) + Firebase Authentication & Cloud Firestore + Stripe Embedded Checkout.
> **Mercado-Alvo:** Tier 1 em Inglês (US/UK/Global — nicho de Esports, FPS & Periféricos).

---

## 1. Scorecard Executivo (Tabela de Notas 0 a 10)

| # | Pilar Avaliado | Nota (0–10) | Status | Resumo de 1 Linha do Principal Achado |
| :--- | :--- | :---: | :---: | :--- |
| **1** | **SEO Técnico & Arquitetura de Indexação** | **6.8 / 10** | 🟡 Atenção | Base SSG sólida, mas há **vazamento grave de textos em Português** em dezenas de páginas EN, 82 `<title>` truncados (>65 chars) e rota `/consultoria/` em PT-BR indexada no sitemap. |
| **2** | **Sitemap.xml, Robots.txt & Ads.txt** | **8.2 / 10** | 🟢 Bom | Gerador pós-build (`generate-sitemaps.mjs`) excelente, mas `robots.txt` omite `Mediapartners-Google`, indexa `/consultoria/` (que redireciona 301) e `news-sitemap.xml` força artigos antigos quando não há notícias em 48h. |
| **3** | **GEO & AEO (AI Overviews, ChatGPT, Perplexity)** | **7.8 / 10** | 🟢 Bom | Excelente uso de SSR/SSG, blocos TL;DR (345 posts), tabelas HTML (326 posts) e FAQs estruturados (436 posts), mas **contaminado por artigos especulativos/fictícios** de jogos ainda não lançados (GTA 6, CoD MW4, Apex Season 30). |
| **4** | **Ecossistema `llms.txt` e `llms-full.txt`** | **8.8 / 10** | 🟢 Excelente | Implementa `/llms.txt`, `/llms-full.txt`, `/llms.json` e `/ai.txt` com dados técnicos reais de yaw de 87 jogos, porém com divergências nos preços/quantidades de eBooks (6 vs 18 volumes). |
| **5** | **Schema Markup / Dados Estruturados (JSON-LD)** | **7.5 / 10** | 🟢 Bom | Sem `aggregateRating` falso e com `JsonLd.tsx` limpo, mas o `publisher.logo` nos 446 posts aponta para `/logo.png` (**404 Not Found**, o arquivo real é `/logo.webp`) e faltam schemas em `/pricing/`, `/vip-overhaul/` e `/deals/`. |
| **6** | **Qualidade de Código, Performance & Core Web Vitals** | **6.2 / 10** | 🟡 Atenção | Página `/blog/` gera um HTML monolítico de **1,19 MB** sem paginação; `pk_live_` e `AIza...` hardcoded como fallback no bundle JS; `public/adsterra/` ainda exposto no servidor. |
| **7** | **Layout, UI/UX, Conversão & Harmonia com Anúncios** | **6.4 / 10** | 🟡 Atenção | Design visual dark/esports atraente e `PartnerBanner` sem CLS, mas **4 tabelas de preços contraditórias**, "Live Activity Feed" 100% falso/hardcoded, links de download `.apk`/`.zip` dando **404** para assinantes e componentes inteiros em Português. |
| **8** | **Auditoria de Pagamentos & Integração Stripe** | **5.2 / 10** | 🔴 Crítico | Webhook valida HMAC-SHA256, mas **todos os 18 eBooks pagos ($39.99) e o Optimizer Engine ($97) estão abertos de graça em `public/` sem verificação de pagamento**, falta idempotência no webhook e `invoice.payment_failed` é ignorado. |
| **9** | **Google Search: Helpful Content, E-E-A-T & Mercado EN** | **5.0 / 10** | 🔴 Crítico | Ferramentas interativas excelentes e página `/about/` exemplar, mas **63,7% do blog (284 de 446 posts) têm menos de 800 palavras** (98 têm <500 palavras) e há dezenas de guias fabricados sobre jogos/temporadas inexistentes (*Scaled Content Abuse*). |
| **10** | **Prontidão para Aprovação no Google AdSense** | **3.8 / 10** | 🔴 Crítico | O próprio comentário em `src/app/layout.tsx:87` confirma que **o site já foi reprovado no AdSense por Thin Content**. Faltam menção ao cookie DART/AdSense na Privacy Policy, CMP (Consent Mode v2), Refund Policy dedicada e remoção dos 284 posts curtos/especulativos + páginas em PT-BR. |
| — | **NOTA GERAL FINAL (Média Ponderada)** | **6.4 / 10** | 🟡 **Atenção / Risco Alto** | **Excelente engenharia de ferramentas e GEO, sabotada por conteúdo raso/especulativo em massa, vazamento de idioma PT-BR e falha grave na entrega de produtos pagos.** |

---

### Os 3 Vereditos Diretos

1. **O site seria aprovado no Google AdSense se enviado HOJE?**
   - **NÃO.** Inclusive, conforme documentado no próprio código (`src/app/layout.tsx:87-90`: *"AdSense is off. The site was rejected again (thin content, same finding as Search's 'discovered - currently not indexed' bucket)"*), o site já sofreu reprovação pelo exato motivo que esta auditoria identificou:
     1. **284 dos 446 artigos do blog (63,7%) possuem menos de 800 palavras** (sendo 98 artigos com menos de 500 palavras, chegando a 185 palavras), configurando *Thin Content / Scaled Content Abuse*.
     2. **Conteúdo especulativo/fabricado como se fosse factual:** Dezenas de artigos e eBooks detalham configurações de *Call of Duty: MW4* (`mw4-beta-zodiac-map-sensitivity-guide`), *GTA 6 / GTA VI* (305 menções), *Apex Legends Season 30* e *Fortnite Chapter 7* como se já estivessem rodando em produção.
     3. **Mistura acidental de idiomas (Inglês + Português):** A página `/consultoria/`, o formulário `/ebook/` (`EbookForm.tsx`), as ferramentas `/cps-test/` e `/reaction-time-test/` e todos os blocos de afiliados da Amazon nos artigos de mouse/teclado (`src/app/blog/[slug]/page.tsx:416-532` e `src/lib/affiliates.ts`) estão **em Português** dentro de um site `<html lang="en">`. Isso aciona reprovação automática por *"Site Behavior: Navigation / Language mismatch"*.
     4. **Ausência de Compliance AdSense:** A `/privacy/` (`src/app/privacy/page.tsx`) **não menciona Google AdSense, o cookie DoubleClick DART**, nem o link oficial de opt-out (`adssettings.google.com`), e o site **não possui Cookie Consent Banner (CMP) com Google Consent Mode v2** (obrigatório para tráfego EEA/UK).

2. **O site tem estrutura para ranquear no Google (EN) e ser citado por IAs (GEO/AEO) HOJE?**
   - **COM RESSALVAS GRAVES.** A infraestrutura técnica para motores de resposta (ChatGPT Search, Perplexity, Claude e AI Overviews) é uma das melhores possíveis: HTML estático pré-renderizado (SSG), arquivos `/llms.txt`, `/llms-full.txt`, `/llms.json` e `/ai.txt` impecáveis, tabelas HTML comparativas em 326 artigos, blocos `TL;DR` em 345 artigos e schema `FAQPage` em 436 artigos. **Porém**, no Google Search orgânico, o excesso de URLs curtas (<500 palavras) publicadas em lotes na mesma data (ex: 116 posts em `Oct 19, 2026`, 81 posts em `Aug 23, 2026`, 50 posts em `Aug 25, 2026`) dilui o *Crawl Budget* e mantém páginas presas em *"Discovered - currently not indexed"*.

3. **O sistema de pagamentos (Stripe) está seguro e pronto para receber clientes reais HOJE?**
   - **COM RESSALVAS GRAVES (Risco Financeiro Imediato).** O checkout embutido (`create-checkout-session.php`) e a verificação criptográfica HMAC-SHA256 do webhook (`stripe-webhook.php:41-63`) + bloqueio de escalação de privilégio no Firestore (`firestore.rules:19-21`) foram bem engenheirados. **Contudo:**
     1. **Paywall Inexistente para Produtos Digitais:** Todos os 18 PDFs vendidos a $14.99–$39.99 estão em `public/ebooks/*.pdf` e o software de $97 está em `public/downloads/DCPROSENS-Optimizer-Engine-v1.0.zip`. Qualquer pessoa (ou quem compra apenas 1 eBook de $14.99 e cai em `/ebooks/download/`) baixa o pacote completo de $39.99 sem nenhuma validação de `session_id`!
     2. **Produtos prometidos no Dashboard dão erro 404:** Assinantes pagantes que clicam para baixar a Chrome Extension (`/downloads/dcprosens-extension.zip`) ou o Android APK (`/downloads/dcprosens.apk`) em `src/app/dashboard/page.tsx:593,610` recebem **404 Not Found** porque os arquivos não existem em `public/downloads/`.
     3. **Preços contraditórios em 4 lugares diferentes:** Home diz `$3.90/mo` (`src/app/page.tsx:545`), Dashboard diz `$4.99/mo | $39.99/yr | $149 once` (`src/app/dashboard/page.tsx:399-411`), e-mail de campanha diz `$3.33/mo` (`public/api/welcome-email.php:87`), enquanto `/pricing/` e o Stripe cobram `$7.99/mo | $49.00/yr | $129 once`. Isso gera *chargebacks* e disputas no Stripe por propaganda enganosa.

---

## 2. Análise Profunda Pilar por Pilar (1 a 10)

---

### PILAR 1: SEO Técnico & Arquitetura de Indexação
**Nota: 6.8 / 10** — 🟡 *Atenção*

#### O que está implementado hoje:
- **Configuração Global (`src/app/layout.tsx:15-116`):** `metadataBase: new URL("https://dcprosens.com")`, `<html lang="en">` (`linha 124`), template de título `%s | DCPROSENS`, Open Graph e Twitter Cards globais configurados.
- **Cobertura de Metadata e Canonical:** Todas as 57 rotas de páginas possuem `<title>`, `<meta name="description">` e `<link rel="canonical">` com barra final (`/`) alinhada ao `trailingSlash: true` do `next.config.ts:5`.
- **Redirecionamentos e Limpeza de Legado (`public/.htaccess:57-169`):** Força HTTPS, redireciona `www` para non-www via 301, redireciona dezenas de URLs antigas do WordPress para `/blog/<slug>/` e aplica `410 Gone` (`[G,L]`) para rotas mortas do WooCommerce (`/cart/`, `/checkout/`, `/wp-admin/`, `/feed/`).

#### Falhas, Riscos e O que está faltando:
1. **Mistura Grave de Idioma Português em Interface Pública (`<html lang="en">`):**
   - `src/app/blog/[slug]/page.tsx:416-472` e `488-535`: Todos os artigos do blog cujo slug contém `mouse`, `weight`, `setup`, `keyboard` ou `keybind` renderizam caixas de afiliados **inteiramente em Português** (*"Equipamentos de Elite Recomendados"*, *"Mouses ultra-leves topo de linha recomendados pelo Treinador Dalto..."*, *"Ver Preço na Amazon 🛒"*, *"Teclado Analógico Recomendado"*, *"Ver Teclado na Amazon 🛒"*), além de exibir asteriscos Markdown crus `**Rapid Trigger**` na linha 492.
   - `src/lib/affiliates.ts:12-45`: Todos os `badge` e `description` dos produtos afiliados estão em Português (*"🏆 Escolha dos Pro Players (60g)"*, *"O mouse mais vencedor do cenário competitivo..."*).
   - `src/components/CpsTest.tsx:124`: Renderiza `"Clique para começar"` em `/cps-test/`.
   - `src/components/ReactionTimeTest.tsx:85,89,91,96,100,131`: Renderiza `"Clique para começar"`, `"CLIQUE AGORA!"`, `"Cedo demais! Clique para tentar de novo"`, `"Clique para reiniciar"`, `"Melhor"` na ferramenta `/reaction-time-test/`.
   - `src/app/ebook/EbookForm.tsx:67,84,91,96,101,102`: Formulário de lead magnet em `/ebook/` está em Português (*"⚡ 100% Grátis"*, *"Baixe o Ebook Agora"*, *"Preencha os dados e receba o link para download instantâneo"*).
   - `src/app/consultoria/page.tsx` e `src/app/consultoria/layout.tsx`: Página inteira de vendas em Português, com `<link rel="canonical" href="https://dcprosens.com/consultoria/">` e incluída no `sitemap.xml`!
2. **82 Páginas com `<title>` Acima do Limite (>65 caracteres) e 42 com `<meta description>` Longa (>165 caracteres):**
   - Exemplos reais no HTML compilado (`out/`):
     - `/vip-overhaul/`: 84 chars (`DCPROSENS 360° VIP Overhaul | 1:1 Latency & Sensitivity Consultation | DCPROSENS`) — duplica `| DCPROSENS` por causa do `template` em `layout.tsx:19`.
     - `/mousepad-chart/`: 79 chars (`Mousepad Speed & Friction Chart (2026) — Interactive Comparison | DCPROSENS`).
     - `/dpi/`: 78 chars (`What is a DPI Setting? DPI Calculator & Mouse DPI Guide (2026) | DCPROSENS`).
     - `/psa-calculator/`: 76 chars.
3. **36 Páginas com `<meta description>` Curta (<100 caracteres):**
   - Perfis em `/pros/[slug]/` (ex: `/pros/zywoo/` tem 96 chars) e páginas `/sens-finder/[game]/` (ex: `/sens-finder/peak/` tem 96 chars).
4. **Canonical Incorreta em `/ebooks/download/` (`src/app/ebooks/download/layout.tsx`):**
   - Aponta a canonical para `https://dcprosens.com/ebooks/` em vez da própria URL (embora esteja `noindex`).
5. **Ausência de `<h1>` no HTML Estático de `/dashboard/`:**
   - Como `src/app/dashboard/page.tsx:313-320` retorna apenas `<p>Carregando painel...</p>` durante o SSR/build antes da hidratação do Firebase Auth, o HTML exportado em `out/dashboard/index.html` tem `0` tags `<h1>`.
6. **URLs de `openGraph.url` sem Barra Final:**
   - Em `src/app/layout.tsx:57`, `src/app/page.tsx:98`, `src/app/about/page.tsx:21`, `src/app/contact/page.tsx:18` e `src/app/blog/[slug]/page.tsx:104`, o `openGraph.url` é declarado sem trailing slash, divergindo da tag `<link rel="canonical">`.

#### Como melhorar (Solução Técnica Exata):
- Traduzir imediatamente `src/lib/affiliates.ts`, `src/app/blog/[slug]/page.tsx:416-535`, `src/components/CpsTest.tsx:124`, `src/components/ReactionTimeTest.tsx:85-131` e `src/app/ebook/EbookForm.tsx` para inglês nativo.
- Remover `src/app/consultoria/` (já que `public/.htaccess:136` já redireciona `RewriteRule ^consultoria/?$ /vip-overhaul/ [L,R=301]`, manter a pasta `src/app/consultoria/` faz com que a regra `RewriteCond %{REQUEST_FILENAME} -d` na linha 70 do `.htaccess` **impeça o redirect 301 de acontecer**, servindo a página em português!).
- Remover o sufixo manual `| DCPROSENS` nos `title` das páginas filhas (pois o `RootLayout` já aplica `template: "%s | DCPROSENS"`).

---

### PILAR 2: Sitemap.xml, Robots.txt & Ads.txt
**Nota: 8.2 / 10** — 🟢 *Bom*

#### O que está implementado hoje:
- **`public/robots.txt`:** Acessível em `https://dcprosens.com/robots.txt` (HTTP 200), bloqueia `/api/` e `/adsterra/`, mantém `/login`, `/dashboard` e `/embed` abertos para leitura da meta tag `noindex`, e libera explicitamente `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `Bytespider`. Declara os 5 sitemaps no rodapé.
- **`scripts/generate-sitemaps.mjs`:** Excelente arquitetura que lê o diretório compilado `out/`, extrai a tag `<link rel="canonical">` real de cada página, ignora páginas com `noindex` e gera `sitemap.xml` (662 URLs), `image-sitemap.xml`, `news-sitemap.xml`, `sitemap-webstories.xml` e `sitemap-index.xml`.
- **`public/ads.txt`:** Acessível na raiz (`https://dcprosens.com/ads.txt`, HTTP 200) contendo `google.com, pub-1743865545749571, DIRECT, f08c47fec0942fa0`.

#### Falhas, Riscos e O que está faltando:
1. **Falta permissão explícita para `Mediapartners-Google` e `Googlebot` no `public/robots.txt`:**
   - Embora `User-agent: *` permita `/`, o crawler do Google AdSense (`Mediapartners-Google`) e o `AdsBot-Google` devem ter regras explícitas `Allow: /` para evitar falhas de verificação de anúncios.
2. **URLs Indevidas no `sitemap.xml` (662 URLs):**
   - Inclui `https://dcprosens.com/consultoria/` (página em português que deveria ser 301 para `/vip-overhaul/`).
   - Inclui `https://dcprosens.com/widget/` (que possui um bloqueio de login para não-logados).
3. **Violação das Diretrizes do Google News em `scripts/generate-sitemaps.mjs:165-170`:**
   - Quando não há artigos publicados nas últimas 48h (`newsDays = 2`), o script faz fallback para os 15 artigos mais recentes (`Oct 19, 2026`), mesmo que tenham mais de 2 dias. A documentação oficial do Google News Sitemap proíbe URLs com mais de 48 horas no `news-sitemap.xml` (inclusive o comentário nas linhas 221-226 do próprio script diz que deixaria vazio, mas o código nas linhas 165-170 força 15 artigos antigos).
4. **Datas `<lastmod>` baseadas em `mtime` do build para páginas sem JSON-LD (`scripts/generate-sitemaps.mjs:96`):**
   - Como `next build` recria os arquivos em `out/`, 200 páginas estáticas recebem a data do último build (`2026-10-21`) como `<lastmod>`, mesmo sem alteração de conteúdo.

#### Como melhorar (Solução Técnica Exata):
Adicionar ao `public/robots.txt`:
```txt
User-agent: Googlebot
Allow: /

User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /
```
E em `scripts/generate-sitemaps.mjs:165-170`, remover o fallback de 15 artigos antigos quando `news.length === 0`.

---

### PILAR 3: GEO (Generative Engine Optimization) & AEO (Answer Engine Optimization)
**Nota: 7.8 / 10** — 🟢 *Bom*

#### O que está implementado hoje:
- **Renderização 100% SSR/SSG no HTML Inicial:** Crawlers de IA que não executam JS (como `ClaudeBot`, `PerplexityBot` e `OAI-SearchBot`) recebem todo o conteúdo textual, tabelas e FAQs diretamente no HTML inicial (ex: `home.html` entrega 3.091 palavras; posts entregam o artigo completo + JSON-LD).
- **Formatação Answer-First (`src/app/blog/[slug]/page.tsx:305-328`):** 345 dos 446 artigos possuem o campo `summary` renderizado em destaque como caixa **TL;DR** logo abaixo do cabeçalho, perfeito para captura de *Featured Snippets* e *AI Overviews*.
- **Alta Densidade de Tabelas e FAQs:** 326 de 446 artigos (73%) possuem tabelas HTML `<table>` reais e 436 de 446 (97,7%) possuem seção de Perguntas e Respostas (`<details><summary>`) acoplada ao schema `FAQPage`.
- **Fórmulas Matemáticas Transparentes:** Explicação clara de `cm/360 = (360 × 2.54) ÷ (yaw × sensitivity × DPI)` na Home, na página `/about/` e nos conversores.

#### Falhas, Riscos e O que está faltando:
1. **Poluição de Entidades com Dados Especulativos/Fictícios:**
   - LLMs penalizam fontes que misturam fatos verificados com alucinações ou dados inventados sobre produtos ainda não lançados. O blog contém 305 menções a `GTA 6`, 106 menções a `MW4` (incluindo guia de sensibilidade do mapa "Zodiac" do beta de MW4: `mw4-beta-zodiac-map-sensitivity-guide`), 45 menções a `Apex Legends Season 30` e 61 menções a `Fortnite Chapter 7`.
2. **101 Artigos sem Resumo `TL;DR` (`post.summary`):**
   - Dos 446 posts, 101 não possuem o atributo `summary`, perdendo o bloco Answer-First no topo.
3. **Páginas de Ferramentas SaaS com Pouco Contexto Answer-First Acima da Dobra:**
   - Ferramentas como `/cps-test/`, `/reaction-time-test/` e `/bind-generator/` poderiam entregar uma tabela de referência rápida (ex: percentis de tempo de reação em ms de jogadores Pro vs Média) logo abaixo da ferramenta.

#### Como melhorar (Solução Técnica Exata):
- Marcar claramente conteúdos de jogos futuros (como GTA VI) como *"Pre-Release Projection / Estimated Engine Analysis"* ou despublicar artigos que inventam patches/mapas inexistentes (`MW4 Beta`, `Apex Season 30`).
- Preencher o campo `summary` (40–55 palavras) nos 101 artigos restantes.

---

### PILAR 4: Ecossistema `llms.txt` e `llms-full.txt`
**Nota: 8.8 / 10** — 🟢 *Excelente*

#### O que está implementado hoje:
- **`public/llms.txt` (12,5 KB):** Existe na raiz, segue o padrão `llmstxt.org` (`# DCPROSENS - Gaming Sensitivity Converter and FPS Tools`, `> https://dcprosens.com`, seções `## What DCPROSENS Does`, `## Key Interactive Tools`, `## Esports Technical Field Guides`, tabela de yaw dos principais jogos e links diretos).
- **`public/llms-full.txt` (39 KB):** Existe na raiz com o dataset completo dos 87 jogos (`id`, `yaw`, `engine`, `category`, `page`, `notes`).
- **`public/llms.json` (15,7 KB) e `public/ai.txt` (613 B):** Existem na raiz e são referenciados no `robots.txt`.

#### Falhas, Riscos e O que está faltando:
1. **Inconsistência Interna de Dados no `public/llms.txt`:**
   - Na linha 3 e 22 de `public/llms.txt`, afirma-se que existem **18 Field Guides**, mas na seção `## Esports Technical Field Guides (2026 Editions)` (linhas 39–48) diz `"Master Suite Bundle (All 6 Volumes)"` e lista apenas 6 volumes com slugs antigos (`/ebooks/the-architect-of-precision/`, `/ebooks/crosshair-placement-angle-control/`, etc.) que divergem do catálogo atual de 18 volumes em `src/data/ebooksData.ts`.
2. **URLs sem Barra Final em `llms.txt` e `llms-full.txt`:**
   - Links como `https://dcprosens.com/sens-finder/valorant` sofrem redirect 301 para `https://dcprosens.com/sens-finder/valorant/`. Agentes de IA têm limite estrito de redirects ao fazer fetch.

#### Como melhorar (Solução Técnica Exata):
- Atualizar `public/llms.txt` (linhas 39–48) para refletir os 18 volumes reais de `src/data/ebooksData.ts` e adicionar barra final (`/`) em todas as URLs listadas em `public/llms.txt` e `public/llms-full.txt`.

---

### PILAR 5: Schema Markup / Dados Estruturados (JSON-LD)
**Nota: 7.5 / 10** — 🟢 *Bom*

#### O que está implementado hoje:
- **Componente Centralizado (`src/components/JsonLd.tsx`):** Garante `type="application/ld+json"` válido e helpers padronizados para `BreadcrumbList`, `CollectionPage`, `WebPage` e `HowTo`.
- **Home (`src/app/page.tsx:104-171`):** Implementa `@graph` com `SoftwareApplication`, `FAQPage`, `WebSite` e `Organization` (com `sameAs` reais para X, TikTok, Chrome Web Store e Play Store). Não usa `SearchAction` falso nem `aggregateRating` inventado.
- **Blog Posts (`src/app/blog/[slug]/page.tsx:149-252`):** Implementa `Article`, `Person` (autor `Dalto Outlier` com link para `/about/`), `Organization`, `ImageObject`, `SpeakableSpecification`, `BreadcrumbList` e `FAQPage` condicional.

#### Falhas, Riscos e O que está faltando:
1. **Logo do Publisher Quebrada (404) em TODOS os 446 Artigos do Blog (`src/app/blog/[slug]/page.tsx:182`):**
   - O schema `Article -> publisher -> logo` aponta para `https://dcprosens.com/logo.png` (`width: 200, height: 60`), mas o arquivo `/logo.png` **não existe** em `public/` (apenas `/logo.webp` e `/og-image.png`). Isso invalida a imagem do `Organization` no Rich Results Test em 446 páginas.
2. **Item 1 do `BreadcrumbList` nos Posts sem Barra Final (`src/app/blog/[slug]/page.tsx:232`):**
   - Usa `item: 'https://dcprosens.com'` enquanto `src/components/JsonLd.tsx:31` usa `'https://dcprosens.com/'`.
3. **Datas Não-ISO no JSON-LD da Listagem `/blog/` (`out/blog/index.html`):**
   - Na página `/blog/`, o schema `BlogPosting` emite `"datePublished": "Oct 19, 2026"` em texto humano em vez de formato ISO 8601 (`2026-10-19T03:00:00.000Z`), gerando aviso de validação no Schema.org/Google Search Console.
4. **Rotas Comerciais sem JSON-LD:**
   - `/pricing/`, `/vip-overhaul/`, `/community/`, `/deals/`, `/privacy/` e `/terms/` não possuem nenhum bloco JSON-LD (`WebPage`, `BreadcrumbList` ou `OfferCatalog`/`Service`).

#### Como melhorar (Solução Técnica Exata):
Em `src/app/blog/[slug]/page.tsx:180-185`, corrigir a URL da logo do publisher:
```tsx
logo: {
    '@type': 'ImageObject',
    url: 'https://dcprosens.com/logo.webp',
    width: 512,
    height: 512,
},
```
E converter `post.date` para `new Date(post.date).toISOString()` no schema de `src/app/blog/page.tsx`.

---

### PILAR 6: Qualidade de Código, Arquitetura, Performance & Core Web Vitals
**Nota: 6.2 / 10** — 🟡 *Atenção*

#### O que está implementado hoje:
- **Fontes Otimizadas (`src/app/layout.tsx:8-13`):** Usa `next/font/google` (`Outfit`) com `display: "swap"`, eliminando FOIT e reduzindo CLS de fonte.
- **Carregamento Diferido de Analytics (`src/components/AnalyticsLoader.tsx:9-45`):** O GTM (`GTM-PLJ3LS29`) e GA4 (`G-Y4EJZ062FD`) só carregam após interação do usuário ou fallback de 3.5s, protegendo o TBT e o INP inicial.
- **Headers de Segurança em Produção (`public/.htaccess:24-38`):** HSTS (`max-age=63072000; includeSubDomains; preload`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy` e CSP configurados.
- **Segredos de Backend Fora do Web Root (`public/api/lib/secrets.php:33`):** Carrega `../dcprosens-secrets.php` um nível acima de `public_html` e bloqueia acesso direto a `/api/lib/` via `.htaccess:55` (confirmado retornando HTTP **403 Forbidden** em produção).

#### Falhas, Riscos e O que está faltando:
1. **HTML Monolítico de 1,19 MB e Payload Gigante na Página `/blog/`:**
   - A rota `https://dcprosens.com/blog/` renderiza **todos os 446 cards de artigos de uma só vez** no DOM, gerando um documento HTML de **1.198.423 bytes (1,19 MB)** com 446 tags `<h2>` e um chunk JS de **568 KB** (`out/_next/static/chunks/0mo2yi4w_8sxe.js`). Isso degrada severamente o LCP, o TBT e a memória em celulares intermediários.
2. **Chaves Públicas de Produção Hardcoded como Fallback no Código-Fonte:**
   - `src/components/TransparentCheckoutModal.tsx:47`: Contém a chave `pk_live_51Ttt...` hardcoded diretamente no código.
   - `src/lib/firebase.ts:7`: Contém a chave `AIzaSyCL...` hardcoded como fallback.
3. **Arquivos Órfãos do Adsterra Ainda Expostos em `public/adsterra/` e no CSP:**
   - Embora `AdsterraScripts.tsx` tenha sido desativado, os diretórios de iframes de anúncios da Adsterra e os domínios `profitableratecpmnetwork.com`, `highrevenueformat.com`, `effectivecpmnetwork.com` continuam declarados na política CSP (`public/.htaccess:38`). Domínios de adware/popunder na CSP são um sinal negativo em revisões de segurança.
4. **20 chamadas `console.log`/`console.error` em Produção:**
   - Espalhadas em componentes de cliente (inclusive mensagens de erro em português em `src/app/dashboard/page.tsx:220,252,279,291,309`).

#### Como melhorar (Solução Técnica Exata):
- Implementar paginação estática ou renderização inicial de 24 artigos com paginação client-side leve em `src/app/blog/page.tsx`, enviando para o cliente apenas `{ slug, title, excerpt, date, readTime, category, image }` (sem importar os corpos HTML de 4,7 MB de `src/lib/posts-data/`).

---

### PILAR 7: Layout, UI/UX, Conversão & Harmonia com Anúncios
**Nota: 6.4 / 10** — 🟡 *Atenção*

#### O que está implementado hoje:
- **Zero CLS nos Slots de Parcerias (`src/components/PartnerBanner.tsx:133-144, 232-241`):** Os banners internos (`/deals` e `/advertise`) têm `aspectRatio: '728 / 90'` e dimensões fixas (`300x250`, `160x600`), evitando deslocamento cumulativo de layout (CLS).
- **Fluxo de Valor Rápido na Home:** O conversor de sensibilidade principal está visível logo na primeira dobra e funciona sem exigir cadastro.
- **Acessibilidade Básica (`src/components/SiteChrome.tsx:25-27`):** Possui link `Skip to content` e navegação responsiva (`Navbar.tsx` + `BottomNav.tsx`).

#### Falhas, Riscos e O que está faltando:
1. **Quatro Tabelas de Preços Contraditórias na Interface (Destrói a Confiança e a Conversão):**
   - **Home (`src/app/page.tsx:545`):** *"Plans start at just $3.90/month."*
   - **Dashboard (`src/app/dashboard/page.tsx:399,405,411`):** *"Monthly Plan - $4.99/mo"*, *"Annual Plan - $3.33/mo ($39.99/yr)"*, *"Lifetime - $149 once"*.
   - **Modal do Stripe (`src/components/StripeCheckoutModal.tsx:173`):** Exibe badge *"Annual (Save 33%)"*, enquanto a página `/pricing/` (`linha 170`) exibe *"Save 49%"*.
   - **Página `/pricing/` e Backend Stripe (`create-checkout-session.php:185-199`):** Cobram **$7.99/mês**, **$49.00/ano ($4.08/mês)** e **$129 Lifetime**.
   - Quando o usuário logado no Dashboard clica no botão `"👑 Monthly Plan - $4.99/mo"`, o modal do Stripe abre cobrando **$7.99/mo**!
2. **Contradição de Trial na Navbar vs Home para o Sensitivity Test:**
   - Na Home (`src/app/page.tsx:261`) o botão diz: `🕹️ Sensitivity Test (2 Free Trials)`.
   - Na Navbar (`src/components/Navbar.tsx:83,298`) o badge diz: `3 TRIALS`.
3. **Contradição de Gating de Ferramentas na Home (`src/app/page.tsx:388-496`):**
   - A seção *"Unlock Advanced Calibration (PREMIUM TOOLS PREVIEW)"* na Home coloca cards trancados com botão `"Unlock This Tool → /pricing/"` para o **PSA Method Calculator** e o **Crosshair Generator**, mas ambas as ferramentas estão **100% abertas e gratuitas** no menu principal (`/psa-calculator/` e `/crosshair/`).
4. **"Live Activity Feed" Simulado/Falso no Topo da Home (`src/components/HomeAnimations.tsx:48-90`):**
   - Um ticker com ponto verde piscante mostra conversões falsas hardcoded em loop a cada 3,5 segundos (`Valorant → CS2 (0.3 → 0.954) 🇺🇸 2s ago`, `Apex → Valorant 🇧🇷 5s ago`). Usuários técnicos de PC/FPS percebem imediatamente que os números se repetem a cada 28 segundos, prejudicando a credibilidade que a página `/about/` tenta construir.
5. **Links Quebrados (404) para Assinantes Pagantes no Dashboard (`src/app/dashboard/page.tsx:593,610`):**
   - Os botões de download para usuários Premium apontam para `/downloads/dcprosens-extension.zip` e `/downloads/dcprosens.apk` (arquivos inexistentes) em vez dos links oficiais da Chrome Web Store e Google Play Store usados no `Footer.tsx:69,89`.

#### Como melhorar (Solução Técnica Exata):
- Unificar todos os preços em uma constante única importada por `page.tsx`, `pricing/page.tsx`, `dashboard/page.tsx` e `StripeCheckoutModal.tsx`.
- Remover o `LiveActivityFeed` falso da Home ou substituí-lo por um atalho das conversões mais populares (`/convert/valorant-to-cs2/`, etc.).
- Apontar os botões de Chrome Extension e Android App no Dashboard para as lojas oficiais (Chrome Web Store e Google Play).

---

### PILAR 8: Auditoria de Pagamentos & Integração Stripe
**Nota: 5.2 / 10** — 🔴 *Crítico*

#### O que está implementado hoje:
- **Segurança de Chaves e Origem (`public/api/create-checkout-session.php:9-15, 203`):** `STRIPE_SECRET_KEY` e `STRIPE_WEBHOOK_SECRET` ficam restritas ao servidor PHP (`../dcprosens-secrets.php`). O endpoint valida `Origin` e aplica rate limit (`15 req / 10 min`).
- **Autenticação de UID Real (`public/api/create-checkout-session.php:41` e `public/api/lib/firebase-auth.php`):** O backend valida criptograficamente o JWT do Firebase (`RS256` contra os certificados públicos do Google) para extrair o `userId`, impedindo que um atacante atribua pagamentos ou scores a outra conta.
- **Verificação de Assinatura do Webhook (`public/api/stripe-webhook.php:41-69`):** Lê o raw body (`php://input`), verifica tolerância de replay de 300 segundos e valida o `hash_hmac('sha256', ...)` com `hash_equals`.
- **Proteção contra Escalação de Privilégio no Cliente (`firestore.rules:19-21`):** As regras do Firestore garantem que o cliente só pode atualizar `['savedSettings', 'savedProfiles', 'aimLabHistory', 'displayName']`. O campo `subscriptionStatus` só pode ser alterado pela Service Account via `stripe-webhook.php`.

#### Falhas Críticas, Riscos e O que está faltando:
1. **[CRÍTICO — P0] Todos os Produtos Digitais Pagos Estão Acessíveis Gratuitamente sem Pagamento:**
   - **Falha 1:** Todos os 18 PDFs vendidos individualmente por $14.99 e o Master Omnibus de $39.99 estão salvos diretamente na pasta pública `public/ebooks/*.pdf` (ex: `https://dcprosens.com/ebooks/DCPROSENS_Complete_18_Volume_Esports_Field_Guides_Omnibus.pdf`).
   - **Falha 2:** O software `DCPROSENS-Optimizer-Engine-v1.0.zip` (vendido no pacote de $97) está aberto em `https://dcprosens.com/downloads/DCPROSENS-Optimizer-Engine-v1.0.zip`.
   - **Falha 3:** A página de retorno pós-compra `src/app/ebooks/download/page.tsx:8-160` **ignora completamente o parâmetro `session_id`**, não consulta a API do Stripe para saber se o pagamento ocorreu, e exibe no topo o botão para baixar o **Master Omnibus completo de 18 volumes ($39.99)** e todos os 18 livros mesmo que o usuário tenha comprado apenas 1 volume de $14.99 (ou tenha apenas digitado `/ebooks/download/` no navegador)!
2. **[ALTO] Assinatura Guest Checkout Não Concede Acesso a Ninguém:**
   - Em `public/api/create-checkout-session.php:60-65`, se um visitante **não logado** clicar em assinar Monthly ($7.99), Annual ($49) ou Lifetime ($129) em `/pricing/`, o PHP cria a sessão no Stripe **sem `userId`** (`$userId === ''`). O cliente paga o cartão no Stripe, o webhook `public/api/stripe-webhook.php:104-106` recebe o evento, vê `if (!$userId || !$plan) { break; }` e **descarta o pagamento sem liberar acesso a nenhuma conta!**
3. **[ALTO] Ausência de Tratamento de `invoice.payment_failed` e Ausência de Idempotência no Webhook:**
   - `public/api/stripe-webhook.php:98-161` trata apenas `checkout.session.completed`, `customer.subscription.updated` e `customer.subscription.deleted`. Não registra `event['id']` processados (idempotência) e não dispara e-mail/alerta em `invoice.payment_failed`.
4. **[MÉDIO] Retorno de Compra de `vip-overhaul` Redireciona para `/consultoria` em Português:**
   - Em `public/api/create-checkout-session.php:213-214`:
     ```php
     } elseif ($plan === 'consultoria' || $plan === 'vip-overhaul') {
         $returnUrl = $origin . '/consultoria?payment=success&session_id={CHECKOUT_SESSION_ID}';
     ```
     Um cliente americano que compra o `VIP Overhaul ($97)` na página em inglês `/vip-overhaul/` é jogado após o pagamento para `/consultoria?payment=success...`, que está 100% em Português!
5. **[MÉDIO] Stripe Customer Portal Estático:**
   - Não há endpoint `create-portal-session.php`; o Dashboard usa um link estático `NEXT_PUBLIC_STRIPE_PORTAL_LINK` (`src/app/dashboard/page.tsx:327`).

#### Como melhorar (Solução Técnica Exata):
1. **Bloquear login obrigatório antes de planos atrelados a conta (`monthly`, `annual`, `lifetime`, `aimlab`)** em `create-checkout-session.php:60`:
   ```php
   $accountRequiredPlans = ['monthly', 'annual', 'lifetime', 'aimlab'];
   if (in_array($plan, $accountRequiredPlans, true) && $userId === '') {
       http_response_code(401);
       echo json_encode(['error' => 'Please log in or create a free account before subscribing so we can activate your access immediately.']);
       exit();
   }
   ```
2. **Mover os PDFs pagos e o `.zip` para fora de `public/`** e criar um endpoint `public/api/download-ebook.php?session_id=cs_live_...&vol=...` que verifica no Stripe (`GET https://api.stripe.com/v1/checkout/sessions/{id}`) se `payment_status === 'paid'` e se `metadata[plan]` corresponde ao livro solicitado antes de fazer `readfile()` do PDF.
3. **Corrigir a `$returnUrl` de `vip-overhaul`** em `create-checkout-session.php:213-214` para `/vip-overhaul/?payment=success&session_id={CHECKOUT_SESSION_ID}`.

---

### PILAR 9: O que o Google Search Aprova (Helpful Content, E-E-A-T & Competitividade no Mercado em Inglês)
**Nota: 5.0 / 10** — 🔴 *Crítico*

#### O que está implementado hoje:
- **Sinais Fortes de E-E-A-T na Página `/about/` e nas Ferramentas:** A página `src/app/about/page.tsx` é excelente: identifica claramente o autor (`Dalto Outlier`), mostra a fórmula matemática exata, explica como cada constante `yaw` é auditada, marca jogos não confirmados como `unverified` e declara como o site é monetizado.
- **Utilidade Interativa Real (*Dwell Time* alto):** O conversor principal, o *PSA Method Calculator*, o *DPI Analyzer*, o *3D Aim Trainer* e o *Refresh Rate Simulator* entregam valor prático imediato que retém o usuário na página.

#### Falhas Críticas, Riscos e O que está faltando:
1. **[CRÍTICO] Padrão Clássico de *Scaled Content Abuse* e *Thin Content* no Blog:**
   - **Volume inflado com artigos curtos:** Dos 446 artigos em `src/lib/posts-data/chunk-01.ts` a `chunk-59.ts`:
     - **98 artigos (22,0%) têm menos de 500 palavras** (alguns com apenas 185 a 350 palavras!).
     - **186 artigos (41,7%) têm entre 500 e 799 palavras**.
     - Apenas **162 artigos (36,3%) atingem 800+ palavras** (e apenas 75 passam de 1.200 palavras).
   - **Datas de publicação em lotes artificiais (Velocity Spike):**
     - `Oct 19, 2026`: **116 artigos publicados no mesmo dia**.
     - `Aug 23, 2026`: **81 artigos publicados no mesmo dia**.
     - `Aug 25, 2026`: **50 artigos publicados no mesmo dia**.
     - `Oct 18, 2026`: **50 artigos publicados no mesmo dia**.
     - `Oct 12, 2026`: **30 artigos publicados no mesmo dia**.
     - Publicar 327 artigos em apenas 5 datas cria uma assinatura inconfundível de geração em massa automatizada para os sistemas anti-spam do Google (*March 2024 Core Update / Scaled Content Abuse*).
2. **[CRÍTICO] Artigos e Produtos Sobre Jogos/Temporadas Inexistentes (Quebra de *Trustworthiness*):**
   - O site afirma na página `/about/` (`linha 138`): *"a converter that silently guesses is worse than no converter"*. No entanto, o blog e a loja de eBooks contêm dezenas de peças tratando como fatos consumados jogos ou temporadas que não existem ou não foram lançados para PC:
     - `mw4-beta-zodiac-map-sensitivity-guide` e `Vol 05: MW4 Warzone & Apex Tracking Field Guide` (106 menções a MW4).
     - `gta-vi-aim-settings-pc` e `Vol 02: GTA VI Pro Aim & Controller Field Guide` (305 menções a GTA 6 / GTA VI, dando configurações exatas de mira como se já houvesse versão PC testada).
     - `Vol 08: Apex Legends Season 30 ALC` (45 menções a Season 30).
     - `Vol 13: Fortnite Chapter 7 Targeting Scope` (61 menções a Chapter 7).
     - `Vol 11: Marvel Rivals Season 9.5`.
   - Para um avaliador humano do Google (*Search Quality Rater*) ou do AdSense, encontrar guias técnicos detalhando configurações de *"Apex Legends Season 30"* ou *"MW4 Beta Zodiac Map"* destrói instantaneamente o pilar **T (Trust)** do E-E-A-T.
3. **Repetição de Jargões de IA:**
   - Expressões como `"muscle memory"` aparecem **442 vezes** nos chunks do blog; `"sweet spot"` aparece 32 vezes; `"fast-paced"` 22 vezes; `"seamless"` 13 vezes.

#### Como melhorar (Solução Técnica Exata):
- **Podar ou consolidar os 98 artigos com menos de 500 palavras:** Unir artigos curtos redundantes em guias definitivos de 1.200+ palavras (com redirect 301 dos slugs antigos no `.htaccess`) ou aplicar `noindex` / expandir os que têm menos de 800 palavras.
- **Sanitizar imediatamente todas as referências especulativas (`MW4`, `Season 30`, `Chapter 7`, `Season 9.5`, `GTA VI PC`):** Ajustar os títulos e textos para o estado real atual dos jogos (ex: *Call of Duty: Black Ops 6 / Warzone*, *Apex Legends current season*, *Fortnite current chapter*, e deixar explícito que *GTA VI* é uma projeção baseada na engine RAGE / Red Dead Redemption 2 & GTA V).
- **Distribuir de forma realista e orgânica as datas de publicação (`date`)** e manter `updated` apenas quando houver revisão real.

---

### PILAR 10: Prontidão para Aprovação no Google AdSense (Simulação Oficial de Revisão)
**Nota: 3.8 / 10** — 🔴 *Crítico (Reprovação Garantida no Estado Atual)*

#### Checklist Rigoroso de Revisão Oficial do AdSense:

| Requisito Oficial do Google AdSense | Estado Atual no Repositório | Status |
| :--- | :--- | :---: |
| **1. `Privacy Policy` com menção explícita a Google AdSense, Cookie DART e link de Opt-Out (`adssettings.google.com`)** | `src/app/privacy/page.tsx` menciona apenas Google Analytics e Amazon Associates. **Zero menções a Google AdSense, DoubleClick DART cookie ou Ads Settings opt-out.** | ❌ **FALHA CRÍTICA** |
| **2. `Cookie Consent Banner (CMP)` compatível com GDPR / Google Consent Mode v2** | **Inexistente.** Nenhum banner de consentimento de cookies ou chamada `gtag('consent', 'default', ...)` no código. | ❌ **FALHA CRÍTICA** |
| **3. `Terms of Service` completo e específico para SaaS/Pagamentos** | `src/app/terms/page.tsx` é um template genérico de 1990 (*"Permission is granted to temporarily download one copy..."*) que **não menciona assinaturas Stripe, cobrança recorrente, trial de 3 dias, conta de usuário nem produtos digitais**. | ❌ **FALHA GRAVE** |
| **4. `Refund / Cancellation Policy` clara** | Não existe página `/refund/` nem cláusula de reembolso/cancelamento em `/terms/`. O modal de checkout promete `"7-Day Money-Back Guarantee"` (`TransparentCheckoutModal.tsx:404`), enquanto `/vip-overhaul/` e `/consultoria/` prometem outra garantia, sem termos formais. | ❌ **FALHA GRAVE** |
| **5. `About Us` e `Contact Us` autênticos e funcionais** | `/about/` (`src/app/about/page.tsx`) e `/contact/` (`src/app/contact/page.tsx` com `AskCoachForm` e `support@dcprosens.com`) estão excelentes. | ✅ **APROVADO** |
| **6. Consistência de Idioma (100% Inglês)** | Páginas e componentes inteiros em **Português** (`/consultoria/`, `/ebook/`, `/cps-test/`, `/reaction-time-test/` e blocos de afiliados da Amazon em `/blog/[slug]/`). | ❌ **FALHA CRÍTICA** |
| **7. Ausência de *Thin Content* / *Scaled Content Abuse*** | 284 artigos com <800 palavras (98 com <500 palavras) + 327 artigos com datas em lote + artigos sobre *MW4* e *Apex Season 30*. | ❌ **FALHA CRÍTICA** |
| **8. Higiene de Navegação e Links Funcionais** | Links de download `.zip` e `.apk` quebrados (404) no Dashboard; logo do publisher quebrada (`/logo.png` 404). | ⚠️ **ATENÇÃO** |

#### Como melhorar (Solução Técnica Exata para Aprovar no AdSense):
1. **Atualizar `src/app/privacy/page.tsx`** adicionando a seção obrigatória de Publicidade e Cookies de Terceiros do Google AdSense:
   ```tsx
   <h2 style={h2Style}>4. Advertising &amp; Google AdSense (DoubleClick DART Cookie)</h2>
   <p>
       We use third-party advertising companies, including <strong>Google AdSense</strong>, to serve ads when you visit DCPROSENS.
       Google, as a third-party vendor, uses cookies (including the <strong>DoubleClick DART cookie</strong>) to serve ads to our users based on their visit to https://dcprosens.com and other sites on the Internet.
   </p>
   <p>
       Users may opt out of the use of the DART cookie for personalized advertising by visiting the{' '}
       <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
           Google Ads Settings
       </a>{' '}
       page or by visiting{' '}
       <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
           www.aboutads.info/choices
       </a>. For more information on how Google uses data when you use our site, please visit{' '}
       <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
           How Google uses information from sites or apps that use our services
       </a>.
   </p>
   ```
2. **Atualizar `src/app/terms/page.tsx`** incluindo seções explícitas de:
   - *Subscriptions, Free Trials & Automatic Renewal (Stripe)*
   - *Digital Products (eBooks & Field Guides)*
   - *Refund & Cancellation Policy (7-Day Money-Back Guarantee & Anytime Cancellation)*
3. **Implementar Banner de Consentimento de Cookies (CMP) com Google Consent Mode v2** antes de reativar a tag do AdSense.

---

## 3. Plano de Ação Priorizado (Checklist de Execução)

### 🔴 FASE 1 — Bloqueadores Críticos (P0)
*Tudo que causa reprovação imediata no Google AdSense, perda financeira no Stripe ou quebra a experiência do usuário em inglês:*

- [ ] **P0.1 — Eliminar 100% dos textos em Português na interface pública (`<html lang="en">`):**
  - [ ] Traduzir `src/lib/affiliates.ts:10-46` (badges e descrições dos mouses e teclados da Amazon) para inglês.
  - [ ] Traduzir `src/app/blog/[slug]/page.tsx:416-472` e `488-535` (*"Equipamentos de Elite Recomendados"*, *"Ver Preço na Amazon"*, *"Teclado Analógico Recomendado"*) para inglês e remover os asteriscos Markdown crus `**Rapid Trigger**`.
  - [ ] Traduzir `src/components/CpsTest.tsx:124` (`"Clique para começar"` → `"Click to start"`).
  - [ ] Traduzir `src/components/ReactionTimeTest.tsx:85-131` (`"Clique para começar"`, `"CLIQUE AGORA!"`, `"Cedo demais!"`, `"Melhor"` → inglês).
  - [ ] Traduzir `src/app/ebook/EbookForm.tsx:67-102` (`"⚡ 100% Grátis"`, `"Baixe o Ebook Agora"`, etc. → inglês).
  - [ ] Traduzir `src/app/dashboard/page.tsx:220,252,300,317` (`"Carregando painel..."` e mensagens de `alert()` → inglês).
  - [ ] Remover a rota duplicada em português `src/app/consultoria/` (deixando o redirect 301 em `public/.htaccess:136` enviar `/consultoria/` para `/vip-overhaul/`).
- [ ] **P0.2 — Fechar o vazamento de produtos pagos e corrigir o fluxo Stripe:**
  - [ ] Exigir autenticação (`userId !== ''`) em `public/api/create-checkout-session.php:60` para os planos `monthly`, `annual`, `lifetime` e `aimlab` (impedindo assinaturas órfãs sem conta vinculada).
  - [ ] Corrigir `$returnUrl` de `vip-overhaul` em `public/api/create-checkout-session.php:213-214` para `/vip-overhaul/?payment=success&session_id={CHECKOUT_SESSION_ID}`.
  - [ ] Proteger o download dos 18 PDFs e do `DCPROSENS-Optimizer-Engine-v1.0.zip` via endpoint PHP autenticado pelo `session_id` do Stripe (`payment_status === 'paid'`), e filtrar em `src/app/ebooks/download/page.tsx` apenas o volume efetivamente adquirido pelo comprador.
  - [ ] Adicionar idempotência por `event['id']` e tratamento de `invoice.payment_failed` em `public/api/stripe-webhook.php`.
- [ ] **P0.3 — Unificar preços em todo o site e consertar links 404 do Dashboard:**
  - [ ] Alinhar os preços exibidos em `src/app/page.tsx:545` (`$3.90/mo`), `src/app/dashboard/page.tsx:399-411` (`$4.99 / $39.99 / $149`), `public/api/welcome-email.php:87` (`$3.33/mo`) e `src/components/StripeCheckoutModal.tsx:173` com os preços reais cobrados em `/pricing/` e `create-checkout-session.php` (`$7.99/mo`, `$49.00/yr ($4.08/mo)`, `$129 Lifetime`).
  - [ ] Corrigir os botões de download da Chrome Extension e Android App em `src/app/dashboard/page.tsx:593,610` (que hoje apontam para `/downloads/dcprosens-extension.zip` e `/downloads/dcprosens.apk` inexistentes).
- [ ] **P0.4 — Compliance Obrigatório para Google AdSense:**
  - [ ] Atualizar `src/app/privacy/page.tsx` com cláusula explícita sobre **Google AdSense**, **DoubleClick DART cookie**, **Google Consent Mode** e links de opt-out (`adssettings.google.com`).
  - [ ] Atualizar `src/app/terms/page.tsx` com termos reais de assinatura SaaS, cobrança via Stripe, produtos digitais e **Política de Reembolso e Cancelamento (Refund & Cancellation Policy)**.
  - [ ] Implementar componente de **Cookie Consent Banner (CMP)** com suporte a Google Consent Mode v2 (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`).

---

### 🟡 FASE 2 — Alavancas de Tráfego: SEO, GEO, AEO & `llms.txt` (P1)
*Correções estruturais de indexação, Schema Markup, sitemaps e performance:*

- [ ] **P1.1 — Corrigir Schemas JSON-LD quebrados ou ausentes:**
  - [ ] Trocar `https://dcprosens.com/logo.png` (404) por `https://dcprosens.com/logo.webp` em `src/app/blog/[slug]/page.tsx:182`.
  - [ ] Converter `datePublished` no JSON-LD de `src/app/blog/page.tsx` para formato ISO 8601.
  - [ ] Adicionar JSON-LD (`WebPage` + `BreadcrumbList` + `OfferCatalog`) em `/pricing/`, `/vip-overhaul/`, `/deals/`, `/privacy/` e `/terms/`.
- [ ] **P1.2 — Otimizar `robots.txt`, Sitemaps e `llms.txt`:**
  - [ ] Adicionar `User-agent: Mediapartners-Google`, `User-agent: AdsBot-Google` e `User-agent: Googlebot` com `Allow: /` em `public/robots.txt`.
  - [ ] Remover o fallback de 15 artigos antigos em `scripts/generate-sitemaps.mjs:165-170` para cumprir a regra de 48h do Google News.
  - [ ] Atualizar `public/llms.txt` para listar os 18 volumes reais de Field Guides com URLs canônicas terminadas em `/`.
- [ ] **P1.3 — Otimizar `<title>`, `<meta description>` e Performance de `/blog/`:**
  - [ ] Ajustar os 82 títulos com >65 caracteres (removendo `| DCPROSENS` duplicado nas páginas filhas) e expandir as 36 descriptions curtas (<100 chars) em `/pros/[slug]/` e `/sens-finder/[game]/`.
  - [ ] Paginar ou limitar a renderização inicial de `src/app/blog/page.tsx` para reduzir o HTML de **1,19 MB** para menos de **150 KB**.
  - [ ] Remover chaves de fallback hardcoded de `src/components/TransparentCheckoutModal.tsx:47` e `src/lib/firebase.ts:7` e limpar a pasta legada `public/adsterra/` e domínios Adsterra da CSP em `public/.htaccess:38`.

---

### 🟢 FASE 3 — Conversão, UX, Conteúdo em Inglês & Escala (P2)
*Eliminação do risco de Scaled Content Abuse / Thin Content para aprovação definitiva no AdSense e ranking Tier 1:*

- [ ] **P2.1 — Auditoria e Consolidação dos 446 Artigos do Blog:**
  - [ ] Revisar/reescrever ou desindexar os artigos e eBooks que tratam jogos/temporadas não lançados como atuais (`MW4 Beta`, `Apex Season 30`, `Fortnite Chapter 7`, `Marvel Rivals Season 9.5`), ancorando-os na temporada real vigente de 2026.
  - [ ] Expandir ou consolidar os **98 artigos com menos de 500 palavras** (e os 186 entre 500–799 palavras) para que todo artigo indexado tenha no mínimo 900–1.200 palavras de engenharia real, tabelas de dados e testes práticos.
  - [ ] Adicionar `summary` (bloco TL;DR Answer-First) nos 101 artigos que ainda não o possuem.
  - [ ] Normalizar a distribuição de datas (`date`) para eliminar os picos artificiais de 116 e 81 artigos no mesmo dia.
- [ ] **P2.2 — Credibilidade e Conversão na Home:**
  - [ ] Remover o `LiveActivityFeed` falso/simulado (`src/components/HomeAnimations.tsx:48-90`) ou trocá-lo por atalhos reais de conversão.
  - [ ] Alinhar a seção *"Unlock Advanced Calibration"* na Home (`src/app/page.tsx:388-496`) para destacar apenas os recursos que são de fato exclusivos do plano Pro (Aim Lab Pro, Cloud Profile Sync, Daily Custom Routines, Pro Community Hub), sem dizer que ferramentas gratuitas (PSA Calculator e Crosshair Generator) são pagas.
  - [ ] Unificar o texto de limite gratuito do Sensitivity Test (`2 Free Trials` vs `3 TRIALS` entre `page.tsx:261`, `Navbar.tsx:83` e `sensitivity-test/page.tsx`).

