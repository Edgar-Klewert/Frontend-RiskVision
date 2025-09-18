# Etapa 1: Build da aplicação
FROM node:20 AS builder

WORKDIR /app

# Instala pnpm
RUN npm install -g pnpm

# Copia arquivos de dependência primeiro
COPY package.json pnpm-lock.yaml ./

# Instala dependências com todas as dependências (inclusive dev)
RUN pnpm install --frozen-lockfile

# Copia o restante do projeto
COPY . .

# Compila o projeto
RUN pnpm build

# Etapa 2: Imagem de produção
FROM node:20 AS runner

WORKDIR /app

# Reinstala pnpm (caso queira usar start via pnpm)
RUN npm install -g pnpm

# Copia apenas o necessário do build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expor a porta padrão do Next.js SSR
EXPOSE 3000

# Executar o servidor Next
CMD ["pnpm", "start"]
