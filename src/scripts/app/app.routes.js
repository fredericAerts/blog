blogApp.config(["$routeProvider", "VIEWS_ROOT", "POSTS_ROOT", function($routeProvider, VIEWS_ROOT, POSTS_ROOT) {
	$routeProvider
	.when('/',
		{
			redirectTo:"/home"
		}
	)
	.when('/home',
		{
			templateUrl:VIEWS_ROOT + "home.html"
		}
	)
	.when('/writing',
		{
			templateUrl:VIEWS_ROOT + "writing.html"
		}
	)
	.when('/writing/:name',
		{
			templateUrl: function(routeParam) {
                return POSTS_ROOT + routeParam.name + ".html ";
            }
		}
	)
	.when('/contact',
		{
			templateUrl:VIEWS_ROOT + "contact.html"
		}
	)
	.otherwise(
		{
			templateUrl:VIEWS_ROOT + "404.html"
		}
	);
}]);