FROM node:23

WORKDIR /usr/src/app

COPY package*.json ./

RUN chown -R node:node /usr/src/app

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]