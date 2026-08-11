# ===== Build stage =====
FROM node:23-alpine AS build

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev bash git

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build

# ===== Production stage =====
FROM node:23-alpine

RUN apk update && apk add --no-cache vips-dev

WORKDIR /opt/app

COPY --from=build /opt/app ./

RUN mkdir -p public/uploads && chown -R node:node /opt/app
USER node

ENV NODE_ENV=production
EXPOSE 1337
CMD ["npm", "run", "start"]
