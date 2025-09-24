# ---- Stage 1: deps ----
FROM node:lts as deps

WORKDIR /app

RUN npm install -g @angular/cli@latest

COPY repo-interview-main/package*.json repo-interview-main/
COPY frontend/package*.json frontend/

RUN cd repo-interview-main && (npm ci || npm install)
RUN cd frontend && (npm ci || npm install)

# ---- Stage 2: final ----
FROM node:lts

WORKDIR /app

# Copiarzzz dependencias instaladas
COPY --from=deps /app /app

COPY . .

# Crear usuario no-root
RUN mkdir -p /app/frontend/.angular/cache && \
    chown -R appuser:appgroup /app

RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

EXPOSE 3002 4200

CMD sh -c "cd repo-interview-main && npm run start:dev & \
           cd frontend && ng serve --host 0.0.0.0 --poll=2000 & \
           wait"
