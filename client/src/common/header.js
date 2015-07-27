(function() {
  'use strict';

  function headerCtrl($log, $scope, $state) 
  {

    $scope.toggleMenu = function() 
    {
    
      if($state.current.name !== 'root.menu')
      {

        $scope.previous = {};

        $scope.previous.name = $state.current.name;
        $scope.previous.params = $state.params;

        $state.go('root.menu');
        
        $scope.pageClass = 'anim-slide-right';

      } else {
        
        $scope.pageClass = 'anim-slide-left';

        if($scope.previous === undefined)
        {
          $state.go('slideshow', {num:0});
        } else {
          $state.go($scope.previous.name, $scope.previous.params);
        }
    
      }
    
    };
  	
  }

  angular.module('common.header', [])
    .controller('HeaderCtrl', headerCtrl);
})();
