const express = require('express');
const db = require('./data/db');

const router = express.Router();

//PUT

router.post("/api/posts", (req, res) => {
    const post = req.body;
    db.insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "There was an error while saving the post to the database"
        });
      });
  });



//GET
router.get("/", (req, res) => {
    db.find()
      .then(posts => {
        res.json(posts);
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "The posts information could not be retrieved."
        });
      });
  });


  router.get("/:id", (req, res) => {
    const postId = req.params.id;
    db.findById(postId)
      .then(post => {
        if (post) {
          db.findById(postId).then(findPost => {
            res.status(201).json(findPost);
          });
        } else {
          res.status(404).json({
            error: err,
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: err,
          message: "Error retrieving the user"
        });
      });
  });


module.exports = router; 