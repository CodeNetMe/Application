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
	  User.findOne( {'profile.username' : req.query.username},function (err, user) {
		if (err) return handleError(err);
		console.log(user.profile.username);
		//res.data = user.profile.username;
		res.json(user);
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
	  Group.findOne( {'level' : req.query.level, 'language' : req.query.language},function (err, group) {
		if (err) return handleError(err);
		//console.log(user.profile.username);
		//res.data = user.profile.username;
		res.json(group);
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
  
  
  api.put('/me/cart', wagner.invoke(function(User) {
    return function(req, res) {
      try {
        var cart = req.body.data.cart;
      } catch(e) {
        return res.
          status(status.BAD_REQUEST).
          json({ error: 'No cart specified!' });
      }

      req.user.data.cart = cart;
      req.user.save(function(error, user) {
        if (error) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() });
        }
        return res.json({ user: user });
      });
    };
  }));

  api.get('/me', function(req, res) {
    if (!req.user) {
      return res.
        status(status.UNAUTHORIZED).
        json({ error: 'Not logged in' });
    }

    res.json({ user: req.user });
    //req.user.populate({ path: 'data.cart.product', model: 'Product' }, handleOne.bind(null, 'user', res));
  });
/*
  api.post('/checkout', wagner.invoke(function(User, Stripe) {
    return function(req, res) {
      if (!req.user) {
        return res.
          status(status.UNAUTHORIZED).
          json({ error: 'Not logged in' });
      }

      // Populate the products in the user's cart
      req.user.populate({ path: 'data.cart.product', model: 'Product' }, function(error, user) {

        // Sum up the total price in USD
        var totalCostUSD = 0;
        _.each(user.data.cart, function(item) {
          totalCostUSD += item.product.internal.approximatePriceUSD *
            item.quantity;
        });

        // And create a charge in Stripe corresponding to the price
        Stripe.charges.create(
          {
            // Stripe wants price in cents, so multiply by 100 and round up
            amount: Math.ceil(totalCostUSD * 100),
            currency: 'usd',
            source: req.body.stripeToken,
            description: 'Example charge'
          },
          function(err, charge) {
            if (err && err.type === 'StripeCardError') {
              return res.
                status(status.BAD_REQUEST).
                json({ error: err.toString() });
            }
            if (err) {
              console.log(err);
              return res.
                status(status.INTERNAL_SERVER_ERROR).
                json({ error: err.toString() });
            }

            req.user.data.cart = [];
            req.user.save(function() {
              // Ignore any errors - if we failed to empty the user's
              // cart, that's not necessarily a failure

              // If successful, return the charge id
              return res.json({ id: charge.id });
            });
          });
      });
    };
  }));
  */

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
