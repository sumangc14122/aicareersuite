FROM vercel/node:18

# Install dependencies required by @sparticuz/chromium
RUN apt-get update && apt-get install -y \
  libnspr4 \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libpango-1.0-0 \
  libcairo2 \
  libasound2 \
  fonts-liberation \
  libappindicator3-1 \
  libxss1 \
  libxtst6 \
  && rm -rf /var/lib/apt/lists/*

# Copy project files
COPY . /app
WORKDIR /app

# Install dependencies
RUN npm install

# Build the Next.js app
RUN npm run build

# Set the working directory to the output directory
# Vercel expects the output in /vercel/output
WORKDIR /app
CMD ["npm", "start"]