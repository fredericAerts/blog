blogApp.controller("blogPostsCtrl", ["$scope", "blogPostsFactory", "$location", "$anchorScroll", "$timeout", function blogPostsCtrl($scope, blogPostsFactory, $location, $anchorScroll, $timeout) {
	'use strict';

	var setupPromisedScope;

	blogPostsFactory().then(function(data) {
		setupPromisedScope(data);
		if(!$scope.blogPostIntrosLoaded) {
			$timeout(function() {
				$scope.$emit('blogPostIntrosLoaded');
			}, 0);
		}
	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in blogPostCtrl \nError: " + error);
	});

	setupPromisedScope = function(data) {
		// get ng-repeat arrays for writing series pages
		$scope.blogPosts = data.blogPosts;
		$scope.seriesArray = data.series;
	};

	$scope.routeToArticles = function() {
		$anchorScroll();
		$location.path("/writing/");
	};

	$scope.routeToArticle = function(article) {
		$anchorScroll();
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
		var queryWords = $scope.query ? $scope.query.toLowerCase().split(" ") : [];
		var queryMatch = true;

		for (var i = 0; i < queryWords.length; i++) {
			queryMatch = matchWord(queryWords[i]);
			if (!queryMatch) {
				break;
			}
		}

		return queryMatch;

		function matchWord(queryWord) {
			var matchTitle = articleTitle ? articleTitle.indexOf(queryWord) !== -1 : false;
			var matchSeriesTitle = articleSeriesTitle ? articleSeriesTitle.indexOf(queryWord) !== -1 : false;
			var matchIntro = articleIntro ? articleIntro.indexOf(queryWord) !== -1 : false;

			return matchTitle || matchSeriesTitle || matchIntro;
		}
	};

	$scope.searchSeries = function (series) {
		/* get lowercase strings for comparing */
		var seriesTitle = series.title ? series.title.toLowerCase() : undefined;
		var seriesIntro = series.intro ? series.intro.toLowerCase() : undefined;
		var queryWords = $scope.query ? $scope.query.toLowerCase().split(" ") : [];
		var queryMatch = true;

		for (var i = 0; i < queryWords.length; i++) {
			queryMatch = matchWord(queryWords[i]);
			if (!queryMatch) {
				break;
			}
		}

		return queryMatch;

		function matchWord(queryWord) {
			var matchTitle = seriesTitle ? seriesTitle.indexOf(queryWord) !== -1 : false;
			var matchIntro = seriesIntro ? seriesIntro.indexOf(queryWord) !== -1 : false;

			return matchTitle || matchIntro;
		}
	};
}]);