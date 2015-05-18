blogApp.directive("contactbox", ["TEMPLATES_ROOT", function(TEMPLATES_ROOT) {
	return {
		restrict: "E",
		replace: true,
		templateUrl: TEMPLATES_ROOT + "contact-box.html"
	};
}]);