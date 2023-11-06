const mongoose = require('mongoose');
const { Schema } = mongoose;

// Reviewer Schema
const reviewerSchema = new Schema({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  entryDate: { type: Date, default: Date.now },
  password: { type: String, required: true }
});

// Review Schema
const reviewSchema = new Schema({
  reviewer: { type: Schema.Types.ObjectId, ref: 'Reviewers', required: true },
  workload: { type: Number, required: false },
  participation: { type: Boolean, required: false },
  popQuizzes: { type: Boolean, required: false },
  difficulty: { type: Number, required: false },
  overallScore: { type: Number, required: false },
  groupProject: { type: Boolean, required: false },
  professorAccessibility: { type: Number, required: false },
  quizQType: { type: String, required: false },
  anonymousReviews: { type: Boolean, required: false },
  attendance: { type: Boolean, required: false },
  textbook: { type: Boolean, required: false },
  extraCredit: { type: Boolean, required: false },
  professor: { type: Schema.Types.ObjectId, ref: 'Professors', required: false }
  //course: { type: Schema.Types.ObjectId, ref: 'Courses', required: false },
});

// Professor Schema
const professorSchema = new Schema({
  fullName: { type: String, required: true },
  joinedDate: { type: Date, default: Date.now }
});

// Create models
const Reviewers = mongoose.model('Reviewers', reviewerSchema);
const Reviews = mongoose.model('Reviews', reviewSchema);
const Professors = mongoose.model('Professors', professorSchema);

// Export the schemas
module.exports = {
  Reviewers,
  Reviews,
  Professors
};
