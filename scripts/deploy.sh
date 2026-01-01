#!/usr/bin/env bash
set -e

echo "[+] Starting deployment..."

# Stop the gem service
echo "[+] Stopping gem service..."
sudo systemctl stop free-gem.service || echo "[+] Service may not be running"

# Build the application
echo "[+] Building application..."
npm run build

# Restart the gem service
echo "[+] Restarting gem service..."
sudo systemctl start free-gem.service

# Wait a moment and check status
sleep 2
if sudo systemctl is-active --quiet free-gem.service; then
    echo "[+] Deployment successful! Gen service is running."
else
    echo "[+] Deployment failed! Gem service is not running."
    sudo systemctl status free-gem.service
    exit 1
fi

