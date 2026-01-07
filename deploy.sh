#!/bin/bash

# Build the project
echo "Building the project..."

# Use current directory instead of absolute path with space
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

# Always use pnpm as specified
echo "Using pnpm..."
PNPM_CMD="pnpm"

# Update version before build (if script exists)
if [ -f "scripts/update-version.js" ]; then
  echo "Updating version..."
  node scripts/update-version.js
fi

# Ensure dependencies are installed
echo "Installing dependencies..."
$PNPM_CMD install

# Make sure .htaccess is copied to the dist folder during build
echo "Ensuring .htaccess will be included in the build..."
cp -f public/.htaccess public/.htaccess.bak 2>/dev/null || true

# Build the project
$PNPM_CMD run build

# Copy .htaccess to dist folder if it wasn't included automatically
if [ ! -f "dist/.htaccess" ]; then
  if [ -f "public/.htaccess" ]; then
    echo "Copying .htaccess to dist folder..."
    cp public/.htaccess dist/
  fi
fi

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed! Aborting deployment."
  exit 1
fi

# Set correct permissions locally before upload
echo "Setting local file permissions..."
if [ -d "dist" ]; then
  # Set directory permissions to 755
  find dist -type d -exec chmod 755 {} \;
  # Set file permissions to 644
  find dist -type f -exec chmod 644 {} \;
  # Ensure .htaccess has correct permissions if it exists
  if [ -f "dist/.htaccess" ]; then
    chmod 644 dist/.htaccess
  fi
  # Ensure index.html has correct permissions
  if [ -f "dist/index.html" ]; then
    chmod 644 dist/index.html
  fi
  echo "Local permissions set successfully"
else
  echo "Error: dist directory not found!"
  exit 1
fi

# Deploy to server
echo "Deploying to server..."
rsync -az --delete --progress --stats \
  --exclude='icons/' \
  --exclude='bars/' \
  "$PROJECT_DIR/dist/" \
  u1110949@server78.hosting.reg.ru:/var/www/u1110949/data/www/tiles.tagban.ru/

# Check if deployment was successful
if [ $? -ne 0 ]; then
  echo "Deployment failed!"
  exit 1
fi

echo "Verifying rsync sync (dry-run + checksum)..."
VERIFY_OUT=$(rsync -aznc --delete --checksum \
  --exclude='icons/' \
  --exclude='bars/' \
  "$PROJECT_DIR/dist/" \
  u1110949@server78.hosting.reg.ru:/var/www/u1110949/data/www/tiles.tagban.ru/ 2>&1 \
  | sed '/^sending incremental file list$/d' \
  | sed '/^$/d')

if [ $? -ne 0 ]; then
  echo "Verification failed: rsync check command errored"
  echo "$VERIFY_OUT"
  exit 1
fi

if [ -n "$VERIFY_OUT" ]; then
  echo "Verification failed: remote is not in sync with local dist"
  echo "$VERIFY_OUT"
  exit 1
fi

echo "Rsync verification OK"

# Set correct file permissions on server
echo "Setting correct file permissions..."
ssh u1110949@server78.hosting.reg.ru "cd /var/www/u1110949/data/www/tiles.tagban.ru && find . -type d -exec chmod 755 {} \; && find . -type f -exec chmod 644 {} \;"

# Verify critical files exist and have correct permissions on server
echo "Verifying deployment..."
ssh u1110949@server78.hosting.reg.ru "cd /var/www/u1110949/data/www/tiles.tagban.ru && \
  if [ ! -f 'index.html' ]; then echo 'ERROR: index.html missing!'; exit 1; fi && \
  if [ -f '.htaccess' ]; then chmod 644 .htaccess; fi && \
  echo 'Critical files verified'"

# Check if deployment and verification were successful
if [ $? -eq 0 ]; then
  echo "Deployment successful! Site is now live at https://tiles.tagban.ru"
  echo "File permissions set: 755 for directories, 644 for files"
  echo "Critical files verified and accessible"
else
  echo "ERROR: Deployment failed or verification failed!"
  exit 1
fi

