'use strict';

angular.module('spmon.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
  .filter('reverse', function() {
    return function(a) {
      if (!angular.isArray(a)) {
        return false;
      }
      return a.slice().reverse();
    };
  });

