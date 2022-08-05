# generate a base layer for the lambda functuons

#remove the container first
docker rm layer-container

#build the base layer
docker build -t base-layer .

#rename it to layer-contianer
docker run --name layer-container base-layer

#copy the generated zip artificat so our CDK can use it
docker cp layer-container:layer.zip . && echo "Created layer.zip with updated base layer."
