const DARKBLUE = [0, 4, 35];
const NUMBER_OF_POINTS = 10;
const NEIGHBOR_DISTANCE = 250;

let game;

let debug = 0;

function setup() {
    createCanvas(800, 600);
    game = new Game();
}

function draw() {
    switch (game.state) {
        case "menu":
            game.menu();
            break;
        case "generating":
            game.generating();
            break;
        case "play":
            game.play();
            break;
        case "event":
            game.playEvent();
            break;
    }
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