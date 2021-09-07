const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const checkAuth = require("../server/JWT");
const authenticate = require("../server/middleware");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "UserId",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// This the beginning area for the sign in area

app.get("/", (req, res) => {
  res.send("Welcome to Fit-Pro!");
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO employees21.users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send(
      "Hmm, its looks like you may have provide incorrect information please try to Logging in again!"
    );
  } else {
    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Please try again!" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM employees21.users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;

            const id = result[0].id;
            const token = jwt.sign({ id }, process.env.JWTSECRET, {
              expiresIn: "1h",
            });
            return res.json({ auth: true, token: token, result: result });
          } else {
            res.json({
              auth: false,
              message: "wrong username/password combination!",
            });
          }
        });
      } else {
        res.json({ auth: false, message: "no user exists!" });
      }
    }
  );
});

app.get("/mealplan", checkAuth, (req, res) => {
  res.send("heres a new meal plan!");
});

app.get("/workout", (req, res) => {
  res.send("Heres a new workout hope you enjoy");
});

// this is the area for the bodycomp section ********

app.post("/create", (req, res) => {
  const weight = req.body.weight;
  const height = req.body.height;
  const age = req.body.age;
  const gender = req.body.gender;

  db.query(
    "INSERT INTO employees21.body_comp (weight, height, age, gender) VALUES (?,?,?,?)",
    [weight, height, age, gender],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Your Body Composition was added.");
      }
    }
  );
});

app.get("/bodycomp", (req, res) => {
  db.query("SELECT * FROM employees21.body_comp", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const weight = req.body.weight;
  db.query(
    "UPDATE employees21.body_comp SET weight = ? WHERE id = ?",
    [weight, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM employees21.body_comp WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// This is the end of the server*********

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
