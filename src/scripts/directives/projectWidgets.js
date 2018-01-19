blogApp.directive("projectWidgets", ["TEMPLATES_ROOT", "$timeout", "$window", function(TEMPLATES_ROOT, $timeout, $window) {
  return {
    restrict: "E",
    replace: true,
    scope: {
      projects: '='
    },
    link: function(scope, element, attrs) {
      // scope.orderBy = attrs.orderby ? attrs.orderby : 'title';
      scope.limitTo = attrs.limitto ? attrs.limitto : 999;

      var widgets = element[0].getElementsByTagName('article');

      $timeout(function () {
        matchHeight(widgets);

        angular.element($window).bind('resize', function() {
          matchHeight(widgets);
        });
      }, 0);

      $timeout(function () {
        matchHeight(widgets); // for good measure
      }, 1000);
    },
    templateUrl: TEMPLATES_ROOT + "projectWidgets.html"
  };

  function matchHeight(widgets) {
    var widgetsArray = Array.prototype.slice.call(widgets);
    var maxBodyHeight = getMaxBodyHeight(widgetsArray);

    widgetsArray.forEach(function(widget) {
      widget.querySelector('.project-widget__body').style.minHeight = maxBodyHeight + 'px';
    });

    var widgetsPerRow = _.groupBy(widgetsArray, function(widget) {
      return getOffset(widget).top;
    });

    for (var key in widgetsPerRow) {
      if (widgetsPerRow.hasOwnProperty(key)) {
        var widgetsInRow = widgetsPerRow[key];

        var maxBodyHeight = getMaxBodyHeight(widgetsInRow);
        widgetsInRow.forEach(function(widget) {
          widget.querySelector('.project-widget__body').style.minHeight = maxBodyHeight + 'px';
        });
      }
    }

    function getMaxBodyHeight(widgets) {
      if (!widgets || !widgets.length) {
        return 0;
      }

      return _.max(widgets, function(widget) {
        var widgetBody = widget.querySelector('.project-widget__body');
        widgetBody.removeAttribute('style');
        return widgetBody.offsetHeight;
      }).querySelector('.project-widget__body').offsetHeight;
    }
  }

  function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }
}]);
