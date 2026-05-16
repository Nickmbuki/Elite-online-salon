FROM node:22-alpine AS build
WORKDIR /app
ENV NODE_ENV=development

COPY package*.json ./
COPY tsconfig.base.json ./
COPY shared/package*.json ./shared/
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/
RUN npm ci --include=dev

COPY backend ./backend
RUN npm run build --workspace @elite-doorstep-salon/backend
RUN npm prune --omit=dev

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/shared/package.json ./shared/package.json
COPY --from=build /app/shared/dist ./shared/dist
COPY --from=build /app/backend/package.json ./backend/package.json
COPY --from=build /app/backend/dist ./backend/dist
COPY --from=build /app/backend/drizzle ./backend/drizzle

WORKDIR /app/backend
EXPOSE 8080
CMD ["node", "dist/server.js"]
