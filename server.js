const express = require('express');
const sequelize = require("./config/connection.js");
const app = express();
const PORT = process.env.PORT || 3000;

// import sequelize connection

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
  });
});
