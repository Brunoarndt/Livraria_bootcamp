# Livraria Sabitiruc's

Sistema web para gerenciamento básico do catálogo de livros de uma livraria: cadastro, edição, remoção/inativação, busca e filtros por autor e categoria.

## Stack utilizada

- **Front-end:** Vue 3 (Composition API) + Vite + Vue Router + Pinia + Tailwind CSS v4 + Axios
- **Back-end:** Node.js + Express + Prisma ORM (v6)
- **Banco de dados:** PostgreSQL 16
- **Infraestrutura:** Docker + Docker Compose

## Pré-requisitos

- Docker e Docker Compose instalados
- Git

Não é necessário ter Node.js ou PostgreSQL instalados localmente já que roda dentro dos containers.

## Como clonar o projeto

```bash
git clone <url-do-repositorio>
cd livraria_bootcamp
```

## Configurando as variáveis de ambiente

O projeto usa três arquivos `.env`, nenhum deles versionado no Git (por segurança). Crie cada um com o conteúdo abaixo antes de subir os containers.

**Raiz do projeto** (`.env`) — usado pelo `docker-compose.yml` para configurar o Postgres:
```env
POSTGRES_USER=livraria
POSTGRES_PASSWORD=livraria123
POSTGRES_DB=livraria_db
```

**`backend/.env`** — usado pelo Prisma/Express:
```env
DATABASE_URL="postgresql://livraria:livraria123@db:5432/livraria_db?schema=public"
PORT=3000
```

**`frontend/.env`** — usado pelo Vite:
```env
VITE_API_URL=http://localhost:3000
```

## Como iniciar os contêineres

Na raiz do projeto:
```bash
docker compose up --build
```

Isso sobe três serviços:
- `db` — Postgres, com dados persistidos em volume (sobrevive a reinícios)
- `backend` — API Express na porta `3000`
- `frontend` — aplicação Vue na porta `5173`

Para rodar em segundo plano, adicione `-d`. Para derrubar tudo (mantendo os dados):
```bash
docker compose down
```

Para derrubar tudo **e apagar os dados do banco** (útil se o schema mudou de forma incompatível):
```bash
docker compose down -v
```

> Nota: se a porta `5432` já estiver em uso na sua máquina, o `docker-compose.yml` expõe o Postgres na porta `5433` do host (`5433:5432`). Isso não afeta a comunicação entre os containers, que continuam se falando na porta `5432` interna da rede do Compose.

## Como criar ou atualizar o banco de dados

As migrations do Prisma rodam automaticamente toda vez que o container do `backend` sobe (`prisma migrate deploy` no `Dockerfile`). Assim não é necessário rodar nada manualmente na primeira vez.

Se você alterar o `schema.prisma` durante o desenvolvimento e precisar gerar uma nova migration:
```bash
docker compose exec backend npx prisma migrate dev --name nome_da_alteracao
```

Para inspecionar os dados diretamente (interface visual do Prisma):
```bash
docker compose exec backend npx prisma studio
```

## Como acessar a aplicação

- **Front-end:** http://localhost:5173
- **API:** http://localhost:3000
- **Healthcheck da API:** http://localhost:3000/health

## Decisões técnicas

