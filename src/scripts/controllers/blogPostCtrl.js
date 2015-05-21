blogApp.controller("blogPostsCtrl", ["$scope", "blogPostsFactory", function DefaultCtrl($scope, blogPostsFactory) {
	'use strict';

	$scope.search = function (item){
		if ($scope.query === undefined) {
			return true;
		}
		else if (item.title.toLowerCase().indexOf($scope.query.toLowerCase())!=-1 || item.seriesTitle.toLowerCase().indexOf($scope.query.toLowerCase())!=-1) {
			return true;
		}
		return false;
	};

	var promise = blogPostsFactory().then(function(blogPosts) {
		$scope.blogPosts = blogPosts;
	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in blogPostCtrl \nError: " + error);
	});
}]);