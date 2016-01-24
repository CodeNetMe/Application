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
	  console.log("Username: " + req.query.username + "   password:" + req.query.password)
	  
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
	  query = {}
	  if (req.query.level != "") {
		  query.level = req.query.level
	  }
	  if (req.query.language != "") {
		  query.language = req.query.language
	  }
	  Group.find( query ).lean().exec(function (err, groups) {
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
		console.log("GROUP: " + req.query.group)
	  //var user = new User({ profile: {username:'john', password: '123'}});
	  //user.save(function (err) {
	  //if (err) return handleError(err);
	  //console.log("student added!")
      // saved!
	  Lesson.find( {group : req.query.group}).lean().exec(function (err, lessons) {
		//if (err) return handleError(err);
		//console.log(user.profile.username);
		//res.data = user.profile.username;
		console.log("Lessons: " + lessons);
		res.json(lessons);
      })
    };
  }));
  
  api.get('/questions', wagner.invoke(function(Question,Lesson) {
	console.log("Querying for Questions!")
    return function(req, res) {
		console.log("LESSON: " + req.query.lesson)
	  //var user = new User({ profile: {username:'john', password: '123'}});
	  //user.save(function (err) {
	  //if (err) return handleError(err);
	  //console.log("student added!")
      // saved!
	  Question.find( {'_id': { $in: lesson.questions}}).lean().exec(function (err, questions) {
		//if (err) return handleError(err);
		//console.log(user.profile.username);
		//res.data = user.profile.username;
		console.log("Questions: " + questions);
		res.json(questions);
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
	  User.findById( req.query.userID,function (err, user) {
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
	  Group.findOne( {_id : req.query.group},function (err, group) {
	  if (err) {console.log (err);
		return  
	  }
		console.log("GROUP: " + group);
		var lesson = new Lesson({ date : req.query.date,
		group : group, 
		link : req.query.link,
		title : req.query.title
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
		
	  var question = new Question({ mainSentence : req.query.mainSentence,
		a : { sentence : req.query.aSentence, correct : req.query.aCorrect},
		b : { sentence : req.query.bSentence, correct : req.query.bCorrect},
		c : { sentence : req.query.cSentence, correct : req.query.cCorrect},
		d : { sentence : req.query.dSentence, correct : req.query.dCorrect}
		}
		)
	
	  question.save(function (err) {
		if (err) {console.log (err);
		return  
	  }
		console.log("question added!")
		// saved!
		res.send("Question Added!")
      })
		
	  Lesson.findByIdAndUpdate( req.query.lesson, 
	  {$push: {questions: question}},
	  {safe: true, upsert: true}, function (err, group) {
	  if (err) {console.log (err);
		return  
	  }
		
		//var group = new Group({ title : "Expert Java", language : "Java", level : "Expert", 
		//teacher : user, students : []
		//})
		
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
