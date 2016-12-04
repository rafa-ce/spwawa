'use strict';

angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController (ShoppingListCheckOffService) {
		var toBuy = this;

		toBuy.items = ShoppingListCheckOffService.itemsToBuy();

		toBuy.buy = function(index){
			ShoppingListCheckOffService.buy(index);
		};

    toBuy.isEmpty = function(){
      return toBuy.items.length === 0;
    };
	}

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService){
		var alreadyBought = this;

		alreadyBought.items = ShoppingListCheckOffService.itemsBought();

		alreadyBought.isEmpty = function(){
			return alreadyBought.items.length === 0;
		};
  }

	function ShoppingListCheckOffService(){
	  var service = this;

	  var itemsToBuy = itemsToBuyInit();

	  var itemsBought = [];

	  service.itemsToBuy = function(){
	    return itemsToBuy;
	  };

	  service.itemsBought = function(){
	    return itemsBought;
	  };

	  service.buy = function(index){
	    var item = itemsToBuy[index];
	    itemsBought.push(item);
	    itemsToBuy.splice(index, 1);
	  };

		function itemsToBuyInit() {
			return [
								{name: "Cookies", quantity:"3"},
			  				{name: "Beers", quantity:"6"},
			  				{name: "Ice Cream", quantity:"1"},
								{name: "Chips", quantity:"2"},
								{name: "Oranges", quantity:"3"}
							];
		}
	}
