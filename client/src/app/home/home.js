(function() {
  'use strict';

  /**
   * @name  config
   * @description config block
   */
  function config($stateProvider) {
    $stateProvider
      .state('root.home', 
      {
        views: 
        {
          '@': 
          {
            templateUrl: 'src/app/home/home.tpl.html',
            controller: 'HomeCtrl as home',
            resolve: 
            {
              data: function(DataService) 
              {
                return DataService.get();
              }
            }
          },
          'slides@root.home': 
          {
            url: '/:id',
            templateUrl: 'src/app/home/slides.tpl.html',
            controller: function($scope, $stateParams) {
              $scope.slide = $scope.slides[ $scope.slideID ];
            }
          },
          'slidecontroller@root.home': 
          {
            templateUrl: 'src/app/home/controller.tpl.html',
          }

        }

      });

  }

  /**
   * @name  HomeCtrl
   * @description Controller
   */
  function HomeCtrl(data, $log, $scope, $state) 
  {

    var home = this;
    $scope.pageID = 'home';
    $scope.pageClass = 'page';
    $scope.slideID = 0;

    $scope.nextSlide = 1;
    $scope.prevSlide = 4;

    $scope.slides = data;

    $scope.loadSlide = function(direction)
    {
      $state.go( '1' );
    }

  }

  angular.module('home', [])
    .config(config)
    .controller('HomeCtrl', HomeCtrl);
})();
