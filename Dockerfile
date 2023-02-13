FROM node:lts

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

ENV PORT 8000

RUN npm run build && rm package-lock.json tsconfig.json && rm -rf /usr/src/app/src 

EXPOSE ${PORT}

CMD ["node", "./dist"]
