# Livraria Sabitiruc's

Projeto de treino desenvolvido para o processo seletivo de desenvolvedor front-end júnior da Freeline Informática. Sistema web para gerenciamento básico do catálogo de livros de uma livraria com cadastro, edição, remoção/inativação, busca e filtros por autor e categoria.

## Stack utilizada

- **Front-end:** Vue 3 (Composition API) + Vite + Vue Router + Pinia + Tailwind CSS + Axios
- **Back-end:** Node.js + Express + Prisma ORM
- **Banco de dados:** PostgreSQL 16
- **Infraestrutura:** Docker + Docker Compose

## Pré-requisitos

- Docker e Docker Compose instalados
- Git

Não é necessário ter Node.js ou PostgreSQL instalados localmente, tudo roda dentro dos containers.

## Como clonar o projeto

```bash
git clone <url-do-repositorio>
cd livraria_bootcamp
```

## Configurando as variáveis de ambiente

O projeto usa três arquivos `.env`, nenhum deles versionado no Git (por segurança).

**Raiz do projeto** (`.env`) usado pelo `docker-compose.yml` para configurar o Postgres:
```env
POSTGRES_USER=livraria
POSTGRES_PASSWORD=livraria123
POSTGRES_DB=livraria_db
```

**`backend/.env`** usado pelo Prisma/Express:
```env
DATABASE_URL="postgresql://livraria:livraria123@db:5432/livraria_db?schema=public"
PORT=3000
```

**`frontend/.env`** usado pelo Vite:
```env
VITE_API_URL=http://localhost:3000
```

Copie os `.env.example` de cada pasta e ajuste se necessário:
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Como iniciar os contêineres

Na raiz do projeto:
```bash
docker compose up --build
```

Isso sobe três serviços:
- `db` Postgres, com dados persistidos em volume (sobrevive a reinícios)
- `backend` API Express na porta `3000`
- `frontend` aplicação Vue na porta `5173`

Para rodar em segundo plano, adicione `-d`. Para derrubar tudo (mantendo os dados):
```bash
docker compose down
```

Para derrubar tudo **e apagar os dados do banco** (útil se o schema mudou de forma incompatível):
```bash
docker compose down -v
```

## Como criar ou atualizar o banco de dados

As migrations do Prisma rodam automaticamente toda vez que o container do `backend` sobe (`prisma migrate deploy` no `Dockerfile`). Não é necessário rodar nada manualmente na primeira vez.

Se você alterar o `schema.prisma` durante o desenvolvimento e precisar gerar uma nova migration:
```bash
docker compose exec backend npx prisma migrate dev --name nome_da_alteracao
```

Para inspecionar os dados diretamente (interface visual do Prisma):
```bash
docker compose exec backend npx prisma studio
```
(acessível em `http://localhost:5555`, é necessário expor essa porta no `docker-compose.yml` se for usar com frequência)

## Como acessar a aplicação

- **Front-end:** http://localhost:5173
- **API:** http://localhost:3000
- **Healthcheck da API:** http://localhost:3000/health

## Decisões técnicas

- **Versão do Prisma fixada em 6.x** a versão 7 foi lançada muito recentemente (novembro/2025) e mudou a forma de configurar a conexão com o banco (movendo a `DATABASE_URL` para um novo `prisma.config.ts` com exigência de adapters/Accelerate). Optei por manter a versão 6, mais estável e documentada, evitando gastar tempo do prazo lidando com instabilidades de uma release recente.
- **Inativação lógica em vez de exclusão permanente** para remoção de livros (campo `ativo` no modelo `Livro`). Preferi essa abordagem para manter histórico e evitar perda acidental de dados, mais alinhado com um sistema de gestão real de livraria.
- **ISBN único garantido no nível do banco** (`@unique` no Prisma), não só na aplicação evita condições de corrida em cadastros simultâneos.
- **Preço armazenado como `Decimal`, não `Float`** evita erros de arredondamento em valores monetários.
- **Rede interna do Docker Compose:** o backend se conecta ao banco pelo hostname `db` (nome do serviço), não `localhost`. Isso só funciona dentro da rede do Compose se for rodar comandos do Prisma fora do Docker, é necessário trocar para `localhost:5433` (porta exposta ao host).

