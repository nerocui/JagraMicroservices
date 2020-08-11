FROM node:12.18.2-alpine as build
RUN mkdir /src
WORKDIR /src
COPY package.json /src/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /src
RUN npm run build

FROM bitnami/apache
COPY --from=build /src/build /app
