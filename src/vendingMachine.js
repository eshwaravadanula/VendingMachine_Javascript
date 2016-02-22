var Currency = {
  DOLLAR_COIN : {name : "Dollar Coin", value : 1.00},
  QUARTER : {name : "Quarter", value : 0.25},
  DIME : {name : "Dime", value : 0.10},
  NICKEL : {name : "Nickel", value : 0.05},
  PENNY : {name : "Penny", value : 0.01}
};

var Item = {
  COKE : {name : "Coke", cost : 0.75},
  PEPSI : {name : "Pepsi", cost : 1.00},
  SPRITE : {name : "Sprite", cost : 1.25}
};

function VendingMachine() {
  this.display = 'INSERT COIN';
  this.coinsAllowed = [Currency.DOLLAR_COIN, Currency.QUARTER, Currency.NICKEL, Currency.DIME];
  this.coinReturn = [];
  this.coinsAdded = [];
  this.moneyInserted = 0;
  this.coinsArray = this.coinsAllowed.map(function(coin) {
    return {value : coin, count : 0};
  });

  this.softdrinks = [Item.COKE, Item.PEPSI, Item.SPRITE];
  this.inventory = this.softdrinks.map(function() {
    return 0;
  });
  this.itemBin = [];


  this.cash = function(coin) {
    var coinIndex = this.coinsAllowed.indexOf(coin);
    if (coinIndex > 0) {
      return this.coinsArray[coinIndex].count;
    } else {
      return 0;
    }
  };

  this.updateDisplay = function() {
    this.updateTotal();

    if (this.moneyInserted > 0) {
      this.display = '$' + this.moneyInserted.toFixed(2);
    } else {
      this.display = 'INSERT COIN';
    }
  };

  this.updateTotal = function() {
    var total = 0;
    for (var i = 0; i < this.coinsAdded.length; i++) {
      total += this.coinsAdded[i].value;
    }

    this.moneyInserted = total;

  };

  this.insertCoin = function(coin) {
    var coinIndex = this.coinsAllowed.indexOf(coin);
    if (coinIndex > -1) {
      this.coinsAdded.push(coin);
      this.coinsArray[coinIndex].count++;
    } else {
      this.coinReturn.push(coin);
    }

    this.updateDisplay();
  };

  this.returnCoins = function() {
    this.coinReturn = this.coinsAdded;
    this.coinsAdded = [];
    this.updateDisplay();
  };

  this.addInventory = function(item, number) {
    var index = this.softdrinks.indexOf(item);
    if (index > -1) {
      if (number == null || typeof number == 'undefined') {
        number = 1;
      }
      this.inventory[index] = this.inventory[index] + number;
    }
  };

  this.getInventory = function(item) {
    var index = this.softdrinks.indexOf(item);
    if (index > -1) {
      return this.inventory[index];
    } else {
      return 0;
    }

  };

  this.purchaseProduct = function(item) {
    this.moneyInserted = this.moneyInserted - item.cost;
    this.coinsAdded = [];
  };

  this.currentInventory = function(item) {
    var index = this.softdrinks.indexOf(item);
    if (index > -1) {
      this.purchaseProduct(item);

      this.inventory[index]--;

      this.itemBin.push(item);

      this.updateDisplay();
    }
  };
}