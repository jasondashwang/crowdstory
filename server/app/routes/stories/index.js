'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var db = require('../../../db');
var WorkingStory = db.model('working_story');
var FinishedStory = db.model('finished_story');

router.get('/random', function (req, res, next) {
  WorkingStory.find({
    order: [
      Sequelize.fn( 'RAND' )
    ]
  })
  .then(story => {
    res.json(story);
  })
  .catch(next);
});

router.put('/random', function(req, res, next){
  WorkingStory.findById(req.body.id)
  .then(story => {
    return story.update(req.body.body);
  })
  .then(story => {
    res.status(201).redirect('/random');
  })
  .catch(next);
});

router.post('/', function(req, res, next){
  WorkingStory.create(req.body)
  .then(story => res.json(story))
  .catch(next);
});

router.get('/finished', function(req, res, next){
  FinishedStory.findAll()
  .then(stories => res.json(stories))
  .catch(next);
});


