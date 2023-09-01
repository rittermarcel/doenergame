"use strict";
var doenerImbiss;
(function (doenerImbiss) {
    class Moveable {
        velocity;
        position;
        goalPosition;
        arrived = false;
        moveBack = false;
        mood;
        constructor(_goalPosition, _position) {
            this.position = new doenerImbiss.Vector(0, 0);
            this.goalPosition = _goalPosition;
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            this.position.add(offset);
            if (this.position.x < 50)
                this.velocity.scale(-1);
            if (this.position.y < 170)
                this.velocity.scale(-1);
            if (this.position.x > 650)
                this.velocity.scale(-1);
            if (this.position.y > 400)
                this.velocity.scale(-1);
        }
        moveManager(_timeslice) {
            let offset = this.velocity.copy();
            this.position.addCustomer(offset);
            if (this.moveBack === false) {
                if (this.position.x > this.goalPosition.x) {
                    this.velocity = new doenerImbiss.Vector(0, 0);
                }
            }
            else if (this.moveBack === true) {
                if (this.position.x < this.goalPosition.x) {
                    this.velocity = new doenerImbiss.Vector(0, 0);
                }
            }
        }
        moveCustomer(_timeslice) {
            let offset = this.velocity.copy();
            this.position.addCustomer(offset);
            if (this.position.x < 0) {
                this.velocity.scale(-1);
            }
            if (this.position.x > this.goalPosition.x) {
                this.velocity = new doenerImbiss.Vector(0, 0);
                if (this.arrived === false) {
                    doenerImbiss.callOrder();
                }
                this.arrived = true;
            }
        }
    }
    doenerImbiss.Moveable = Moveable;
})(doenerImbiss || (doenerImbiss = {}));
//# sourceMappingURL=moveable.js.map