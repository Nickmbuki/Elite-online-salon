FROM node:22-alpine AS build
WORKDIR /app
ENV NODE_ENV=development

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL:-}

COPY package*.json ./
COPY tsconfig.base.json ./
COPY shared/package*.json ./shared/
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN npm ci --include=dev

COPY frontend ./frontend
RUN npm run build --workspace @elite-doorstep-salon/frontend

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0
COPY frontend/server.mjs ./server.mjs
COPY --from=build /app/frontend/dist ./dist
EXPOSE 8080
CMD ["node", "server.mjs"]
