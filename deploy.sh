#!/bin/bash
set -euo pipefail

# 1. Create a unique release directory for this deployment
release_dir="releases/$GITHUB_SHA"
mkdir -p "$release_dir"
echo "T17 candidate release $release_dir"

# (In a real scenario, you would extract your built files into $release_dir here)

# 2. Run a health check against the candidate BEFORE switching traffic
echo "Testing candidate health..."
# We test a local candidate endpoint to ensure it's healthy
if curl --fail --silent "http://localhost:8080/health" > /dev/null; then
    echo "Health check passed! Switching traffic..."
    
    # 3. Switch the live traffic (Blue-Green switch)
    ln -sfn "$release_dir" current
    
    echo "Deployment successful."
else
    # 4. Keep the previous release on failure
    echo "Health check failed! Aborting deployment. Live site remains on previous version."
    exit 1
fi
