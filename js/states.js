'use strict';

angular.module('spmon')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html'
      })
      .state('cmos', {
        abstract: true,
        url: '/cmos',
        data: {
          dataSource: 'cmos_rate',
          title: 'CMOS Rates'
        },
        templateUrl: 'partials/channel_property_summary.html',
        controller: 'DetectorSummaryCtrl'
      })
      .state('cmos.all', {
        url: '',
        data: {
          dataSource: 'cmos_rate',
          title: 'CMOS Rates'
        },
        templateUrl: 'partials/channel_property_summary_list.html',
        controller: 'DetectorSummaryCtrl'
      })
      .state('cmos.crate', {
        url: '/{crateId:([0-9]|1[0-8])}',
        data: {
          dataSource: 'cmos_rate',
          title: 'CMOS Rates'
        },
        templateUrl: 'partials/channel_property_summary_crate.html',
        controller: 'DetectorSummaryCtrl' 
      })
      .state('base_currents', {
        url: '/base-currents',
        data: {
          dataSource: 'base_current',
          title: 'PMT Base Currents'
        },
        templateUrl: 'partials/channel_property_summary.html',
        controller: 'DetectorSummaryCtrl'
      });
  }]);


