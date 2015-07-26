(function() {
  'use strict';

  function dataService() {
    return {
      get: function() {
        return [
        { id:0, slug: "fmk-slide1", name: "Slide One", description:"This is my description" }, 
        { id:1, slug: "fmk-slide2", name: "Slide Two", description:"This is my description"},
        { id:2, slug: "fmk-slide3", name: "Slide Three", description:"This is my description"},
        { id:3, slug: "fmk-slide4", name: "Slide Four", description:"This is my description"}
        ];
      }
    };
  }

  angular.module('common.services.data', [])
    .factory('DataService', dataService);
})();
