# Full Stack Implementation Exercise

## 1. System Requirements to run application

You must have the following installed in your computer:

- Git (v2.44.0)
- Node (^20.11.1)
- Npm (^10.2.4)
- Docker Desktop(v4.28.0) or Docker Engine v25.0.3 and compatible Docker Compose version

## 2.a Spinning the application (bash script):

- Clone this repository and navigade into the main directory `Miglioranza-a54d8a`
- Open a terminal window on that directory and run

```
bash script.sh
```

You will see the all dependencies being installed, building and starting app. At the end, you have succeeded if the terminal output looks like this:

```
Application is running on: http://[::1]:8080
```

Open a browser tab in [localhost:5173](http://localhost:5173/) where the SPA will be running.

There should not be any previous processes running at both ports _8080_ and _5173_. You can check if this is the case with these commands

```
lsof -i:8080
lsof -i:5173
```

If there is any output, you can kill both processes with these commands

```
kill $(lsof -t -i:8080)
kill $(lsof -t -i:5173)
```

## 2.b Spinning the application (npm):

- Clone this repository and navigade into the main directory `Miglioranza-a54d8a`
- Open a terminal window on that directory, navigate into the `backend` directory and run

```
npm i
npm run start:dev
```

You will see the all dependencies being installed, building and starting app. At the end, you have succeeded if the terminal output looks like this:

```
Application is running on: http://[::1]:8080
```

- Open a new terminal window and navigate to the `frontend` directory and run

```
npm i
npm run dev
```

You will see the all dependencies being installed, building and starting app. At the end, you have succeeded if the terminal output looks like this:

```
VITE v5.2.6  ready in 121 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open a browser tab in [localhost:5173](http://localhost:5173/) where the SPA will be running.

## 3. Technologies

Frontend

- Typescript
- Vite
- React
- MaterialUI
- Formik

Backend

- Typescript
- NestJS
- TypeORM
- PostgreSQL
- Docker
