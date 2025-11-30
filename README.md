
# Place to chill - Backend

## What is inside ?

- a **Postgres database** container listening on **:5432**
- an **Express server** container listening on **:3000**
- a **Websocket server** container listening on **:8080**

## How to run it

### 1. Run this where you want the p2c-backend to sit

```bash
git clone https://github.com/mael-is-coding/p2c-backend.git
```

### 2. Change the POSTGRES_* var in p2c-backend/.env.example

These define your postgres credentials database on running docker compose. Choose whatever suits you.

### 3. Rename .env.example to .env

Please do it both in p2c-backend and p2c-backend/server !

### 4. (Optionnal) Change the ports to free ones in p2c-backend/docker-compose.yaml

please refer to the top of this README ! there's all the default ports of the application 🙃

### 5. Commands to run on your machine

```bash
cd backend
docker image pull postgres:latest # database isn't defined by a dockerfile, only docker-compose
docker compose up -d --build # runs every container in detatched (background) mode !
```

and you're done ! :rocket: Everything should be running correctly.
