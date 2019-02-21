const express = require('express');
const router = express.Router();
const axios = require('axios');
const errorRoute = require('../error');

const Book = require('../../models/book');

// Search for a book
router.get('/', (req, res, next) => {
  const { q, start = 0, total = 40 } = req.query;
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&startIndex=${start}&maxResults=${total}`)
    .then(response => {
      const { data } = response;
      res.json(
        data.items.map(
          (book => Book(book))
        )
      );
    })
    .catch(err => errorRoute(res, err, next));
});

module.exports = router;
