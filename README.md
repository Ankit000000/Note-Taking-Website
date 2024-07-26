To create the Frontend 

1. npm create vite@latest . -- --template react
2. npm install -D tailwindcss postcss autoprefixer
3. npx tailwindcss init -p

4. tailwind.config.js

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

5. index.css

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

6. npm run dev
7. http://localhost:5173







To create the Backend 

1. npm init
2. npm i express

3. server.js

    const express =  require('express')
    const { homepage } = require('./routes/cproutes')
    
    const app = express()
    
    const PORT = 4000
    
    app.get('/api/carpool', homepage)
    
    app.listen(PORT, (req, res) => {
        console.log(` Backend is started on PORT ${PORT} `)
    })

4. routes/cproutes.js

    const homepage = (req, res) => {
        res.send({msg: "The Backend is Running fine bruh"})
    }
    
    module.exports = {homepage}

5. package.json

    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "nodemon server.js"
    },

6. npm run dev
7. http://localhost:4000/api/carpool







To run the whole application from the Root ( using concurrently package )

type in terminal - run run dev