# Contexto do projeto 4DevTools: passagem para outra IA

> Documento de passagem gerado em 22/11/2026. Ele descreve o estado do trabalho para outra IA continuar de onde
> parou. Antes de qualquer coisa, leia também o `CLAUDE.md` na raiz do repositório.

## 1. O projeto

- **4DevTools** (https://www.4devtools.com) é um site em Angular 13 que gera dados brasileiros fictícios para
  testes de software: CPF, CNPJ, CNH, PIS, RENAVAM, RG, cartão etc.
- **Hospedagem:** Vercel, com deploy automático a partir do GitHub (`fparmezani/4devtools`). A branch `main` vai
  para produção; as outras branches geram prévias. **Heroku não é mais usado.**
- **Domínio:** `4devtools.com` redireciona com 308 para `www.4devtools.com`. Todo canonical e o sitemap usam `www`.
- **Node:** o `engines` do `package.json` fixa a versão 24.x. O painel da Vercel mostra 18.x, mas o `engines` tem
  prioridade.
- **Idioma:** o dono do projeto escreve em português e espera respostas em português.

## 2. Objetivo atual

O Google AdSense **reprovou o site por "conteúdo de baixo valor"**. O plano para reverter isso tem 4 fases:

1. **Fase 1, técnica:** pré-render, SEO por página, 404 real. ✅ Feita e validada numa prévia da Vercel.
2. **Fase 2, conteúdo:** páginas de gerador com conteúdo técnico, revisão dos artigos, tutoriais e home.
   ✅ Escrita, ⚠️ **ainda sem commit** (veja a seção 5).
3. **Fase 3, confiança:** página "Sobre" com autor, links internos e menos destaque para "Preciso da sua
   ajuda!". ⏳ Pendente. Autor e data já foram adicionados aos artigos e tutoriais.
4. **Fase 4:** publicar em produção, esperar a indexação no Search Console (2 a 4 semanas) e só então pedir
   revisão no AdSense. ⏳ Pendente. **Não pedir revisão antes:** cada reprovação aumenta a espera.

## 3. Estado do Git

| Branch | Situação |
|---|---|
| `main` (produção) | Último commit `f0edccb`: script do AdSense, meta tag e `ads.txt` restaurados. **Não tem as Fases 1 e 2.** |
| `fase1-seo` (no GitHub) | Commits `eeceecd`, `726707b` e `92e3666`. Prévia validada na Vercel. **Não foi mesclada na `main`.** |
| `fase2-conteudo` (local, atual) | Criada a partir de `fase1-seo`. **Cerca de 50 arquivos alterados, sem commit.** |

O dono do projeto pede commit e push explicitamente. **Não faça commit, push nem merge na `main` sem pedir
autorização.**

## 4. O que a Fase 1 fez (já no GitHub, branch `fase1-seo`)

- **Angular Universal 13 com pré-render.** `npm run build` roda `ng run 4DevTools:prerender` e depois
  `node scripts/vercel-output.js`.
  - As rotas pré-renderizadas estão listadas em `prerender-routes.txt`.
  - A saída fica em `dist/4DevTools/browser/<rota>/index.html`.
- **`scripts/vercel-output.js`** gera a pasta `.vercel/output` no formato da Build Output API v3, com regras de
  rota próprias:
  - `/x/` redireciona com 308 para `/x`.
  - Arquivos que existem são servidos normalmente.
  - Qualquer outra URL recebe `404.html` com status 404.
  - **Motivo:** o projeto na Vercel tem o preset "Angular", que fazia fallback de SPA (devolvia 200 com a home
    para qualquer URL). O `"framework": null` do `vercel.json` não desligava isso.
- **`vercel.json`** só define `buildCommand` e `framework: null`.
- **`src/app/services/seo.service.ts`** define, a cada navegação, título, description, canonical (`www`), robots
  e Open Graph, a partir de `data: seo(...)` em cada rota de `app-routing.module.ts`. **Não defina título ou meta
  nos componentes.**
- **`index.html`:** `lang="pt-BR"`. Foram removidos o `aclib`, outra rede de anúncios (o dono aceitou), e o
  AddThis, serviço encerrado. O script do AdSense continua no `<head>`.
- **`robots.txt`:** deixou de bloquear `/assets/`. O sitemap usa `www` e tem `lastmod`.
- **Página do Dashboard (cotações):** marcada com `noindex`.
- **Gerador de Telefone:** usava a API do geradorbrasileiro.com, que hoje devolve 404. Agora gera localmente.
  Também foi corrigido o sorteio de DDD e prefixo, que gerava números como `(92,97) 967,971,...`.
- **`server.js` (Express):** serve só para pré-visualizar o build localmente. **Não é usado em produção.**

## 5. O que a Fase 2 fez (branch `fase2-conteudo`, SEM commit)

### 5.1 Páginas de gerador no "modelo técnico"

As páginas são CPF, CNPJ, CNH, PIS/PASEP, Título de Eleitor, RENAVAM, RG e Cartão de Crédito. Cada uma tem:
- **Topo:** título, gerador e aviso legal.
- **Navegação:** sumário com links para as seções.
- **Conteúdo técnico:** estrutura do número e cálculo passo a passo. A tabela do cálculo é montada a partir do
  exemplo pelo componente `app-tabela-dv`.
- **Código:** funções de validação em TypeScript, Python, C# e Java, com destaque de sintaxe (`app-code-tabs`,
  Prism.js com tema One Dark). Também há regex e máscara.
