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
    .then(res.json({
      title: req.body.title,
      content: req.body.content,
    }))
  page.save()
    .then(savedPage => {
      res.redirect(savedPage.route); // route virtual FTW
    })
    .catch(next);


});
router.get('/add', function (req, res, next) {
  res.render('addpage');

});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
    .then(function () {
      res.render("wikipage.html", { page: req.params.urlTitle })
    })
    .catch(next);
});

module.exports = router;