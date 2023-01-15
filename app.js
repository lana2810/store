const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const { initDatabase } = require("./startUp/initDatabase");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200,
  })
);
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  console.log(chalk.bgCyan("development mode"));
}

const PORT = process.env.PORT || 9000;

async function start() {
  try {
    await mongoose.connection.once("open", function () {
      initDatabase();
    });
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.blue("MongoDB connected"));

    app.listen(PORT, () => {
      console.log(chalk.blue(`Server has been started on port ${PORT}...`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}
start();