- **Versão do Prisma fixada em 6.x.** A versão 7 (lançada recentemente) mudou a forma de configurar a conexão com o banco, movendo a `DATABASE_URL` para um novo `prisma.config.ts` com exigência de adapters/Accelerate. Foi optado por manter a versão 6, por ser mais estável e documentada, evitando gastar tempo do prazo lidando com instabilidades de uma release mais recente.
- **Inativação lógica em vez de exclusão permanente** para remoção de livros (campo `ativo` no modelo `Livro`, conforme permitido pela RN08). Preferimos essa abordagem para manter histórico e evitar perda acidental de dados.
- **ISBN único garantido no nível do banco** (`@unique` no Prisma), não só na aplicação assim evita condições de corrida em cadastros simultâneos.
- **Preço armazenado como `Decimal`, não `Float`** — evita erros de arredondamento em valores monetários.
- **Arquitetura em camadas no backend** (`routes` → `controllers` → `services`): rotas só mapeiam URL para função, controllers traduzem HTTP, services concentram as regras de negócio (RN01–RN08). Essa separação facilita manutenção e futura escrita de testes automatizados, caso venham a ser adicionados.
- **Componentização orientada a reuso no front-end:** autores e categorias compartilham a mesma estrutura de dados (`{ id, nome }`) e o mesmo comportamento (listar + cadastrar), então ambos usam um único componente genérico (`SimpleEntityManager.vue`) em vez de duplicar código entre duas telas quase identicas.
- **Sistema de notificações (toasts)** implementado com uma store Pinia dedicada (`toast.js`), funcionando como um barramento de eventos global, em qualquer parte da aplicação pode disparar uma notificação sem acoplamento entre componentes. Atende à RF10.
- **Diálogo de confirmação customizado** substituindo o `confirm()` nativo do navegador na remoção de livros, para manter consistência visual com o restante da interface.
- **Identidade visual reduzida e sóbria**, com paleta de poucas cores (verde profundo, creme, dourado como detalhe pontual) e tipografia serifada nos títulos, buscando transmitir a sensação de um catálogo/biblioteca, não de um painel administrativo genérico.
- **RF09 (visualização dos dados do livro) coberta de forma implícita:** o backend expõe `GET /livros/:id`, mas o front-end não consome essa rota numa tela dedicada já que os mesmos dados são exibidos através do formulário de edição, que já apresenta todos os campos exigidos. Foi optado por não construir uma tela de leitura separada por ser redundante com o tempo disponível.
- **Rede interna do Docker Compose:** o backend se conecta ao banco pelo hostname `db` (nome do serviço), não `localhost`. Isso só funciona dentro da rede do Compose; para rodar comandos do Prisma fora do Docker, é necessário trocar para `localhost:5433` (porta exposta ao host).

## Funcionalidades concluídas

- Cadastro, listagem, edição e remoção/inativação de livros
- Cadastro e listagem de autores
- Cadastro e listagem de categorias
- Busca por título e ISBN
- Filtro por autor e categoria
- Controle de quantidade em estoque
- Validação de dados no backend (ISBN único, campos obrigatórios, preço > 0, estoque ≥ 0)
- Validação básica no frontend (campos obrigatórios via HTML5)
- Integração completa entre frontend e backend
- Persistência em PostgreSQL com dados sobrevivendo a reinícios
- Ambiente completo via Docker Compose (banco, API e frontend)
- Mensagens de sucesso e erro via sistema de toasts
- Tratamento de erros no backend (middleware global) e no frontend
- Interface responsiva em nível básico (mobile/desktop)
- Identidade visual própria aplicada de forma consistente

## Funcionalidades não concluídas

- **Tela de visualização somente-leitura de um livro** (RF09) — os dados são exibidos via formulário de edição; não há uma rota/tela dedicada só para consulta, embora o endpoint `GET /livros/:id` já exista no backend.
- **Edição e remoção de autores/categorias** — o escopo obrigatório (RF02/RF03) pede apenas cadastro e disponibilização, sem exigir edição/remoção; por isso não foram implementadas, para priorizar o restante do escopo.
- **Validações de formulário mais ricas no frontend** (mensagens de erro específicas por campo, além dos atributos HTML5 nativos).
- **Responsividade testada em dispositivos reais** — os breakpoints foram ajustados via Tailwind, mas não validados exaustivamente em diferentes aparelhos.

As seguintes funcionalidades são consideradas diferenciais pelo escopo do teste e não foram implementadas, por não fazerem parte do escopo obrigatório e por demandarem tempo desproporcional ao prazo disponível:

- Autenticação e controle de usuários
- Cadastro de clientes e registro de vendas
- Baixa automática de estoque
- Dashboard
- Paginação e ordenação da listagem
- Tema claro/escuro
- Testes automatizados
- Documentação formal da API (Swagger/OpenAPI)
- Histórico de movimentações
- Deploy da aplicação