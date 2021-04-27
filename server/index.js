const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const path = require("path")
const { Pool } = require("pg")

const port = process.env.PORT || 3050
const app = express()
require("dotenv").config()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}))
app.use(session({
  key: "token",
  secret: process.env.NODE_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 10
  }
}))

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

pool.connect((err, res) => {
  if (err) {
    console.log("FAILED TO CONNECT TO DATABASE");
    console.log(err);
  } else {
    console.log("CONNECTED TO DATABASE");
  }
})

// ----------------------SIGN IN----------------------
app.post('/signin', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  req.session.error = ""

  pool.connect((er, db) => {
    if (er) {
      console.log("FAILED TO CONNECT TO DATABASE");
      console.log(er);
    } else {
      db.query(
        "SELECT * FROM users where email = $1",
        [email],
        (err, result) => {
          if (err) {
            console.log("ERROR IN SELECT");
            console.log(err);
          }
          if (!result.rows.length) {
            console.log("NO USER EXIST FOR THIS EMAIL");
            req.session.error = "No user exist for this email"
            res.redirect('/signin')
          } else {
            bcrypt.compare(password, result.rows[0].password, (error, isMatch) => {
              if (isMatch) {
                const id = result.rows[0].id
                const token = jwt.sign({ id }, process.env.NODE_JWT_SECRET, {
                  expiresIn: 300,
                })

                req.session.token = token
                req.session.loggedIn = true
                req.session.firstName = result.rows[0].f_name
                req.session.lastName = result.rows[0].l_name
                req.session.email = result.rows[0].email
                req.session.uid = result.rows[0].id
                // req.session.image = 

                req.session.error = ""
                res.redirect('/dashboard/' + req.session.uid)
              } else {
                console.log("PASSWORD IS NOT CORRECT");
                req.session.error = "Password is not correct"
                res.redirect("/signin")
              }
            })
          }
        }
      )
    }
  })
})

app.get('/signin', (req, res) => {
  if (req.session.error) {
    res.send({
      error: req.session.error,
      loggedIn: false
    })
  } else {
    res.send({
      loggedin: true
    })
  }
})

app.post('/test', (req, res) => {
  res.redirect('/signin')
})
// ----------------------/SIGN IN----------------------


// ----------------------SIGN UP----------------------
app.post('/signup', (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  req.session.error = ""

  if (!(firstName && lastName && email && password && confirmPassword)) {
    console.log("SOME INPUT IS BLANK");
    req.session.error = "Please fill in all fields"
    res.redirect("/signup")
  } else if (password !== confirmPassword) {
    console.log("PASSWORDS DO NOT MATCH");
    req.session.error = "Passwords do not match"
    res.redirect("/signup")
  } else {
    bcrypt.hash(password, 10, (errHash, hash) => {
      if (errHash) {
        console.log("ERROR IN HASH");
        console.log(errHash);
        // --------put some string to req.session.error?--------
        req.session.error = "Some error in hash password"
        res.redirect("/signup")
      } else {
        pool.connect((errPool, db) => {
          db.query(
            "INSERT INTO users (f_name, l_name, email, password) VALUES ($1, $2, $3, $4)",
            [firstName, lastName, email, hash],
            (errInsert, result) => {
              if (errInsert) {
                console.log("ERROR IN INSERT");
                console.log(errInsert);
                req.session.error = "Some error in insert"
                res.redirect("/signup")
              } else {
                console.log("USER ADDED");
                res.redirect("/signin")
              }
            }
          )
        })
      }
    })
  }
})

app.get("/signup", (req, res) => {
  res.send(req.session.error)
})
// ----------------------/SIGN UP----------------------


// ----------------------USER AUTH----------------------
app.get("/userAuth", (req, res) => {
  if (req.session.loggedIn) {
    res.send({
      uid: req.session.uid,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      email: req.session.email,
      loggedIn: true
    })
  } else {
    res.send({
      loggedIn: false
    })
  }
})
// ----------------------/USER AUTH----------------------


// ----------------------BEER DATA----------------------
app.get("/beerData", (req, res) => {
  const uid = req.session.uid
  // console.log("UID ISIS beerData ", uid);
  pool.connect((errPool, db) => {
    db.query(
      "SELECT * FROM beers inner join users on beers.user_id = users.id where users.id = $1",
      [uid],
      (errSelect, results) => {
        res.send(results.rows)
      }
    )
  })
})

app.get("/allBeerData", (req, res) => {
  const uid = req.session.uid
  // console.log("UID ISIS ", uid);
  pool.connect((errPool, db) => {
    db.query(
      "SELECT * FROM beers WHERE user_id != $1",
      [uid],
      (errSelect, results) => {
        res.send(results.rows)
      }
    )
  })
})
// ----------------------/BEER DATA----------------------

// ----------------------UPDATE----------------------
app.post("/updateBeerData", (req, res) => {
  // --> raeHeaders[15]
  console.log();
  const id = req.body.id
  const name = req.body.name
  const brewery = req.body.brewery
  const style = req.body.style
  const memo = req.body.memo
  console.log("REQ.BODY IS ", req.body);
  // if (req.rowHeaders)
  console.log("REQ IS ", req.rawHeaders[15]);
  
  
  pool.connect((errConnect, db) => {
    db.query(
      "update beers set (name, brewery, style, memo) = ($1, $2, $3, $4) where id = $5",
      [name, brewery, style, memo, id],
      (errUpdate, result) => {
        if (errUpdate) {
          console.log("ERROR IN UPDATE");
        }
      }
    )
  })
  res.redirect(req.rawHeaders[15])
  // res.links({next: req.rawHeaders[15]})

})
// ----------------------/UPDATE----------------------


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, (req, res) => {
  console.log("SERVER IS RUNNING ON ", port);
})