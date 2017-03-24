blogApp.controller("portfolioCtrl", ["$scope", "portfolioFactory", "$timeout", function portFolioCtrl($scope, portfolioFactory, $timeout) {
  'use strict';

  var setupPromisedScope;

  portfolioFactory().then(function(data) {
    setupPromisedScope(data);
    $timeout(function() {
      $scope.$emit('portfolioIntrosLoaded');
    }, 0);
  }, function(error) {
    console.log("promise for portfolio intros json http request failed to resolve in portFolioCtrl \nError: " + error);
  });

  setupPromisedScope = function(data) {
    // get ng-repeat array for portfolio projects
    $scope.featuredProjects = data.projects.slice(0, 3);
    $scope.otherProjects = data.projects.slice(3);
  };
}]);
