# -----------------------
# Stage 1: Build Stage
# -----------------------
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /app

# Install dependencies for ffmpeg and sudo
RUN apt-get update && \
    apt-get install -y ffmpeg sudo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy only package files first (for better caching)
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure rhubarb binary is executable (do this after files are copied)
RUN chmod +x ./bin/rhubarb-l/rhubarb

# Build your project (important: do this AFTER copying source)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]

FROM nginx:alpine AS nginx-stage


# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf  

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
