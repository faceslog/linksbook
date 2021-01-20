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
mongoose.set('useFindAndModify', false);
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

// This check makes sure this is a JSON parsing issue, but it might be
// coming from any middleware, not just body-parser:
app.use((err, req, res, next) => {

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        //console.error(err);
        return res.sendStatus(400); // Bad request
    }

    next();
});

app.use(morgan("dev"));

// My first route
app.get("/", (req, res) => {
    console.log(chalk.blue("Hello Someone is logging"));
});

const routes = require("./api/router/routes"); // Here goes all the routes user
app.use("/api", routes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(chalk.green(`Server started and is listening on port: ${PORT}`));
});
