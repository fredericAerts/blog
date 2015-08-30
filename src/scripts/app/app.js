var blogApp = angular.module('blogApp', ['ngRoute', 'ngAnimate', 'ng.picturefill', 'gist', 'angularytics']);

//paths
blogApp.paths = {
    postsRoot: "/blogPosts/post/",
    templatesRoot: "/web/scripts/templates/",
    viewsRoot: "/views/",
};

blogApp.constant("POSTS_ROOT", blogApp.paths.postsRoot);
blogApp.constant("AVAILABILITY_ROOT", blogApp.paths.availabilityRoot);
blogApp.constant("TEMPLATES_ROOT", blogApp.paths.templatesRoot);
blogApp.constant("VIEWS_ROOT", blogApp.paths.viewsRoot);