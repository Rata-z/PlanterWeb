FROM node:20-bullseye-slim
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force && npm install -g typescript  && npm install -g tsx

COPY . .

ENV PORT=80

EXPOSE 80

CMD [ "npm", "start" ]