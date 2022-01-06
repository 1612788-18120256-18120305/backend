const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GradeReview = new Schema(
  {
    studentId: String,
    assignmentId: Schema.Types.ObjectId,
    expectedGrade: Number,
    actualGrade: Number,
    message: String,
    status: {
      type: Number,
      default: 0,
    }, // 0: pending, 1: approved, 2: rejected
  },
  { timestamps: true }
);

module.exports = mongoose.model('GradeReview', GradeReview);
