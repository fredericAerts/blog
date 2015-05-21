blogApp.directive("blogpostintros", ["TEMPLATES_ROOT", function(TEMPLATES_ROOT) {
	return {
		restrict: "E",
		replace: true,
		link: function(scope, element, attrs) {
			scope.orderBy = attrs.orderby ? attrs.orderby : '-date';
			scope.limitTo = attrs.limitto ? attrs.limitto : 999;
		},
		templateUrl: TEMPLATES_ROOT + "blogPostIntros.html"
	};
}]);