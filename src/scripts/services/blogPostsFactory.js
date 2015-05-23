blogApp.factory("blogPostsFactory", ["$http", "$q", "POSTS_ROOT", "monthNamesFactory", function($http, $q, POSTS_ROOT, monthNamesFactory) {

	var getSeriesData, getNumberOfArticlesPerSeries;

	getSeriesData = function(data, post) {
		var series = {};

		for (var i = 0; i < data.series.length; i++) {
			if(data.series[i].id === post.seriesId) {
				series = data.series[i];
				break;
			}
		}
		return series;
	};

	/* create object with series id properties holding number of articles in respective series */
	getNumberOfArticlesPerSeries = function(data) {
		var numberOfArticlesPerSeries = {};

		for (var i = 0; i < data.series.length; i++) {
			numberOfArticlesPerSeries[data.series[i].id] = 0;
			for (var j = 0; j < data.blogPosts.length; j++) {
				if(data.series[i].id === data.blogPosts[j].seriesId) {
					numberOfArticlesPerSeries[data.series[i].id]++;
				}
			}
		}
		return numberOfArticlesPerSeries;
	};

   	return function() {
   		var defer = $q.defer();

   		$http.get("http://localhost:8080/blogposts/blogposts.json")
		.success(function(data) {
			var monthNames = monthNamesFactory();
			var numberOfArticlesPerSeries = getNumberOfArticlesPerSeries(data);

			// parse and add properties
			for (var i = 0; i < data.blogPosts.length; i++) {
				data.blogPosts[i].date = new Date(data.blogPosts[i].date);
				
				var dayOfMonth = data.blogPosts[i].date.getDate();
				var month = monthNames[data.blogPosts[i].date.getMonth()];
				var year = data.blogPosts[i].date.getFullYear();
				data.blogPosts[i].dateFormatted = month + " " + dayOfMonth + ", " + year;
				
				if(data.blogPosts[i].partOfSeries) {
					data.blogPosts[i].series = getSeriesData(data, data.blogPosts[i]);
					data.blogPosts[i].series.numberOfArticles = numberOfArticlesPerSeries[data.blogPosts[i].seriesId];
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