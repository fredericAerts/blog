blogApp.directive("navbar", ["TEMPLATES_ROOT", function(TEMPLATES_ROOT) {
	return {
		restrict: "E",
		replace: true,
		templateUrl: TEMPLATES_ROOT + "navbar.html"
	};
}]);