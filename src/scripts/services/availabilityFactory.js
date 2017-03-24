blogApp.factory("availabilityFactory", ["$http", "$q", "AVAILABILITY_ROOT", "monthNamesFactory", "HOST_URL", function($http, $q, AVAILABILITY_ROOT, monthNamesFactory, HOST_URL) {

	var processedData;

	var processData;

	processData = function(data) {
		var monthNames = monthNamesFactory();

		for (var i = 0; i < data.availabilities.length; i++) {
			var availabilityDate = new Date(data.availabilities[i].date);

			data.availabilities[i].month = monthNames[availabilityDate.getMonth()];
			data.availabilities[i].year = availabilityDate.getFullYear();
			data.availabilities[i].past = dateInPast(availabilityDate);
		}

		function dateInPast(date) {
			if (date.getFullYear() === new Date().getFullYear()) {
				return (date.getMonth() < new Date().getMonth());
			}
			else if (date.getFullYear() < new Date().getFullYear()){
				return true;
			}
			else {
				return false;
			}
		}

		processedData = data;
	};

   	return function() {
   		if(processedData) { // return immediatelly resolved promise
			var deferred = $q.defer();
			deferred.resolve(processedData.availabilities);
			return deferred.promise;
		}
		else { // return ajax request promise
			return $q(function(resolve, reject) {
				// $http.get("http://localhost:8080/availability/availabilities.json")
				$http.get(HOST_URL + "/availability/availabilities.json")
				.success(function(data) {
					processData(data);
					resolve(data.availabilities);
				})
				.error(function(data, status, headers, config) {
					console.log("availability json http request failed in availabilityFactory \nError: " + data);
				});
			});
		}
   	};
 }]);
