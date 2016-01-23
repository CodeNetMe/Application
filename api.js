var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');



module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());
  
  

  api.get('/user', wagner.invoke(function(User) {
    return function(req, res) {

	  //var user = new User({ profile: {username:'john', password: '123'}});
	  //user.save(function (err) {
	  //if (err) return handleError(err);
	  //console.log("student added!")
      // saved!
	  
	  
	  // VERY UNSECURE, NEED TO FIND WAY OF ENCODING THIS PASSWORD AFTERWARDS
	  User.findOne( {'profile.username' : req.query.username, 'profile.password' : req.query.password},function (err, user) {
		if (err) return handleError(err);
		//res.data = user.profile.username;
		res.json(user);
      })
    };
  }));
  
   api.get('/login', wagner.invoke(function(User) {
    return function(req, res) {

	  //var user = new User({ profile: {username:'john', password: '123'}});
	  //user.save(function (err) {
	  //if (err) return handleError(err);
	  //console.log("student added!")
      // saved!
	  
	  
	  // VERY UNSECURE, NEED TO FIND WAY OF ENCODING THIS PASSWORD AFTERWARDS
	  User.findOne( {'profile.username' : req.query.username, 'profile.password' : req.query.password},function (err, user) {
		if (err) return handleError(err);
		//res.data = user.profile.username;
		if (user != undefined) {
		res.json({ loggedIn : true});
		} else {
			res.json({ loggedIn : false});
		}
      })
    };
  }));
  
  api.get('/group', wagner.invoke(function(Group) {
	console.log("Connected to group!")
    return function(req, res) {

	  //var user = new User({ profile: {username:'john', password: '123'}});
	  //user.save(function (err) {
	  //if (err) return handleError(err);
	  //console.log("student added!")
      // saved!
	  console.log(req.query.title + " " + req.query.level + " " + req.query.language )
	  Group.find( {'level' : req.query.level, 'language' : req.query.language}).lean().exec(function (err, groups) {
		if (err) return handleError(err);
		//console.log(user.profile.username);
		//res.data = user.profile.username;
		res.json(groups);
      })
    };
  }));
  
  // Create a new user that can be a student or teacher.
  api.post('/newUser', wagner.invoke(function(User) {
    return function(req, res) {

	  var user = new User({ profile: {username: req.body.username, password: req.body.password}});
	  user.save(function (err) {
	  if (err) return handleError(err);
	  console.log("user added!")
      // saved!
      })
    };
  }));

  // Try to fix this into a post later on, but for now just use get
  api.get('/newGroup', wagner.invoke(function(Group,User) {
    return function(req, res) {
		// change this to query by param username afterwards::::::
	  User.findOne( {'profile.username' : "john"},function (err, user) {
		console.log("Found User: "+user.profile.username);
	  if (err) {console.log (err);
		return  
	  }
		console.log("TITLE: " + req.query.title);
		var group = new Group({ title : req.query.title, language : req.query.language, level : req.query.level, 
		teacher : user, students : []
		})
		//var group = new Group({ title : "Expert Java", language : "Java", level : "Expert", 
		//teacher : user, students : []
		//})
		group.save(function (err) {
		if (err) {console.log (err);
		return  
	  }
		console.log("group added!")
		// saved!
		res.send("Group Added!")
      })
      })

    };
  }));
  
  api.get('/newLesson', wagner.invoke(function(Lesson,Group) {
    return function(req, res) {
		// change this to query by param username afterwards::::::
	  Group.findOne( {_id : req.query._id},function (err, group) {
		console.log("Found User: "+user.profile.username);
	  if (err) {console.log (err);
		return  
	  }
		console.log("TITLE: " + group.title);
		var lesson = new Lesson({ date : req.query.date,
		group : group, 
		link : req.query.link
		})
		//var group = new Group({ title : "Expert Java", language : "Java", level : "Expert", 
		//teacher : user, students : []
		//})
		lesson.save(function (err) {
		if (err) {console.log (err);
		return  
	  }
		console.log("group added!")
		// saved!
		res.send("Group Added!")
      })
      })

    };
  }));

  return api;
};

function handleOne(property, res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }
  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found' });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}
