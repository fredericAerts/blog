blogApp.controller("blogPostsCtrl", ["$scope", "blogPostsFactory", function DefaultCtrl($scope, blogPostsFactory) {
	'use strict';

	var promise = blogPostsFactory().then(function(data) {
		$scope.blogPosts = data.blogPosts;
	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in blogPostCtrl \nError: " + error);
	});
}]);