"use strict";
var doenerImbiss;
(function (doenerImbiss) {
    class Vector {
        x;
        y;
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        addCustomer(_addend) {
            this.x += _addend.x;
        }
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    doenerImbiss.Vector = Vector;
})(doenerImbiss || (doenerImbiss = {}));
//# sourceMappingURL=vector.js.map