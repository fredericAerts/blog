var blogApp = angular.module('blogApp', []);

//paths
blogApp.paths = {
    postsRoot: "src/blogPosts/",
    templatesRoot: "/src/scripts/templates/",
    sub: '/path/to/this/thing/sub/',
};

blogApp.constant("POSTS_ROOT", blogApp.paths.postsRoot);
blogApp.constant("TEMPLATES_ROOT", blogApp.paths.templatesRoot);
// blogApp.constant('THINGS_SUB', module.paths.sub);