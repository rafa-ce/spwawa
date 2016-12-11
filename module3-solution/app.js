'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var narrowItDown = this;

    narrowItDown.found = [];
    narrowItDown.searchTerm = "";

    narrowItDown.search = function () {
      MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm).then(function (result){
        narrowItDown.found = result;
      });
    }

    narrowItDown.removeItem = function(index) {
      narrowItDown.found.splice(index, 1);
    }
  };

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        url: ApiBasePath + '/menu_items.json'
      }).then(function (result) {
        var foundItems = [];
        var menuItems = result.data.menu_items;

        for (var index = 0; index < menuItems.length; index++) {
          if (menuItems[index].description.includes(searchTerm))
            foundItems.push(menuItems[index])
        }

        return foundItems;
      });
    }
  };

  function FoundItems() {
    var ddo={
       templateUrl:'./templates/foundItems.html',
       scope:{
             found:'<',
             onRemove:'&'
       },
      controller :NarrowItDownController,
      controllerAs : 'narrowItDown',
      bindToController : true
    };

    return ddo;
  };
