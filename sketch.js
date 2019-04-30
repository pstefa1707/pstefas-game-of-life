/*jshint esversion: 6 */

let plane = {};
let xSize = 150;
let ySize = 150;
let pixelSize = 15;
let cntu = true;
var bgGraph;
function setup() {
    createCanvas(pixelSize*xSize, pixelSize*ySize);
    bgGraph = createGraphics(width, height);
    print("Width:", width, "Height:", height);
    for (let i = 0; i <= xSize; i ++) {
        plane[i] = {};
        for (let j = 0; j <= ySize; j ++) {
            let num = random(1);
            if (num > 0.5) {
                plane[i][j] = {"state":"z", "pstate":"d"};
            } else {
                plane[i][j] = {"state":"d", "pstate":"d"};
            }
            bgGraph.square(i*pixelSize, j*pixelSize, pixelSize);
        }
    }
    stroke(0);
    strokeWeight(0.5);
    fill(255);
}

function draw() {
    image(bgGraph, 0, 0);
    fill(255);
    checks();
    document.getElementById("fpsCounter").innerHTML = "FPS: " + round(frameRate());
}

function drawPixel(x, y) {
    if (plane[x][y]["state"] == "z") {
        fill(0);
        square(x*pixelSize, y*pixelSize, pixelSize);
        fill(255);
    } else if (plane[x][y]["state"] == "l") {
        fill(color(255,69,0));
        square(x*pixelSize, y*pixelSize, pixelSize);
        fill(255);
    } else {
        square(x*pixelSize, y*pixelSize, pixelSize);
    }
}

function checks() {
    let nplane = {};
    for (let i = 0; i <= xSize; i ++) {
        nplane[i] = {};
        for (let j = 0; j <= ySize; j ++) {
            nplane[i][j] = {"state":"d", "pstate":"d"};
        }
    }
    for (x in plane) {
        for (y in plane[x]) {
            let count = getNeighbours(x,y);
            if ((count <= 1 && plane[x][y]["state"] == "z")|| (count >= 4 && plane[x][y]["state"] == "z")) {
                nplane[x][y]["state"] = "d";
            } else if (count == 3 && plane[x][y]["state"] == "d") {
                nplane[x][y]["state"] = "z";
            } else if ((count == 3 || count == 2) && plane[x][y]["state"] == "z"){
                nplane[x][y]["state"] = "z";
            }
            if (nplane[x][y]["state"] != plane[x][y]["state"]){
                drawPixel(x,y);
            }
        }
    }
    plane = nplane;
}

