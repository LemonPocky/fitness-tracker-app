const mongoose = require('mongoose');

const { Schema } = mongoose;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
  },

  // Exercises is an array of exercise objects.
  exercises: [
    {
      type: String,
      name: String,
      distance: Number,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
    },
  ],
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
