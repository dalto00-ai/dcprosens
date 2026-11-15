# DCPROSENS — Prompt de Varredura e Auditoria Completa

**Como usar este arquivo:** cole o conteúdo abaixo (a partir de "INÍCIO DO PROMPT") direto na outra IA, dando acesso ao repositório do projeto (`DCPROSENS/`) e, se possível, acesso de leitura ao site ao vivo (`https://dcprosens.com`). Esse documento NÃO deve ser executado por essa sessão — é só o texto do prompt, pronto pra copiar.

---

## INÍCIO DO PROMPT

Você vai fazer uma auditoria completa e uma varredura de ponta a ponta no projeto DCPROSENS (dcprosens.com) — um site Next.js de conversão de sensibilidade para jogos FPS, com ferramentas gratuitas/pagas, blog, banco de dados de gear, sistema de pagamento via Stripe e deploy manual (sem git) via Hostinger.

**Sua tarefa é auditar, não modificar.** Leia o código, teste o que puder ao vivo, e reporte tudo que encontrar — bugs, inconsistências, itens pendentes, promessas não cumpridas entre o que o código diz e o que está realmente no ar. Não faça deploy de nada sem autorização explícita do usuário, mesmo que encontre e corrija algo.

### Contexto técnico essencial

- **Stack:** Next.js 16 App Router, `output: "export"` (site 100% estático, sem servidor Node em produção — todo backend dinâmico é PHP separado).
- **Deploy:** manual via Hostinger MCP (`hosting_deployStaticWebsite`). NUNCA é feito via git/GitHub — o usuário não usa git para isso. O pipeline correto é: `npm run build` → zipar o conteúdo de `out/` (**incluindo o arquivo oculto `.htaccess`, que já foi esquecido uma vez e causou bugs sérios**) → deploy.
- **Pagamentos:** Stripe Embedded Checkout, com backend PHP em `public/api/` (`create-checkout-session.php`, `stripe-webhook.php`) usando um Firebase service account para escrever no Firestore.
- **Segredos:** carregados via `public/api/lib/secrets.php`, que lê um arquivo `dcprosens-secrets.php` localizado UM NÍVEL ACIMA de `public_html` no servidor (fora da pasta pública, sobrevive a deploys). **Esse arquivo nunca foi confirmado como criado pelo usuário no servidor real — isso é uma prioridade de verificação.**
- **Auth:** Firebase Auth + Firestore (client SDK grava só no próprio documento do usuário; qualquer coisa além disso passa pelo backend PHP).
- **Afiliados Amazon:** tag correta é `dcoutlier-20` (NÃO `dcprosens-20` — essa era uma tag errada que foi encontrada e corrigida ao longo do projeto, mas vale confirmar que não sobrou nenhuma ocorrência).

---

## ÁREA 1 — Pagamentos / Stripe (prioridade máxima)

1. Verifique se `dcprosens-secrets.php` existe no servidor (fora de `public_html`) e se os 6 valores necessários estão lá: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY_B64`, `HOSTINGER_MCP_TOKEN`. Se você não tiver acesso ao servidor pra verificar diretamente, teste indiretamente: tente completar um checkout real (modo teste, se possível) e veja se falha com erro de configuração.
2. Teste o fluxo de checkout ponta a ponta: abrir `/pricing`, clicar em qualquer plano, confirmar que o modal do Stripe abre sem erro "Failed to fetch".
3. Confirme que o CSP (`public/.htaccess`, diretiva `connect-src`) ainda inclui `https://dcprosens.com` E `https://app.dcprosens.com` — isso já quebrou o checkout uma vez porque o app Android/WebView carrega páginas a partir de `app.dcprosens.com` e chama a API em `dcprosens.com`, o que o navegador trata como cross-origin.
4. Confirme que o webhook (`stripe-webhook.php`) está configurado no dashboard do Stripe apontando pra URL certa em produção.
5. Teste o fluxo de compra avulsa do Aim Lab ($1, `aimLabAccess` no Firestore) separadamente da assinatura completa.
6. Confirme que `src/components/StripeCheckoutModal.tsx` usa a URL absoluta certa (`https://dcprosens.com/api/create-checkout-session.php`) e que isso não quebra em nenhum subdomínio.

## ÁREA 2 — SEO / GEO / AEO

