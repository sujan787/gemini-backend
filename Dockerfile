# -----------------------
# Stage 1: Build Stage
# -----------------------
FROM node:latest AS build

WORKDIR /app

# Install dependencies for ffmpeg and sudo
RUN apt-get update && \
    apt-get install -y ffmpeg sudo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package files for caching
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure rhubarb binary is executable
RUN chmod +x ./bin/rhubarb-l/rhubarb

# Build the project
RUN npm run build

# -----------------------
# Stage 2: Nginx Runtime
# -----------------------
FROM nginx:alpine AS nginx-stage

# Copy built files from build stage to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf  

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
