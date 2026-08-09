# Prompt de handoff — DCPROSENS

Cole este prompt inteiro pra outra IA (Claude, GPT, etc.) rodando neste mesmo repositório. Ele resume tudo que foi feito ontem e hoje, o que ficou pendente, e o que precisa ser resolvido agora.

---

## Contexto do projeto

DCPROSENS (`dcprosens.com`) é um site Next.js 16 (App Router) — conversor de sensibilidade de mouse pra jogos FPS competitivos (Valorant, CS2, Apex etc.), com banco de dados de pro players, calculadoras de DPI/eDPI/cm360, gerador de crosshair, banco de mouses, e uma linha de "jogos"/treino de mira (Aim Trainer grátis + Aim Lab pago).

**Stack e detalhes técnicos importantes:**
- Next.js com `output: "export"` no `next.config.ts` — **é export estático puro**, não roda servidor Node.js em produção. Isso é crítico: nada de `process.env` server-side funciona em runtime; só o que foi inlinado em build time (`NEXT_PUBLIC_*`).
- Deploy: **não usa git/CI**. O deploy real é manual, via MCP da Hostinger (`mcp__hostinger__hosting_deployStaticWebsite`), subindo um `.zip` do conteúdo da pasta `out/` gerada por `npm run build`. Domínio: `dcprosens.com` (conta Hostinger, username `u525458323`). Existe também `app.dcprosens.com`, que é uma subpasta (`public_html/app`) aparentemente servindo o mesmo build — não fica claro por que existem os dois, vale investigar se é intencional.
- `.env.local` tem segredos reais (Stripe, Firebase) — **nunca** subir esse arquivo em nenhum pacote de deploy; ele só precisa estar presente localmente durante o `npm run build` (pra inlinar os `NEXT_PUBLIC_*`).
- Auth/dados de usuário: Firebase Auth + Firestore (`src/lib/firebase.ts`, `src/components/AuthProvider.tsx`). Sistema de assinatura via Stripe (`src/components/StripeCheckoutModal.tsx`), com 3 planos (mensal $4.99, anual $3.33/mês, vitalício $149) e um campo especial `aimLabAccess` no Firestore que libera *só* o Aim Lab por $1 avulso (não a assinatura completa).
- Controle de acesso pago: componente `PremiumGuard` (`src/components/PremiumGuard.tsx`), usado em `<PremiumGuard>{children}</PremiumGuard>` ao redor do conteúdo de uma página. Se não vier `altAccessField`, exige assinatura completa. Se vier `altAccessField="aimLabAccess"` + `altAccessPrice`, libera também via a compra avulsa.

## O que foi feito ontem (sessão anterior, 2026-08-08)

- Corrigidos os achados de SEO High-severity do Google/Bing (title truncado, description faltando, h1 faltando) — mas parte desse trabalho (77 títulos de posts do blog + ~35 arquivos de metadata de página) **ficou só no disco, nunca foi commitado no git** até a sessão de hoje.
- Adicionados 20 redirects 301 de URLs antigas de blog sem o prefixo `/blog/` (`public/.htaccess`).
- Adicionados links de TikTok e X no footer (`src/components/Footer.tsx`).
- Escritos 10 artigos novos de blog + prompts de imagem (`IMAGE_PROMPTS_10_NEW_ARTICLES.md`) + copy de bio/Reels pras redes sociais (`SOCIAL_REELS_PROMPTS_AND_BIO.md`).
- Criado o Aim Lab (`src/components/AimLab.tsx` + `src/app/aim-lab/page.tsx`) — 4 modos de treino premium (Micro-Flick, Dynamic Click, Strafe Peek, Ghost vs Pro), com opção de assinatura completa ou compra avulsa de $1.
- Deletados ~245MB de lixo de build/export não rastreado da raiz do repo.
- Geradas imagens novas: logo da marca (`dcprosens-logo.png`), variante social (`public/blog/dcprosens-social-logo.png/.webp`).

## O que foi feito hoje (sessão atual, 2026-08-09)

