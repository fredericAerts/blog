blogApp.controller("availabilityCtrl", ["$scope", "availabilityFactory", function DefaultCtrl($scope, availabilityFactory) {
	'use strict';

	var promise = availabilityFactory().then(function(availabilities) {
		$scope.availabilities = availabilities;
	}, function(error) {
		console.log("promise for availabilities json http request failed to resolve in availabilityCtrl \nError: " + error);
	});
}]);