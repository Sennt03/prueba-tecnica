FROM node:lts AS builder

WORKDIR /app

COPY repo-interview-main/package*.json repo-interview-main/
COPY frontend/package*.json frontend/

RUN cd repo-interview-main && npm ci || npm install
RUN cd frontend && npm ci || npm install

COPY . .

FROM node:lts-slim AS runtime

WORKDIR /app

RUN npm install -g @angular/cli@latest

RUN groupadd -g 1001 appgroup && useradd -m -u 1001 -g appgroup -s /bin/sh appuser

COPY --from=builder /app /app

COPY start.sh /usr/local/bin/start.sh
RUN sed -i 's/\r$//' /usr/local/bin/start.sh && chmod +x /usr/local/bin/start.sh

RUN chown -R appuser:appgroup /app /usr/local/bin/start.sh

USER appuser

EXPOSE 3002 4200

CMD ["/usr/local/bin/start.sh"]
