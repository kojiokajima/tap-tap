const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const path = require("path")
const {Pool} = require("pg")

const port = process.env.PORT || 3050
const app = express()
require("dotenv").config()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(cors({
  origin: ["http://localhost:3000"],
  methods:["GET", "POST"],
  credentials: true
}))
app.use(session({
  key: "token",
  secret: process.env.NODE_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 10
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(port, (req, res) => {
  console.log("SERVER IS RUNNING ON ", port);
})