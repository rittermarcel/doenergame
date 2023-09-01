"use strict";
var doenerImbiss;
(function (doenerImbiss) {
    function clickOnMeat() {
        if (doenerImbiss.capacity.meat === 0) {
            let meat = (document.getElementById("ingredientMeat"));
            meat.addEventListener("click", clickOnMeat);
            meat.removeEventListener("click", clickOnMeat);
        }
        else {
            doenerImbiss.capacity.meat = doenerImbiss.capacity.meat - 1;
            doenerImbiss.displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageMeat");
            image.setAttribute("src", "pics/ingredient_meat.png");
            ingredientsDiv.appendChild(image);
            doenerImbiss.orderAnalyser.meat = true;
        }
    }
    doenerImbiss.clickOnMeat = clickOnMeat;
    function clickOnLettuce() {
        if (doenerImbiss.capacity.lettuce === 0) {
            let lettuce = (document.getElementById("ingredientLettuce"));
            lettuce.addEventListener("click", clickOnLettuce);
            lettuce.removeEventListener("click", clickOnLettuce);
        }
        else {
            doenerImbiss.capacity.lettuce = doenerImbiss.capacity.lettuce - 1;
            doenerImbiss.displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageLettuce");
            image.setAttribute("src", "pics/ingredient_lettuce.png");
            ingredientsDiv.appendChild(image);
            doenerImbiss.orderAnalyser.lettuce = true;
        }
    }
    doenerImbiss.clickOnLettuce = clickOnLettuce;
    function clickOnMushrooms() {
        if (doenerImbiss.capacity.mushrooms === 0) {
            let mushrooms = (document.getElementById("ingredientMushroom"));
            mushrooms.addEventListener("click", clickOnMushrooms);
            mushrooms.removeEventListener("click", clickOnMushrooms);
        }
        else {
            doenerImbiss.capacity.mushrooms = doenerImbiss.capacity.mushrooms - 1;
            doenerImbiss.displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageMushrooms");
            image.setAttribute("src", "pics/ingredient_mushrooms.png");
            ingredientsDiv.appendChild(image);
            doenerImbiss.orderAnalyser.mushrooms = true;
        }
    }
    doenerImbiss.clickOnMushrooms = clickOnMushrooms;
    function clickOnOnion() {
        if (doenerImbiss.capacity.onions === 0) {
            let onions = (document.getElementById("ingredientOnion"));
            onions.addEventListener("click", clickOnOnion);
            onions.removeEventListener("click", clickOnOnion);
        }
        else {
            doenerImbiss.capacity.onions = doenerImbiss.capacity.onions - 1;
            doenerImbiss.displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageOnion");
            image.setAttribute("src", "pics/ingredient_onion.png");
            ingredientsDiv.appendChild(image);
            doenerImbiss.orderAnalyser.onion = true;
        }
    }
    doenerImbiss.clickOnOnion = clickOnOnion;
    function clickOnTomato() {
        if (doenerImbiss.capacity.tomatoes === 0) {
            let tomatoes = (document.getElementById("ingredientTomato"));
            tomatoes.addEventListener("click", clickOnTomato);
            tomatoes.removeEventListener("click", clickOnTomato);
        }
        else {
            doenerImbiss.capacity.tomatoes = doenerImbiss.capacity.tomatoes - 1;
            doenerImbiss.displayCapacity();
            let ingredientsDiv = (document.getElementById("ingredientsDiv"));
            let image = (document.createElement("img"));
            image.setAttribute("id", "orderImage");
            image.setAttribute("class", "orderImageTomato");
            image.setAttribute("src", "pics/ingredient_tomato.png");
            ingredientsDiv.appendChild(image);
            doenerImbiss.orderAnalyser.tomato = true;
        }
    }
    doenerImbiss.clickOnTomato = clickOnTomato;
})(doenerImbiss || (doenerImbiss = {}));
//# sourceMappingURL=ingredients.js.map