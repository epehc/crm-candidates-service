# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Pass the GitHub token as a build argument
ARG GITHUB_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > /root/.npmrc && cat /root/.npmrc


# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

RUN cat /root/.npmrc


# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080 4000

# Define the command to run the app
CMD ["npm", "start"]