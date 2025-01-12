// implement your API here
const express = require("express");

const db = require("./data/db");
const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        error: "This users information could not be retrieved.",
        message: err
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  db.findById(userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(404).json({
        error: err,
        message: "doesn't exist."
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
    const UserId = req.params.id;
    db.remove(UserId)
      .then(user => {
        if (user) {
          db.remove(UserId).then(removeruser => {
            res.status(201).json(removeruser);
          });
        } else {
          res
            .status(404)
            .json({
              error: err,
              mesage: "This user with specified ID does no exist"
            });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "This user could not be removed" });
      });
  });
  server.put("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const userBody = req.body;
    db.update(userId, userBody)
      .then(user => {
        if (user) {
          db.findById(userId).then(userupdate => {
            res.status(201).json(userupdate);
          });
        } else {
          res.status(400).json({ error: err, message: "Can't be found" });
        }
      })
      .catch(error => {
        res.status(404).json({ message: "Can't be found" });
      });
  });

server.listen(5000, () => {
  console.log(`Server running on localhost:5000`);
});