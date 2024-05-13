FROM node:18-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "/examencrud/src/index.js"]
