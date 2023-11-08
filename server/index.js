const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') //we could use express stuff instead
const router = require('./routes/router')
const mongoose = require('mongoose')
const mySchemas = require('./models/schemas');
require('dotenv/config')

const app = express();
app.use(cors()); // This will enable CORS for all routes and origins
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', router);

// DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});

// Middlewares
app.use(express.json());


const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});