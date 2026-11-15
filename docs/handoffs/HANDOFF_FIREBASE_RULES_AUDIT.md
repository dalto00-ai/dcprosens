# Handoff: Firestore Security Rules Audit — DCPROSENS

## Contexto

DCPROSENS (dcprosens.com) é um site Next.js exportado como estático (`output: "export"`, hospedado na Hostinger, sem servidor Node em produção). Usa **Firebase Auth + Firestore** (projeto `dcprosens-saas`) para contas de usuário, e **Stripe em modo LIVE** (dinheiro real) para assinaturas premium.

Uma auditoria de segurança recente (2026-08) revisou todo o código do site e da API PHP e corrigiu vários problemas reais (relay de spam sem autenticação, leaderboard falsificável, arquivos internos expostos, rota quebrada). Esses já foram corrigidos e publicados. **O único item que ficou pendente é este aqui**, porque exige acesso ao Console do Firebase, que quem fez a auditoria anterior não tinha.

## O problema a investigar

O documento `users/{uid}` no Firestore guarda tanto dados inofensivos (configurações salvas pelo próprio usuário) quanto **campos que controlam acesso pago** e que só deveriam poder ser escritos pelo backend, nunca pelo cliente.

**Campos que o app escreve LEGITIMAMENTE pelo SDK do cliente** (não são risco, mas ajudam a delimitar o que a regra precisa permitir):
| Campo | Onde | Quando |
|---|---|---|
| `uid`, `email`, `displayName`, `createdAt` | `src/app/login/page.tsx` | Uma vez, na criação da conta (`setDoc`) |
| `subscriptionStatus: "free"` | `src/app/login/page.tsx` (linhas 55 e 100) | Uma vez, na criação da conta — **valor sempre fixo `"free"`, nunca variável** |
| `savedSettings` | `src/app/dashboard/page.tsx` | Usuário salva sua sensibilidade/DPI |
| `savedProfiles` | `src/app/dashboard/page.tsx` | Usuário salva/edita/remove perfis nomeados |
| `aimLabHistory` | `src/components/AimLab.tsx` | Histórico de sessões de treino |

**Campos que só o backend (webhook do Stripe, `public/api/stripe-webhook.php`, usando uma service account que ignora as regras) deveria conseguir escrever:**
| Campo | O que controla |
|---|---|
| `subscriptionStatus` (para `"active"`) | **Libera acesso Pro inteiro** — é o campo mais crítico do site |
| `subscriptionPlan` | Qual plano (monthly/annual/lifetime) |
| `stripeCustomerId`, `stripeSubscriptionId` | IDs do Stripe vinculados à conta |
| `trialUsedAt` | Controla se o usuário ainda pode pegar o trial de 3 dias |
| `aimLabAccess` | Libera só o Aim Lab ($1 avulso) |
| `aimLabPurchasedAt` | Timestamp dessa compra avulsa |
| `welcomeEmailSentAt` | Evita reenvio do e-mail de boas-vindas |

Essa lógica de gating está em `src/components/PremiumGuard.tsx`, `TrialGate.tsx`, `AimLabGated.tsx`, `SensitivityTestGated.tsx` e `src/app/dashboard/page.tsx` — todas leem `userData.subscriptionStatus === 'active'` (ou `'premium'`) para decidir se o usuário é Pro.

## Por que isso é grave se estiver errado

Se a regra do Firestore para `users/{uid}` for algo genérico como:

```
match /users/{uid} {
  allow read, write: if request.auth != null && request.auth.uid == uid;
}
```

...então **qualquer usuário logado pode abrir o DevTools do navegador e rodar, no console, algo como:**

```js
import { doc, updateDoc } from "firebase/firestore";
updateDoc(doc(db, "users", auth.currentUser.uid), { subscriptionStatus: "active" });
```

...e ganhar acesso Pro completo **sem pagar nada**, sem passar pelo Stripe. O app já carrega o SDK do Firebase no cliente para o login normal — não precisa de nenhuma ferramenta especial, só saber abrir o console do navegador.

Isso **não foi confirmado** — não existe um arquivo `firestore.rules` neste repositório (as regras só existem no Console do Firebase), e ninguém com acesso ao Console verificou isso ainda. É um risco real e não uma vulnerabilidade comprovada.

## O que fazer

