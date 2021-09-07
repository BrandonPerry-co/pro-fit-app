const router = require("express").Router();
const { signup, login } = require('../controllers/auth');

router.post("/auth/signup", signup)

router.get("/auth/login", login)

module.exports = router;