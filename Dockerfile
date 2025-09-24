FROM node:lts AS base
WORKDIR /app
RUN npm install -g @angular/cli@latest

FROM base AS dependencies

COPY repo-interview-main/package*.json ./repo-interview-main/
RUN cd repo-interview-main && npm ci --only=production || npm install --only=production

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci || npm install

FROM base AS final

RUN addgroup --system --gid 1001 nodeuser
RUN adduser --system --uid 1001 nodeuser

WORKDIR /app

COPY --from=dependencies /app/repo-interview-main/node_modules ./repo-interview-main/node_modules
COPY --from=dependencies /app/frontend/node_modules ./frontend/node_modules

COPY repo-interview-main/ ./repo-interview-main/
COPY frontend/ ./frontend/

RUN chown -R nodeuser:nodeuser /app

USER nodeuser

EXPOSE 3002 4200

CMD sh -c "cd repo-interview-main && npm run start:dev & cd /app/frontend && ng serve --host 0.0.0.0 --poll=2000 & wait"
