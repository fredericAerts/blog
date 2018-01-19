var blogApp = angular.module('blogApp', ['ngRoute', 'ngAnimate', 'ng.picturefill', 'gist', 'angularytics']);

//paths
blogApp.paths = {
    postsRoot: "/blogPosts/post/",
    portfolioRoot: "/portfolio/project/",
    templatesRoot: "/web/scripts/templates/",
    viewsRoot: "/views/",
    imagesRoot: "/web/img/"
};

// blogApp.constant("HOST_URL", "http://localhost:8080");
blogApp.constant("HOST_URL", "http://www.fredericaerts.com");
blogApp.constant("POSTS_ROOT", blogApp.paths.postsRoot);
blogApp.constant("PORTFOLIO_ROOT", blogApp.paths.portfolioRoot);
blogApp.constant("AVAILABILITY_ROOT", blogApp.paths.availabilityRoot);
blogApp.constant("TEMPLATES_ROOT", blogApp.paths.templatesRoot);
blogApp.constant("VIEWS_ROOT", blogApp.paths.viewsRoot);
blogApp.constant("IMAGES_ROOT", blogApp.paths.imagesRoot);
