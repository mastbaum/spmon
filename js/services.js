'use strict';

var services = angular.module('spmon.services', [])
  .value('version', '0.1')
  .provider('alarmLevels', [function() {
    this.levels = {};
    this.setLevel = function(name, level) {
      this.levels[name] = level;
    };
    this.getLevel = function(name) {
      return this.levels[name];
    };
    this.$get = function() {
      var par = this;
      return {
        setLevel: function(name, level) {
          par.levels[name] = level;
        },
        getLevel: function(name) {
          return  par.levels[name];
        }
      };
    };
  }])
  .provider('naturalLog', [function() {
    this.baseUrl = 'http://localhost:6283';

    this.setBaseUrl = function(baseUrl) {
      this.baseUrl = baseUrl;
    };

    // basic get/post, "private" api
    this._get = function(path, config) {
      var url = this.baseUrl + path;
      console.log(url)
      var promise = ln.http.get(url, config).then(function(response) {
        return response.data;
      });
      return promise;
    };

    this._post = function(path, data) {
      var url = this.baseUrl + path;
      var promise = ln.http.post(url, data, config).then(function(response) {
        return response.data;
      });
      return promise;
    };

    // convenience functions wrapping the ln rest api
    var ln = this;
    this.$get = function($http) {
      ln.http = $http;  // lil hacky
      return {
        get_series_list: function() {
          return ln._get('/');
        },
        get_data: function(series_name, offset, limit) {
          var params = {};
          if (offset) {
            params.offset = offset;
          }
          if (limit) {
            params.limit = limit;
          }
          return ln._get('/data/' + series_name, params);
        }
      };
    };
  }])
  .factory('sse', function($rootScope) {
    var sse = new EventSource('/stream');
    return {
      addEventListener: function(eventName, callback) {
        sse.addEventListener(eventName, function() {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(sse, args);
          });
        });
      }
    };
  })
  .factory('socket', function($rootScope) {
    var socket = io.connect();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    }
  });

