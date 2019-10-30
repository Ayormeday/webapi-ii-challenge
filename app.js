const express = require("express");
const cors = require("cors");
const router = require("./data/db-router.js");
const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/posts", router);


app.get("/", (req, res) => {
    res.send(`
      HELLO THERE
    `);
  });





  module.exports = app;

