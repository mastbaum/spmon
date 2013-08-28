'use strict';

angular.module('spmon.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, element, attrs) {
      element.text(version);
    };
  }]);

