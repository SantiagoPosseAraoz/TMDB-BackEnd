// Configuración del server
const express = require("express");
const morgan = require("morgan");
const db = require("./config/db");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use("/", router);

db.sync({ force: false }).then(() =>
  app.listen(5432, (req, res, next) => {
    console.log("API on port 5432");
  })
);
