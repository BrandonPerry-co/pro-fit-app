const express = require('express')
const usersController = require('../controllers/users')
const { authenticate } = require('../middleware')
const router = express.Router()

router.get('/mealplan', usersController.getUserMealPlan)

router.get('/workout', usersController.getUserWorkoutPlan)

router.get('/:id', authenticate, usersController.getUserById)

router.post('/bodycomp', authenticate, usersController.createBodyComp)

router.put('/:id', authenticate, usersController.updateBodyCompById)

router.delete('/:id', authenticate, usersController.deleteUserByUserName)

module.exports = router