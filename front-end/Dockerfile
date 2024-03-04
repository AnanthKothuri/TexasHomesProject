FROM node:latest

WORKDIR /front-end
USER root

# Installing dependencies
COPY public/ /front-end/public
COPY src/ /front-end/src
COPY package.json /front-end
COPY package-lock.json /front-end
RUN npm install

# Copy evrything else
COPY . .

# Starting our application
CMD ["npm", "start"]
