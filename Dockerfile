# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port your dev server runs on (typically 3000 for Create React App)
EXPOSE 3002

# Start the development server
CMD ["yarn", "start"]