FROM node:22-alpine AS build
WORKDIR /app
ENV NODE_ENV=development

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL:-}

COPY package*.json ./
RUN npm install --include=dev

COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0
COPY server.mjs ./server.mjs
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "server.mjs"]
