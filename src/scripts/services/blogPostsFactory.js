blogApp.factory("blogPostsFactory", ["POSTS_ROOT", function(POSTS_ROOT) {

	var blogPosts = 
		[{
			'partOfSeries': true,
			'seriesTitle': "How to become a web developer in 10 days",
			'seriesIndex': 0,
			'title':"Helicopter view",
			'routeParam': "helicopterView"
		},
		{
			'partOfSeries': true,
			'seriesTitle': "How to become a web developer in 10 days",
			'seriesIndex': 1,
			'title':"Structure",
			'routeParam': "structure"
		},
		{
			'partOfSeries': true,
			'seriesTitle': "How to become a web developer in 10 days",
			'seriesIndex': 2,
			'title':"Layout",
			'routeParam': "layout"
		},
		{
			'partOfSeries': true,
			'seriesTitle': "How to become a web developer in 10 days",
			'seriesIndex': 3,
			'title':"Behavior",
			'routeParam': "behavior"
		}];

   return function() {
     return blogPosts;
   };
 }]);