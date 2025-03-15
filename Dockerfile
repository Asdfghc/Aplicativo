FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# TODO: Pra desenvolvimento
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "run", "devStart"]
