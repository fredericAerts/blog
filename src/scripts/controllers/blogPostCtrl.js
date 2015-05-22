blogApp.controller("blogPostsCtrl", ["$scope", "blogPostsFactory", function DefaultCtrl($scope, blogPostsFactory) {
	'use strict';

	var promise = blogPostsFactory().then(function(data) {
		$scope.blogPosts = data.blogPosts;
		$scope.seriesArray = data.series;
	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in blogPostCtrl \nError: " + error);
	});

	$scope.searchArticle = function (article) {
		/* get lowercase strings for comparing */
		var articleTitle = article.title ? article.title.toLowerCase() : undefined;
		var articleSeriesTitle = article.partOfSeries ? article.seriesTitle.toLowerCase() : undefined;
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