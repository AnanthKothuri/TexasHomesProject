MAIN_BRANCH := main

install:
	npm install

start:
	npm run start

pull:
	git pull origin $(MAIN_BRANCH)

push:
	git push origin $(MAIN_BRANCH)

install-packages:
	./frontend/install_dependencies.sh

# build frontend
build-frontend :
	docker build ./front-end/Dockerfile -t front-end .

run-frontend:
	docker run -dp 127.0.0.1:3000:3000 front-end

# build api
build-api :
	docker build ./api/Dockerfile -t api .

run-api:
	docker run -dp 127.0.0.1:3000:3000 api