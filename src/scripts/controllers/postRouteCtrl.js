blogApp.controller("postRouteCtrl", ["$scope", "$routeParams", "blogPostsFactory", "POSTS_ROOT", function DefaultCtrl($scope, $routeParams, blogPostsFactory, POSTS_ROOT) {
	'use strict';

	var setupPromisedScope, getArticleData;

	var promise = blogPostsFactory().then(function(data) {
		setupPromisedScope(data);
	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in postRouteCtrl \nError: " + error);
	});

	setupPromisedScope = function(data) {
		// $scope.blogPosts = data.blogPosts;
		// $scope.seriesArray = data.series;
		
		$scope.article = getArticleData(data, $routeParams.articleRouteParam);
	};

	getArticleData = function(data, routeParam) {
		var article = {};

		for (var i = 0; i < data.blogPosts.length; i++) {
			if(data.blogPosts[i].routeParam === routeParam) {
				article = data.blogPosts[i];
				article.includeUrl = POSTS_ROOT + article.routeParam + '.html';
				break;
			}
		}

		return article;
	};
}]);