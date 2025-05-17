const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'bestreads-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));

app.set('view engine', 'ejs');

const subscibeToRoutes = require('./routing/routing.js');
subscibeToRoutes(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});