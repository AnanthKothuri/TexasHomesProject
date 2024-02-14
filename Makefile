SHELL	:= bash
BLACK	:= black

#start the web preview
start:
	cd ./front-end && npm start

#commit and push the changes to remote
commit:
	git add -A
	@read -p "commit message: " COMMITMSG; \
	git commit -m "$$COMMITMSG"
	git push

#add all then show status
add:
	git add -A
	git status

# pull from remote gitlab
pull:
	git pull
	git status

install:
	cd ./front-end && npm install


branch:
	@read -p "branch name: " BRANCHMSG; \
	git branch "$$BRANCHMSG"; \
	git checkout "$$BRANCHMSG"
