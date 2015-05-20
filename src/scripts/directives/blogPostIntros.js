blogApp.directive("blogpostintros", ["TEMPLATES_ROOT", function(TEMPLATES_ROOT) {
	return {
		restrict: "E",
		replace: true,
		templateUrl: TEMPLATES_ROOT + "blogPostIntros.html"
	};
}]);