1. **Acessar** [Firebase Console](https://console.firebase.google.com) → projeto `dcprosens-saas` → Firestore Database → aba **Regras**.
2. **Ler a regra atual** de `match /users/{uid}` (e também de `reviews`, `leaderboard`, `waitlist` — ver observação abaixo).
3. **Verificar especificamente**: a regra de `write`/`update` em `users/{uid}` restringe *quais campos* podem ser alterados pelo cliente, ou só verifica `request.auth.uid == uid` sem checar o conteúdo?
4. Se **não restringir por campo** (ou seja, o usuário pode escrever qualquer campo no próprio documento): **isso precisa ser corrigido**. Substituir por algo que:
   - Permita `create` do próprio documento (para o cadastro), mas force `subscriptionStatus` a nascer como `"free"` (ex.: `request.resource.data.subscriptionStatus == 'free'`).
   - Permita `update` **apenas** dos campos client-safe (`savedSettings`, `savedProfiles`, `aimLabHistory`, `displayName`), usando `request.resource.data.diff(resource.data).affectedKeys().hasOnly([...])`.
   - **Bloqueie explicitamente** qualquer `update` que toque em `subscriptionStatus`, `subscriptionPlan`, `stripeCustomerId`, `stripeSubscriptionId`, `trialUsedAt`, `aimLabAccess`, `aimLabPurchasedAt`, `welcomeEmailSentAt` vindo do cliente — esses só podem mudar via Admin SDK (que ignora as regras, então nem precisam ser mencionados na regra de allow, só precisam estar fora da lista de campos permitidos).

   Esboço de regra (ajustar aos nomes/estrutura reais encontrados no Console, não copiar cegamente):
   ```
   match /users/{uid} {
     allow read: if request.auth != null && request.auth.uid == uid;

     allow create: if request.auth != null && request.auth.uid == uid
       && request.resource.data.subscriptionStatus == 'free';

     allow update: if request.auth != null && request.auth.uid == uid
       && request.resource.data.diff(resource.data).affectedKeys()
            .hasOnly(['savedSettings', 'savedProfiles', 'aimLabHistory', 'displayName']);
   }
   ```
5. Também confirmar rapidamente as regras de `reviews`, `leaderboard` e `waitlist`: essas coleções só devem ser **lidas/escritas pelo backend PHP** (via service account, que ignora as regras — ver `public/api/get-reviews.php`, `public/api/submit-review.php`, `public/api/get-leaderboard.php`, `public/api/submit-score.php`). O cliente (browser) **não deveria ter regra alguma de acesso direto** a essas três coleções — o app não usa o SDK do Firestore para elas, só chama a API PHP. Se a regra padrão do projeto for algo permissivo tipo `allow read, write: if true` numa coleção de teste antiga, feche isso também.
6. Depois de aplicar qualquer mudança, testar no próprio site:
   - Criar/logar com uma conta de teste, confirmar que login, salvar sensibilidade (`/dashboard`) e savedProfiles continuam funcionando normalmente (não pode quebrar essas features legítimas).
   - Tentar (via DevTools, com essa conta de teste) rodar um `updateDoc` setando `subscriptionStatus: 'active'` diretamente — deve ser **rejeitado** pelas regras (erro de permissão no console).
   - Confirmar que uma assinatura real via Stripe (ou o webhook de teste) ainda consegue gravar `subscriptionStatus: 'active'` normalmente (usa a service account, então não deveria ser afetado, mas vale confirmar).

## Item secundário (menor prioridade, opcional)

`public/api/create-checkout-session.php` aceita um `userId` enviado pelo cliente sem verificar criptograficamente que é realmente o usuário autenticado (não valida um ID token do Firebase). Como o Stripe ainda exige pagamento real para qualquer gravação, o risco prático é baixo — no pior caso alguém paga e vincula o plano à conta de outra pessoa. Não é urgente, mas se sobrar tempo: validar o ID token do Firebase (enviado pelo frontend no header `Authorization: Bearer <token>`) contra as chaves públicas do Google antes de confiar no `userId`. **Não mexer nisso sem testar bem antes** — é o endpoint de pagamento ao vivo, com Stripe em modo `live`.

## Deploy — como publicar se você mudar algum arquivo do repo

**Importante primeiro:** as regras do Firestore (passo "O que fazer" acima) **não passam pela Hostinger**. Elas são publicadas direto no Firebase Console (botão **Publish** na aba Regras) ou via `firebase deploy --only firestore:rules` se tiver o Firebase CLI configurado. Isso é o suficiente pra resolver o item principal deste documento — não precisa mexer no site pra isso.

Só rode o deploy abaixo se você **também alterou algum arquivo do repositório** (ex.: fez o item secundário do checkout, ou qualquer outro ajuste em `src/` ou `public/`).

**DCPROSENS não usa GitHub/CI.** É um export estático (`output: "export"` no `next.config.ts`) publicado manualmente na Hostinger via MCP. `git commit` é só histórico local — não publica nada sozinho.

1. Validar antes de buildar:
   ```bash
   npx tsc --noEmit
   php -l <qualquer .php que você tenha editado em public/api/>
   ```
2. Build limpo:
   ```bash
   rm -rf out
   npm run build
   ```
3. Compactar o **conteúdo** da pasta `out/` (não a pasta em si) com esse nome exato de padrão:
   ```bash
   TS=$(date +%Y%m%d_%H%M%S)
   cd out && zip -r -q "../out_${TS}.zip" . && cd ..
   ```
4. Publicar pela ferramenta MCP da Hostinger (`mcp__hostinger__hosting_deployStaticWebsite`):
   - `domain`: `dcprosens.com`
   - `archivePath`: caminho absoluto do zip gerado no passo 3
   - `removeArchive`: `false` (mantém o zip local como registro, é o padrão já usado no projeto)

   Se a chamada falhar com erro 500 ao buscar credenciais de upload, é transitório — espere alguns segundos e tente de novo uma vez antes de investigar mais.
5. Esperar ~20s (a extração no servidor não é instantânea) e **confirmar ao vivo** — não existe painel de logs/histórico pra esse tipo de deploy, então `curl` é a única forma confiável de verificar:
   ```bash
   curl -s -D - -o /dev/null "https://dcprosens.com/" | grep -i last-modified   # deve mostrar a hora do deploy
   curl -s -o /dev/null -w '%{http_code}\n' "https://dcprosens.com/"           # 200
   curl -s -o /dev/null -w '%{http_code}\n' "https://dcprosens.com/dashboard/" # 200
   curl -s -o /dev/null -w '%{http_code}\n' "https://dcprosens.com/pricing/"   # 200
   curl -s -o /dev/null -w '%{http_code}\n' "https://dcprosens.com/login/"    # 200
   ```
   E teste especificamente qualquer rota/endpoint que você tenha alterado.

## Como reportar de volta

Ao final, resuma em poucas linhas:
- O que a regra de `users/{uid}` dizia antes (cole o trecho relevante).
- Se estava vulnerável ou já era segura.
- O que foi mudado (se mudou).
- Resultado dos testes do passo 6.
