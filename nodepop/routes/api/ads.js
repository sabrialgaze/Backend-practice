'use strict'

const express = require('express');
const router = express.Router();
const Ad = require('../../models/Ad');

// GET /api/ads
router.get('/', async (req, res, next) => {
    try {

        const name = req.query.name;
        const onSale = req.query.onSale;
        const price = req.query.price;
        const tags = req.query.tags;

        const skip = req.query.skip; // /api/ads?skip=1&limit=2
        const limit = req.query.limit;

        const fields = req.query.fields;  // /api/ads?fields=price

        const sort = req.query.sort; // /api/ads?sort=name

        const filter = {};

        if (name) { // /api/ads?name=sc
            filter.name = new RegExp('^' + name, 'i');
        };

        if (onSale) { // /api/ads?onSale=true
            filter.onSale = onSale;
        };

        
        if (price) { // /api/ads?price=100-1500
            if (price.includes('-')) {
                const prices = price.split('-');
                if(prices[0] === ''){
                    filter.price = {$lte: prices[1]};
                } else if (prices[1] === ''){
                    filter.price = {$gte: prices[0]};
                } else {
                    filter.price = {$gte: prices[0], $lte: prices[1]};
                };
            }else{
                filter.price = price;
            };
        };

        if (tags) { // /api/ads?tags=motor
            filter.tags = tags;
        };

        const ads = await Ad.array(filter, skip, limit, fields, sort);
        res.json({ results: ads });
    } catch(err) {
        next(err)
    }
});

//GET /api/ads/tags
router.get('/tags', async (req, res, next) => {
    try {

        const existingTags = await Ad.tagsArray();
        res.json({ tags: existingTags });

    } catch(err) {
        next(err);
    }
});

// POST /api/ads (body=adData)
// create an ad
router.post('/', async (req, res, next) => {
    try {
  
      const adData = req.body;
      const ad = new Ad(adData);
      const savedAd = await ad.save();
  
      res.json({ result: savedAd });
  
    } catch (err) {
      next(err);
    }
});

module.exports = router;