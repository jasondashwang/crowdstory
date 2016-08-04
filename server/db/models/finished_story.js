'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('finished_story', {
  title: {
    type: Sequelize.STRING,
    defaultValue: 'Untitled'
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});
