(function() {
  'use strict';

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  function config($stateProvider, $urlRouterProvider, $locationProvider, $logProvider, $httpProvider) 
  {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/slideshow/0');
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('httpInterceptor');
    $stateProvider
      .state('root', 
      {
        views: 
        {
          'header': {
            templateUrl: 'src/common/header.tpl.html',
            controller: 'HeaderCtrl'
          }
        }

      });

  }

  function MainCtrl($log) 
  {
    $log.debug('main controller');
  }

  function run($log, $rootScope) {

    $rootScope.$on('$stateChangeError', console.log.bind(console));


    $log.debug('App is running!');
  }

  angular.module('app', [
     
      'ui.router',
      'home',
      'menu',
      'common.header',
      'common.footer',
      'common.services.data',
      'common.directives.version',
      'common.filters.uppercase',
      'common.interceptors.http'
    ])
    .config(config)
    .run(run)
    .controller('MainCtrl', MainCtrl)
    .value('version', '1.1.0');
})();
