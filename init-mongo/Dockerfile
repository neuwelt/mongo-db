FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY init-mongo/init.js ./init.js

CMD ["node", "init.js"]