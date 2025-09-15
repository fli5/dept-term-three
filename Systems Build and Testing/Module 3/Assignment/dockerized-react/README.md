# Dockerize React Docker App


## Steps to Run

1. Create a React App
```bash
npm create vite@latest dockerized-react
```
2. Add a Dockerfile in the project root
- Set up the Dockerfile for development environment.
- Add a .dockerignore file to exclude unnecessary files when building the image.
```text
node_modules
*.log
build
.env
.idea
.gitignore
```
3. Build the Docker image:

```bash
docker build --target development -t feng_li_coding_assignment11 .
```
- `docker build`: docker build image command
- `--target development`: the name of stage in the Dockerfile
- `-t feng_li_coding_assignment11`: the name of image
2. Run the Container
```bash
docker run -d -p 7775:7775 --name feng_li_coding_assignment11 feng_li_coding_assignment11
```
- `docker run`:  instantiate a image and run container
- `-p 7775:7775`: map container port 7775 to host port 7775
- `--name feng_list_coding_assignment11`: name the container
- `feng_li_coding_assignment11`: docker image name to run

3. [React App Link](http://127.0.0.1:7775)


