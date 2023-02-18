// Set dependencies
const express = require('express')


// initialize the application
const app = express()
const PORT = process.env.PORT || 3001

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Api routes
const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);
const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

// set up application listener
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});