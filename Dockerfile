FROM node:22
WORKDIR /homework
COPY package.json package-lock.json ./
RUN npm install 
COPY . ./
EXPOSE 5173