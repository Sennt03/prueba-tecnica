FROM node:lts as deps

WORKDIR /app

RUN npm install -g @angular/cli@latest

COPY repo-interview-main/package*.json repo-interview-main/
COPY frontend/package*.json frontend/

RUN cd repo-interview-main && (npm ci || npm install)
RUN cd frontend && (npm ci || npm install)

FROM node:lts

WORKDIR /app

COPY --from=deps /app /app

COPY . .

RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

EXPOSE 3002 4200

CMD sh -c "cd repo-interview-main && npm run start:dev & \
           cd frontend && ng serve --host 0.0.0.0 --poll=2000 & \
           wait"
