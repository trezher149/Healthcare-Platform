FROM node:lts-alpine
WORKDIR /usr/src/app

COPY package*.json .
RUN npm install --production
COPY . .

EXPOSE 14000
CMD ["node", "--trace-warnings", "main.js"]