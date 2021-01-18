require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./database/db");
const chalk = require("chalk");

const app = express();

// Set Up the database
mongoose.set("useCreateIndex", true);
mongoose
    .connect(db.database, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(chalk.green("===> Database is connected"));
    })
    .catch(err => {
        console.error({ database_error: err})
    });
// Setting up the db finish here

// Setup cors
app.use(cors());

// Setup the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

// My first route
app.get("/", (req, res) => {
    console.log(chalk.blue("Hello Someone is logging"));
});

const userRoutes = require("./api/user/route/user"); // Here goes all the routes user
app.use("/user", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(chalk.green(`Server started and is listening on port: ${PORT}`));
});
