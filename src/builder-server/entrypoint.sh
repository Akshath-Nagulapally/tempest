#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

cd /tmp/

curl -L -o download.zip $ZIPDOWNLOAD_URL

echo "downloaded"

unzip download.zip -d sample_location

echo "unzipped"

rm download.zip

cd sample_location

nixpacks build . --name "akshathnag06002/${FUNCTIONAL_NAME}:latest"

echo "Akkikalli01!!!!" | docker login -u akshathnag06002 --password-stdin

# Tag the Docker image with the new repository and the FUNCTIONAL_NAME as the tag. 
docker tag "akshathnag06002/${FUNCTIONAL_NAME}:latest" "akshathnag06002/akkiregistry:${FUNCTIONAL_NAME}"

# Push the Docker image to Docker Hub with the FUNCTIONAL_NAME as the tag
docker push "akshathnag06002/akkiregistry:${FUNCTIONAL_NAME}"
