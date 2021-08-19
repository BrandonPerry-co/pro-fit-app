const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getUserMealPlan = (req, res) => {
  pool.query("SELECT height, weight, age FROM employees21.body_comp", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.send('heres a new meal plan!');
  })
}

const getUserWorkoutPlan = (req, res) => {
  pool.query("SELECT height, weight, age FROM employees21.body_comp", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.send('Heres a new workout hope you enjoy');
  })
}

const getUserById = (req, res) => {
  let sql = "SELECT * FROM employees21.users WHERE users_id = ?"
  sql = mysql.format(sql, [ req.params.users_id ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    res.send('Welcome user to Fit-Pro!');
  })
}

const createBodyComp = (req, res) => {
  const { weight, height, age, gender } = req.body
  let sql = "INSERT INTO employees21.body_comp (weight, height, age, gender) VALUES (?, ?, ?, ?)"
  sql = mysql.format(sql, [ weight, height, age, gender ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateBodyCompById = (req, res) => {
  const { weight, height, age } = req.body
  let sql = "UPDATE employees21.body_comp SET weight = ?, height = ?, age = ? WHERE user_id = ?"
  sql = mysql.format(sql, [ weight, height, age, req.params.id ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByUserName = (req, res) => {
  let sql = "DELETE FROM employees21.users WHERE username = ?"
  sql = mysql.format(sql, [ req.params.username ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getUserWorkoutPlan, 
  getUserMealPlan,
  getUserById,
  createBodyComp,
  updateBodyCompById,
  deleteUserByUserName
}