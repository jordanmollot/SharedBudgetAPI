const express = require("express");

const routes = require("./routes");

const app = express();
app.use(express.json());

app.use(routes);

module.exports = app;


// -----
// formerly server.js

// const express = require("express");

// const routes = require("./routes");

// const server = express();
// server.use(express.json());

// server.use(routes);

// module.exports = server;