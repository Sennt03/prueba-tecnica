# ---------- 1️⃣ Builder: instalar dependencias ----------
FROM node:lts AS builder

WORKDIR /app

# Copiar package.json para cache
COPY repo-interview-main/package*.json repo-interview-main/
COPY frontend/package*.json frontend/

# Instalar dependencias
RUN cd repo-interview-main && (npm ci || npm install)
RUN cd frontend && (npm ci || npm install)

# Copiar el resto del código
COPY . .

# ---------- 2️⃣ Runtime: imagen final ----------
FROM node:lts-slim AS runtime

WORKDIR /app

# Copiar desde builder
COPY --from=builder /app /app

# Copiar script de inicio
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# ⚠️ Cambiar a usuario no-root existente (ya creado por la imagen base)
USER node

# Exponer puertos
EXPOSE 3002 4200

# Comando
CMD ["/usr/local/bin/start.sh"]
