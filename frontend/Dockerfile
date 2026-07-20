# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors and lockfile
COPY package.json ./
RUN npm install

# Copy application sources
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Serve static files with Nginx
FROM nginx:stable-alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx server configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
