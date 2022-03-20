FROM node:16 as build

WORKDIR /frontend

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm i

COPY . ./

RUN npm run build

FROM nginx:1.20.2-alpine
COPY --from=build /frontend/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]