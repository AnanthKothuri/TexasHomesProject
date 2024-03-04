FROM node:latest
USER root

# Declaring env
ENV NODE_ENV development

WORKDIR /front-end

# Installing dependencies
COPY public/ /front-end/public
COPY src/ /front-end/src
COPY package.json /front-end
COPY package-lock.json /front-end
RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["npm", "start"]
