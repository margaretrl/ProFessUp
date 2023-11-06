const mongoose = require('mongoose');
/*
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('../server/routes/router')
const mongoose = require('mongoose')
require('dotenv/config')
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', router);*/
const Schema = mongoose.Schema;

const professorSchema = new Schema({
    username: {type:String, required:true},
    fullName: {type:String, required:true},
    joinedDate: {type:Date, default:Date.now},
    rating: {type:Int16Array, required:false, defaul:null},
    workload: {type:Int16Array, required:false, defaul:null},
    popQuizzes: {type:Boolean,required:false, defaul:null}, 
    participation: {type:Boolean,required:false, defaul:null},
    difficulty: {type:Int16Array, required:false, defaul:null},
    overallScore: {type:Int16Array, required:false, defaul:null},
    groupProject:{type:Boolean,required:false, defaul:null}
});


const Professors = mongoose.model('professors', professorSchema, 'professors');
/*
// DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});


const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});*/

module.exports = Professors;

document.addEventListener("DOMContentLoaded", function () {
    // Wait for the DOM to be fully loaded

    // Get references to the HTML elements
    const titleSelect = document.getElementById("titleSelect");
    const nameInput = document.getElementById("nameInput");
    const addProfessorButton = document.getElementById("addProfessorButton");

    // Add a click event listener to the "Add Professor" button
    addProfessorButton.addEventListener("click", async function () {
        // Get the selected title and name from the input fields
        const selectedTitle = titleSelect.value;
        const professorName = nameInput.value;

        const newProfessor = new Professors({
            username: selectedTitle,
            fullName: professorName,
            joinedDate: Date.now,
            rating: null,
            workload: null,
            popQuizzes: null, 
            participation: null,
            difficulty: null,
            overallScore: null,
            groupProject: null
          });

        newProfessor.save()
        .then((result) => {
            console.log('New professor added:', result);
            titleSelect.value = "N/A";
            nameInput.value = "";
        })
        .catch((err) => {
            console.error('Error adding professor:', err);
        });
    });
});
