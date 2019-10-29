const express = require('express')

const db = require("./db.js");

const router = express.Router();
const errorMessage = "There was an error with this request..."

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


router.post("/", (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } else {
        db.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
})

// router.post("/:id/comments", (res, req) => {
//     const { id } = req.params;
//     const { text } = req.body;

//     db.findById(id)
//     .then(post => {
//         res.status(200).json(post);
//     })
//     .catch(error => {
//         console.log(error)
//         res.status(404).json({ message: "The post with the specified ID does not exist." });
//     });
// })


  module.exports = router;