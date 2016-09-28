(function () {
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ['ToBuyController', 'AlreadyBoughtController'].forEach(function (controller) {
        controller.$inject = ['ShoppingListCheckOffService'];
    });

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.products = ShoppingListCheckOffService.toBuy;

        toBuy.productBought = function (product, index) {
            ShoppingListCheckOffService.toBuy.splice(index, 1);
            ShoppingListCheckOffService.bought.push(product);

            toBuy.products = ShoppingListCheckOffService.toBuy;
            console.log('toBuy.products.length', toBuy.products.length);
        };

        toBuy.isEmpty = function () {
            return toBuy.products.length === 0 ? true : false;
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;

        bought.products = ShoppingListCheckOffService.bought;
    }

    function ShoppingListCheckOffService() {
        var shopping = this;

        shopping.toBuy = [
            { name: "cookies", quantity: 10 },
            { name: "bananas", quantity: 1 },
            { name: "bottles of water", quantity: 3 },
            { name: "packs of milk", quantity: 4 },
            { name: "packs of chips", quantity: 1 },
            { name: "snacks", quantity: 2 }
        ];

        shopping.bought = [];

        return shopping;
    }
})();