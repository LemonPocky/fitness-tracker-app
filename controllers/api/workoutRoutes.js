const router = require('express').Router();
const Workout = require('../../models/workout');

// Returns all workouts
router.get('/', (req, res) => {});

// Create a new workout
router.post('/', (req, res) => {});

// Add an exercise to this workout
router.put('/:id', (req, res) => {});

// Returns last 7 workouts
router.get('/range', (req, res) => {});
