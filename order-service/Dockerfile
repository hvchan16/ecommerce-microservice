# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the service port
EXPOSE 3002

# Define environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "serve"]
