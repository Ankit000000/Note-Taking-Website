const express =  require('express')
const hyperlinksRoutes = require('./routes/hyperlinksRoutes')
const notesRoutes = require('./routes/notesRoutes')
const mongoose = require('mongoose')

const app = express()

const PORT = 4000

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/uploads', express.static('uploads'))
app.use('/uploads2', express.static('uploads2'))

// Middleware to enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
});

app.use('/api/carpool', hyperlinksRoutes);
app.use('/api/notes', notesRoutes);


try {
    mongoose.connect('mongodb://localhost:27017/xdb1')
    .then( () =>{
        app.listen(PORT, (req, res) => {
            console.log(` Backend is started on PORT ${PORT} \n Database is also connected `)
        })
    })
    .catch( (err) => {
        console.log("Error in starting the Server,    ", err)
    })
}
catch (err) {
    console.log("Error in connecting to the Database,    ", err)
}
