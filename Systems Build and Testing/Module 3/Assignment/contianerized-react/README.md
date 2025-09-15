# Codin 1 React Docker App

This project runs a simple React application in Docker, displaying `<h1>Codin 1</h1>`.

## Steps to Run

1. Build the Docker image:

```bash
docker build -t feng_li_coding_assignment11 .
```
2. Run the Container
```bash
docker run -d -p 7775:7775 --name feng_li_coding_assignment11 feng_li_coding_assignment11
```

3. Open Browser
```
http://127.0.0.1:7775

```


