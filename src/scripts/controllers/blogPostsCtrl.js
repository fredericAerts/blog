blogApp.controller("blogPostsCtrl", ["$scope", "blogPostsFactory", function DefaultCtrl($scope, blogPostsFactory) {
	'use strict';

	$scope.blogPosts = blogPostsFactory();

}]);