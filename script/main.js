"use strict";
var doenerImbiss;
(function (doenerImbiss) {
    window.addEventListener("load", handleLoad);
    let imgData;
    let moveablesWorker = [];
    let moveablesCustomer = [];
    let moveablesManager = [];
    doenerImbiss.capacity = {
        meat: 1,
        lettuce: 1,
        mushrooms: 1,
        onions: 1,
        tomatoes: 1
    };
    let capacityJars = {
        meat: 1,
        lettuce: 1,
        mushrooms: 1,
        onions: 1,
        tomatoes: 1
    };
    let customer;
    doenerImbiss.orderAnalyser = {
        meat: false,
        lettuce: false,
        mushrooms: false,
        onion: false,
        tomato: false
    };
    let numberWorkers = 0;
    let clickStart = 0;
    let soldFood = 0;
    let employeeSpeed = 1;
    let warehouse = 1;
    let customersPerHour = 1;
    let timeout;
    let managerVelocityX = 2;
    let managerVelocityY = 2;
    // handleLoad
    function handleLoad() {
        let canvas = (document.querySelector("canvas"));
        if (!canvas)
            return;
        doenerImbiss.crc2 = canvas.getContext("2d");
        drawBackground();
        let forms = document.querySelectorAll("form");
        forms[0].addEventListener("change", handleChange);
        let button = document.querySelectorAll("button");
        button[0].addEventListener("click", start); // button click -> start simulation
        button[1].addEventListener("click", refreshPage); // button click -> refreshPage
        let finishButton = (document.getElementById("finishButton"));
        finishButton.disabled = true;
        finishButton.addEventListener("click", analyseOrder);
        let startButton = (document.getElementById("start"));
        if (numberWorkers === 0) {
            startButton.disabled = true;
        }
        let deleteButton = (document.getElementById("deleteIngredientButton"));
        deleteButton.addEventListener("click", deleteItemfromOrder);
        imgData = doenerImbiss.crc2.getImageData(0, 0, doenerImbiss.crc2.canvas.width, doenerImbiss.crc2.canvas.height);
        window.setInterval(update, 20);
    }
    function drawBackground() {
        let backgroundClass = new doenerImbiss.CanvasBackground();
        backgroundClass.drawBackground();
        backgroundClass.displayJars();
    }
    function handleChange(_event) {
        let startButton = (document.getElementById("start"));
        let target = _event.target;
        if (target.name === "numberWorkers") {
            numberWorkers = parseInt(target.value);
        }
        else if (target.name === "containers") {
            doenerImbiss.capacity.meat = parseInt(target.value);
            doenerImbiss.capacity.lettuce = parseInt(target.value);
            doenerImbiss.capacity.mushrooms = parseInt(target.value);
            doenerImbiss.capacity.onions = parseInt(target.value);
            doenerImbiss.capacity.tomatoes = parseInt(target.value);
        }
        else if (target.name === "warehouse") {
            warehouse = parseInt(target.value);
            capacityJars.meat = parseInt(target.value);
            capacityJars.lettuce = parseInt(target.value);
            capacityJars.mushrooms = parseInt(target.value);
            capacityJars.onions = parseInt(target.value);
            capacityJars.tomatoes = parseInt(target.value);
        }
        else if (target.name === "employeeSpeed") {
            employeeSpeed = parseInt(target.value);
        }
        else if (target.name === "customersPerHour") {
            customersPerHour = parseInt(target.value);
        }
        if (numberWorkers > 0) {
            startButton.disabled = false;
        }
    }
    function refreshPage() {
        window.location.reload();
    }
    function start() {
        setTimeout(function () {
            alert("the day is almost over");
        }, 50000);
        setTimeout(function () {
            alert("the day is over");
            window.location.reload();
        }, 90000);
        if (numberWorkers > 10) {
            numberWorkers = 10;
        }
        if (clickStart === 0) {
            for (let i = 0; i < numberWorkers; i++) {
                callWorker();
                clickStart++;
                let startButton = (document.getElementById("start"));
                startButton.disabled = true;
            }
            let workerClass = new doenerImbiss.Workers(new doenerImbiss.Vector(20, 100), new doenerImbiss.Vector(20, 100), false);
            workerClass.velocity = new doenerImbiss.Vector(2, 2);
            workerClass.draw();
            moveablesManager.push(workerClass);
        }
        callCustomers();
        displayCapacity();
        let canvas = (document.querySelector("canvas"));
        canvas.addEventListener("click", canvasClicked);
        employeeSpeedWorkers();
        disableForm();
    }
    function disableForm() {
        let forms = document.querySelectorAll("form");
        for (let item of forms[0]) {
            item.setAttribute("disabled", "");
        }
    }
    function callWorker() {
        let randomX = Math.floor(Math.random() * 600) + 50;
        let randomY = Math.floor(Math.random() * 230) + 170;
        let workerClass = new doenerImbiss.Workers(new doenerImbiss.Vector(randomX, randomY), new doenerImbiss.Vector(0, 0), false);
        workerClass.draw();
        moveablesWorker.push(workerClass);
    }
    function update() {
        doenerImbiss.crc2.putImageData(imgData, 0, 0);
        for (let moveable of moveablesWorker) {
            moveable.move(1 / 50);
            moveable.draw();
        }
        for (let moveable of moveablesCustomer) {
            moveable.moveCustomer(1 / 50);
            moveable.draw();
        }
        for (let moveable of moveablesManager) {
            moveable.moveManager(1 / 50);
            moveable.draw();
        }
    }
    function canvasClicked(_event) {
        let x = _event.offsetX;
        let y = _event.offsetY;
        let jarRefill = (document.getElementById("jarRefill"));
        //Meat click
        if (y > 30 && y < 120 && x > 150 && x < 180) {
            if (capacityJars.meat === 0) {
                jarRefill.innerHTML = "meat refill";
                jarRefill.addEventListener("click", managerRefill);
            }
            else {
                doenerImbiss.capacity.meat = doenerImbiss.capacity.meat + 1;
                capacityJars.meat = capacityJars.meat - 1;
                displayCapacity();
                if (doenerImbiss.capacity.meat === 1) {
                    let meat = (document.getElementById("ingredientMeat"));
                    meat.addEventListener("click", doenerImbiss.clickOnMeat);
                }
            }
        }
        // Lettuce click
        if (y > 30 && y < 120 && x > 250 && x < 310) {
            if (capacityJars.lettuce === 0) {
                jarRefill.innerHTML = "lettuce refill";
                jarRefill.addEventListener("click", managerRefill);
            }
            else {
                doenerImbiss.capacity.lettuce = doenerImbiss.capacity.lettuce + 1;
                capacityJars.lettuce = capacityJars.lettuce - 1;
                displayCapacity();
                if (doenerImbiss.capacity.lettuce === 1) {
                    let lettuce = (document.getElementById("ingredientLettuce"));
                    lettuce.addEventListener("click", doenerImbiss.clickOnLettuce);
                }
            }
        }
        //Rooms click
        if (y > 30 && y < 120 && x > 350 && x < 410) {
            if (capacityJars.mushrooms === 0) {
                jarRefill.innerHTML = "mushrooms refill";
                jarRefill.addEventListener("click", managerRefill);
            }
            else {
                doenerImbiss.capacity.mushrooms = doenerImbiss.capacity.mushrooms + 1;
                capacityJars.mushrooms = capacityJars.mushrooms - 1;
                displayCapacity();
                if (doenerImbiss.capacity.mushrooms === 1) {
                    let mushrooms = (document.getElementById("ingredientMushroom"));
                    mushrooms.addEventListener("click", doenerImbiss.clickOnMushrooms);
                }
            }
        }
        // Onion click
        if (y > 30 && y < 120 && x > 450 && x < 510) {
            if (capacityJars.onions === 0) {
                jarRefill.innerHTML = "onions refill";
                jarRefill.addEventListener("click", managerRefill);
            }
            else {
                doenerImbiss.capacity.onions = doenerImbiss.capacity.onions + 1;
                capacityJars.onions = capacityJars.onions - 1;
                displayCapacity();
                if (doenerImbiss.capacity.onions === 1) {
                    let onions = (document.getElementById("ingredientOnion"));
                    onions.addEventListener("click", doenerImbiss.clickOnOnion);
                }
            }
        }
        // Tomato click
        if (y > 30 && y < 120 && x > 550 && x < 610) {
            if (capacityJars.tomatoes === 0) {
                jarRefill.innerHTML = "tomatoes refill";
                jarRefill.addEventListener("click", managerRefill);
            }
            else {
                doenerImbiss.capacity.tomatoes = doenerImbiss.capacity.tomatoes + 1;
                capacityJars.tomatoes = capacityJars.tomatoes - 1;
                displayCapacity();
                if (doenerImbiss.capacity.tomatoes === 1) {
                    let tomatoes = (document.getElementById("ingredientTomato"));
                    tomatoes.addEventListener("click", doenerImbiss.clickOnTomato);
                }
            }
        }
    }
    function displayCapacity() {
        // Ingredients
        let displayIDIngredients = [
            "meatAmount",
            "lettuceAmount",
            "mushroomsAmount",
            "onionAmount",
            "tomatoesAmount"
        ];
        let displayIngredientName = [
            "Meat",
            "Lettuce",
            "Mushrooms",
            "Onions",
            "Tomatoes"
        ];
        let displayCapacityIngredient = [
            doenerImbiss.capacity.meat,
            doenerImbiss.capacity.lettuce,
            doenerImbiss.capacity.mushrooms,
            doenerImbiss.capacity.onions,
            doenerImbiss.capacity.tomatoes
        ];
        for (let i = 0; i < displayIDIngredients.length; i++) {
            let ingredientAmount = (document.getElementById(displayIDIngredients[i]));
            ingredientAmount.innerHTML =
                displayIngredientName[i] +
                    ":" +
                    JSON.stringify(displayCapacityIngredient[i]);
        }
        // Jars
        let displayIDIngredientsJar = [
            "meatAmountJars",
            "lettuceAmountJars",
            "mushroomsAmountJars",
            "onionAmountJars",
            "tomatoesAmountJars"
        ];
        let displayCapacityIngredientJar = [
            capacityJars.meat,
            capacityJars.lettuce,
            capacityJars.mushrooms,
            capacityJars.onions,
            capacityJars.tomatoes
        ];
        for (let i = 0; i < displayIDIngredientsJar.length; i++) {
            let ingredientAmountJar = (document.getElementById(displayIDIngredientsJar[i]));
            ingredientAmountJar.innerHTML =
                displayIngredientName[i] +
                    ":" +
                    JSON.stringify(displayCapacityIngredientJar[i]);
        }
    }
    doenerImbiss.displayCapacity = displayCapacity;
    function callOrder() {
        let displayIDIngredients = [
            "ingredientMeat",
            "ingredientLettuce",
            "ingredientMushroom",
            "ingredientOnion",
            "ingredientTomato"
        ];
        let displayCapacityIngredient = [
            doenerImbiss.clickOnMeat,
            doenerImbiss.clickOnLettuce,
            doenerImbiss.clickOnMushrooms,
            doenerImbiss.clickOnOnion,
            doenerImbiss.clickOnTomato
        ];
        for (let i = 0; i < displayIDIngredients.length; i++) {
            let ingredient = (document.getElementById(displayIDIngredients[i]));
            ingredient.addEventListener("click", displayCapacityIngredient[i]);
        }
        let preferenceTrue = [];
        let preferenceFalse = [];
        if (customer.preferences.meat === true) {
            preferenceTrue.push("Meat");
        }
        else {
            preferenceFalse.push("Meat");
        }
        if (customer.preferences.lettuce === true) {
            preferenceTrue.push("Lettuce");
        }
        else {
            preferenceFalse.push("Lettuce");
        }
        if (customer.preferences.mushrooms === true) {
            preferenceTrue.push("Mushrooms");
        }
        else {
            preferenceFalse.push("Mushrooms");
        }
        if (customer.preferences.onion === true) {
            preferenceTrue.push("Onion");
        }
        else {
            preferenceFalse.push("Onion");
        }
        if (customer.preferences.tomato === true) {
            preferenceTrue.push("Tomato");
        }
        else {
            preferenceFalse.push("Tomato");
        }
        let bread = [
            "pics/bread_doener.png",
            "pics/bread_pita.png",
            "pics/bread_lahmacun.png"
        ];
        let randomBread = Math.floor(Math.random() * bread.length);
        let breadDiv = (document.getElementById("breadDiv"));
        let iWant = (document.getElementById("iWant"));
        let iDontWant = (document.getElementById("iDontWant"));
        iWant.innerHTML = "I want: " + "</br>" + preferenceTrue;
        iDontWant.innerHTML = "I don't want: " + "</br>" + preferenceFalse;
        let imageBread = (document.createElement("img"));
        imageBread.setAttribute("src", bread[randomBread]);
        imageBread.setAttribute("id", "Bread");
        breadDiv.appendChild(imageBread);
        let finishButton = (document.getElementById("finishButton"));
        finishButton.disabled = false;
    }
    doenerImbiss.callOrder = callOrder;
    function analyseOrder() {
        clearTimeout(timeout);
        if (customer.preferences.lettuce === doenerImbiss.orderAnalyser.lettuce &&
            customer.preferences.meat === doenerImbiss.orderAnalyser.meat &&
            customer.preferences.mushrooms === doenerImbiss.orderAnalyser.mushrooms &&
            customer.preferences.onion === doenerImbiss.orderAnalyser.onion &&
            customer.preferences.tomato === doenerImbiss.orderAnalyser.tomato) {
            customer.mood = "happy";
            moveablesManager[0].mood = "happy";
            for (let item of moveablesWorker) {
                item.mood = "happy";
            }
        }
        else {
            let moods = ["neutral", "mad"];
            let randomMood = Math.floor(Math.random() * moods.length);
            customer.mood = moods[randomMood];
            if (customer.mood === "mad") {
                moveablesManager[0].mood = "sad";
                for (let item of moveablesWorker) {
                    item.mood = "sad";
                }
            }
        }
        let breadDiv = (document.getElementById("breadDiv"));
        let imageBread = (document.getElementById("Bread"));
        breadDiv.removeChild(imageBread);
        let breadAndIngredients = (document.getElementById("breadAndIngredients"));
        let ingredientsDiv = (document.getElementById("ingredientsDiv"));
        breadAndIngredients.removeChild(ingredientsDiv);
        breadAndIngredients.removeChild(breadDiv);
        let addIngredientsDiv = (document.createElement("div"));
        addIngredientsDiv.setAttribute("id", "ingredientsDiv");
        breadAndIngredients.appendChild(addIngredientsDiv);
        breadAndIngredients.appendChild(breadDiv);
        doenerImbiss.orderAnalyser = {
            meat: false,
            lettuce: false,
            mushrooms: false,
            onion: false,
            tomato: false
        };
        moveablesCustomer = [];
        customer.velocity = new doenerImbiss.Vector(6, 0);
        customer.goalPosition.x = 10000;
        moveablesCustomer.push(customer);
        soldFood++;
        let soldFoodText = (document.getElementById("soldFood"));
        soldFoodText.innerHTML =
            "sold: " + soldFood;
        callNewCustomer();
    }
    doenerImbiss.analyseOrder = analyseOrder;
    function callNewCustomer() {
        let timeout = 0;
        switch (customersPerHour) {
            case 1: {
                timeout = 10000;
                break;
            }
            case 2: {
                timeout = 5000;
                break;
            }
            case 3: {
                timeout = 1000;
                break;
            }
        }
        setTimeout(callCustomers, timeout);
    }
    function callCustomers() {
        timeout = setTimeout(function () {
            customer.mood = "mad";
            moveablesManager[0].mood = "sad";
            for (let item of moveablesWorker) {
                item.mood = "sad";
            }
        }, 20000);
        let customerClass = new doenerImbiss.Customers(new doenerImbiss.Vector(600, 0), new doenerImbiss.Vector(0, 515));
        customerClass.draw();
        moveablesCustomer.push(customerClass);
        customer = customerClass;
    }
    function deleteItemfromOrder() {
        let ingredientsDiv = (document.getElementById("ingredientsDiv"));
        let orderImage = (document.getElementById("orderImage"));
        if (orderImage.getAttribute("class") === "orderImageMeat") {
            doenerImbiss.orderAnalyser.meat = false;
        }
        else if (orderImage.getAttribute("class") === "orderImageLettuce") {
            doenerImbiss.orderAnalyser.lettuce = false;
        }
        else if (orderImage.getAttribute("class") === "orderImageMushrooms") {
            doenerImbiss.orderAnalyser.mushrooms = false;
        }
        else if (orderImage.getAttribute("class") === "orderImageOnion") {
            doenerImbiss.orderAnalyser.onion = false;
        }
        else if (orderImage.getAttribute("class") === "orderImageTomato") {
            doenerImbiss.orderAnalyser.tomato = false;
        }
        ingredientsDiv.removeChild(orderImage);
    }
    function employeeSpeedWorkers() {
        switch (employeeSpeed) {
            case 1: {
                setTimeout(reduceVelocity, 23000);
                break;
            }
            case 2: {
                setTimeout(reduceVelocity, 45000);
                break;
            }
            case 3: {
                setTimeout(reduceVelocity, 55000);
                break;
            }
        }
    }
    function reduceVelocity() {
        for (let i = 0; i < moveablesWorker.length; i++) {
            moveablesWorker[i].velocity = new doenerImbiss.Vector(Math.random() * 0.5, Math.random() * 0.5);
        }
        managerVelocityX = 1;
        managerVelocityY = 1;
    }
    function managerRefill() {
        moveablesManager[0].moveBack = false;
        let jarRefill = (document.getElementById("jarRefill"));
        if (capacityJars.meat === 0) {
            moveablesManager[0].velocity.x = managerVelocityX;
            moveablesManager[0].velocity.y = managerVelocityY;
            moveablesManager[0].goalPosition = new doenerImbiss.Vector(150, 200);
            setTimeout(() => (capacityJars.meat = warehouse), 6000);
            setTimeout(displayCapacity, 5000);
            setTimeout(moveManagerBack, 5000);
        }
        else if (capacityJars.lettuce === 0) {
            moveablesManager[0].velocity.x = managerVelocityX;
            moveablesManager[0].velocity.y = managerVelocityY;
            moveablesManager[0].goalPosition = new doenerImbiss.Vector(250, 200);
            setTimeout(displayCapacity, 6000);
            setTimeout(moveManagerBack, 6000);
            setTimeout(() => (capacityJars.lettuce = warehouse), 6000);
        }
        else if (capacityJars.mushrooms === 0) {
            moveablesManager[0].velocity.x = managerVelocityX;
            moveablesManager[0].velocity.y = managerVelocityY;
            moveablesManager[0].goalPosition = new doenerImbiss.Vector(350, 200);
            setTimeout(moveManagerBack, 7000);
            setTimeout(displayCapacity, 7000);
            setTimeout(() => (capacityJars.mushrooms = warehouse), 6000);
        }
        else if (capacityJars.onions === 0) {
            moveablesManager[0].velocity.x = managerVelocityX;
            moveablesManager[0].velocity.y = managerVelocityY;
            moveablesManager[0].goalPosition = new doenerImbiss.Vector(450, 200);
            setTimeout(displayCapacity, 8000);
            setTimeout(moveManagerBack, 8000);
            setTimeout(() => (capacityJars.onions = warehouse), 6000);
        }
        else if (capacityJars.tomatoes === 0) {
            moveablesManager[0].velocity.x = managerVelocityX;
            moveablesManager[0].velocity.y = managerVelocityY;
            moveablesManager[0].goalPosition = new doenerImbiss.Vector(550, 200);
            setTimeout(displayCapacity, 9000);
            setTimeout(moveManagerBack, 9000);
            setTimeout(() => (capacityJars.tomatoes = warehouse), 6000);
        }
        jarRefill.innerHTML = "refill";
    }
    function moveManagerBack() {
        moveablesManager[0].moveBack = true;
        moveablesManager[0].velocity = new doenerImbiss.Vector(-managerVelocityX, -managerVelocityY);
        moveablesManager[0].goalPosition = new doenerImbiss.Vector(10, 10);
    }
})(doenerImbiss || (doenerImbiss = {}));
//# sourceMappingURL=main.js.map