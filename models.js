var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/CNtest');

  wagner.factory('db', function() {
    return mongoose;
  });
  
  var User =
    mongoose.model('User', require('./user'), 'users');
	
  var Group =
    mongoose.model('Group', require('./group'), 'groups');
	
  var Lesson =
    mongoose.model('Lesson', require('./lesson'), 'lessons');

  var models = {
    //Category: Category,
    User: User,
	Group: Group,
	Lesson: Lesson
	  
  };

/*


  var Category =
    mongoose.model('Category', require('./category'), 'categories');

  */

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  //wagner.factory('Product', require('./product'));

  return models;
};
