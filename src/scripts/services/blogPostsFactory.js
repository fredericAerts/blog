blogApp.factory("blogPostsFactory", ["$http", "$q", "POSTS_ROOT", "monthNamesFactory", function($http, $q, POSTS_ROOT, monthNamesFactory) {

   	return function() {
   		var defer = $q.defer();

   		$http.get("http://localhost:8080/blogposts/blogposts.json")
		.success(function(data) {
			var monthNames = monthNamesFactory();

			// parse date properties
			for (var i = 0; i < data.blogPosts.length; i++) {
				data.blogPosts[i].date = new Date(data.blogPosts[i].date);
				
				var dayOfMonth = data.blogPosts[i].date.getDay();
				var month = monthNames[data.blogPosts[i].date.getMonth()];
				var year = data.blogPosts[i].date.getFullYear();
				data.blogPosts[i].dateFormatted = month + " " + dayOfMonth + ", " + year;
			}

			defer.resolve(data.blogPosts);
		})
		.error(function(data, status, headers, config) {
			console.log("blogposts json http request failed in blogPostsFactory \nError: " + data);
		});

		return defer.promise;
   	};
 }]);