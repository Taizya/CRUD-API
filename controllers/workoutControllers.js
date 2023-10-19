const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID is not valid" });
    }

    try {
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.json({
            _id: workout._id,
            title: workout.title,
            load: workout.load,
            reps: workout.reps,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//Create a workout

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(201).json(workout); // Use 201 status code for resource creation
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID is not valid' });
    }

    try {
        const workout = await Workout.findByIdAndDelete(id);

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.json({
            _id: workout._id,
            title: workout.title,
            load: workout.load,
            reps: workout.reps,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a workout

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID is not valid' });
    }

    try {
        const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.json({
            _id: workout._id,
            title: workout.title,
            load: workout.load,
            reps: workout.reps,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}