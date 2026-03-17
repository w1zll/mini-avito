const express = require('express');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const filePath = path.join(__dirname, '../../data/favorites.json');

const readFavorites = () => JSON.parse(fs.readFileSync(filePath));

const writeFavorites = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

router.get('/', authMiddleware, (req, res) => {
  const favorites = readFavorites();

  const userFavorites = favorites.filter((f) => f.userId === req.user.id);

  res.json(userFavorites);
});

router.post('/:adId', authMiddleware, (req, res) => {
  const favorites = readFavorites();
  const exists = favorites.find(
    (f) => f.userId === req.user.id && f.adId === req.params.adId,
  );

  if (!exists) {
    favorites.push({
      userId: req.user.id,
      adId: req.params.adId,
    });

    writeFavorites(favorites);
  }
  res.json({ success: true });
});

router.delete('/:adId', authMiddleware, (req, res) => {
  let favorites = readFavorites();

  favorites = favorites.filter(
    (f) => !(f.userId === req.user.id && f.adId === req.params.adId),
  );

  writeFavorites(favorites);

  res.json({ success: true });
});

module.exports = router;
