const express = require('express');
const router  = express.Router();

const apiRoutes = require('./api/index.controller');

router.use('/api', apiRoutes);
router.get('/**', (req, res, next) => {
    res.render('index');
  });
  module.exports = router;
