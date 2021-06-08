# That is why we tell node here to use the current node image as build.
FROM node:14-alpine AS build

# The /usr/src/app directory should act as the main application directory
WORKDIR /usr/src/app/

# Copy the app package and package-lock.json file
COPY package*.json yarn.lock ./

# Install node packages
RUN yarn install

# Copy or project directory (locally) in the current directory of our docker image (/usr/src/app/)
COPY . ./

# Build the app
RUN yarn build

FROM node:14-alpine as base

# The /usr/src/app directory should act as the main application directory
WORKDIR /usr/src/app/

RUN yarn add express && yarn install --production

# Copy or project directory (locally) in the current directory of our docker image (/usr/src/app/)
COPY ./server.js ./

COPY --from=build /usr/src/app/build ./build

EXPOSE 5000

# Start the app
CMD [ "node", "server.js" ]


