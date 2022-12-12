const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", "postgres://tpyfklff:sqg48Z-ZcHr1H05F5fdjW7W7Sa9Uggig@peanut.db.elephantsql.com/tpyfklff") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
