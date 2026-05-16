FROM node:22-alpine AS build
WORKDIR /app
ENV NODE_ENV=development

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
COPY tsconfig.base.json ./
COPY shared/package*.json ./shared/
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN npm ci --include=dev

COPY frontend ./frontend
RUN npm run build --workspace @elite-doorstep-salon/frontend

FROM nginx:1.27-alpine AS runtime
ENV NODE_ENV=production
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
