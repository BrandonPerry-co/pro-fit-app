const router = require("express").Router();
const usersController = require('../controllers/users')
const { authenticate } = require('../middleware')

router.get("/books", usersController.getAllBooks)


router.get("/mealplan", usersController.getUserMealPlan)

router.get("/workout", authenticate, usersController.getUserWorkoutPlan)

router.get("/bodycomp/:id", authenticate, usersController.getUserById)

router.post("/bodycomp", authenticate, usersController.createBodyComp)

router.put("/bodycomp/:id", authenticate, usersController.updateBodyCompById)

router.delete("/bodycomp/:id", authenticate, usersController.deleteUserByUserName)

module.exports = router