1. Confirme ao vivo que `https://dcprosens.com/sitemap.xml`, `/sitemap-index.xml`, `/news-sitemap.xml`, `/image-sitemap.xml`, `/sitemap-webstories.xml` retornam 200 e têm contagens consistentes com `URLS_PARA_INDEXACAO.txt` (deve estar em ~271 URLs, 114 posts de blog, 79 fotos de produtos gear + 51 imagens de blog/marketing, 16 web stories).
2. Confirme que `robots.txt` libera explicitamente os bots de IA (`GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Bytespider`, `CCBot`) e referencia todos os sitemaps.
3. Confirme que `llms.txt` e `llms-full.txt` estão com números batendo com a realidade atual do site (contagem de artigos, contagem de produtos no gear database, lista de ferramentas).
4. Rode `npx amphtml-validator` (ou equivalente) contra as 15+ páginas de web stories (`/web-stories/[slug]/index.html`) — já tivemos um bug sério aqui (boilerplate AMP incompleto faltando o bloco `@-o-keyframes`) que impedia TODAS as stories de indexar. Confirme que continua passando.
5. Verifique o JSON-LD de qualquer artigo de blog (`view-source` ou inspecionar) — confirme presença de `NewsArticle`, `ImageObject` (com `creator`, `creditText`, `copyrightNotice` — foram adicionados recentemente pra resolver um aviso do Search Console), `BreadcrumbList`, e `FAQPage` quando o post tem FAQs.
6. Verifique se existe algum artigo novo criado que NÃO está no sitemap (checagem cruzada entre `src/lib/posts-data/*.ts` e `URLS_PARA_INDEXACAO.txt`).

## ÁREA 3 — Links de Afiliado

1. Rode uma busca por `dcprosens-20` em todo `src/` — deve retornar ZERO resultados. Se aparecer algo, é a tag errada que precisa virar `dcoutlier-20`.
2. Confirme que os links de afiliado usados em `src/lib/gearDatabase.ts`, `src/lib/mouseDatabase.ts`, `src/lib/affiliates.ts`, `src/app/setups/page.tsx`, `src/components/ProCompare.tsx` estão todos com `tag=dcoutlier-20`.
3. Muitos links foram trocados recentemente de links diretos (`amazon.com/dp/ASIN`) para links de busca (`amazon.com/s?k=...`) — isso foi uma decisão deliberada do usuário pra evitar problemas de verificação de ASIN errado. Não "corrija" isso de volta pra link direto sem perguntar.

## ÁREA 4 — Gear Database (`/gear`, `src/lib/gearDatabase.ts`)

1. **Cheque duplicatas de novo.** Ao longo do projeto encontramos e removemos 4 duplicatas reais (produtos com IDs diferentes mas que eram o mesmo item: SteelSeries Apex Pro TKL, Ducky One 3 Mini, Logitech G PRO X 2 Lightspeed, Razer BlackShark V2 Pro). O método de detecção simples por nome pode ter deixado passar mais alguma — rode uma comparação cruzada por marca+nome normalizado (removendo espaços/pontuação) em `keyboards`, `headsets`, `monitors`, `mousepads`.
2. Confirme que o banco tem 79 produtos únicos (29 teclados, 16 headsets, 15 monitores, 19 mousepads) e que cada um tem um campo `image` apontando pra um arquivo real em `public/gear/`.
3. Confirme que `proUsage` (pro players que usam cada produto) só contém nomes que foram genuinamente verificados — não deve ter nomes inventados ou copiados de um produto pra outro por engano.
4. Abra `https://dcprosens.com/gear` de verdade e confirme visualmente que as fotos aparecem certas pros produtos certos (é fácil uma foto ficar ligada ao produto errado num processo de mapeamento manual — isso já aconteceu e foi corrigido, mas vale conferir de novo com olhos frescos).

## ÁREA 5 — Blog (114 artigos)

1. Confirme que todos os 114 artigos em `src/lib/posts-data/chunk-01.ts` até `chunk-09.ts` estão sendo importados e espalhados corretamente em `src/lib/posts.ts`.
2. Confirme que não há slugs duplicados: `grep -ohE "slug: '[^']*'" src/lib/posts-data/*.ts | sort | uniq -d` deve retornar vazio.
3. **Problema de conteúdo conhecido e NÃO resolvido:** dos 94 artigos originais (antes dos 20 novos desta fase do projeto), 85 compartilhavam a mesma imagem entre si (fallback genérico por causa de poucas imagens reais disponíveis). Os 20 artigos mais recentes (8 comparações de mouse + 12 comparações de gear) têm imagem própria e verificada. Confirme se esse número de duplicação melhorou ou se ainda é um problema grande — pode valer a pena estimar quantos artigos ainda caem no fallback `perfect-sensitivity.webp`.
4. Confirme que todos os artigos têm 800+ palavras reais (sem contar HTML) — isso foi um padrão de qualidade seguido rigorosamente nesta fase, mas vale reconferir com uma nova varredura.
5. Confirme que os links de afiliado citados dentro do texto dos artigos (não só nos cards) usam a tag certa.