- **Uso prático:** erros comuns e uso em testes, com menção ao Faker apenas onde ele de fato tem o gerador.
- **Fechamento:** seção de LGPD com artigos da lei, FAQ e "Veja também".

Arquivos principais:
- **Páginas:** `src/app/Views/gerador-cpf|cnpj|cnh/`, e `src/app/components/gerar-pispasep|gerar-titulo-eleitor|gerar-renavam|gerar-rg|gerar-cartaodecredito/`.
- **`src/app/shared/snippets.ts`:** todas as funções de validação publicadas. Fica separado para poder ser
  testado.
- **`src/app/shared/highlight.ts`:** usa o Prism e acrescenta um token `variable`, para variáveis aparecerem
  coloridas.
- **`src/app/shared/code-tabs/`** e **`src/app/shared/tabela-dv/`:** componentes compartilhados.
- **CSS:** classes `.doc-*` no fim de `src/assets/css/app.css`.

### 5.2 Mudanças nos geradores (`gerador.service.ts`)

- **Sorteio uniforme:** `Math.round(Math.random()*9)` foi trocado por `Math.floor(Math.random()*10)`. O primeiro
  dava metade da chance ao 0 e ao 9.
- **CPF:** não gera mais sequências repetidas.
- **CNPJ alfanumérico:** novo método `gerarCNPJAlfanumerico()`, com a regra `valor = ASCII − 48` da IN RFB nº
  2.229/2024, conferida com o exemplo oficial `12.ABC.345/01DE-35`. O gerador ganhou a opção "Alfanumérico".
- **CNH:** descarta o caso em que o 1º dígito verificador estoura (resto 10), porque as implementações divergem
  no 2º dígito.
- **Título de Eleitor:** para SP (`01`) e MG (`02`), descarta os casos em que o resto dá 0, porque há a exceção
  "0 vira 1", que alguns validadores aplicam e outros não. A função publicada aceita as duas formas.
- **Cartão:** a validade passou a ser gerada no formato `MM/AA`.

### 5.3 Remoções e revisões

- **Artigos de Bitcoin e Ethereum removidos,** a pedido do dono: componentes, rotas, menu, sitemap, cards e
  imagens.
- **8 artigos do blog reescritos** (cpf, cnpj, cartaodecredito, renavam, tituloeleitor, cns, pispasep, aih), do
  ponto de vista do cidadão, com autor e data. Foram removidos erros factuais. Os principais:
  - **PIS:** confundia o programa com FGTS e seguro-desemprego.
  - **Título:** dizia que eleitor no exterior "só justifica".
  - **RENAVAM:** dizia que cada tipo de veículo tem um código.
  - **CNS:** citava "Conecte SUS", que hoje se chama Meu SUS Digital.
  - **AIH:** citava um gerador de AIH que não existe.
  - **CNPJ:** tinha uma seção copiada do artigo do CPF.
- **Bloco "Leia também":** foi corrigido o erro "11 números aleatórios".
- **Página Versão:** os links `/link-para-whatsapp` e `/link-para-telegram` foram trocados por `/whatsapp` e
  `/telegram`.

### 5.4 Novos conteúdos

- **6 tutoriais** em `/tutoriais/<slug>`. A lista fica em `src/app/tutoriais/tutoriais.data.ts` e o código deles
  em `src/app/shared/tutorial-snippets.ts`:
  - `dados-de-teste-lgpd`
  - `cnpj-alfanumerico`
  - `validar-cpf-cnpj-angular`
  - `massa-de-dados-faker-python`
  - `mascaras-javascript`
  - `playwright-dados-gerados`
