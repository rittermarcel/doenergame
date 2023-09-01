"use strict";
var doenerImbiss;
(function (doenerImbiss) {
    class Workers extends doenerImbiss.Moveable {
        position;
        mood = "happy";
        constructor(_position, _goalPosition, _moveBack) {
            super(_position, _goalPosition);
            this.position = _position;
            this.velocity = new doenerImbiss.Vector(Math.random() * 1 + 0.2, Math.random() * 1 + 0.2);
            this.goalPosition = _goalPosition;
            _moveBack = this.moveBack;
        }
        draw() {
            let image = document.getElementById("workerIcon");
            if (this.mood === "happy") {
                image = document.getElementById("workerIcon");
            }
            else if (this.mood === "sad") {
                image = document.getElementById("workerIconSad");
            }
            doenerImbiss.crc2.drawImage(image, this.position.x, this.position.y, 70, 70);
        }
    }
    doenerImbiss.Workers = Workers;
})(doenerImbiss || (doenerImbiss = {}));
//# sourceMappingURL=workers.js.map