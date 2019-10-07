/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(size, stuffing) {
    try{
        if(arguments.length!==2){
            throw new HamburgerException("Sorry but you must enter only two arguments: size, and stuffing");
        }
        if(size!== Hamburger.SIZE_SMALL&&size!== Hamburger.SIZE_LARGE){
            throw new HamburgerException("Sorry but now only small size available");
        }
        if(stuffing!==Hamburger.STUFFING_CHEESE && stuffing!==Hamburger.STUFFING_SALAD && stuffing!==Hamburger.STUFFING_POTATO){
            throw new HamburgerException("Please enter correct stuffing:CHEESE, SALAD,or  POTATO");
        }
        this.size=size;
        this.stuffing=stuffing;
        this.topping=[];
    }catch (e) {
        console.log(e.message);
    }
}

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = {
    price:50,
    calories:20,
    size:"small"
};
Hamburger.SIZE_LARGE = {
    price:100,
    calories:40,
    size:"large"
};
Hamburger.STUFFING_CHEESE ={
    price:10,
    calories:20,
    stuffing:"cheese"
};
Hamburger.STUFFING_SALAD ={
    price:20,
    calories:5,
    stuffing:"salad"
};
Hamburger.STUFFING_POTATO ={
    price:15,
    calories:10,
    stuffing:"potato"
};
Hamburger.TOPPING_MAYO ={
    price:20,
    calories:5,
    topping:'mayo'
};
Hamburger.TOPPING_SPICE ={
    price:15,
    calories:0,
    topping:'spice'
};

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (topping){
    try{
        if(!topping && arguments.length!==1){
            throw new HamburgerException('Please enter the topping');
        }if(topping!==Hamburger.TOPPING_SPICE && topping!==Hamburger.TOPPING_MAYO){
            throw new HamburgerException('Sorry there is no such topping');
        }

        if(this.topping.includes(topping)){
            throw new HamburgerException('Sorry your hamburger already includes this topping, you can add another');
        }
        else{
            this.topping.push(topping)
        }

    }catch(e){
        console.log(e.message);
    }

};
/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping){
   try{
    if(!topping && arguments.length!==1){
        throw new HamburgerException('Please enter the topping');
    }if(topping!==Hamburger.TOPPING_SPICE && topping!==Hamburger.TOPPING_MAYO){
        throw new HamburgerException('Sorry there is no such topping');
    }

    if(this.topping.includes(topping)){
        this.topping.splice(this.topping.indexOf(topping,1))
    }
}catch(e){
    console.log(e.message);
}
};

/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function (){
    let arr=[];
    for(let topping of this.topping){
        arr.push(topping.calories);
    }
    return arr
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function (){
    return this.size.size
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function (){
    return this.stuffing.stuffing
};

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function (){
    let priceCount=0;
for(let key in this){
    if(this[key].hasOwnProperty('price')){
        priceCount+=this[key].price
    }
}
    for(let topping of this.topping){
        priceCount+=topping.price;
    }
return priceCount;
};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function (){
    let caloriesCount=0;
    for(let key in this){
        if(this[key].hasOwnProperty('calories')){
            caloriesCount+=this[key].calories
        }
    }
    for(let topping of this.topping){
        caloriesCount+=topping.calories;
    }
    return  caloriesCount;
};

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
function HamburgerException (message) {
    this.message=message;
    this.name='HamburgerException';
}



// маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// // спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());
// // сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// // я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// // А сколько теперь стоит?
console.log("Price with sauce: %f", hamburger.calculatePrice());
// // Проверить, большой ли гамбургер?
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false
// // Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length); // 1
console.log(hamburger);