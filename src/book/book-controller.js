const express = require('express');
const router = express.Router();
const axios = require('axios');

const Book = require('./book');

// Search for a book
router.get('/', (req, res) => {
  const { q, start = 0, total = 40 } = req.query;
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&startIndex=${start}&maxResults=${total}`)
    .then(response => {
      const { data } = response;
      res.send(
        data.items.map(
          (book => Book(book))
        )
      );
    })
    .catch(err => res.status(500).send(`Error: ${err.message}`));
});

module.exports = router;
