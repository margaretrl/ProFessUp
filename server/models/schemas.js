const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewerSchema = new Schema({
    username: {type:String, required:true},
    fullName: {type:String, required:true},
    entryDate: {type:Date, default:Date.now,
    }
});

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

const Reviewers = mongoose.model('reviewers', reviewerSchema, 'reviewers');
const Professors = mongoose.model('professors', professorSchema, 'professors');
const mySchemas = {'Reviewers':Reviewers, 'Professors':Professors};

module.exports = mySchemas;