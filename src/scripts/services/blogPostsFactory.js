blogApp.factory("blogPostsFactory", ["$http", "$q", "POSTS_ROOT", "monthNamesFactory", function($http, $q, POSTS_ROOT, monthNamesFactory) {

	var processedData;

	var processData, getSeriesData, getNumberOfArticlesPerSeries;

	processData = function(data) {
		var monthNames = monthNamesFactory();
		var numberOfArticlesPerSeries = getNumberOfArticlesPerSeries(data);

		// parse and add properties to blogPosts
		for (var i = 0; i < data.blogPosts.length; i++) {
			data.blogPosts[i].date = new Date(data.blogPosts[i].date);
			
			var dayOfMonth = data.blogPosts[i].date.getDate();
			var month = monthNames[data.blogPosts[i].date.getMonth()];
			var year = data.blogPosts[i].date.getFullYear();
			data.blogPosts[i].dateFormatted = month + " " + dayOfMonth + ", " + year;

			// TODO: properly encode routeparams
			// data.blogPosts[i].routeParam = encodeURIComponent(data.blogPosts[i].title);
			data.blogPosts[i].routeParam = data.blogPosts[i].title.replace(/\s/g, "-").toLowerCase();

			data.blogPosts[i].includeUrl = POSTS_ROOT + data.blogPosts[i].routeParam + '.html';

			if(data.blogPosts[i].partOfSeries) {
				data.blogPosts[i].series = getSeriesData(data, data.blogPosts[i]); 
			}
		}

		// parse and add properties to series
		for (var j = 0; j < data.series.length; j++) {
			data.series[j].numberOfArticles = numberOfArticlesPerSeries[data.series[j].id];
			data.series[j].routeParam = data.series[j].title.replace(/\s/g, "-").toLowerCase();
		}

		processedData = data;
	};

	getSeriesData = function(data, post) {
		var series = {};

		for (var i = 0; i < data.series.length; i++) {
			if(data.series[i].id === post.seriesId) {
				series = data.series[i];

				// set series first article: put in this method for performance reasons
				if(post.seriesIndex === 0) {
					data.series[i].firstArticle = post;
				}

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
		if(processedData) { // return immediatelly resolved promise
			var deferred = $q.defer();
			deferred.resolve(processedData);
			return deferred.promise;
		}
		else { // return ajax request promise
			return $q(function(resolve, reject) {
				$http.get("http://localhost:8080/blogposts/blogposts.json")
				.success(function(data) {
					processData(data);
					resolve(data);
				})
				.error(function(data, status, headers, config) {
					reject("blogposts json http request failed in blogPostsFactory \nError: " + data);
				});
			});
		}
	};

 }]);