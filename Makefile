REGISTRY := registry.nipa.cloud/patpana-registry
IMAGE := patpana-backend
VERSION := 0.1.2

.PHONY pre-build:
pre-build:
	echo "$(REGISTRY)/$(IMAGE):$(VERSION) is coming!!"


.PHONY build-docker:
build-docker:
	docker build -t "$(REGISTRY)/$(IMAGE):$(VERSION)" .
	docker push "$(REGISTRY)/$(IMAGE):$(VERSION)"
	echo "Build complate and pushed!!"


.PHONY build-docker-node-23:
build-docker-node-23:
	docker build -t "$(REGISTRY)/$(IMAGE)-node-23:$(VERSION)" -f ./node-23.Dockerfile .
	docker push "$(REGISTRY)/$(IMAGE)-node-23:$(VERSION)"
	echo "Build complate and pushed!!"
