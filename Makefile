REGISTRY := registry.nipa.cloud/patpana-registry
IMAGE := patpana-backend
VERSION := 0.1.3

.PHONY pre-build:
pre-build:
	echo "$(REGISTRY)/$(IMAGE):$(VERSION) is coming!!"


.PHONY build-docker:
build-docker:
	docker build -t "$(REGISTRY)/$(IMAGE):$(VERSION)" .
	docker push "$(REGISTRY)/$(IMAGE):$(VERSION)"
	echo "Build complate and pushed!!"


.PHONY build-docker-node-22:
build-docker-node-22:
	docker build -t "$(REGISTRY)/$(IMAGE)-node-22:$(VERSION)" -f ./node-22.Dockerfile .
	docker push "$(REGISTRY)/$(IMAGE)-node-22:$(VERSION)"
	echo "Build complate and pushed!!"


.PHONY build-docker-node-23:
build-docker-node-23:
	docker build -t "$(REGISTRY)/$(IMAGE)-node-23:$(VERSION)" -f ./node-23.Dockerfile .
	docker push "$(REGISTRY)/$(IMAGE)-node-23:$(VERSION)"
	echo "Build complate and pushed!!"


.PHONY build-docker-node-24:
build-docker-node-24:
	docker build -t "$(REGISTRY)/$(IMAGE)-node-24:$(VERSION)" -f ./node-24.Dockerfile .
	docker push "$(REGISTRY)/$(IMAGE)-node-24:$(VERSION)"
	echo "Build complate and pushed!!"
