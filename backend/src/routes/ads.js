const express = require('express');
const fs = require('fs');
const path = require('path');
const optionalAuth = require('../middleware/optionalAuth');

const router = express.Router();

const filePath = path.join(__dirname, '../../data/ads.json');

const readAds = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};
const readFavorites = () =>
  JSON.parse(fs.readFileSync('./data/favorites.json'));

const writeAds = (ads) => {
  fs.writeFileSync(filePath, JSON.stringify(ads, null, 2));
};

// GET /ads Получение списка объявлений
router.get('/', optionalAuth, (req, res) => {
  let ads = readAds();
  const favorites = readFavorites();

  const { search, minPrice, maxPrice } = req.query;

  if (search) {
    ads = ads.filter((ad) =>
      ad.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (minPrice) {
    ads = ads.filter((ad) => ad.price >= Number(minPrice));
  }

  if (maxPrice) {
    ads = ads.filter((ad) => ad.price <= Number(maxPrice));
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  let adsWithFavorites = ads;
  if (req.user) {
    const userFavorites = favorites
      .filter((f) => f.userId === req.user.id)
      .map((f) => f.adId);

    adsWithFavorites = ads.map((ad) => ({
      ...ad,
      favorite: userFavorites.includes(ad.id),
    }));
  } else {
    adsWithFavorites = ads.map((ad) => ({
      ...ad,
      favorite: false,
    }));
  }

  const paginatedAds = adsWithFavorites.slice(start, end);
  res.json({
    items: paginatedAds,
    total: ads.length,
    page,
    limit,
  });
});

// GET /ads/:id Получение одного объявления
router.get('/:id', (req, res) => {
  const ads = readAds();

  const ad = ads.find((a) => a.id === req.params.id);

  if (!ad) {
    return res.status(404).json({ message: 'Ad not found' });
  }

  res.json(ad);
});

// POST /ads Создание объявления [только авторизованные]
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, (req, res) => {
  const ads = readAds();

  const newAd = {
    id: Date.now().toString(),
    ...req.body,
    userId: req.user.id,
  };

  ads.push(newAd);

  writeAds(ads);

  res.status(201).json(newAd);
});

// DELETE /ads/:id Удаление объявления
router.delete('/:id', (req, res) => {
  let ads = readAds();

  ads = ads.filter((a) => a.id !== req.params.id);

  writeAds(ads);

  res.json({ success: true });
});

module.exports = router;
