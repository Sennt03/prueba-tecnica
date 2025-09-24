# ---------- STAGE 1: Build ----------
FROM node:lts AS builder

WORKDIR /app

# Copiamos los package.json primero para aprovechar cache
COPY repo-interview-main/package*.json repo-interview-main/
COPY frontend/package*.json frontend/

# Instalamos dependencias en cada proyecto
RUN cd repo-interview-main && npm ci || npm install
RUN cd frontend && npm ci || npm install

# Copiamos todo el código
COPY . .

# ---------- STAGE 2: Runtime ----------
FROM node:lts AS runtime

WORKDIR /app

# Crear usuario no-root
RUN groupadd -g 1001 appgroup && useradd -m -u 1001 -g appgroup -s /bin/sh appuser

# Copiar desde build stage
COPY --from=builder /app /app

# Dar permisos a la carpeta
RUN chown -R appuser:appgroup /app

# Cambiar a usuario no-root
USER appuser

# Exponer puertos
EXPOSE 3002 4200

# Asegurarse de que el script sea ejecutable
RUN chmod +x /usr/local/bin/start.sh

# Comando de inicio
CMD ["/usr/local/bin/start.sh"]
