blogApp.controller("postRouteCtrl", ["$scope", "$routeParams", function DefaultCtrl($scope, $routeParams) {
	'use strict';

	$scope.postTitle = $routeParams.postTitle;
}]);