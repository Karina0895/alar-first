const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const ctx1 = canvas1.getContext("2d");

function createStar(cx, cy, angles, outRad, inRad, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / angles;

    ctx1.beginPath();
    ctx1.moveTo(cx, cy - outRad);
    for (i = 0; i < angles; i++) {
        x = cx + Math.cos(rot) * outRad;
        y = cy + Math.sin(rot) * outRad;
        ctx1.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * inRad;
        y = cy + Math.sin(rot) * inRad;
        ctx1.lineTo(x, y);
        rot += step
    }
    ctx1.lineTo(cx, cy - outRad);
    ctx1.closePath();
    ctx1.strokeStyle = color;
    ctx1.stroke();
    ctx1.fillStyle = color;
    ctx1.fill();
    let pixel = ctx1.getImageData(x, y, 1, 1).data;
}

createStar(95, 100, 5, 70, 30, 'red');
createStar(295, 300, 5, 70, 30, 'blue');
createStar(495, 100, 5, 70, 30, 'green');
createStar(95, 500, 5, 70, 30, 'yellow');
createStar(495, 500, 5, 70, 30, 'black');



function Pos(obj) {
    let left = 0, top = 0;
    if (obj.offsetParent) {
        do {
            left += obj.offsetLeft;
            top += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return {x: left, y: top};
    }
    return undefined;
}

canvas1.addEventListener('click', function (e) {
    let pos = Pos(this);
    let x = e.pageX - pos.x;
    let y = e.pageY - pos.y;
    let c = this.getContext('2d');
    let p = c.getImageData(x, y, 1, 1).data;
    let rgbaCol = 'rgba(' + p[0] + ', ' + p[1] +
        ', ' + p[2] + ', ' + (p[3] / 255) + ')';
    canvas2.style.backgroundColor = rgbaCol;
});


