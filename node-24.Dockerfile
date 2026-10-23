# ===== Build stage =====
# เปลี่ยนเลขเวอร์ชันตรงนี้เป็น 22-alpine หรือ 24-alpine ได้เลย
# (หมายเหตุ: เช็คเลขเวอร์ชันย่อยให้ตรงกับที่มีใน Docker Hub เช่น node:22-alpine หรือ node:24-alpine)
FROM node:24.22.1-alpine AS build

# 1. เอา vips-dev ออก เพื่อให้ sharp ดึง Prebuilt binary มาใช้เหมือนตัวที่ผ่าน
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev bash git

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm ci

# 2. เพิ่ม PATH ให้เรียกใช้ binary ของ strapi ได้เหมือนตัวที่ผ่าน
ENV PATH=/opt/app/node_modules/.bin:$PATH

COPY . .

ENV NODE_ENV=production
RUN npm run build

# ===== Production stage =====
FROM node:24.22.1-alpine

WORKDIR /opt/app

# 3. ใช้ --chown=node:node ตอนก๊อปปี้ จะเร็วกว่าการรัน chown -R ทีหลังมาก
COPY --from=build --chown=node:node /opt/app ./

ENV PATH=/opt/app/node_modules/.bin:$PATH
ENV NODE_ENV=production

RUN mkdir -p public/uploads && chown -R node:node public/uploads
USER node

EXPOSE 1337
CMD ["npm", "run", "start"]
