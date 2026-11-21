# Base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy all the application files
COPY . .

# Set the environment variable for the port
ENV PORT=3000

# Document the post to be exposed
EXPOSE 3000

# Run the app
CMD ["npm", "start"]