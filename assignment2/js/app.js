(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('AlreadyBoughtController', AlreadyBoughtController)
.controller('ToBuyController', ToBuyController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();
  

  toBuyList.moveItem = function (itemIndex) {
    ShoppingListCheckOffService.moveItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  
  boughtList.items = ShoppingListCheckOffService.getItemsBought();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
  	{ name: "Bananas", quantity: "10" },
  	{ name: "Donuts", quantity: "200" },
  	{ name: "Cookies", quantity: "300" },
  	{ name: "Chocolates", quantity: "5" },
  	{ name: "Apples", quantity:"10"}
  ];
	
  var itemsBought = []

  service.moveItem = function (itemIdex) {
    var item = itemsToBuy[itemIdex]
    itemsToBuy.splice(itemIdex, 1);
    itemsBought.push(item)
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };
}

})();