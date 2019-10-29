const express = require('express')

const db = require("./db.js");

const router = express.Router();

router.get("/", (req, res) => {
    db.find(req.query)
      .then(db => {
        res.status(200).json(db);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the db"
        });
      });
  });

  module.exports = router;