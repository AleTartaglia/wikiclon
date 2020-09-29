const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');


router.get('/', function (req, res, next) {
  res.send("bienvenido a la home")

});

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

module.exports = router;