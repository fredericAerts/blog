blogApp.factory("blogPostsFactory", ["POSTS_ROOT", function(POSTS_ROOT) {

	var blogPosts = 
		[{
			'partOfSeries': true,
			'seriesTitle': "How to become a web developer in 10 days",
			'seriesIndex': 0,
			'title':"Helicopter view",
			'bodyTemplate': POSTS_ROOT + "helicopterView.html"
		},
		{
			'partOfSeries': true,
			'seriesTitle': "How to become a web developer in 10 days",
			'seriesIndex': 1,
			'title':"Structure",
			'bodyTemplate': POSTS_ROOT + "structure.html"
		},
		{
			'partOfSeries': true,
			'seriesTitle': "How to become a web developer in 10 days",
			'seriesIndex': 2,
			'title':"Layout",
			'bodyTemplate': POSTS_ROOT + "layout.html"
		},
		{
			'partOfSeries': true,
			'seriesTitle': "How to become a web developer in 10 days",
			'seriesIndex': 3,
			'title':"Behavior",
			'bodyTemplate': POSTS_ROOT + "behavior.html"
		}];

   return function() {
     return blogPosts;
   };
 }]);