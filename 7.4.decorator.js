
// Decorator 장식자

function Sale(price){
    this.price = price || 100;
}

Sale.prototype.getPrice = function(){
    return this.price;
}
Sale.prototype.decorate = function(decorator){
    var F = function(){},
        overfides = this.constructor.decorators[decorator],
        i, newobj;
    F.prototype = this;
    newobj = new F();
    newobj.uber = F.prototype;
    for (i in overfides) {
        if (overfides.hasOwnProperty(i)) {
            newobj[i] = overfides[i];
        }
    }
    return newobj;
};

Sale.decorators = {};
Sale.decorators.fedtax = {
    getPrice: function(){
        var price =  this.uber.getPrice();
        price += price * 5 / 100;
        return price;
    }
};
Sale.decorators.quebec = {
    getPrice: function(){
        var price = this.uber.getPrice();
        price += price * 7.5 / 100;
        return price;
    } 
};
Sale.decorators.money = {
    getPrice: function(){
        return "$" + this.uber.getPrice().toFixed(2);
    }
};
Sale.decorators.cdn = {
    getPrice: function(){
        return "CDN$ " + this.uber.getPrice().toFixed(2);
    }
};


// Test

var sale = new Sale(100);
sale = sale.decorate('fedtax'); 
sale = sale.decorate('quebec');
sale = sale.decorate('money');
console.log(sale.getPrice());

var sale = new Sale(100);
sale = sale.decorate('fedtax');
sale = sale.decorate('cdn');
console.log(sale.getPrice());





