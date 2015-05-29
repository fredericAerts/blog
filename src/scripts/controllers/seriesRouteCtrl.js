blogApp.controller("seriesRouteCtrl", ["$scope", "$routeParams", "$location", "blogPostsFactory", function DefaultCtrl($scope, $routeParams, $location, blogPostsFactory) {
	'use strict';

	var getCurrentSeries, getCurrentArticle, getSeriesArticles, setupSeriesPagination;

	var promise = blogPostsFactory().then(function(data) {
		$scope.currentSeries = getCurrentSeries(data.series, $routeParams.seriesRouteParam);
		if($routeParams.article) {
			$scope.currentArticle = getCurrentArticle(data.blogPosts, $routeParams.article);
		}
		else {
			$scope.currentArticle = $scope.currentSeries.firstArticle;
			$location.search('article', $scope.currentArticle.routeParam);
		}

		var seriesArticles = getSeriesArticles(data.blogPosts, $scope.currentArticle.seriesId);
		setupSeriesPagination(seriesArticles);

	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in postRouteCtrl \nError: " + error);
	});

	getCurrentSeries = function(series, routeParam) {
		var currentSeries = {};

		for (var i = 0; i < series.length; i++) {
			if(series[i].routeParam === routeParam) {
				currentSeries = series[i];
				break;
			}
		}

		return currentSeries;
	};

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
		var targetArticle = {};

		$scope.prevPage = function() {
			if ($scope.currentArticle.seriesIndex > 0) {
				targetArticle = seriesArticles[$scope.currentArticle.seriesIndex - 1];
				$location.search('article', targetArticle.routeParam);
			}
		};

		$scope.nextPage = function() {
			if ($scope.currentArticle.seriesIndex < numberOfArticles - 1) {
				targetArticle = seriesArticles[$scope.currentArticle.seriesIndex + 1];
				$location.search('article', targetArticle.routeParam);
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