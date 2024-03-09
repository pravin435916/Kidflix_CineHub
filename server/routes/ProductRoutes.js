const express = require('express');
const router = express.Router();
const Movie = require('../models/product');
const isAdmin = require('../middleware/admin');
router.get('/api/movie', async (req, res) => {
  try {
    const movie = await Movie.find();
    res.json({ movie });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/movie',isAdmin,async (req, res) => {
  const { name, img, Year } = req.body;
  if (!name || !Year) {
    return res.status(400).json({ error: 'name and Year Required' });
  }
  try {
    await Product.create({ name,img,Year });
    res.json({ success: true, msg : 'successfully added' });
  } catch (error) {
    console.error('Error uploading Movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
