blogApp.factory("availabilityFactory", ["$http", "$q", "AVAILABILITY_ROOT", function($http, $q, AVAILABILITY_ROOT) {

   	return function() {
   		var defer = $q.defer();

   		$http.get("http://localhost:8080/availability/availabilities.json")
		.success(function(data) {
			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
			];
			
			for (var i = 0; i < data.availabilities.length; i++) {
				var availabilityDate = new Date(data.availabilities[i].date);

				data.availabilities[i].month = monthNames[availabilityDate.getMonth()];
				data.availabilities[i].year = availabilityDate.getFullYear();
				data.availabilities[i].past = availabilityDate.getMonth() < new Date().getMonth();
			}

			defer.resolve(data.availabilities);
		})
		.error(function(data, status, headers, config) {
			console.log("availability json http request failed in availabilityFactory \nError: " + data);
		});

		return defer.promise;
   	};
 }]);