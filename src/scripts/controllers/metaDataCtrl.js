blogApp.controller("metaDataCtrl", ["$scope", "availabilityFactory", function metaDataCtrl($scope, availabilityFactory) {
	'use strict';

	var promise = availabilityFactory().then(function(availabilities) {
		$scope.availabilities = availabilities;
	}, function(error) {
		console.log("promise for availabilities json http request failed to resolve in availabilityCtrl \nError: " + error);
	});
}]);