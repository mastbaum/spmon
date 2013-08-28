'use strict';

var dependencies = ['spmon.filters', 'spmon.services', 'spmon.directives', 'spmon.controllers', 'ui.compat'];

angular.module('spmon', dependencies)
  .config(function(naturalLogProvider, alarmLevelsProvider) {
    naturalLogProvider.setBaseUrl('http://localhost:8000/ln');
    alarmLevelsProvider.setLevel('cmos', 0.8);
  })
  .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);

