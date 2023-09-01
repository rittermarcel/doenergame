"use strict";
var doenerImbiss;
(function (doenerImbiss) {
    class Customers extends doenerImbiss.Moveable {
        position;
        mood = "happy";
        preferences = {
            meat: Math.random() < 0.5,
            lettuce: Math.random() < 0.5,
            mushrooms: Math.random() < 0.5,
            onion: Math.random() < 0.5,
            tomato: Math.random() < 0.5,
        };
        constructor(_goalPosition, _position) {
            super(_position, _goalPosition);
            this.position = _position;
            this.velocity = new doenerImbiss.Vector(6, 0);
            this.goalPosition = _goalPosition;
        }
        draw() {
            let image = document.getElementById("happy");
            if (this.mood === "happy") {
                image = document.getElementById("happy");
            }
            else if (this.mood === "neutral") {
                image = document.getElementById("neutral");
            }
            else if (this.mood === "mad") {
                image = document.getElementById("mad");
            }
            doenerImbiss.crc2.drawImage(image, this.position.x, this.position.y, 70, 70);
        }
    }
    doenerImbiss.Customers = Customers;
})(doenerImbiss || (doenerImbiss = {}));
//# sourceMappingURL=customers.js.map