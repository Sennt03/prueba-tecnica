#!/bin/sh
set -e

echo "🚀 Iniciando backend (Node.js)..."
cd /app/repo-interview-main
npm run start:dev &
BACK_PID=$!

echo "🌐 Iniciando frontend (Angular)..."
cd /app/frontend
npx ng serve --host 0.0.0.0 --poll=2000 &
FRONT_PID=$!

_term() {
  echo "🛑 Recibida señal, deteniendo procesos..."
  kill -TERM "$BACK_PID" 2>/dev/null || true
  kill -TERM "$FRONT_PID" 2>/dev/null || true
}
trap _term TERM INT

wait
