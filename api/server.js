// Configuración del server
const express = require("express");
const morgan = require("morgan")
const db = require("./config/db");
const router = require("./routes")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(morgan("tiny"));
app.use("/", router)

db.sync({ force: false }).then(() =>
  app.listen(1337, (req, res, next) => {
    console.log("API on port 1337");
  })
);
