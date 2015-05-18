blogApp.factory("blogPostsFactory", ["$http", "$q", "POSTS_ROOT", function($http, $q, POSTS_ROOT) {

   	return function() {
   		var defer = $q.defer();

   		$http.get("http://localhost:8080/blogposts/blogposts.json")
		.success(function(data) {
			// parse date properties
			for (var i = 0; i < data.blogPosts.length; i++) {
				data.blogPosts[i].date = new Date(data.blogPosts[i].date);
			}

			defer.resolve(data.blogPosts);
		})
		.error(function(data, status, headers, config) {
			console.log("blogposts json http request failed in blogPostsFactory \nError: " + data);
		});

		return defer.promise;
   	};
 }]);