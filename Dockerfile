FROM node:alpine
RUN npm install -g pm2
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .
RUN npm i && npm cache clear --force
EXPOSE 3000
CMD ["npm", "run", "prod-docker"]