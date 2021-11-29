const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Assignment = new Schema(
  {
    name: {
      type: String,
    },
    point: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assignment', Assignment);
