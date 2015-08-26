var ARROW_TIME = 10;

var intervalar = null;
var flag = 0;
var elem = document.getElementById("1");
var scoreElem = document.getElementById("2");
var two = new Two({
    width: 1000,
    height: 600
}).appendTo(elem);
var position = new Two.Vector(two.width, two.height / 2);
elem.children[0].setAttribute("style", "margin-left:200px");
elem.children[0].setAttribute("style", "margin-top:100px");
elem.children[0].setAttribute("style", "background-color:cyan");
two.fill = 'rgb(255, 127, 80)';

var score = 0;
//creating arrow

var line = two.makeLine(position.x - 100, position.y, position.x, position.y);
line.linewidth = 10;
line.fill = 'rgb(30, 30, 33)';
var arrowlength = 100;
//two.update();
function arrowMotion() {
    if (intervalar === null) {
        intervalar = setInterval(function () {
            if (position.y === 0) {
                flag = 1;
                line.translation.y = position.y + 1;
                position.y = position.y + 1;

            } else if (flag === 0) {
                line.translation.y = position.y - 1;
                position.y = position.y - 1;
            }
            if (position.y === two.height) {
                flag = 0;
                line.translation.y = position.y - 1;
                position.y = position.y - 1;

            } else if (flag === 1) {
                line.translation.y = position.y + 1;
                position.y = position.y + 1;
            }
            two.update();

        }, ARROW_TIME);
    }
}
arrowMotion();
var garr = []; //for storing the state of ballons.

function removefromgarr(entity) { //function to remove the line elements from the global array.
    var i;
    for (i = 0; i < garr.length; i++) {
        if (garr[i].id === entity.id) {
            two.remove(entity);
            two.update();
            garr.splice(i, 1);
        }

    }

}

function check(circle) {// for removal of bubbles.

    var i;
    for (i = 0; i < garr.length; i++) {
        if ((garr[i].translation.y >= circle.translation.y - 50) && (garr[i].translation.y <= circle.translation.y + 50) && (garr[i].translation.x >= circle.translation.x - 100) && (garr[i].translation.x <= circle.translation.x + 100)) {
            score += 1;
            scoreElem.innerText = "Score: "+ score + "; Level: " + Math.floor(score / 10);
            return true;
        }
    }
}

document.onclick = function shootarrow() {
    var templine = two.makeLine(position.x - arrowlength, position.y, position.x, position.y);
    templine.linewidth = 10;
    templine.fill = 'rgb(109, 83, 98)';
    garr.push(templine); //pushing into array.

    var intervalid2 = setInterval(function () {
        if (templine.translation.x <= 0) {
            removefromgarr(templine);
            two.remove(templine);
            clearInterval(intervalid2);
            two.update();
            return;
        }


        templine.translation.x -= 10;
        two.update();

    }, 10);

};

var arr = ['rgb(114, 175, 127)', 'rgb(175, 114, 170)', 'rgb(224, 153, 23)', 'rgb(222, 208, 28)', 'rgb(226, 13, 108)', 'rgb(6, 241, 232)'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createbubbles() {
    var circleinitx = 100;
    var circle = two.makeCircle(circleinitx, two.height - 50, 50);
    circle.fill = arr[getRandomInt(0, 5)];
    var intervalid3 = setInterval(function () {
        //garr.push({t:time,c:circle});
        if (circle.translation.y <= -50 || check(circle)) {

            clearInterval(intervalid3);
            two.remove(circle);
            two.update();
            return;
        }

        circle.translation.y -= (5 + Math.floor(score / 10));
        two.update();

    }, 10);
    two.update();
}

var intervalid4 = setInterval(function () {
    createbubbles();
}, 1000);