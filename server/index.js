const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const path = require("path")
const { Pool } = require("pg")
const pg = require("pg")

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
    maxAge: 1000 * 60 * 60
  }
}))

const pool = new Pool({
  // const pool = new pg.Pool({
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
          if (!(email && password)) {
            console.log("SOME INPUT IS BLANK");
            req.session.error = "Please fill in all fields"
            res.redirect('/signin')
          } else if (!result.rows.length) {
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
      loggedIn: true
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


// ----------------------GET BEER DATA----------------------
app.get("/beerData", (req, res) => {
  const uid = req.session.uid
  console.log("this is beerData");

  pool.connect((errPool, db) => {
    console.log("IN POOL");
    db.query(
      // "SELECT * FROM beers inner join users on beers.user_id = users.id where users.id = $1",
      // "SELECT * FROM beers right outer join users on beers.user_id = users.id where users.id = $1;",
      "SELECT * FROM users inner join beers on beers.user_id = users.id where users.id = $1;",
      [uid],
      (errSelect, results) => {
        if (errSelect) {
          console.log("ERROR IN SELECT");
          console.log(errSelect);
        } else {
          console.log("SELECTED!");
          res.send(results.rows)
        }
      }
    )
  })
})

app.get("/allBeerData", (req, res) => {
  const uid = req.session.uid
  console.log("this is allBeerData");
  pool.connect((errPool, db) => {
    console.log("IN POOL");
    db.query(
      "SELECT * FROM beers WHERE user_id != $1",
      [uid],
      (errSelect, results) => {
        if (errSelect) {
          console.log("ERROR IN SELECT");
        } else {
          console.log("SELECTED!");
          res.send(results.rows)
        }
      }
    )
  })
})

app.get("/favoriteBeerData", (req, res) => {
  const uid = req.session.uid
  console.log("this is favoriteBeerData");

  pool.connect((errPool, db) => {
    console.log("IN POOL");
    db.query(
      "SELECT * FROM beers where user_id = $1 AND favorite = true",
      [uid],
      (errSelect, results) => {
        if (errSelect) {
          console.log("ERROR IN SELECT");
        } else {
          console.log("SELECTED!");
          res.send(results.rows)
        }
      }
    )
  })
})

app.get("/untappedBeerData", (req, res) => {
  const uid = req.session.uid
  console.log("this is untappedBeerData");
  pool.connect((errPool, db) => {
    console.log("IN POOL");
    db.query(
      "SELECT * FROM beers where user_id = $1 AND untapped = true",
      [uid],
      (errSelect, results) => {
        if (errSelect) {
          console.log(errSelect);
        } else {
          console.log("SELECTED!");
          res.send(results.rows)
        }
      }
    )
  })
})
// ----------------------/GET BEER DATA----------------------

// ----------------------UPDATE AND DELETE----------------------
app.post("/updateBeerData", (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const brewery = req.body.brewery
  const style = req.body.style
  const memo = req.body.memo
  const untapped = !!req.body.untapped
  console.log("this is update");


  if (req.body.id) {
    pool.connect((errConnect, db) => {
      console.log("IN POOL");
      db.query(
        "update beers set (name, brewery, style, memo, untapped) = ($1, $2, $3, $4, $5) where id = $6",
        [name, brewery, style, memo, untapped, id],
        (errUpdate, result) => {
          if (errUpdate) {
            console.log("ERROR IN UPDATE");
            console.log(errUpdate);
          } else {
            console.log("UPDATED!");
            res.redirect("/dashboard/" + req.session.uid)
          }
        }
      )
    })
  } else {
    res.send({noRes: true})
  }
});

app.post("/toggleFavorite", (req, res) => {
  const favorite = !req.body.favorite
  const id = req.body.id
  console.log("this is toggle favorite");

  if (req.session.uid) {
    pool.connect((errPool, db) => {
      console.log("IN POOL");
      db.query(
        "UPDATE beers set favorite = $1 where id = $2",
        [favorite, id],
        (errUpdate, result) => {
          if (errUpdate) {
            console.log("ERROR IN RESULT");
          } else {
            console.log("UPDATED!");
            res.redirect("/dashboard/" + req.session.uid)
          }
        }
      )
    })
  } else {
    res.end()
  }
})

app.post("/deleteItem", (req, res) => {
  const id = req.body.id
  console.log("thi is delete");
  console.log(id);

  if (req.session.uid) {
    pool.connect((errPool, db) => {
      console.log("IN POOL");
      db.query(
        "DELETE FROM beers where id = $1",
        [id],
        (errDelete, result) => {
          if (errDelete) {
            console.log("ERROR IN DELETE");
          } else {
            console.log("DELETED!");
            res.redirect("/dashboard/" + req.session.uid)
          }
        }
      )
    })
  } else {
    res.end()
  }
  // res.end()

})

// ----------------------/UPDATE AND DELETE----------------------


// ----------------------ADD----------------------
app.post("/addBeer", (req, res) => {
  const userId = req.session.uid
  const name = req.body.name
  const brewery = req.body.brewery
  const style = req.body.style
  const memo = req.body.memo
  console.log("this is add");
  console.log(req.session.uid);

  if (req.session.uid) {
    console.log("IN IF");
    pool.connect((errPool, db) => {
      console.log("IN POOL");
      db.query(
        "INSERT INTO beers (user_id, name, brewery, style, memo, untapped, favorite) VALUES ($1, $2, $3, $4, $5, true, false)",
        [userId, name, brewery, style, memo],
        (errInsert, result) => {
          if (errInsert) {
            console.log("ERROR IN INSERT");
          } else {
            console.log("BEER ADDED");
            res.redirect("/dashboard/" + req.session.uid)
          }
        }
      )
    })
  } else {
    res.end()
  }
})

app.post("/addToMine", (req, res) => {
  const userId = req.body.currentUserId
  const name = req.body.name
  const brewery = req.body.brewery
  const style = req.body.style
  const memo = req.body.memo
  console.log("this is add to mine");
  // id: 5,
  // userId: 6,
  // name: 'Sierra Nevada',
  // brewery: 'Sierra Nevada Pale Ale',
  // style: 'American Pale Ale',
  // memo: 'Ligid',
  // untapped: true
  if (req.session.uid) {
    pool.connect((errPool, db) => {
      console.log("IN POOL");
      db.query(
        "INSERT INTO beers (user_id, name, brewery, style, memo, untapped, favorite) VALUES ($1, $2, $3, $4, $5, true, false)",
        [userId, name, brewery, style, memo],
        (errInsert, result) => {
          if (errInsert) {
            console.log("ERROR IN INSERT");
          } else {
            console.log("ADDED TO YOURS!");
            res.redirect("/dashboard/" + req.session.uid)
          }
        }
      )
    })
  } else {
    res.end()
  }
})

// ----------------------/ADD----------------------


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, (req, res) => {
  console.log("SERVER IS RUNNING ON ", port);
})