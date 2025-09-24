#!/bin/sh
set -e

# Navegar y arrancar backend (repo-interview-main)
cd /app/repo-interview-main || exit 1
npm run start:dev &
BACK_PID=$!

# Navegar y arrancar frontend usando la CLI local (npx)
cd /app/frontend || exit 1
npx ng serve --host 0.0.0.0 --poll=2000 &
FRONT_PID=$!

# Manejo de señales para apagar correctamente
_term() {
  echo "Recibido SIGTERM/SIGINT: deteniendo procesos..."
  kill -TERM "$BACK_PID" 2>/dev/null || true
  kill -TERM "$FRONT_PID" 2>/dev/null || true
}

trap _term TERM INT

# Esperar a que terminen los procesos
wait
