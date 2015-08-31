blogApp.controller("mainCtrl", ["$scope", "Angularytics", "$anchorScroll", "$timeout", function mainCtrl($scope, Angularytics, $anchorScroll, $timeout) {
	'use strict';

	$scope.trackShareArticleOnTwitter = function(article) {
		Angularytics.trackEvent("Social", "Share article: " + article.title);
	};

    $scope.trackSeeSomecode = function() {
        Angularytics.trackEvent("Contact", "See some code");
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