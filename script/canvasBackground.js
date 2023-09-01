"use strict";
var doenerImbiss;
(function (doenerImbiss) {
    class CanvasBackground {
        drawBackground() {
            // line above horizontal
            doenerImbiss.crc2.beginPath();
            doenerImbiss.crc2.moveTo(0, 150);
            doenerImbiss.crc2.lineTo(doenerImbiss.crc2.canvas.width, 150);
            doenerImbiss.crc2.strokeStyle = "white";
            doenerImbiss.crc2.stroke();
            doenerImbiss.crc2.closePath();
            // line below horizontal
            doenerImbiss.crc2.beginPath();
            doenerImbiss.crc2.moveTo(0, doenerImbiss.crc2.canvas.height - 150);
            doenerImbiss.crc2.lineTo(doenerImbiss.crc2.canvas.width, doenerImbiss.crc2.canvas.height - 150);
            doenerImbiss.crc2.strokeStyle = "white";
            doenerImbiss.crc2.stroke();
            doenerImbiss.crc2.closePath();
        }
        displayJars() {
            let imageJarMeat = (document.getElementById("jarMeat"));
            doenerImbiss.crc2.drawImage(imageJarMeat, 150, 30, 60, 90);
            let imageJarLettuce = (document.getElementById("jarLettuce"));
            doenerImbiss.crc2.drawImage(imageJarLettuce, 250, 30, 60, 90);
            let imageJarMushrooms = (document.getElementById("jarMushrooms"));
            doenerImbiss.crc2.drawImage(imageJarMushrooms, 350, 30, 60, 90);
            let imageJarOnions = (document.getElementById("jarOnions"));
            doenerImbiss.crc2.drawImage(imageJarOnions, 450, 30, 60, 90);
            let imageJarTomatos = (document.getElementById("jarTomatos"));
            doenerImbiss.crc2.drawImage(imageJarTomatos, 550, 30, 60, 90);
        }
    }
    doenerImbiss.CanvasBackground = CanvasBackground;
})(doenerImbiss || (doenerImbiss = {}));
//# sourceMappingURL=canvasBackground.js.map