const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function (req, res, next) {
  res.redirect("/")
});
router.post('/', function (req, res, next) {
  Page.create({
    title: req.body.title,
    content: req.body.content,
  })
    .then(res.redirect("/"))

});
router.get('/add', function (req, res, next) {
  res.render('addpage');
});


module.exports = router;