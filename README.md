# BookNJ

[Live Site](https://booknj.onrender.com/)

## Summary

This project is a clone of Airbnb, currently focused on spots and reviews. The primary goal is to provide users with the ability to manage spots and leave reviews for an interactive user experience.

<!-- ## Screenshots -->

![Spot](/frontend/public/images/example.png)

## Build and Run Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/triplegdev/booknj.git
    ```

2. Install dependencies for the backend:

    ```bash
    (from the root directory)
    cd backend
    npm install
    ```

3. Install dependencies for the frontend:

    ```bash
    (from the root directory)
    cd frontend
    npm install
    ```

4. Copy the `.env.example` file to `.env` in the backend folder:

    ```bash
    cp .env.example .env
    ```
    ```
    - PORT is the port you want the backend server to run this can default to 8000
    - DB_FILE is the location of your dev database
    - JWT_SECRET is the secret phrase for your JWT token
    - JWT_EXPIRES_IN is the amount of time in seconds until your JWT tokens expire
    - SCHEMA is the name you give for your production schema
    ```


5. Add a proxy to your package.json file in your frontend directory. This should match the port that you input in step 4:

    ```json
    Example: "proxy": "http://localhost:8000"
    ```

6. Navigate to your backend directory in a terminal and run:
    ```bash
    npm start
    ```

7. Navigate to your frontend directory in a terminal and run:
    ```bash
    npm start
    ```

8. Your browser will now open and you can begin navigating the application

## Tech Stack

Backend technologies:
- Sequelize <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/sequelize-colored.svg" width="20px" style="vertical-align: middle">
- Express <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/express-colored.svg" width="20px" style="vertical-align: middle">
- PostgreSQL <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/postgresql-colored.svg" width="20px" style="vertical-align: middle">
- Node.js <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="20px" style="vertical-align: middle">

Frontend technologies:
- React <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/react-colored.svg" width="20px" style="vertical-align: middle">
- Redux <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/redux-colored.svg" width="20px" style="vertical-align: middle">
- HTML5 <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/html5-colored.svg" width="20px" style="vertical-align: middle">
- CSS3 <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/css3-colored.svg" width="20px" style="vertical-align: middle">

Other technologies:
- Git <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/git-colored.svg" width="20px" style="vertical-align: middle">
- VisualStudioCode <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/vscode-colored.svg" width="20px" style="vertical-align: middle">
- JavaScript <img src="https://raw.githubusercontent.com/triplegdev/readme-generator/main/public/icons/skills/javascript-colored.svg" width="20px" style="vertical-align: middle">

## Project Links

<!-- - [Feature List Document](link-to-feature-list-document) -->
- [React Components List](/frontend/README-react-components.md)
- [Database Schema](/backend/images/schema.png)
- [Frontend Routes Document](/frontend/README-routes.md)
- [API Routes Document](/backend/README.md)
- [Redux Store Tree Document](/frontend/README-redux-tree.md)

## To-Dos/Future Features

Booking System:

- Allow users to book spots for specific dates and times.
- Implement a reservation system with booking confirmation.

Image Upload and Replacement:

- Replace current image url input with the ability to upload images to showcase spots.

## Technical Implementation Details

- The number of action types and reducers are minimized.
- Reducers handle the normalization of state for efficient retrievals.
```javascript
case GET_SPOTS: {
    const spots = action.spots.reduce((obj, spot) => {
        obj[spot.id] = spot;
        return obj;
    }, {});
    return { ...spots };
}
```
