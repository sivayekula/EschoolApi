# Step 1: Use official Node.js image as a base (lightweight version)
FROM node:18-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Step 4: Copy the entire project (excluding files in .dockerignore)
COPY . .

# Step 5: Build the NestJS project
RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine AS runner

# Step 6: Set working directory in the production container
WORKDIR /app

# Step 7: Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Step 8: Expose the application port (default is 3000)
EXPOSE 3000

# Step 9: Set environment variables (optional)
ENV NODE_ENV=production

# Step 10: Start the NestJS server
CMD ["node", "dist/main"]
