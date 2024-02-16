# MERN stack TODO app example project
This is a simple `TODO` app with auth, built with the MERN stack for educational purposes.

![image](https://github.com/Abadulrehman/mern-todo-app-example/assets/30027453/95c188f0-6ad6-4777-9587-b56299f433f9)

## Overview

The project is an [NX mono-repo](https://nx.dev/) containing both the frontend and backend components of the project. The main source for each can be found under the 'apps' folder, while shared source code, such as the model definitions, form schemas etc can be found in the 'libs' folder.

For the backend, the main program in in the base `index.ts` file. Start here. Further, the `models` folder contains the db model definitions, the `controllers` folder containing the business logic for the APIs, and the `routes` folder containing the APIs themselves.

The frontend has the main `pages/_app.tsx` file, which in the entry point of the program, along with an `index.tsx` file representing the home page (`/`). There are also the the directories for the `\login` and the `\signup` routes. The `components` folder contains `.tsx` files that are related to the visuals and the logic thereof.
The `components/ui` folder contains components that can be reused, while other folders (`components/*`) contain discrete components with which the app is built. The `lib` folder has
all the API calls and other logic that is not visuals related.

The project uses `Next.Js` (`React`) for the frontend, `TailwindCSS` for styling, ui elements from `shadcn`/`radixui` + `zod` for forms, `swr` for caching data in the FE, `jsonwebtokens` for JWT based auth, `Node.js` for the backend, `express` for building APIs and routing, `mongoose` to interface with the db, and of course `MongoDB` for the database. This is all wrapped up in an `NX` mono-repo.

## Setup instructions:

### Prerequisites:
Please ensure you have the following installed and working on your machine:
`npm`
`Node v18 or greater`
`MongoDB` (Hint: You can use the free, online ver of MongoDB for quick testing)

### Step 1:
Download or clone the repo to your machine

### Step 2:
open a terminal and navigate to the project folder

### Step 3:
run `npm i` 

### Step 4:
create `.env` files in both `apps/frontend` and `apps/backend`. You can use the provided `.env.example` files as reference

### Step 5:
Edit the backend `.env` file, adding a value for port (e.g `4000`, `3000` is reserved the FE), the FE URL for CORS (`http://localhost:3000` if running locally), the `JWT_TOKEN_KEY` which can be anything, and the MongoDB url.

### Step 6: 
Similarly, edit the frontend `.env` file, adding the backend url (`localhost` if running locally) and the backend port you chose.

### Step 7:
Duplicate your terminal and run `npx nx serve frontend` in one and `npx nx serve backend` in another.

### Step 8:
After both terminals report ready, navigate to your chosen FE url + port 3000 on a browser (`http://localhost:3000` if running locally)

## Usage Instructions:

You will be redirected to the login page on startup. Navigate to the sign up page (`/signup`) and sign up with an email and a password. 

After sign up is complete, you will be logged in automatically. If not, please log in manually. 

Now you can create tasks using the (+) button, view your existing tasks, edit them, mark them as "Done" and delete them. 

Log out using the "Logout" button
