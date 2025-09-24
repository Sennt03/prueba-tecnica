#!/bin/sh
echo "Iniciando contenedor de desarrollo..."

# Backend
echo "Iniciando backend http://localhost:3002"
cd /app/repo-interview-main
npm run start &

# Frontend
echo "Iniciando frontend en http://localhost:4200"
cd /app/frontend
npm run start
