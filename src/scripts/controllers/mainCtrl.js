blogApp.controller("mainCtrl", ["$scope", "Angularytics", "$timeout", function mainCtrl($scope, Angularytics, $timeout) {
	'use strict';

	$scope.trackShareArticleOnTwitter = function(article) {
		Angularytics.trackEvent("Social", "Share article: " + article.title);
	};

    $scope.trackSeeSomecode = function() {
        Angularytics.trackEvent("Contact", "See some code");
    };

    $scope.$on('$viewContentLoaded', function(){
		$scope.viewContentLoaded = true;
	});

	$scope.$on('blogPostIntrosLoaded', function() {
		$scope.blogPostIntrosLoaded = true;
	});

	$scope.$on('availabilitiesLoaded', function() {
		$scope.availabilitiesLoaded = true;
	});
}]);