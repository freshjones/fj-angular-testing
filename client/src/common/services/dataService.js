(function() {
  'use strict';

  function dataService() {
    return {
      get: function() {
        return [
        { id:0, slug: 'fmk-slide1', type:'portfolio', image: 'assets/images/portfolio/blackbook.jpg', background: '#ff0000', client: 'FiberMark', category: 'Print Design', name: 'Blackbook', description:'This is my description' }, 
        { id:1, slug: 'fmk-slide2', type:'portfolio', image: 'assets/images/portfolio/panache-promo.jpg', background: '#ccc', client: 'FiberMark', category: 'Print Design', name: 'Slide Two', description:'This is my description'},
        { id:2, slug: 'fmk-slide3', type:'portfolio', image: 'assets/images/portfolio/trikeenan-colorbook.jpg', background: '#9966cc', client: 'Trikeenan', category: 'Print Design', name: 'Colour Book', description:'Branded Presentation Book'},
        { id:3, slug: 'fmk-slide4', type:'portfolio', image: 'assets/images/portfolio/fibermark-website.jpg', background: '#339966', client: 'FiberMark', category: 'Interactive Design', name: 'FiberMark Website', description:'Corporate Website Redesign'}
        ];
      }
    };
  }

  angular.module('common.services.data', [])
    .factory('DataService', dataService);
})();
