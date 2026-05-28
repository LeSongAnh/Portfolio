# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Sao chép package.json và lockfile để cài đặt cache
COPY package*.json ./
RUN npm ci

# Sao chép toàn bộ mã nguồn và build dự án
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Chạy ứng dụng trong môi trường rút gọn
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Sao chép các tệp tin đã biên dịch từ builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Mở cổng 3000
EXPOSE 3000

# Khởi chạy Next.js Server
CMD ["npm", "start"]
