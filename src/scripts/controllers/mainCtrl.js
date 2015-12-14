blogApp.controller("mainCtrl", ["$scope", "Angularytics", "$anchorScroll", "$timeout", function mainCtrl($scope, Angularytics, $anchorScroll, $timeout) {
	'use strict';

	/* ====== google analytics ====== */
	$scope.trackEvent = function(category, action) {
		Angularytics.trackEvent(category, action);
	};

	/* ====== progressive rendering ====== */
	$scope.$on('$routeChangeSuccess', function() {
		$scope.footerVisible = false;
		$scope.blogPostIntrosLoaded = false;
		$scope.availabilitiesLoaded = false;
		$anchorScroll();
	});

	// home & writing page
	$scope.$on('blogPostIntrosLoaded', function() {
		$scope.blogPostIntrosLoaded = true;
		$scope.footerVisible = true;
	});

	// contact page
	$scope.$on('availabilitiesLoaded', function() {
		$scope.availabilitiesLoaded = true;
		$scope.footerVisible = true;
	});

	// article page
	$scope.$on('$includeContentRequested', function () {
	    $scope.articleLoaded = false;
	    $scope.footerVisible = false;
	});

	$scope.$on('$includeContentLoaded', function () {
	    $scope.articleLoaded = true;
	    $scope.footerVisible = true;
	 
	});
}]);