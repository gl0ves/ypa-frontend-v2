# Use the official Node.js 20 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app/

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 5173

# Set the command to run the application
CMD ["npm", "run", "dev", "--host"]
