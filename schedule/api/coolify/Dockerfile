# Signal Schedule v1.7.1 Coolify Dockerfile Deployment Fix
# Purpose: predictable Docker-based deployment for the Schedule API.

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
