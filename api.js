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
		res.json({ loggedIn : true, user : user});
		} else {
			res.json({ loggedIn : false});
		}
      })
    };
  }));
  
  api.get('/groups', wagner.invoke(function(Group) {
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
  
  api.get('/lessons', wagner.invoke(function(Lesson) {
	console.log("Connected to group!")
    return function(req, res) {

	  //var user = new User({ profile: {username:'john', password: '123'}});
	  //user.save(function (err) {
	  //if (err) return handleError(err);
	  //console.log("student added!")
      // saved!
	  Lesson.find( {group : req.query.group}).lean().exec(function (err, lessons) {
		if (err) return handleError(err);
		//console.log(user.profile.username);
		//res.data = user.profile.username;
		res.json(lessons);
      })
    };
  }));
  
  api.get('/group', wagner.invoke(function(Group,User) {
	console.log("Connected to group!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    return function(req, res) {

	  //var user = new User({ profile: {username:'john', password: '123'}});
	  //user.save(function (err) {
	  //if (err) return handleError(err);
	  //console.log("student added!")
      // saved!
	  Group.findOne( {_id : req.query.id}, function (err, group) {
		if (err) return handleError(err);
		//console.log(user.profile.username);
		//res.data = user.profile.username;
		User.findOne( {_id : group.teacher}, function (err, user) {
		res.json({teacher : user, group : group});
		})
      })
    };
  }));
  
  // Create a new user that can be a student or teacher.
  api.get('/newUser', wagner.invoke(function(User) {
    return function(req, res) {
		console.log("CREATING NEW USER")
		/*
		var userExists = false
		User.findOne( {'profile.username' : req.query.username},function (err, user) { 
			console.log("FOUND MATCHING USER")
			if (user!=undefined) {
				console.log("USER ALREADY EXISTS");
				res.json({userTaken : true})
				userExists = true
				res.send("User Taken")
			}
		})*/
	  //if(!userExists) {
	  var user = new User({ profile: {username: req.query.username, password: req.query.password}});
	  user.save(function (err) {
	  //if (err) return handleError(err);
	  console.log("user added!")
	  if(err) {console.log(err)
		  res.json({userTaken : true});
	  }
	  else{
	  res.send("User Added");
	  }
	  
      // saved!
      }) //}
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
  
  api.get('/newQuestion', wagner.invoke(function(Question,Lesson) {
    return function(req, res) {
		// change this to query by param username afterwards::::::
	  Lesson.findOne( {_id : req.query._id},function (err, group) {
		console.log("Found User: "+user.profile.username);
	  if (err) {console.log (err);
		return  
	  }
		console.log("Group of lesson TITLE: " + lesson.group.title);
		var question = new Question({ mainSentence : req.query.mainSentence,
		a : { sentence : req.query.aSentence, correct : aCorrect},
		b : { sentence : req.query.bSentence, correct : bCorrect},
		c : { sentence : req.query.cSentence, correct : cCorrect},
		d : { sentence : req.query.aSentence, correct : dCorrect}
		}
		)
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
