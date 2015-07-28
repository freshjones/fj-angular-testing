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
        url: '/slideshow',
        abstract:true,
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
          'slide-controller@root.home': 
          {
            templateUrl: 'src/app/home/controller.tpl.html',
            controller: function($log, $state, $scope, $window)
            {

              var doScroll = function (e) {

                  e.preventDefault();

                  if($state.current.name === 'slideshow')
                  {

                    // cross-browser wheel delta
                    e = $window.event || e;

                    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

                    if($scope.button_clicked === false)
                    {
                      
                      $scope.disableButtons();

                      if(delta == 1)
                      {

                        $scope.prevSlide();

                      } else {

                        $scope.nextSlide();

                      }

                    }
                  
                  }

              };

              if ($window.addEventListener) 
              {
                  $window.addEventListener("mousewheel", doScroll, false);
                  $window.addEventListener("DOMMouseScroll", doScroll, false);
              } else {
                  $window.attachEvent("onmousewheel", doScroll);
              }
             
            }
          }
        }

      })
      .state('slideshow', 
      {
        parent: 'root.home',
        url: '/:num',
        views: 
        {
          'slide-description': 
          {
            templateUrl: 'src/app/home/slide-description.tpl.html',
            controller: function($log, $scope, $stateParams) 
            {
              $scope.slide = $scope.slides[ $stateParams.num ];
            }
          },
          'slide-background': 
          {
            templateUrl: 'src/app/home/slide-background.tpl.html',
            controller: function($log, $scope, $stateParams) 
            {
              $scope.slide = $scope.slides[ $stateParams.num ];
            }
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

    $scope.pageID = 'home';
    $scope.pageClass = 'page';

    $scope.slides = data;

    $scope.activeSlide = 0;

    $scope.slideCount = data.length;

    $scope.slideDirection = 'prev';

    $scope.button_clicked = false;
   
   $scope.disableButtons = function()
   {
      $scope.button_clicked = true;
   }

   $scope.enableButtons = function()
   {
      $scope.button_clicked = false;
   }

   $scope.scrollDirection = function(direction)
   {
      $scope.slideDirection = direction;
   }

    $scope.prevSlide = function()
    {
      //$scope.button_clicked = true;
      $scope.slideDirection = 'prev';

      if( $state.params.num <= 0 )
      {
        $scope.activeSlide = parseInt($scope.slideCount) - 1;
        $state.go('slideshow', {num: $scope.activeSlide});
      
      } else {

        $scope.activeSlide = parseInt($state.params.num) - 1;
        $state.go('slideshow', {num: $scope.activeSlide});

      }
      
    }

    $scope.nextSlide = function()
    {

      //$scope.button_clicked = true;
      $scope.slideDirection = 'next';

      if( $state.params.num >= $scope.slideCount - 1 )
      {
        $scope.activeSlide = 0;
        $state.go('slideshow', {num: $scope.activeSlide});   

      } else {

        $scope.activeSlide = parseInt($state.params.num) + 1;
        $state.go('slideshow', {num: $scope.activeSlide });

      }
      
    }
}

angular.module('home', ['ngAnimate'])
    .config(config)
    .controller('HomeCtrl', HomeCtrl)
    .directive('test', function($animate){
        return {
          restrict: 'A',
          link: function(scope, element, attributes){

            $animate.on('enter', element, function(elem, phase) {
              
              if(phase === 'start')
              {
                scope.disableButtons();
              } 
              else if(phase === 'close')
              {
                scope.enableButtons();
              }

            });

          }

        };
      });

  

})();
