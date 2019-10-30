const express = require("express");

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

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  //checks for title and contents
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    //add post
    db.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

// Creates a comment for the post with the specified id using information sent inside of the request body.
router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  // check required text
  if (!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." })
      .end();
  }
  // find post
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        // add comment
        db.insertComment({ text, post_id: id })
          .then(comment => {
            // get comment data
            db.findCommentById(comment.id)
              .then(newComment => {
                res.status(201).json(newComment);
              })
              .catch(() => {
                res
                  .status(500)
                  .json({
                    errorMessage: "Could not get newly created comment."
                  })
                  .end();
              });
          })
          .catch(() => {
            res
              .status(500)
              .json({
                error:
                  "There was an error while saving the comment to the database"
              })
              .end();
          });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
        .end();
    });
});


//retireve posts from data base
router.get("/", (req, res) => {
    db.find(req.query)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });
  });

router.get("/:id", (req, res) => {
    const { id } = req.params;
    //find post by id
    db.findById(id).then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        db.findById(id)
          //add the retrieved post
          .then(newPost => {
            res.status(200).json(newPost);
          })
          .catch(error => {
            res
              .status(500)
              .json({
                error: "The comments information could not be retrieved."
              });
          });
      }
    });
  });
  

//get data comments by id
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  //find post by id
  db.findById(id).then(post => {
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      db.findPostComments(id)
        //add the retrieved post
        .then(newPost => {
          res.status(200).json(newPost);
        })
        .catch(() => {
          res.status(500).json({
            error: "The comments information could not be retrieved."
          });
        });
    }
  });
});

//handles delete request
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id).then(post => {
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      db.remove(id)
        .then(deletedPost => {
          res.status(200).json(deletedPost);
        })
        .catch(() => {
          res.status(500).json({ error: "The post could not be removed" });
        });
    }
  });
});




// when clients makes a put request
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    // check required title and contents
    if (!title || !contents ) {
      res
        .status(400)
        .json({ errorMessage: "Please provide title and contents for the post." })
        .end();
    }
    // find post
    db.findById(id)
      .then(post => {
        if (post.length === 0) {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        } else {
          // add post
          const postToAdd = {
              title,
              contents
          }
          db.update(id, postToAdd)
          .then(newPost => {
              res.status(200).json(newPost)
          })
          .catch(() => {
              res.status(500).json({ error: "The post information could not be modified." })
          })
          
        }
    });
});



module.exports = router;