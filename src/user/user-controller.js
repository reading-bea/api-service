const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('./user');

// Create a user
router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, (err, user) => {
      if (err) {
        return res.status(500).send("There was a problem adding the information to the database.");
      }
      res.status(200).send(user);
    });
});

// Update a user
router.put('/:id', function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
    if (err) {
      return res.status(500).send("There was a problem updating the user.");
    }
    res.status(200).send(user);
  });
});

// Get all users
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).send("There was a problem finding the users.");
    }
    res.status(200).send(users);
  });
});

// Get a user
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send("There was a problem finding the user.");
    }
    if (!user) {
      return res.status(404).send("No user found.");
    }
    res.status(200).send(user);
  });
});

// Delete a user
router.delete('/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) {
      return res.status(500).send("There was a problem deleting the user.");
    }
    res.status(200).send("User " + user.name + " was deleted.");
  });
});

module.exports = router;