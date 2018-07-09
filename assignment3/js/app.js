(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://tmartin-course5.herokuapp.com")
.directive("foundItems", FoundItems);


function FoundItems() {
  var ddo = {
    restrict:'A',
    templateUrl: 'loader/itemsloaderindicator.html',
    scope: {
      found: '<foundItems',
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var menu = this;

  menu.toSearch = "";
  
  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };

  menu.search = function() {
      if (menu.toSearch == '') {
        menu.found = [];
        return;
      }
      var promise = MenuSearchService.getMatchedMenuItems(menu.toSearch);
      promise.then(function (response) {
          menu.found = MenuSearchService.getItems(); 
      });
  }
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var items = []; 

  service.getMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };
  
  service.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getMatchedMenuItems = function (toSearch) {

    var promise = service.getMenuItems();
    promise.then(function (response) {
      items = response.data.menu_items.filter(function(e) 
          { return e.name.toLowerCase().includes(toSearch.toLowerCase()) || 
                   e.description.toLowerCase().includes(toSearch.toLowerCase()) ||
                   e.short_name.toLowerCase().includes(toSearch.toLowerCase())});
    })
    .catch(function (error) {
        console.log("Something went terribly wrong.");
    });
    return promise;
  }
}

})();
