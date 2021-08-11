const router = require('express').Router();
const Workout = require('../../models/workout');

// Returns all workouts
router.get('/', async (req, res) => {
  try {
    const docs = await Workout.aggregate().addFields({
      totalDuration: { $sum: '$exercises.distance' },
    });
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
router.get('/range', (req, res) => {});

module.exports = router;
