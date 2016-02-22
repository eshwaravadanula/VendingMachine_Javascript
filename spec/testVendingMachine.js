describe("Vending Machine", function() {

  var vendingMachine;

  beforeEach(function() {
    vendingMachine = new VendingMachine();
  });

  describe("Machine Start", function() {
    it("On Machine Start Display Insert Coin Message", function() {
      expect(vendingMachine.display).toEqual("INSERT COIN");
    });

  });

  describe("Coins Inserted", function() {
    it("Show $0.25 on screen", function() {
      vendingMachine.insertCoin(Currency.QUARTER);
      expect(vendingMachine.display).toEqual("$0.25");
    });

    it("Show $0.10 on screen", function() {
      vendingMachine.insertCoin(Currency.DIME);
      expect(vendingMachine.display).toEqual("$0.10");
    });

    it("Show $0.05 on screen", function() {
      vendingMachine.insertCoin(Currency.NICKEL);
      expect(vendingMachine.display).toEqual("$0.05");
    });

    it("Show $1.00 on screen", function() {
      vendingMachine.insertCoin(Currency.DOLLAR_COIN);
      expect(vendingMachine.display).toEqual("$1.00");
    });

    it("Show the total of coins inserted", function() {
      vendingMachine.insertCoin(Currency.NICKEL);
      vendingMachine.insertCoin(Currency.DIME);
      expect(vendingMachine.display).toEqual("$0.15");
      vendingMachine.insertCoin(Currency.DIME);
      vendingMachine.insertCoin(Currency.QUARTER);
      expect(vendingMachine.display).toEqual("$0.50");
    });

    it("Invalid coin, Pennies not allowed", function() {
      vendingMachine.insertCoin(Currency.PENNY);
      expect(vendingMachine.coinReturn).toContain(Currency.PENNY);
      expect(vendingMachine.display).toEqual("INSERT COIN");
    });


    it("Do not add Pennies to the total amount", function() {
      vendingMachine.insertCoin(Currency.PENNY);
      vendingMachine.insertCoin(Currency.QUARTER);
      vendingMachine.insertCoin(Currency.DOLLAR_COIN);
      expect(vendingMachine.display).toEqual("$1.25");
    });

    it("Return Pennies if inserted", function() {
      vendingMachine.insertCoin(Currency.PENNY);
      expect(vendingMachine.coinReturn).toContain(Currency.PENNY);
    });

  });

  describe("Coin Eject", function() {

    it(" Eject coins if cancel button is pressed", function() {
      vendingMachine.insertCoin(Currency.DIME);
      vendingMachine.returnCoins();
      expect(vendingMachine.coinReturn).toContain(Currency.DIME);
      expect(vendingMachine.coinReturn.length).toBe(1);
    });

    it("Update screen after coins are returned", function() {
      vendingMachine.insertCoin(Currency.NICKEL);
      vendingMachine.returnCoins();
      expect(vendingMachine.display).toEqual("INSERT COIN");
    });

    it("No coins to return", function() {
      vendingMachine.insertCoin(Currency.DOLLAR_COIN);
      vendingMachine.returnCoins();
      expect(vendingMachine.coinsAdded.length).toBe(0);
    });
  });


  describe("Get total of same coin type", function() {

    it("Adds a coin to the list when a valid coin is entered", function() {
      vendingMachine.insertCoin(Currency.NICKEL);
      expect(vendingMachine.cash(Currency.NICKEL)).toBe(1);
    });

    it("Adds multiple coins to the same list when a valid coin is entered", function() {
      vendingMachine.insertCoin(Currency.DIME);
      vendingMachine.insertCoin(Currency.DIME);
      expect(vendingMachine.cash(Currency.DIME)).toBe(2);
    });

    it("Do not add pennies to the list", function() {
      vendingMachine.insertCoin(Currency.PENNY);
      expect(vendingMachine.cash(Currency.PENNY)).toBe(0);
    });
  });

  describe("Get soft drinks by type", function() {

    it("Soft drinks purchased", function() {
      expect(vendingMachine.softdrinks.length).toBe(3);
    });

    it("Add item to inventory", function() {
      vendingMachine.addInventory(Item.PEPSI);
      expect(vendingMachine.getInventory(Item.PEPSI)).toBe(1);
    });

    it("Add multiple items to inventory", function() {
      vendingMachine.addInventory(Item.COKE);
      vendingMachine.addInventory(Item.COKE);
      expect(vendingMachine.getInventory(Item.COKE)).toBe(2);
    });


    it("Reduce inventory once item is purchased", function() {
      vendingMachine.addInventory(Item.COKE, 5);
      vendingMachine.currentInventory(Item.COKE);
      expect(vendingMachine.getInventory(Item.COKE)).toBe(4);
    });

  });
  
  describe("Purchase an item and retrieve it from the item list", function() {
    
    beforeEach(function(){
      vendingMachine.addInventory(Item.COKE, 9);
      vendingMachine.addInventory(Item.PEPSI, 2);
      vendingMachine.addInventory(Item.SPRITE, 10);
    });    
    
    it(" Purchase an item with exact change", function() {
      vendingMachine.insertCoin(Currency.DOLLAR_COIN);
      vendingMachine.insertCoin(Currency.QUARTER);
      vendingMachine.currentInventory(Item.SPRITE);
      expect(vendingMachine.itemBin).toContain(Item.SPRITE);
      expect(vendingMachine.display).toBe("INSERT COIN");
    });
  });

});