const points = [];
const hull = [];

let leftMostMost;
let currentVertex;
let index = 0;
let nextVertex;

function setup() {
	createCanvas(windowWidth, windowHeight);
    const buffer = 20;
    for (let i = 0; i < 20; i++) {
        points.push(createVector(random(buffer, width-buffer), random(buffer, height-buffer)));
    } 

    points.sort((a, b) => a.x - b.x);
    leftMost = points[0];
    currentVertex = leftMost;
    hull.push(currentVertex);
    nextVertex = points[1];
    index = 2;
}

function draw() {
    background(0);

    stroke(255);
    strokeWeight(8);
    for (let p of points) {
        point(p.x, p.y);
    }

    stroke(0, 0, 255);
    beginShape();
    fill(0, 0, 255, 50);
    for (let p of hull) {
        vertex(p.x, p.y);
    }
    endShape(CLOSE);

    stroke(0, 255, 0);
    strokeWeight(32);
    point(leftMost.x, leftMost.y);

    stroke(200,0,255);
    strokeWeight(32);
    point(currentVertex.x, currentVertex.y);

    stroke(0,255,0);
    strokeWeight(2);
    line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y);

    let checking = points[index];
    stroke(255);
    line(currentVertex.x, currentVertex.y, checking.x, checking.y);

    const a = p5.Vector.sub(nextVertex, currentVertex);
    const b = p5.Vector.sub(checking, currentVertex);
    const cross = a.cross(b);
    if(cross.z < 0) {
        nextVertex = checking;
    }
    index++;
    if(index == points.length) {
        if(nextVertex == leftMost) {
            console.log('Done');
            noLoop();
        }
        hull.push(nextVertex);
        currentVertex = nextVertex;
        index = 0;
        nextVertex = leftMost;
    }
}
