
# MOVIE HUB 

In this project we have made an interface made with React+Typescript and used the MUI library to make the components. On the other hand, we have created a database and its server to manage the API.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies and Concepts](#technologies-and-concepts)
- [Conclusion](#conclusion)
- [Preview](#preview)

## Introduction

In this new project, I finally proposed a social network where people upload movies, rate them and can add comments. There is a public main page /home, where all uploaded movies are displayed and can be divided by genre. In another, private, /user/:userId, the user can see the cards of the movies they have uploaded and add new movies. The idea is that by selecting your own movies you can edit them and on other users' movies you can add comments.

## Features
- Search and view movie data
- Searching and filtering Books.
- Moves management
- Login management

## Requirements
To run the project, you need to have the following requirements installed:
- Node.js
- pnpm (or npm)
- Vite

## Installation
Follow these steps to install the project:
1. Clone the repository:
```sh
git clone https://github.com/ebroto7/MovieHub_Front.git
```

2. Navigate to the project directory:
```sh
cd MovieHub_front
```

3. Install the dependencies:
```sh
pnpm install
```
4. run 
 ```sh
pnpm run dev
```
5. open sql shell and run your server

6. you need to create the project in auth0 and generate the following routes:
    - Allowed callback URLs => http://localhost:5173/user
    - Allowed logout URLs => http://localhost:5173/home
    - Allowed web origins  => http://localhost:5173/home



## Usage

To run the project, follow these steps and commands:

1. Create a `.env` file in the root of your project with the following content:
```sh
VITE_API_BASE_URL=
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENTID=
VITE_AUTH0_CLIENT_SECRET=
```
Additionally, you can find an example of the .env file in the config folder named env.example. This file serves as a template for your configuration.

2. Run server
    - view : https://github.com/ebroto7/MovieHub.git

3. Run the development server:

 ```sh
pnpm run dev
```

Access the project through your browser at http://localhost:5173/home.

## Technologies and Concepts
HTML, CSS
TypeScript
React
Vite
Prop-drilling
useState, useEffect
Conditionals and error handling
React Router
useContext
Inputs and forms
Async/Await
AXIOS
React Router with dynamic and private routes
useParams, useRef, useId, custom hooks
useReducer
include external libraries
react icons
MUI

## Conclusion
I can say that this project has been very hard for me. Being a project in which we basically had to learn the entire backend part and apply the knowledge acquired to create the server and the API, apart from the front end it was done in practically 3 days. That's why I chose to use the MUI library. So the result is not optimal and I would like to have been able to add many more features.