- **Página índice** `/tutoriais` e uma seção "Tutoriais" no menu lateral (`index.html`).
- **Home de verdade** em `/` (`src/app/shared/home/`), com cards de ferramentas, tutoriais, privacidade e autor.
  Antes, `/` redirecionava para `/gerar-cnpj`.
- **Rotas, `prerender-routes.txt` e `sitemap.xml`** atualizados. São 39 páginas no total.

## 6. Validações já feitas

- **Geradores:** 2.000 números de cada tipo conferidos contra a biblioteca Python `validate-docbr`. Resultado:
  0 inválidos.
- **Funções de validação publicadas** (TypeScript, Python e C#): de 600 a 1.300 casos por documento. Resultado:
  0 erros.
  - A única divergência com a biblioteca de referência é o RENAVAM `00000000000`, que a biblioteca aceita e nós
    rejeitamos de propósito.
  - **A versão em Java não foi executada**, porque não há JDK na máquina.
- **Exemplos e "casos para testes unitários" citados nas páginas:** todos conferidos.
- **Tutoriais:**
  - **Máscaras:** testadas caractere por caractere.
  - **`gerarCpf` do Playwright:** 3.000 CPFs, todos válidos.
  - **Scripts Python com Faker:** executados.
  - **Código Angular:** passou na checagem de tipos em modo `strict`, e o teste unitário rodou com 8 de 8
    verificações aprovadas.
  - **Não executados:** o SQL (não há PostgreSQL nem MySQL na máquina) e o Playwright de fato.
- **Links internos:** 2.069 conferidos no HTML gerado. Os únicos 2 quebrados foram corrigidos (seção 5.3).
- **Ambiente de teste:** fica em `tmp/t/`, pasta ignorada pelo Git.
  - `gen.js`: gera números com o código real do serviço.
  - `cases.py`: monta os casos esperados.
  - `run.js`: roda as funções publicadas em TypeScript, Python e C#.
  - `tut.js`: testa o código dos tutoriais.
  - `venv/`: ambiente Python com `validate-docbr` e `faker`.

## 7. Onde o trabalho parou

Os passos 1 e 2 abaixo foram **concluídos em 22/11/2026** (segunda sessão). Falta o passo 3 em diante.

1. ✅ **Build:** `npm run build` passou, com `Build Output API: 39 páginas, 404 em /404.html`.
2. ✅ **Conferência local no navegador** (`PORT=8099 node server.js`): home, tutorial (abas de código trocam o
   conteúdo) e as 39 rotas medidas a 390px. Foram achados e corrigidos 4 estouros de largura no celular, em
   `src/assets/css/app.css` e `sobre.component.html`:
   - `.doc code` tinha `white-space: nowrap`, e uma regex longa dentro de um `li` esticava a página toda
     (afetava 10 páginas). Agora usa `overflow-wrap: anywhere`.
   - Novo `.doc-tool .btn { white-space: normal }`: os botões "Gerar e Copiar Título Eleitor" e "Cartão de
     Crédito" estouravam a tela.
   - `/sobre`: o `.row` aninhado ganhou `m-0` (estouro de 4px).
   - Depois das correções, **nenhuma das 39 rotas tem rolagem horizontal a 390px**.
   - Armadilha: o `body` do tema tem `display: table`, então um único bloco largo estica o layout inteiro. Se o
     celular voltar a estourar, procure o elemento com `white-space: nowrap`/`pre` (esconder elementos um a um
     e medir `scrollWidth` acha o culpado rápido).
3. ✅ **Miniaturas nos cards** da Home e de `/tutoriais` (e do bloco "Outros tutoriais"): campo `imagem` em
   `home.component.ts` e `tutoriais.data.ts`, classe `.doc-card-img` em `app.css` (16:9, `loading="lazy"`).
   - As 24 imagens (geradores, tutoriais, CNS e AIH do blog) foram **convertidas de PNG para WebP**
     (qualidade 85, 1280x720): de 25,8 MB para 0,96 MB. Todas as referências (blog, "Leia também", Home e
     tutoriais) apontam para `.webp`.
   - Os PNGs originais estão em `tmp/originais-png/` (pasta ignorada pelo Git). Novas imagens: converter para
     WebP antes de usar (Pillow no `tmp/t/venv`, script `tmp/conv.py`).
   - Ainda não conferido: console do navegador com erros reais (só se mediu erros de JS depois do `load`), e
     os artigos do blog reescritos no desktop.
3. ✅ **Publicado em produção em 22/11/2026** (com autorização do dono):
   - commit `986dbce` na `fase2-conteudo`, push, prévia da Vercel validada (as 26 rotas testadas, 404 real,
     redirect de barra final, imagens WebP, sitemap com 36 URLs);
   - `fase1-seo` + `fase2-conteudo` mesclados na `main` por fast-forward;
   - commit `a553fc3`: o snippet do Google Analytics (`G-ZNCSHFFVL7`) foi movido do fim do `<body>` para o
     `<head>` do `index.html`. Sem isso o Search Console recusava a verificação por Analytics.
     **Não remova esse snippet:** é o método que mantém a propriedade verificada.
4. ✅ **Search Console** (conta `fparmezani@gmail.com`):
   - propriedade de prefixo de URL `https://www.4devtools.com/` criada e verificada pelo Analytics (antes não
     existia nenhuma propriedade do 4devtools nessa conta);
   - `sitemap.xml` enviado e **processado: 36 páginas encontradas**;
   - indexação solicitada para `/`, `/gerar-cpf`, `/gerar-cnpj` e `/tutoriais`.
   - **Diagnóstico importante:** `/gerar-cnpj` aparecia como "Cópia sem página canônica selecionada pelo
     usuário" (o Google escolheu `/` como canônica; último rastreio em 28/09/2026). No site antigo toda URL
     devolvia o mesmo HTML, sem canonical. A Fase 1 (pré-render + canonical por rota) corrige isso, mas o
     Google precisa reprocessar as páginas. Pode levar dias.
   - Pendente: pedir indexação das demais páginas (há limite diário de cerca de 10 solicitações) e conferir
     o relatório "Páginas" nos próximos dias.
5. **Fase 3 (feita localmente em 22/11/2026, ainda sem commit/deploy):**
   - `/sobre`: links para LinkedIn (`linkedin.com/in/fparmezani`), GitHub, site pessoal e contato, mais as
     seções "Como o conteúdo é produzido" e "Como o projeto é mantido" (transparência sobre anúncios e apoio);
   - o item "Preciso da sua Ajuda!" saiu do topo do menu e virou "Apoie o projeto" no grupo "Projeto" (junto de
     "Sobre o autor" e "Contato"); o botão "QUERO AJUDAR!" do header virou "Tutoriais"; o rodapé ganhou o link
     "Apoie o projeto". A página `/buy-me-a-coffe` continua existindo;
   - breadcrumbs: `shared/breadcrumb` (Home > Tutoriais > página; blog e geradores ficam em Home > página),
     com JSON-LD `BreadcrumbList` gerado no pré-render. Não aparece na Home nem no 404. Rótulos vêm do
     `data.seo.title` da rota.
6. **Só no fim:** marcar "Confirmo que corrigi os problemas" no AdSense e pedir revisão.

## 8. Cuidados e convenções

- **Templates Angular:** chaves `{` `}` soltas no texto quebram o build. Use `&#123;` e `&#125;`, ou mova o texto
  para o componente.
- **Código exibido nas páginas:** fica em `snippets.ts` e `tutorial-snippets.ts`, dentro de `String.raw`. Evite
  `${` dentro dos trechos.
- **Nova rota:** precisa de `data: seo(...)` na rota, de uma linha em `prerender-routes.txt` (sem ela a página dá
  404 na Vercel) e de uma entrada no `sitemap.xml`.
- **Código que roda no build:** o pré-render executa os componentes no Node. Use `isPlatformBrowser` antes de
  acessar `window`, `document` ou `localStorage`.
- **Estilo dos textos:**
  - O dono pediu atenção à formatação. As listas precisam de recuo, porque o tema zera o `padding` de `ul`; isso
    já está tratado em `.doc ul`. O texto ocupa a largura toda do card, sem limite de `ch`.
  - Os textos são em português claro e não fazem afirmações jurídicas além do que a lei diz. As seções de LGPD
    terminam com a ressalva "não substitui DPO/jurídico".
- **⚠️ Segurança, ainda pendente:** o `server.js` tem a **senha de app do Gmail escrita no código**, e ela está no
  histórico do Git. Recomende ao dono revogá-la no Google. O endpoint `/sendmail` não é usado na Vercel.

## 9. Comandos úteis

```bash
npm run build                      # pré-render + .vercel/output
PORT=8099 node server.js           # prévia local do build
node tmp/t/gen.js tmp/t/gen.json   # gera amostras com o código real do serviço
tmp/t/venv/Scripts/python -I tmp/t/cases.py tmp/t/gen.json tmp/t/cases.json
node tmp/t/run.js                  # testa as funções publicadas (TS/PY/C#)
node tmp/t/tut.js                  # testa o código dos tutoriais
```
