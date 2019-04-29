/*jshint esversion: 6 */

let plane = {};
let nplane = {};
let xSize = 100;
let ySize = 100;
let pixelSize = 6;
let cntu = true;
function setup() {

    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    print("Width:", width, "Height:", height);
    for (let i = 0; i <= xSize; i ++) {
        plane[i] = {};
        for (let j = 0; j <= ySize; j ++) {
            plane[i][j] = {"state":"d", "pstate":"d"};
        }
    }
    stroke(0);
    print(plane);
    strokeWeight(0.5);
    plane[50][50]["state"] = "z";
    plane[51][50]["state"] = "z";
    plane[52][50]["state"] = "z";
    fill(255);
    background(255);
}

function draw() {
    if (cntu) {
        fill(255);
        checks();
        print(plane);
    }
}

function drawPixel(x, y) {
    if (plane[x][y][0] == "z") {
        fill(0);
        square(x*pixelSize, y*pixelSize, pixelSize);
        fill(255);
    } else if (plane[x][y][0] == "l") {
        fill(color(255,69,0));
        square(x*pixelSize, y*pixelSize, pixelSize);
        fill(255);
    }
}

function checks() {
    for (let i = 0; i <= xSize; i ++) {
        nplane[i] = {};
        for (let j = 0; j <= ySize; j ++) {
            nplane[i][j] = {0:"d", 1:"d"};
        }
    }
    for (x in plane) {
        for (y in plane[x]) {
            let count = getNeighbours(x,y);
            if (count < 2) {
                nplane[x][y][1] = plane[x][y][0];
                nplane[x][y][0] = "d";
            } else if (count > 3) {
                nplane[x][y][1] = plane[x][y][0];
            } else if (plane[x][y][0] == "d" && count == 3) {
                nplane[x][y][1] = plane[x][y][0];
                nplane[x][y][0] = "z";
            } else {
                nplane[x][y][1] = plane[x][y][0];
                nplane[x][y][0] = "z";
            }
            if (nplane[x][y][0] != plane[x][y][0]) {
                drawPixel(x, y);
            }
        }
    }
    plane = nplane;
}

function getNeighbours(x,y) {
    let count = 0;
    neighbours = {};
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
    return count;
}