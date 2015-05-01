var blogApp = angular.module('blogApp', ['ngRoute']);

//paths
blogApp.paths = {
    postsRoot: "web/blogPosts/",
    templatesRoot: "/web/scripts/templates/",
    viewsRoot: "/web/views/",
};

blogApp.constant("POSTS_ROOT", blogApp.paths.postsRoot);
blogApp.constant("TEMPLATES_ROOT", blogApp.paths.templatesRoot);
blogApp.constant("VIEWS_ROOT", blogApp.paths.viewsRoot);