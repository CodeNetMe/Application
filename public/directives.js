
// THESE DIRECTIVES DO NOT CURRENTLY WORK, USE THE ONES IN index.js inside bin!!!!!!!!

exports.home = function() {
	return {
		controller: 'HomeController',
		templateUrl: '/public/templates/home.html'
	};
}

exports.counter = function() {
	return {
		controller: 'CounterController',
		templateUrl: '/public/templates/counter.html'
	};
}

/*exports.addToCart = function() {
  return {
    controller: 'AddToCartController',
    templateUrl: '/B-examples/templates/add_to_cart.html'
  };
};

exports.categoryProducts = function() {
  return {
    controller: 'CategoryProductsController',
    templateUrl: '/B-examples/templates/category_products.html'
  }
};

exports.categoryTree = function() {
  return {
    controller: 'CategoryTreeController',
    templateUrl: '/B-examples/templates/category_tree.html'
  }
};

exports.checkout = function() {
  return {
    controller: 'CheckoutController',
    templateUrl: '/B-examples/templates/checkout.html'
  };
};

exports.navBar = function() {
  return {
    controller: 'NavBarController',
    templateUrl: '/B-examples/templates/nav_bar.html'
  };
};

exports.productDetails = function() {
  return {
    controller: 'ProductDetailsController',
    templateUrl: '/B-examples/templates/product_details.html'
  };
};*/
