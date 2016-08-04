'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');
var FinishedStory = db.model('finished_story');

module.exports = db.define('working_story', {
  title: {
    type: Sequelize.STRING,
    defaultValue: 'Untitled'
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  updates: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  hooks: {
    afterUpdate: function(story, options){
      var finishedStory;
      story.update({
        updates: story.updates + 1
      })
      .then(story => {
        if(story.updates >= 20){
          finishedStory = {
            id: story.id,
            title: story.title,
            body: story.body
          }

          return story.destroy();
        }
      })
      .then(() => {
        if(finishedStory) return FinishedStory.create(finishedStory);
        else return;
      })
      .catch(console.log);
    }
  },
  instanceMethods: {
    getLastFewLines: function(){
      var length = this.body.length;
      if(length > 200) return this.body.slice(length - 100, length - 1);
      else return this.body.slice(length - 50, length - 1);
    }
  }
});
