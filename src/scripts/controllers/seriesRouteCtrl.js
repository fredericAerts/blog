blogApp.controller("seriesRouteCtrl", ["$scope", "$routeParams", "$location", "blogPostsFactory", "$anchorScroll", function seriesRouteCtrl($scope, $routeParams, $location, blogPostsFactory, $anchorScroll) {
	'use strict';

	var getCurrentSeries, getCurrentArticle, getSeriesArticles, setupSeriesPagination;

	var allArticles;

	$scope.currentUrl = "http://www.fredericaerts.com/%23" + $location.url();

	blogPostsFactory().then(function(data) {
		allArticles = data.blogPosts;
		// TODO: redirect to 404.html when series or article doesn't exist
		$scope.currentSeries = getCurrentSeries(data.series, $routeParams.seriesRouteParam);

		if($routeParams.article) {
			$scope.currentArticle = getCurrentArticle(allArticles, $routeParams.article);
		}
		else {
			$scope.currentArticle = $scope.currentSeries.firstArticle;
			$location.search('article', $scope.currentArticle.routeParam);
		}

		var seriesArticles = getSeriesArticles(allArticles, $scope.currentArticle.seriesId);
		setupSeriesPagination(seriesArticles);

	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in postRouteCtrl \nError: " + error);
	});

	getCurrentSeries = function(series, routeParam) {
		var currentSeries;

		for (var i = 0; i < series.length; i++) {
			if(series[i].routeParam === routeParam) {
				currentSeries = series[i];
				break;
			}
		}

		return currentSeries;
	};

	getCurrentArticle = function(blogPosts, routeParam) {
		var article;

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

	$scope.toTop = function() {
		$anchorScroll();
	};

	setupSeriesPagination = function(seriesArticles) {
		var numberOfArticles = seriesArticles.length;

		$scope.prevPage = function() {
			if ($scope.currentArticle.seriesIndex > 0) {
				$anchorScroll();
				$scope.currentArticle = seriesArticles[$scope.currentArticle.seriesIndex - 1];
				$location.search('article', $scope.currentArticle.routeParam);
			}
		};

		$scope.nextPage = function() {
			if ($scope.currentArticle.seriesIndex < numberOfArticles - 1) {
				$anchorScroll();
				$scope.currentArticle = seriesArticles[$scope.currentArticle.seriesIndex + 1];
				$location.search('article', $scope.currentArticle.routeParam);
			}
		};

		$scope.prevPageDisabled = function() {
			return $scope.currentArticle.seriesIndex === 0 ? "disabled" : "";
		};

		$scope.nextPageDisabled = function() {
			return $scope.currentArticle.seriesIndex === numberOfArticles - 1 ? "disabled" : "";
		};

		$scope.$on('$routeUpdate', function () {
			// account for browser back and forward buttons
			if($routeParams.article !== $scope.currentArticle.routeParam) {
				$scope.currentArticle = getCurrentArticle(allArticles, $routeParams.article);
			}
	    });
	};
}]);