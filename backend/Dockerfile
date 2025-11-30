FROM node:24-alpine AS development

WORKDIR /src

COPY package*.json ./

COPY . .

RUN npm install --force

CMD [ "npm", "run", "start:dev" ]

#DEBUG

FROM node:24-alpine AS debug

WORKDIR /src

COPY package*.json ./

COPY . .

RUN npm install --force

CMD [ "npm", "run", "start:debug" ]

# PRODUCTION

FROM node:20-alpine AS builder

WORKDIR /src

# Copy package files
COPY package*.json ./

# Install ALL dependencies (dev dependencies are needed for 'nest build')
RUN npm install

# Copy source code and configuration files needed for the build
COPY . .
RUN npx prisma generate

# Run the build command - output goes to /src/dist
RUN npm run build


# 2. PRODUCTION STAGE 🚀
# This stage is for running the application, it will be much smaller.
FROM node:20-alpine AS production

WORKDIR /src

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev --force

# --- FIX START ---
# 1. Copy the prisma directory (containing schema.prisma)
COPY prisma ./prisma

# 2. Generate the Prisma Client inside this stage's node_modules
RUN npx prisma generate
# --- FIX END ---

# Copy the *compiled* application files from the 'builder' stage
COPY --from=builder /src/dist ./dist

CMD [ "npm", "run", "start:prod" ]