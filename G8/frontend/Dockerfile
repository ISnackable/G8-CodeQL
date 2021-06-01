# We don't want to start from scratch.
# That is why we tell node here to use the current node image as base.
FROM node:14-alpine AS build

# The /usr/src/app directory should act as the main application directory
WORKDIR /usr/src/app/

# Copy the app package and package-lock.json file
COPY package*.json ./
COPY yarn.lock ./

# Install node packages
RUN yarn install
# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY . ./

# Build the app
RUN yarn build

# FROM node:14-alpine

# # The /usr/src/app directory should act as the main application directory
# WORKDIR /usr/src/app/

# COPY --from=build /usr/src/app/frontend/ /usr/src/app/frontend/

EXPOSE 5000

# Start the app
CMD [ "node", "server.js" ]


