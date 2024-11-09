FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build

# remove devlopment dependencies
RUN npm prune --production
 
EXPOSE 3000

CMD ["npm", "start"]