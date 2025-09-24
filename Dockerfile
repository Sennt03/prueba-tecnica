FROM node:lts AS builder
WORKDIR /app

COPY repo-interview-main/package*.json repo-interview-main/
COPY frontend/package*.json frontend/

RUN cd repo-interview-main && (npm ci || npm install)
RUN cd frontend && (npm ci || npm install)

COPY . .

FROM node:lts-slim AS runtime

ARG UID=1000
ARG GID=1000
RUN groupadd -g ${GID} appgroup \
 && useradd -m -u ${UID} -g appgroup -s /bin/sh appuser

WORKDIR /app

COPY --chown=appuser:appgroup --from=builder /app /app

COPY --chown=appuser:appgroup start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

USER appuser

EXPOSE 3002 4200

CMD ["/usr/local/bin/start.sh"]
