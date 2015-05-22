blogApp.factory("blogPostsFactory", ["$http", "$q", "POSTS_ROOT", "monthNamesFactory", function($http, $q, POSTS_ROOT, monthNamesFactory) {

	var getSeriesTitle;

	getSeriesTitle = function(series, post) {
		var seriesTitle = "";

		for (var i = 0; i < series.length; i++) {
			if(series[i].id === post.seriesId) {
				seriesTitle = series[i].title;
				break;
			}
		}

		return seriesTitle;
	};

   	return function() {
   		var defer = $q.defer();

   		$http.get("http://localhost:8080/blogposts/blogposts.json")
		.success(function(data) {
			var monthNames = monthNamesFactory();

			// parse and add properties
			for (var i = 0; i < data.blogPosts.length; i++) {
				data.blogPosts[i].date = new Date(data.blogPosts[i].date);
				
				var dayOfMonth = data.blogPosts[i].date.getDate();
				var month = monthNames[data.blogPosts[i].date.getMonth()];
				var year = data.blogPosts[i].date.getFullYear();
				data.blogPosts[i].dateFormatted = month + " " + dayOfMonth + ", " + year;
				
				if(data.blogPosts[i].partOfSeries) {
					data.blogPosts[i].seriesTitle = getSeriesTitle(data.series, data.blogPosts[i]);
				}

				// TODO: properly encode routeparams
				// data.blogPosts[i].routeParam = encodeURIComponent(data.blogPosts[i].title);
				data.blogPosts[i].routeParam = data.blogPosts[i].title.replace(/\s/g, "-").toLowerCase();
			}

			defer.resolve(data);
		})
		.error(function(data, status, headers, config) {
			console.log("blogposts json http request failed in blogPostsFactory \nError: " + data);
		});

		return defer.promise;
   	};

 }]);