1. **Sitemap/robots/llms**: auditados e confirmados corretos (232/88/51 URLs, batendo com Google e Yandex — Bing só estava com crawl atrasado, sem bug real).
2. **Descoberto e corrigido**: `public/logo.png` era referenciado no JSON-LD Organization de `blog/[slug]` e `web-stories/[slug]` mas nunca existia — copiado de `dcprosens-logo.png` e reconvertido pra PNG de verdade via `sharp` (o arquivo original era JPEG disfarçado de `.png`).
3. **Descoberto**: as ~55 mudanças da sessão de ontem (títulos, redirects, footer, imagens, layouts noindex de `/dashboard` e `/login`) nunca tinham sido commitadas no git — foram todas commitadas hoje em 8 commits (ver `git log`).
4. **Descoberto o mecanismo real de deploy**: é export estático + upload manual via MCP da Hostinger, não Node.js hosting nem git. Isso não estava documentado em lugar nenhum.
5. **Corrigidos números falsos na home** (`src/app/page.tsx`): "15+ games" (real: 72, agora calculado de `games.length`), "24+ tools" (real: 27, calculado dinamicamente), "200+ mouse specs" (falso — só existem **8 mouses reais** no banco `src/lib/mouseDatabase.ts`; o card de stat foi trocado por "22+ Pro Players", que é real).
6. **Adicionada categorização leve** (tags tipo FLICKING/CLICKING/STRAFE-AIMING + badge "★ Start here") no Aim Lab e no Aim Trainer, inspirado em concorrentes (3D Aim Trainer, KovaaK's).
7. **Bug corrigido**: `/aim-trainer` estava com `PremiumGuard` **sem** `altAccessField` — ou seja, exigia assinatura completa mesmo sendo pra ser o jogo grátis de atração. Guard removido, agora é livre de verdade.
8. **Adicionada seção "🎮 100% FREE" na home**, com CTA pro Aim Trainer e link secundário pro Aim Lab pago.
9. **Criadas listas pra expandir o banco de mouses**: `MOUSE_DATABASE_EXPANSION_LIST.md` e `.xlsx` (~110 mouses reais de todas as marcas/faixas de preço, organizados por categoria, com colunas pra link de afiliado da Amazon + preço — o usuário ainda vai preencher isso).
10. Todos os builds foram testados (`npm run build`) e deployados via Hostinger MCP, com verificação por `curl` no site ao vivo depois de cada deploy.

## PROBLEMA CRÍTICO AINDA NÃO RESOLVIDO — os jogos não aparecem em lugar nenhum de verdade

O usuário está frustrado porque, mesmo com os jogos existindo e funcionando (`/aim-lab`, `/aim-trainer`), **eles não aparecem em NENHUM menu de navegação do site**. Confirmado via auditoria (`grep` em `src/components/Navbar.tsx` comparado com todas as rotas em `src/app/*/page.tsx`):

**Rotas com página funcionando mas ausentes do Navbar (dropdown desktop E menu mobile):**
- `/aim-lab` — **o produto pago mais importante do site, não está em nenhum menu.** Só é alcançável pelo link direto ou por um card na home.
- `/sensitivity-test` — mini-game grátis, tag "NEW" na home, também ausente do menu.
- `/widget` — gerador de widget de sensibilidade pra streamers, ausente do menu.

Rotas ausentes do Navbar mas provavelmente OK assim (são páginas de rodapé/institucionais, já linkadas no Footer ou em outros lugares — não tratar como bug a menos que investigação mostre o contrário): `about`, `contact`, `pricing`, `privacy`, `terms`, `embed`, `games`, `web-stories`, `dpi-guide`, `gta-vi-sensitivity`.

**Além disso**, no print do Dashboard (`src/app/dashboard/page.tsx`) que o usuário mostrou, a seção "🏆 Aim Journey" lista um checklist (Neuromuscular Baseline, Cross-Game Calibration, Custom Crosshair Setup, Reaction Speed Benchmark, Esports Daily Routine) que **não menciona Aim Lab nem Aim Trainer em lugar nenhum** — outra oportunidade perdida de dar visibilidade aos jogos pro usuário logado.

## TAREFAS — em ordem de prioridade

1. **Adicionar `/aim-lab`, `/sensitivity-test` e `/widget` ao `Navbar.tsx`** — tanto no dropdown desktop quanto no drawer mobile. `/aim-lab` provavelmente merece destaque visual (badge "PREMIUM" ou cor diferente), já que é o produto pago principal. Ver o padrão de outros itens do dropdown "⚡ Aim & Sens" ou "🔌 Gear & Databases" como referência de estilo (arquivo `src/components/Navbar.tsx`, por volta das linhas 63–180 pro desktop e 270–360 pro mobile).
2. **Revisar `src/app/dashboard/page.tsx`** — adicionar um card/CTA explícito de "Play Aim Trainer" e "Play Aim Lab" (ou incluir no checklist "Aim Journey" existente), já que é a área que o usuário logado vê primeiro.
3. **Rebuildar (`npm run build`) e redeployar** via `mcp__hostinger__hosting_deployStaticWebsite` pra `dcprosens.com` depois de qualquer mudança — não esquecer, o deploy NÃO é automático. Zipar o conteúdo de `out/` (não a pasta em si, o conteúdo) e usar esse tool. Verificar depois com `curl` no site ao vivo (o build gera arquivos estáticos, então dá pra grepar o HTML final direto).
4. **Investigar `app.dcprosens.com`** — por que existe como subpasta separada servindo aparentemente o mesmo conteúdo? Vale entender se há alguma diferença de propósito antes de mexer nele.
5. **Análise de conversão da home** (pedido explícito do usuário, ainda não feito a fundo): o usuário acha que já ganha dos concorrentes em layout e quantidade de ferramentas, mas sente que falta "algo a mais". Análise preliminar já feita numa sessão anterior apontou que concorrentes fortes (KovaaK's, Aiming.pro) têm uma camada de **progressão/comunidade** que o DCPROSENS não tem — ranking público, scores de outros usuários, ou pelo menos progresso salvo por jogador. Como o site já tem Firebase Auth + Firestore configurado, isso é viável sem infra nova. Vale validar essa direção com o usuário antes de implementar (é uma mudança de escopo maior, envolve conta de usuário).
6. **Continuar a expansão do banco de mouses** conforme o usuário for preenchendo `MOUSE_DATABASE_EXPANSION_LIST.xlsx` com links de afiliado da Amazon — adicionar cada mouse em `src/lib/mouseDatabase.ts` com specs reais (peso, sensor, dimensões — pesquisar de fontes públicas, não inventar).

## Como validar seu trabalho

- Sempre `npm run build` local antes de considerar algo pronto — se falhar, tem erro de TypeScript/JSX.
- Depois de deployar, usar `curl -s -L "https://dcprosens.com/<rota>/"` e grepar o HTML pra confirmar que a mudança realmente foi ao ar (não confiar só no "deploy accepted" da API da Hostinger — ela não tem endpoint de log/histórico pra export estático).
- Checar `git log --oneline -20` pra ver o que já foi commitado nesta sessão antes de duplicar trabalho.
