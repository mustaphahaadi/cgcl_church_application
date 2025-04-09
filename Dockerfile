# Use the latest LTS version of Node.js
FROM node:18-alpine
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install --force && npm i -g serve
 
# Copy the rest of your application files
COPY . .
 
# biuld the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 5173
 
# Define the command to run your app
# CMD [ "serve", "-s", "dist" ]
CMD ["npm","run","dev"]
