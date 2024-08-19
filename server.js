const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

// Create an instance of an Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in the routes folder
app.use(routes);

// Sync Sequelize models to the database and then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});