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
- Sequelize <img src="https://camo.githubusercontent.com/a2ef2bb116ae565bb254cbb11194dae357eb7582a8babeab337bd3932687d63d/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f73657175656c697a652f73657175656c697a652d6f726967696e616c2e737667" width="20px" style="vertical-align: middle">
- Express <img src="https://camo.githubusercontent.com/40756575fc2fd74b1883ea0cc5c2a49aa7048ab58286f43a121109d69a9ea160/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f657870726573732f657870726573732d6f726967696e616c2e737667" width="20px" style="vertical-align: middle">
- PostgreSQL <img src="https://camo.githubusercontent.com/d536b9cc0c533324368535ece721f5424f28eae3ec0e6f3847408948ecacfce6/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f706f737467726573716c2f706f737467726573716c2d6f726967696e616c2e737667" width="20px" style="vertical-align: middle">
- Node.js <img src="https://camo.githubusercontent.com/900baefb89e187c8b32cdbb3b440d1502fe8f30a1a335cc5dc5868af0142f8b1/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6e6f64656a732f6e6f64656a732d6f726967696e616c2e737667" width="20px" style="vertical-align: middle">

Frontend technologies:
- React <img src="https://camo.githubusercontent.com/27d0b117da00485c56d69aef0fa310a3f8a07abecc8aa15fa38c8b78526c60ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656163742f72656163742d6f726967696e616c2e737667" width="20px" style="vertical-align: middle">
- Redux <img src="https://camo.githubusercontent.com/2b6b50702c658cdfcf440cef1eb88c7e0e5a16ce0eb6ab8bc933da7697c12213/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f72656475782f72656475782d6f726967696e616c2e737667" width="20px" style="vertical-align: middle">
- HTML5 <img src="https://camo.githubusercontent.com/da7acacadecf91d6dc02efcd2be086bb6d78ddff19a1b7a0ab2755a6fda8b1e9/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f68746d6c352f68746d6c352d6f726967696e616c2e737667" width="20px" style="vertical-align: middle">
- CSS3 <img src="https://camo.githubusercontent.com/2e496d4bfc6f753ddca87b521ce95c88219f77800212ffa6d4401ad368c82170/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f637373332f637373332d6f726967696e616c2e737667" width="20px" style="vertical-align: middle">

Other technologies:
- Git <img src="https://camo.githubusercontent.com/dc9e7e657b4cd5ba7d819d1a9ce61434bd0ddbb94287d7476b186bd783b62279/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6769742f6769742d6f726967696e616c2e737667" width="20px" style="vertical-align: middle">
- VisualStudioCode <img src="https://camo.githubusercontent.com/39ddd51193b851f304bd6c335bc25a837ec7cafbbc4876fa78b994f5e95094ac/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f76697375616c73747564696f2f76697375616c73747564696f2d706c61696e2e737667" width="20px" style="vertical-align: middle">
- JavaScript <img src="https://camo.githubusercontent.com/442c452cb73752bb1914ce03fce2017056d651a2099696b8594ddf5ccc74825e/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6a6176617363726970742f6a6176617363726970742d6f726967696e616c2e737667" width="20px" style="vertical-align: middle">

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
