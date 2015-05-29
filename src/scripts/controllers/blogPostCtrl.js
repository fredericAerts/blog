blogApp.controller("blogPostsCtrl", ["$scope", "blogPostsFactory", "$location", function DefaultCtrl($scope, blogPostsFactory, $location) {
	'use strict';

	var setupPromisedScope;

	var promise = blogPostsFactory().then(function(data) {
		setupPromisedScope(data);
	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in blogPostCtrl \nError: " + error);
	});

	setupPromisedScope = function(data) {
		// get ng-repeat arrays for writing series pages
		$scope.blogPosts = data.blogPosts;
		$scope.seriesArray = data.series;
	};

	$scope.routeToArticle = function(article) {
		if (article.partOfSeries) {
			$location.path("/writing/series/" + article.series.routeParam).search('article', article.routeParam);
		}
		else {
			$location.path("/writing/article/" + article.routeParam);
		}
	};

	/* TODO: search multiple words */
	/* search functions */
	$scope.searchArticle = function (article) {
		/* get lowercase strings for comparing */
		var articleTitle = article.title ? article.title.toLowerCase() : undefined;
		var articleSeriesTitle = article.partOfSeries ? article.series.title.toLowerCase() : undefined;
		var articleIntro = article.intro ? article.intro.toLowerCase() : undefined;
		var queryString = $scope.query ? $scope.query.toLowerCase() : "";

		var matchTitle = articleTitle ? articleTitle.indexOf(queryString) !== -1 : false;
		var matchSeriesTitle = articleSeriesTitle ? articleSeriesTitle.indexOf(queryString) !== -1 : false;
		var matchIntro = articleIntro ? articleIntro.indexOf(queryString) !== -1 : false;

		return matchTitle || matchSeriesTitle || matchIntro;
	};

	$scope.searchSeries = function (series) {
		/* get lowercase strings for comparing */
		var seriesTitle = series.title ? series.title.toLowerCase() : undefined;
		var seriesIntro = series.intro ? series.intro.toLowerCase() : undefined;
		var queryString = $scope.query ? $scope.query.toLowerCase() : "";

		var matchTitle = seriesTitle ? seriesTitle.indexOf(queryString) !== -1 : false;
		var matchIntro = seriesIntro ? seriesIntro.indexOf(queryString) !== -1 : false;

		return matchTitle || matchIntro;
	};
}]);