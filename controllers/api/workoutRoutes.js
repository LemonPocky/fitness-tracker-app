const router = require('express').Router();
const Workout = require('../../models/workout');

// Returns all workouts
router.get('/', async (req, res) => {
  try {
    const docs = await Workout.aggregate([
      {
        $addFields: {
          totalDistance: { $sum: '$exercises.distance' },
          totalDuration: { $sum: '$exercises.duration' },
          totalWeight: { $sum: '$exercises.weight' },
          totalReps: { $sum: '$exercises.reps' },
          totalSets: { $sum: '$exercises.sets' },
        },
      },
    ]);
    res.json(docs);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Create a new workout
router.post('/', async (req, res) => {
  try {
    const data = await Workout.create(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Add an exercise to this workout
router.put('/:id', async (req, res) => {
  try {
    const data = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      { new: true }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// Returns last 7 workouts
router.get('/range', async (req, res) => {
  try {
    // Get 7 latest entries by sorting from highest to lowest
    const data = await Workout.aggregate()
      .sort({ _id: -1 })
      .limit(7)
      .addFields({
        totalDistance: { $sum: '$exercises.distance' },
        totalDuration: { $sum: '$exercises.duration' },
        totalWeight: { $sum: '$exercises.weight' },
        totalReps: { $sum: '$exercises.reps' },
        totalSets: { $sum: '$exercises.sets' },
      });
    // Sort array from lowest to highest id
    data.sort((a, b) => (a._id < b._id ? -1 : 1));
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
