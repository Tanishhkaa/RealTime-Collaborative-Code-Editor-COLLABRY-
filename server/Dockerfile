# Stage 1: Build the project
FROM node:18-alpine AS builder

WORKDIR /build

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code and build the project
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# Stage 2: Copy only the `dist` folder
FROM node:18-alpine AS runner

WORKDIR /app

# Copy build output and dependencies
COPY --from=builder /build/dist dist/
COPY --from=builder /build/node_modules /node_modules
COPY --from=builder /build/package*.json ./

# Expose the backend port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
