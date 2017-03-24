blogApp.factory("portfolioFactory", ["$http", "$q", "PORTFOLIO_ROOT", "HOST_URL", "IMAGES_ROOT", "$sce", function($http, $q, PORTFOLIO_ROOT, HOST_URL, IMAGES_ROOT, $sce) {

  var processedData;

  var processData;

  processData = function(data) {
    // parse and extend properties on projects
    for (var i = 0; i < data.projects.length; i++) {
      data.projects[i].richMedia.src = HOST_URL + IMAGES_ROOT + "projects/" + data.projects[i].richMedia.src;
      data.projects[i].richMedia.srcRetina = HOST_URL + IMAGES_ROOT + "projects/" + data.projects[i].richMedia.srcRetina;
      data.projects[i].description = $sce.trustAsHtml(data.projects[i].description);

      if (data.projects[i].client.img) {
        data.projects[i].client.img.src = HOST_URL + IMAGES_ROOT + "projects/logos/" + data.projects[i].client.img.src;
        data.projects[i].client.img.srcRetina = HOST_URL + IMAGES_ROOT + "projects/logos/" + data.projects[i].client.img.srcRetina;
      }
    }

    processedData = data;
  };

  return function() {
    if(processedData) { // return immediatelly resolved promise
      var deferred = $q.defer();
      deferred.resolve(processedData);
      return deferred.promise;
    }
    else { // return ajax request promise
      return $q(function(resolve, reject) {
        // $http.get("http://localhost:8080/blogposts/blogposts.json")
        $http.get(HOST_URL + "/portfolio/projects.json")
        .success(function(data) {
          processData(data);
          resolve(data);
        })
        .error(function(data, status, headers, config) {
          reject("projects json http request failed in portfolioFactory \nError: " + data);
        });
      });
    }
  };

 }]);
