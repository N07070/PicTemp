(function() {
	var app = angular.module('carousel', []);

	app.controller("ImagesCtrl", function($http, $interval) {
	  this.images = [];
	  var that = this;

	  $http.get('all').success(function(data, status, headers, config) {
	  	that.images = data;
	  	var i = 0;

	  	$interval(function() {
	  		that.image = that.images[i];
	  		i++;

	  		if(i == that.images.length)
	  			i = 0;
	  	}, 1000);
	  });
	});

	app.controller('testCtrl', function() {
		this.images = gems;
	});

	var gems = ['red.png', 'alpha.jpg', 'blue.bpm'];
})();
