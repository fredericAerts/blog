blogApp.factory("monthNamesFactory", [function() {

   	return function() {
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
		];
		
		return monthNames;
   	};
 }]);