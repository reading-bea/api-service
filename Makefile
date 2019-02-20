.PHONY: clean build docker-image docker-container docker-sandbox

clean:
	rm -rf yarn-error.log

build:
	### Install the dependencies and the dev dependencies
	yarn install
	### Run the tests
	yarn test
	### Prune the dev dependencies out and remove duplicates
	yarn install --production

DOCKER_COMPONENT_NAME = api-service

docker-image:
	# Copy Nginx config
	cp -r ${PWD}/nginx ./docker/nginx
	# Build api-service
	docker build --tag reading-bea/$(DOCKER_COMPONENT_NAME):latest docker/
	# Cleanup nginx folder
	rm -rf docker/{nginx}

docker-container:
	docker create --tty --interactive \
		--name $(DOCKER_COMPONENT_NAME) \
		--hostname $(DOCKER_COMPONENT_NAME) \
		--volume ${PWD}/../:/home/developer/workspace \
		--volume ${HOME}/.npmrc:/home/developer/.npmrc ${DOCKER_VOLUME_SSH}\
		--env NODE_TLS_REJECT_UNAUTHORIZED='0' \
		--publish 443:7443 \
		--publish 9229:9229 \
		--publish 8080:8080 \
		reading-bea/$(DOCKER_COMPONENT_NAME)

docker-sandbox: docker-image docker-container
