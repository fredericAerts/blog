blogApp.controller("postRouteCtrl", ["$scope", "$routeParams", "blogPostsFactory", "POSTS_ROOT", function DefaultCtrl($scope, $routeParams, blogPostsFactory, POSTS_ROOT) {
	'use strict';

	// pagination
	$scope.itemsPerPage = 5;
	$scope.currentPage = 0;
	$scope.items = [];

	for (var i=0; i<50; i++) {
		$scope.items.push({ id: i, name: "name "+ i, description: "description " + i });
	}

	$scope.range = function() {
		var rangeSize = 5;
		var ret = [];
		var start;

		start = $scope.currentPage;
		if ( start > $scope.pageCount()-rangeSize ) {
			start = $scope.pageCount()-rangeSize+1;
		}

		for (var i=start; i<start+rangeSize; i++) {
			ret.push(i);
		}
		return ret;
	};

	

	$scope.pageCount = function() {
		return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
	};

	

	$scope.setPage = function(n) {
		$scope.currentPage = n;
	};
	//end pagination

	var setupPromisedScope, getArticleData, getSeriesArticles, setupSeriesPagination;

	var promise = blogPostsFactory().then(function(data) {
		setupPromisedScope(data);
	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in postRouteCtrl \nError: " + error);
	});

	setupPromisedScope = function(data) {
		$scope.currentArticle = getArticleData(data.blogPosts, $routeParams.articleRouteParam);
		
		if($scope.currentArticle.partOfSeries) {
			var seriesArticles = getSeriesArticles(data.blogPosts, $scope.currentArticle.seriesId);
			setupSeriesPagination(seriesArticles);
		}
	};

	setupSeriesPagination = function(seriesArticles) {
		$scope.prevPage = function() {
			if ($scope.currentArticle.seriesIndex > 0) {
				$scope.currentArticle = seriesArticles[$scope.currentArticle.seriesIndex - 1];
			}
		};

		$scope.nextPage = function() {
			if ($scope.currentArticle.seriesIndex < seriesArticles.length - 1) {
				$scope.currentArticle = seriesArticles[$scope.currentArticle.seriesIndex + 1];
			}
		};

		$scope.prevPageDisabled = function() {
			return $scope.currentArticle.seriesIndex === 0 ? "disabled" : "";
		};

		$scope.nextPageDisabled = function() {
			return $scope.currentArticle.seriesIndex === seriesArticles.length - 1 ? "disabled" : "";
		};
	};

	getArticleData = function(blogPosts, routeParam) {
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
}]);