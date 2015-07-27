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
            controller: function($log, $state, $scope){

              $scope.scrolling = false;

              var doScroll = function (e) {
                  
                  // cross-browser wheel delta
                  e = window.event || e;

                  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

                  if(!$scope.scrolling)
                  {

                    $scope.scrolling = true;

                    if(delta === 1)
                    {

                      $scope.slideDirection = 'next';

                      if( $state.params.num >= $scope.slideCount - 1 )
                      {
                        var next = 0;
                        $state.go('slideshow', {num:next});   

                      } else {

                        var next = parseInt($state.params.num) + 1;
                        $state.go('slideshow', {num:next});

                      }


                    } else {

                      $scope.slideDirection = 'prev';

                      if( $state.params.num <= 0 )
                      {
                        var prev = parseInt($scope.slideCount) - 1;
                        $state.go('slideshow', {num:prev});
                      
                      } else {

                        var prev = parseInt($state.params.num) - 1;
                        $state.go('slideshow', {num:prev});

                      }

                    }
                  }

                   e.preventDefault();

              };

              if (window.addEventListener) {
                  window.addEventListener("mousewheel", doScroll, false);
                  window.addEventListener("DOMMouseScroll", doScroll, false);
              } else {
                  window.attachEvent("onmousewheel", doScroll);
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

  function slidecontrollerCtrl($log)
  {

    


  }
  /**
   * @name  HomeCtrl
   * @description Controller
   */
  function HomeCtrl(data, $log, $scope, $state) 
  {

    $log.debug('called');
    /* var home = this; */
    $scope.pageID = 'home';
    $scope.pageClass = 'page';

    $scope.slides = data;

    $scope.activeSlide = 0;

    $scope.slideCount = data.length;

    $scope.slideDirection = 'prev';

    $scope.button_clicked = false;
   

    $scope.prevSlide = function()
    {

      $scope.button_clicked = true;
      $scope.slideDirection = 'prev';

      if( $state.params.num <= 0 )
      {
        var prev = parseInt($scope.slideCount) - 1;
        $state.go('slideshow', {num:prev});
      
      } else {

        var prev = parseInt($state.params.num) - 1;
        $state.go('slideshow', {num:prev});

      }
      
    }

    $scope.nextSlide = function()
    {

      $scope.button_clicked = true;
      $scope.slideDirection = 'next';

      if( $state.params.num >= $scope.slideCount - 1 )
      {
        var next = 0;
        $state.go('slideshow', {num:next});   

      } else {

        var next = parseInt($state.params.num) + 1;
        $state.go('slideshow', {num:next});

      }
      
    }

   

    /*
    $scope.$watch(function(){
      return $state.params;
    }, function(p){
      $scope.slide = $scope.slides[ $state.params.num ];
    });
    */
    

  }
angular.module('home', ['ngAnimate'])
    .config(config)
    .controller('HomeCtrl', HomeCtrl)
    .animation('.slide', ['$animateCss', function($animateCss) {
        return {


          enter: function(element, doneFn) {

            var runner = $animateCss(element, {
              event: 'enter',
              structural: true
            }).start();
             runner.done(doneFn);

          } 


        }
      }]);


  

})();
