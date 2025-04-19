# Use the latest LTS version of Node.js
FROM node:18-alpine AS build
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install --force && npm install -g server
 
# Copy the rest of your application files
COPY . .
 
# biuld the application
RUN npm run build

# PRODUCTION STAGE
# FROM node:18-alpine

# WORKDIR /app

# RUN npm install server

# COPY --from=build app/dist ./dist

# Expose the port your app runs on
EXPOSE 5173
 
# Define the command to run your app
# CMD [ "serve", "-s", "dist" ]
CMD ["npm","run","dev"]
