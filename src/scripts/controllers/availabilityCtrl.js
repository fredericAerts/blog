blogApp.controller("availabilityCtrl", ["$scope", "availabilityFactory", "$timeout", function availabilityCtrl($scope, availabilityFactory, $timeout) {
	'use strict';

	availabilityFactory().then(function(availabilities) {
		$scope.availabilities = availabilities;
		if(!$scope.availabilitiesLoaded) {
			$timeout(function() {
				$scope.$emit('availabilitiesLoaded');
			}, 0);
		}
	}, function(error) {
		console.log("promise for availabilities json http request failed to resolve in availabilityCtrl \nError: " + error);
	});
}]);