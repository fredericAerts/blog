blogApp.controller("blogPostsCtrl", ["$scope", "blogPostsFactory", function DefaultCtrl($scope, blogPostsFactory) {
	'use strict';

	$scope.search = function (item){
		/* get lowercase strings for comparing */
		var itemTitle = item.title.toLowerCase();
		var itemSeriesTitle = item.partOfSeries ? item.seriesTitle.toLowerCase() : undefined;
		var queryString = $scope.query ? $scope.query.toLowerCase() : "";

		if (!item.partOfSeries) {
			return itemTitle.indexOf(queryString)!==-1;
		}
		else if (itemTitle.indexOf(queryString)!==-1 || itemSeriesTitle.indexOf(queryString)!==-1) {
			return true;
		}
		return false;
	};

	var promise = blogPostsFactory().then(function(data) {
		$scope.blogPosts = data.blogPosts;
	}, function(error) {
		console.log("promise for blogposts json http request failed to resolve in blogPostCtrl \nError: " + error);
	});
}]);