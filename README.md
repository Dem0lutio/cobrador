# Cobrador

Aplicação web para organizar e cobrar dívidas entre amigos. Monorepo com frontend Angular e backend NestJS + Prisma (PostgreSQL), gerenciados via PNPM Workspaces.

## Stack

- Frontend: Angular 20 (SSR pronto para uso)
- Backend: NestJS 11
- ORM: Prisma 6 (PostgreSQL)
- Gerenciador: PNPM Workspaces + `concurrently`

## Estrutura

- `backend/`: API NestJS, Prisma e schema do banco
- `frontend/`: app Angular
- `pnpm-workspace.yaml`: configuração dos workspaces
- `package.json` (raiz): scripts que orquestram front e back

## Pré‑requisitos

- Node.js 20+
- PNPM 9+ (ou a versão indicada em `packageManager`)
- PostgreSQL em execução (local ou remoto)

## Configuração

1) Instale as dependências na raiz do monorepo:

```
pnpm install
```

2) Crie o arquivo de ambiente do backend em `backend/.env` com a URL do banco:

```
# backend/.env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/cobrador?schema=public"
```

3) Gere o cliente do Prisma e aplique as migrações:

```
pnpm --filter backend prisma generate
pnpm --filter backend prisma migrate dev --name init
```

## Desenvolvimento

- Rodar frontend e backend juntos:

```
pnpm dev
```

  - Backend: `http://localhost:3000`
  - Frontend: `http://localhost:4200`

- Rodar projetos separadamente:

```
pnpm --filter backend start:dev
pnpm --filter frontend start
```

## Scripts úteis

- `pnpm dev`: inicia backend (watch) e frontend
- `pnpm --filter backend test`: testes de unidade do backend
- `pnpm --filter backend test:e2e`: testes e2e do backend
- `pnpm --filter frontend test`: testes do frontend

## API (backend)

- `GET /`: endpoint de saúde (retorna "Hello World!")

Endpoints de domínio (usuários/dívidas) serão adicionados conforme o desenvolvimento do projeto.

## Dicas e problemas comuns

- Se o Prisma reclamar da conexão, verifique `backend/.env` e se o PostgreSQL está acessível.
- Ao alterar o `schema.prisma`, rode novamente `prisma generate` e crie uma nova migração com `prisma migrate dev`.

## Licença

Este repositório está sob licença ISC (ver `package.json` na raiz). Os READMEs de `backend/` e `frontend/` são apenas os padrões gerados pelas CLIs.