## ÁREA 6 — Anúncios Adsterra (colocação por 3 meses, terminando por volta de novembro de 2026)

1. Confirme que os 8 códigos do Adsterra (native banner, social bar, banners 468x60/160x300/300x250/160x600/320x50/728x90) estão implementados em `src/components/AdSlot.tsx`, `AdLeaderboard.tsx`, e usados em `src/app/layout.tsx` (social bar site-wide), `src/app/blog/page.tsx` e `src/app/blog/[slug]/page.tsx`.
2. Confirme que o CSP (`public/.htaccess`) libera `effectivecpmnetwork.com` e `highperformanceformat.com` em `script-src`, `connect-src` e `frame-src` — sem isso os anúncios ficam com o espaço reservado mas nunca carregam (isso já aconteceu e foi corrigido).
3. Confirme que assinantes Premium/Pro NÃO veem nenhum anúncio (checagem via `userData.subscriptionStatus` em `AdSlot.tsx`) — isso é uma promessa explícita feita na página `/pricing`.
4. **Isso não dá pra verificar só lendo código:** abra o site de verdade num navegador (não logado) e confirme se os anúncios estão de fato preenchendo (fill) ou só aparecendo o espaço reservado vazio. Contas novas no Adsterra às vezes demoram a começar a servir anúncios de verdade — reporte o que você observar.

## ÁREA 7 — Página de Anunciantes e Media Kit

1. Confirme que `/advertise` carrega e que o e-mail de contato é `support@dcprosens.com`.
2. Confirme que `https://dcprosens.com/media-kit.pdf` abre, tem 3 páginas, e as informações (preços, contato) ainda fazem sentido.
3. Confirme que o banner "Appear with your brand here" aparece nas páginas de blog e linka pra `/advertise`.

## ÁREA 8 — Sistema de Trial / Paywall / Leaderboard

1. Confirme que todas as ferramentas pagas (exceto Aim Trainer, que é gratuito e ilimitado por decisão explícita do usuário) usam o componente `TrialGate` com limite de 3 tentativas: `/dpi`, `/ads`, `/crosshair`, `/sens-finder`, `/psa-calculator`, `/pros/compare`, `/aim-routines`, o gerador de widget, e `/aim-lab` (com `AimLabGated`).
2. Confirme que `/leaderboard` carrega, mostra dados reais (não vazio/quebrado), e que o filtro por faixa de DPI funciona.
3. Confirme que o Aim Trainer continua 100% gratuito e sem limite de tentativas.

## ÁREA 9 — Itens Pendentes Conhecidos (para relatar, não necessariamente resolver sozinho)

- **`dcprosens-secrets.php`** no servidor: status nunca confirmado pelo usuário. Prioridade alta pra verificar (Área 1).
- **Tráfego bot no GA4** (sessões de ~16s vindas de países onde a Busca Google é bloqueada, ex: China): diagnosticado mas nunca filtrado — não é bug de código, é configuração do GA4 que precisa de atenção separada.
- **85/94 artigos antigos compartilhando imagem**: projeto de conteúdo em aberto, precisa de mais imagens geradas.
- **3 links de afiliado ainda marcados como "unclear" / não identificados** em `docs/PENDING_LINKS_VERIFICATION.md` (itens #67, #68, #69, todos em `components/FpsCalculator.tsx`) — não foram resolvidos porque não dava pra identificar o produto real só pelo contexto do código.

## Como reportar

Organize o relatório por área (1 a 9 acima), usando: ✅ confirmado ok / ⚠️ encontrado problema (descreva) / ❓ não deu pra verificar (explique por quê). Priorize a Área 1 (pagamentos) e a Área 6 (anúncios, já que a colocação é por tempo limitado) no topo do relatório. Não faça nenhuma alteração no site nem deploy sem aprovação explícita — essa tarefa é só de diagnóstico.

## FIM DO PROMPT
