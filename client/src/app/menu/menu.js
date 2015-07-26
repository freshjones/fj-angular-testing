(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.menu', {
        url: '/menu',
        views: {
          '@': {
            templateUrl: 'src/app/menu/menu.tpl.html',
            controller: 'menuCtrl as menu'
          }
        }
      });
  }

  /**
   * @name  gettingStartedCtrl
   * @description Controller
   */
  function menuCtrl($log, $scope, $state) 
  {

    $scope.pageID = 'menu';
    $scope.pageClass = 'menu';

    $scope.menulink = 'root.home';
    var menu = this;
  
  }

  angular.module('menu', [])
    .config(config)
    .controller('menuCtrl', menuCtrl);
})();
