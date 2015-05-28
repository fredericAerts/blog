blogApp.controller("postRouteCtrl", ["$scope", "$routeParams", "blogPostsFactory", function DefaultCtrl($scope, $routeParams, blogPostsFactory) {
	'use strict';

	var getCurrentArticle, getSeriesArticles, setupSeriesPagination;

	var promise = blogPostsFactory().then(function(data) {
		$scope.currentArticle = getCurrentArticle(data.blogPosts, $routeParams.articleRouteParam);

		if($scope.currentArticle.partOfSeries) {
			var seriesArticles = getSeriesArticles(data.blogPosts, $scope.currentArticle.seriesId);
			setupSeriesPagination(seriesArticles);
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

	getSeriesArticles = function (blogPosts, seriesId) {
		var seriesArticles = [];

		for (var i = 0; i < blogPosts.length; i++) {
			if(blogPosts[i].seriesId === seriesId) {
				seriesArticles.push(blogPosts[i]);
			}
		}
		
		seriesArticles.sort(function(a,b) { 
			return (a.seriesIndex - b.seriesIndex); 
		});
		return seriesArticles;
	};

	setupSeriesPagination = function(seriesArticles) {
		var numberOfArticles = seriesArticles.length;

		$scope.prevPage = function() {
			if ($scope.currentArticle.seriesIndex > 0) {
				$scope.currentArticle = seriesArticles[$scope.currentArticle.seriesIndex - 1];
			}
		};

		$scope.nextPage = function() {
			if ($scope.currentArticle.seriesIndex < numberOfArticles - 1) {
				$scope.currentArticle = seriesArticles[$scope.currentArticle.seriesIndex + 1];
			}
		};

		$scope.prevPageDisabled = function() {
			return $scope.currentArticle.seriesIndex === 0 ? "disabled" : "";
		};

		$scope.nextPageDisabled = function() {
			return $scope.currentArticle.seriesIndex === numberOfArticles - 1 ? "disabled" : "";
		};
	};
}]);