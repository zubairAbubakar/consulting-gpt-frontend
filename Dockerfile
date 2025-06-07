# Development stage
FROM node:20-alpine AS development

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Explicitly copy tsconfig.json and/or jsconfig.json
# This is crucial for path alias resolution by `next dev`.
# These lines will cause the build to fail if the respective file does not exist at the root of the build context.
COPY tsconfig.json ./tsconfig.json

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
# Consider using `npm ci --only=production` for more deterministic builds if you have a package-lock.json
RUN npm install --production

# Explicitly copy tsconfig.json and/or jsconfig.json
# This is crucial for path alias resolution by `next build`.
COPY tsconfig.json ./tsconfig.json

# Copy rest of the application (including .next if built outside and copied)
# If building inside, this copies source files.
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "start"]