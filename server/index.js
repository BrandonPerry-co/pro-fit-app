const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require('./routers/users');
const authRouter = require('./routers/auth');
const { logger } = require('./middleware');


const app = express();
const port = process.env.PORT || 4001;

require('dotenv').config();

app.use(bodyParser.json())
app.use(logger)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Welcome to Fit-Pro!')
})

// app.get('/mealplan', (req, res) => {
//     res.send('heres a new meal plan!')
//   })

//   app.get('/workout', (req, res) => {
//     res.send('Heres a new workout hope you enjoy')
//   })  

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});