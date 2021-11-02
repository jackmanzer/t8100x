const router = require('express').Router();
const { Workout } = require('../../models');
const { Exercise } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const workoutData = await Workout.findAll();
      res.status(200).json(workoutData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const workoutData = await Workout.findByPk(req.params.id, {
        include: [{ model: Exercise }]
      });
      if (!workoutData) {
        res.status(404).json({ message: 'No workout found with this id!' });
        return;
      }
      res.status(200).json(workoutData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

router.post('/', async (req, res) => {
    try {
      const newWorkout = await Workout.create({
        ...req.body
      });
  
      res.status(200).json(newWorkout);
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  });
  
router.delete('/:id', async (req, res) => {
    try {
      const workoutData = await Workout.destroy({
        where: {
          id: req.params.id
        },
      });
  
      if (!workoutData) {
        res.status(404).json({ message: 'No workout found with this id!' });
        return;
      }
  
      res.status(200).json(workoutData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  
  

module.exports = router;
