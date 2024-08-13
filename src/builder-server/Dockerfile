# Use a base image with Docker installed
FROM docker:latest

# Install curl and bash
RUN apk add --no-cache curl bash tar git

#Install nixpacks
RUN curl -sSL https://nixpacks.com/install.sh | bash

# Verify the installation
RUN nixpacks --version

# Add the entrypoint script to the Docker image
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]