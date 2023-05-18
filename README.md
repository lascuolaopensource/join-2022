Docker "join-backend" build

docker build -t join-backend --build-arg BUILD_CONTEXT=backend -f Dockerfile .
