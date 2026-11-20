ARG NODE_IMAGE=hub.hamdocker.ir/library/node:24-alpine
ARG SITE_URL=https://ebnekhodadad.ir

FROM ${NODE_IMAGE} AS base
WORKDIR /app
ARG ALPINE_MIRROR=https://repo.hmirror.ir/apk
RUN sed -i "s|https\?://dl-cdn.alpinelinux.org/alpine|${ALPINE_MIRROR%/}|g" /etc/apk/repositories \
    && apk add --no-cache gcompat
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS dependencies
ARG NPM_REGISTRY=https://repo.hmirror.ir/npm/
COPY package.json package-lock.json ./
# Honor the mirror even for npmjs tarball URLs recorded in package-lock.json.
RUN npm ci --registry="${NPM_REGISTRY}" --replace-registry-host=always --no-audit --no-fund

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ARG SITE_URL
ARG SITE_PREVIEW=0
ARG BUILD_WORKERS=1
ENV NODE_ENV=production \
    NEXT_BUILD_WORKERS=${BUILD_WORKERS} \
    TOKIO_WORKER_THREADS=${BUILD_WORKERS} \
    RAYON_NUM_THREADS=${BUILD_WORKERS} \
    NEXT_STANDALONE=1 \
    SITE_URL=${SITE_URL} \
    SITE_PREVIEW=${SITE_PREVIEW}
RUN npm run build

FROM base AS runner
ARG SITE_URL
ARG SITE_PREVIEW=0
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    SITE_URL=${SITE_URL} \
    SITE_PREVIEW=${SITE_PREVIEW}
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/content ./content
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
