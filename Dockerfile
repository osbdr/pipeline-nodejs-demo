FROM node:16.6.1-alpine3.11
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --prod
COPY . /app
CMD npm start
EXPOSE 3000
