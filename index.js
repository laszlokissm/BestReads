const express = require('express');
const session = require('express-session');

const app = express();

// Add body-parser middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add session middleware
app.use(session({
  secret: 'bestreads-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 hour
}));

app.set('view engine', 'ejs');

const subscibeToRoutes = require('./routing/routing.js');
subscibeToRoutes(app);

//app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

/*
TODO
auth middleware
--------------------------
ha nincs belepve: redirect to /login
ha be van lepve:
		ha admin
			latja a manage oldalakat
		ha user
			nem latja a manage oldalakat
			ha odanavigalna akkor redirect /-re (?)
------------------------------------------------

fix models (reviews and user books)

users crud
book details view
login, register, logout
home view

*/