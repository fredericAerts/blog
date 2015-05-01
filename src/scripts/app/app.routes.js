blogApp.config(["$routeProvider", "VIEWS_ROOT", function($routeProvider, VIEWS_ROOT) {
	$routeProvider
	.when('/',
		{
			templateUrl:VIEWS_ROOT + "home.html"
		}
	)
	.when('/writing',
		{
			templateUrl:VIEWS_ROOT + "writing.html"
		}
	)
	.otherwise(
		{
			templateUrl:VIEWS_ROOT + "404.html"
		}
	);
}]);