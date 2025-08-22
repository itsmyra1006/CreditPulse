# Stage 1: Build the React client
FROM node:18-alpine AS client-builder
WORKDIR /app/client

# Copy client package.json and install dependencies
COPY client/package*.json ./
RUN npm install

# Copy the rest of the client source code
COPY client/ ./

# Build the client application for production
RUN npm run build

# ---
# Stage 2: Build the Node.js server
FROM node:18-alpine AS server-builder
WORKDIR /app/server

# Copy server package.json and install dependencies
COPY server/package*.json ./
RUN npm install --only=production

# Copy the rest of the server source code
COPY server/ ./

# ---
# Stage 3: Final production image
FROM node:18-alpine

WORKDIR /app

# Copy server dependencies from the server-builder stage
COPY --from=server-builder /app/server/node_modules ./node_modules

# Copy server source code from the server-builder stage
COPY --from=server-builder /app/server ./

# Copy the built client application from the client-builder stage
COPY --from=client-builder /app/client/dist ./public

# Expose the port the server will run on
EXPOSE 3001

# The command to start the server in production
CMD ["node", "server.js"]
