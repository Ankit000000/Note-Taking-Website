# Full Stack Application Setup

## Frontend Setup

1. Create a Vite React project:
    ```bash
    npm create vite@latest . -- --template react
    ```

2. Install Tailwind CSS and its dependencies:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    ```

3. Initialize Tailwind CSS:
    ```bash
    npx tailwindcss init -p
    ```

4. Configure `tailwind.config.js`:
    ```js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

5. Set up `index.css`:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

6. Start the development server:
    ```bash
    npm run dev
    ```

7. Access the frontend at [http://localhost:5173](http://localhost:5173).

## Backend Setup

1. Initialize a new Node.js project:
    ```bash
    npm init
    ```

2. Install Express:
    ```bash
    npm i express
    ```

3. Create `server.js`:
    ```js
    const express =  require('express');
    const { homepage } = require('./routes/cproutes');
    
    const app = express();
    const PORT = 4000;
    
    app.get('/api/carpool', homepage);
    
    app.listen(PORT, () => {
        console.log(`Backend is started on PORT ${PORT}`);
    });
    ```

4. Set up routes in `routes/cproutes.js`:
    ```js
    const homepage = (req, res) => {
        res.send({msg: "The Backend is Running fine bruh"});
    }
    
    module.exports = {homepage};
    ```

5. Update `package.json` to include a start script:
    ```json
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "nodemon server.js"
    }
    ```

6. Start the backend server:
    ```bash
    npm run dev
    ```

7. Access the backend at [http://localhost:4000/api/carpool](http://localhost:4000/api/carpool).

## Running Both Frontend and Backend

To run both the frontend and backend simultaneously, use the `concurrently` package. Ensure you have `concurrently` installed and add the following script to your `package.json` in the root directory:

```json
"scripts": {
  "dev": "concurrently \"npm run dev --prefix frontend\" \"npm run dev --prefix backend\""
}
