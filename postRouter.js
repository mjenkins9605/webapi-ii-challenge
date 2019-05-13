const express = require("express");
const db = require("./data/db");

const router = express.Router();

//POST

router.post("/", (req, res) => {
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

//DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      if (deleted) {
        db.remove(id).then(removePost => {
          res.status(201).json(removePost);
        });
      } else {
        res.status(500).json({
          error: err,
          mesage: "The post could not be removed"
        });
      }
    })
    .catch(error => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

//PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The post information could not be modified." });
    });
});

module.exports = router;
