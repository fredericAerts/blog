blogApp.controller("postRouteCtrl", ["$scope", "$routeParams", "$location", "blogPostsFactory", function DefaultCtrl($scope, $routeParams, $location, blogPostsFactory) {
	'use strict';

	var getCurrentArticle;

	var promise = blogPostsFactory().then(function(data) {
		var currentArticle = getCurrentArticle(data.blogPosts, $routeParams.articleRouteParam);

		if (currentArticle.partOfSeries) {
			$location.path("/writing/series/" + currentArticle.series.routeParam).search('article', currentArticle.routeParam);
		}
		else {
			$scope.currentArticle = currentArticle;
		}

	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in postRouteCtrl \nError: " + error);
	});

	getCurrentArticle = function(blogPosts, routeParam) {
		var article = {};

		for (var i = 0; i < blogPosts.length; i++) {
			if(blogPosts[i].routeParam === routeParam) {
				article = blogPosts[i];
				break;
			}
		}

		return article;
	};
}]);