blogApp.factory("availabilityFactory", ["$http", "$q", "AVAILABILITY_ROOT", "monthNamesFactory", function($http, $q, AVAILABILITY_ROOT, monthNamesFactory) {

   	return function() {
   		var defer = $q.defer();

   		$http.get("http://localhost:8080/availability/availabilities.json")
		.success(function(data) {
			var monthNames = monthNamesFactory();
			
			for (var i = 0; i < data.availabilities.length; i++) {
				var availabilityDate = new Date(data.availabilities[i].date);

				data.availabilities[i].month = monthNames[availabilityDate.getMonth()];
				data.availabilities[i].year = availabilityDate.getFullYear();
				data.availabilities[i].past = dateInPast(availabilityDate);
			}

			defer.resolve(data.availabilities);

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
		})
		.error(function(data, status, headers, config) {
			console.log("availability json http request failed in availabilityFactory \nError: " + data);
		});

		return defer.promise;
   	};
 }]);