function getNeighbours(x,y) {
    let count = 0;
    neighbours = {};
    try {
        if (x == 0 && y==0) { //if cell in top left corner
            neighbours["top"] = plane[x][ySize]["state"];
            neighbours["bottom"] = plane[x][int(int(y) + 1)]["state"];
            neighbours["left"] = plane[xSize][y]["state"];
            neighbours["right"] = plane[int(int(x) + 1)][y]["state"];
            neighbours["top-right"] = plane[int(int(x) + 1)][ySize]["state"];
            neighbours["bottom-right"] = plane[int(int(x) + 1)][int(int(y) + 1)]["state"];
            neighbours["top-left"] = plane[xSize][ySize]["state"];
            neighbours["bottom-left"] = plane[xSize][int(y) + 1]["state"];
        } else if (x == xSize && y==0) { //if cell in top right corner
            neighbours["top"] = plane[x][ySize]["state"];
            neighbours["bottom"] = plane[x][int(y) + 1]["state"];
            neighbours["left"] = plane[int(x) - 1][y]["state"];
            neighbours["right"] = plane[0][y]["state"];
            neighbours["top-right"] = plane[0][ySize]["state"];
            neighbours["bottom-right"] = plane[0][int(y) + 1]["state"];
            neighbours["top-left"] = plane[int(x) - 1][ySize]["state"];
            neighbours["bottom-left"] = plane[int(x) - 1][int(y) + 1]["state"];
        } else if (x == xSize && y== ySize) { //if cell in bottom right corner
            neighbours["top"] = plane[x][int(y) - 1]["state"];
            neighbours["bottom"] = plane[x][0]["state"];
            neighbours["left"] = plane[int(x) - 1][y]["state"];
            neighbours["right"] = plane[0][y]["state"];
            neighbours["top-right"] = plane[0][int(y) - 1]["state"];
            neighbours["bottom-right"] = plane[0][0]["state"];
            neighbours["top-left"] = plane[int(x) - 1][int(y) - 1]["state"];
            neighbours["bottom-left"] = plane[int(x) - 1][0]["state"];
        } else if (x == 0 && y==ySize) { //if cell in bottom left corner
            neighbours["top"] = plane[x][int(y) - 1]["state"];
            neighbours["bottom"] = plane[0][y]["state"];
            neighbours["left"] = plane[xSize][y]["state"];
            neighbours["right"] = plane[int(x) + 1][y]["state"];
            neighbours["top-right"] = plane[int(x) + 1][int(y) - 1]["state"];
            neighbours["bottom-right"] = plane[0][1]["state"];
            neighbours["top-left"] = plane[xSize][int(y) - 1]["state"];
            neighbours["bottom-left"] = plane[xSize][0]["state"];
        } else if (y==0) {
            neighbours["top"] = plane[x][ySize]["state"];
            neighbours["bottom"] = plane[x][1]["state"];
            neighbours["left"] = plane[int(x) - 1][0]["state"];
            neighbours["right"] = plane[int(x) + 1][0]["state"];
            neighbours["top-right"] = plane[int(x) + 1][ySize]["state"];
            neighbours["bottom-right"] = plane[int(x) + 1][1]["state"];
            neighbours["top-left"] = plane[int(x) - 1][ySize]["state"];
            neighbours["bottom-left"] = plane[int(x) - 1][1]["state"];
        } else if (y==ySize) {
            neighbours["top"] = plane[x][int(y) - 1]["state"];
            neighbours["bottom"] = plane[x][0]["state"];
            neighbours["left"] = plane[int(x) - 1][y]["state"];
            neighbours["right"] = plane[int(x) + 1][y]["state"];
            neighbours["top-right"] = plane[int(x) + 1][int(y) - 1]["state"];
            neighbours["bottom-right"] = plane[int(x) + 1][0]["state"];
            neighbours["top-left"] = plane[int(x) - 1][y - 1]["state"];
            neighbours["bottom-left"] = plane[int(x) - 1][0]["state"];
        } else if (x==0) {
            neighbours["top"] = plane[x][int(y) - 1]["state"];
            neighbours["bottom"] = plane[x][int(y) + 1]["state"];
            neighbours["left"] = plane[xSize][y]["state"];
            neighbours["right"] = plane[int(x) + 1][y]["state"];
            neighbours["top-right"] = plane[int(x) + 1][int(y) - 1]["state"];
            neighbours["bottom-right"] = plane[int(x) + 1][int(y) + 1]["state"];
            neighbours["top-left"] = plane[xSize][y - 1]["state"];
            neighbours["bottom-left"] = plane[xSize][int(y) + 1]["state"];
        }else if (x==xSize) {
            neighbours["top"] = plane[x][int(y) - 1]["state"];
            neighbours["bottom"] = plane[x][int(y) + 1]["state"];
            neighbours["left"] = plane[int(x)-1][y]["state"];
            neighbours["right"] = plane[0][y]["state"];
            neighbours["top-right"] = plane[0][int(y) - 1]["state"];
            neighbours["bottom-right"] = plane[0][int(y) + 1]["state"];
            neighbours["top-left"] = plane[int(x) - 1][int(y) - 1]["state"];
            neighbours["bottom-left"] = plane[int(x) - 1][int(y) + 1]["state"];
        } else {
            neighbours["top"] = plane[x][int(y) - 1]["state"];
            neighbours["bottom"] = plane[x][int(y) + 1]["state"];
            neighbours["left"] = plane[int(x)-1][y]["state"];
            neighbours["right"] = plane[int(x)+1][y]["state"];
            neighbours["top-right"] = plane[int(x)+1][int(y) - 1]["state"];
            neighbours["bottom-right"] = plane[int(x)+1][int(y) + 1]["state"];
            neighbours["top-left"] = plane[int(x) - 1][int(y) - 1]["state"];
            neighbours["bottom-left"] = plane[int(x) - 1][int(y) + 1]["state"];
        }
        for (pos in neighbours) {
            if (neighbours[pos] == "z") {
                count ++;
            }
        }
    } catch {
        count = 2;
    }
    return count;
}