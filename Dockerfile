# Development stage
FROM node:20-alpine AS development

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

# Install production dependencies only
RUN npm install --production

COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "start"]