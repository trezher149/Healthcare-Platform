FROM node:lts-alpine
WORKDIR /usr/src/app

COPY package*.json .
RUN npm install
COPY . .

EXPOSE 14000
CMD ["node", "main.js"]