# Gunakan node image versi ringan
FROM node:18-alpine

# Set working directory di container
WORKDIR /app

# Copy file package.json dan package-lock.json jika ada
COPY package*.json ./

# Install dependencies (termasuk recharts)
RUN npm install

# Copy semua source code ke container
COPY . .

# Jalankan perintah dev server vite
CMD ["npm", "run", "dev"]
