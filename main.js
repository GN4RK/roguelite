let state = "menu";
let numberOfPoints = 10;
let pointOfInterest = [];
const DARKBLUE = [0, 4, 35];

function setup() {
    createCanvas(800, 600);
}

function draw() {
    switch (state) {
        case "menu":
            menu();
            break;
        case "generating":
            generating();
            break;
        case "game":
            game();
            break;
    }
}

function menu() {
    // dark blue background
    background(DARKBLUE);
    new Button(width / 2 - 50, height / 2 - 25, 100, 50, "Start", function() {
        state = "generating";
    }).show();
}

function generating() {
    // generating screen
    background(DARKBLUE);
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Generating...", width / 2, height / 2);

    let start = new PointOfInterest(50, 50);
    let end = new PointOfInterest(width - 50, height - 50);
    start.setState("current");
    pointOfInterest = [
        start,
        end
    ];

    for (let i = 0; i < numberOfPoints; i++) {
        let x = random(50, width - 50);
        let y = random(50, height - 50);
        pointOfInterest.push(new PointOfInterest(x, y));
    }
    
    for (let i = 0; i < pointOfInterest.length; i++) {
        for (let j = i + 1; j < pointOfInterest.length; j++) {
            if (pointOfInterest[i].distanceTo(pointOfInterest[j]) < 250 
            && !pointOfInterest[i].isNeighbor(pointOfInterest[j])) {
                pointOfInterest[i].addNeighbor(pointOfInterest[j]);
                pointOfInterest[j].addNeighbor(pointOfInterest[i]);
            }
        }
    }

    // check if end is reachable
    let queue = [start];
    let visited = [];
    while (queue.length > 0) {
        let current = queue.shift();
        visited.push(current);
        current.neighbors.forEach(neighbor => {
            if (!visited.includes(neighbor) && !queue.includes(neighbor)) {
                queue.push(neighbor);
            }
        });
    }
    if (!visited.includes(end)) {
        console.log("End is not reachable");
        state = "generating";
        return;
    }

    // if two points are too close, regenerate
    for (let i = 0; i < pointOfInterest.length; i++) {
        for (let j = i + 1; j < pointOfInterest.length; j++) {
            if (pointOfInterest[i].distanceTo(pointOfInterest[j]) < 50) {
                console.log("Two points are too close");
                state = "generating";
                return;
            }
        }
    }
    
    // if there is a point without neighbors, regenerate
    if (pointOfInterest.some(poi => !poi.hasNeighbor())) {
        console.log("There is a point without neighbors");
        state = "generating";
        return;
    }
    state = "game";
}

function game() {
    // background(DARKBLUE);
    gradientBG(0, 0, width, height, color(0, 4, 35), color(26, 30, 89));
    pointOfInterest.forEach(poi => {
        poi.show();
    });

    stroke(255);
    new Button(width - 200, 0, 200, 50, "Regenerate", function() {
        state = "generating";
    }).show();

}

function gradientBG(x, y, w, h, c1, c2) {
    noFill();
    // Top to bottom gradient
    for (let i = y; i <= y + h/2; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i); 
    }
    for (let i = h/2; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c2, c1, inter);
        stroke(c);
        line(x, i, x + w, i); 
    }
  }