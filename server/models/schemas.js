const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewerSchema = new Schema({
    username: {type:String, required:true},
    fullname: {type:String, required:true},
    entryDate: {type:Date, default:Date.now,
    }
});

const professorSchema = new Schema({
    name: {type:String, required:true},
    user: {type:Schema.Types.ObjectId, ref:'users'}
});

const Reviewers = mongoose.model('reviewers', reviewerSchema, 'reviewers');
const Professors = mongoose.model('professors', professorSchema, 'professors');
const mySchemas = {'Reviewers':Reviewers, 'Professors':Professors};

module.exports = mySchemas;