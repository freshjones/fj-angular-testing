(function() {
  'use strict';

  function headerCtrl($log, $scope, $state) 
  {

    $scope.toggleMenu = function() 
    {
    
      if($state.current.name != 'root.menu')
      {
        $scope.previous = $state.current;
        $state.go('root.menu');
        
        $scope.pageClass = 'anim-slide-right';

      } else {
        
        $scope.pageClass = 'anim-slide-left';

        if($scope.previous == undefined)
        {
          $state.go('root.home');
        } else {
          $state.go($scope.previous.name);
        }
    
      }
    
    }
  	
  }

  angular.module('common.header', [])
    .controller('HeaderCtrl', headerCtrl);
})();
