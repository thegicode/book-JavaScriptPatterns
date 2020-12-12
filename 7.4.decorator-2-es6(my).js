"use strict";

// Decorator 장식자 - 2 

class Sale {
    constructor(price){
        this.price = price || 100;
        this.decorators_list = [];
        this.decorators = {
            fedtax: {
                getPrice: function (price) {
                    return price + price * 5 / 100;
                }
            },
            quebec: {
                getPrice: function (price) {
                    return price + price * 7.5 / 100;
                } 
            },
            money: {
                getPrice: function (price) {
                    return "$" + price.toFixed(2);
                }
            }
        }
    }
}

Sale.prototype.decorate = function (decorator) {
    this.decorators_list.push(decorator);
};
Sale.prototype.getPrice = function(){
    let price = this.price,
        i,
        max = this.decorators_list.length,
        name;
    for(i = 0; i < max ; i += 1) {
        name = this.decorators_list[i];
        price = this.decorators[name].getPrice(price);
    }
    return price;
}

// Test
let sale = new Sale(100);
sale.decorate('fedtax'); 
sale.decorate('quebec');
sale.decorate('money');
console.log( sale.getPrice() );






