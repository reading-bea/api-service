const express = require('express');
const router = express.Router();
const axios = require('axios');

// Search for a book
router.get('/:q', (req, res) => {
  const { start = 0, total = 40 } = req.query;
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(req.params.q)}&startIndex=${start}&maxResults=${total}`)
    .then((response) => {
      const { data } = response;
      res.send(data.items);
    })
    .catch((err) => res.status(500).send(`Error: ${err.message}`));
});

module.exports = router;