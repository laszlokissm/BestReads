const express = require('express');

const app = express();

// Add body-parser middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

const subscibeToRoutes = require('./routing/routing.js');
subscibeToRoutes(app);

//app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});