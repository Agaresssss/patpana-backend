FROM node:22-alpine
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev bash git

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm ci
ENV PATH=/opt/app/node_modules/.bin:$PATH

COPY . .
RUN mkdir -p public/uploads
RUN chown -R node:node /opt/app
USER node

ENV NODE_ENV=production
RUN ["npm", "run", "build"]

EXPOSE 1337
CMD ["npm", "run", "start"]