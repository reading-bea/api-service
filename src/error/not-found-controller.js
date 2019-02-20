module.exports = (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(404).send(`"${req.path}" path has not been found`);
};
