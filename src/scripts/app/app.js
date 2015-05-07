var blogApp = angular.module('blogApp', ['ngRoute']);

//paths
blogApp.paths = {
    postsRoot: "/blogposts/",
    templatesRoot: "/web/scripts/templates/",
    viewsRoot: "/views/",
};

blogApp.constant("POSTS_ROOT", blogApp.paths.postsRoot);
blogApp.constant("TEMPLATES_ROOT", blogApp.paths.templatesRoot);
blogApp.constant("VIEWS_ROOT", blogApp.paths.viewsRoot);