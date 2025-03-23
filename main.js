let state = "menu";
const DARKBLUE = [0, 4, 35];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  if (state === "menu") {
    menu();
  } else if (state === "game") {
    game();
  }
}

function menu() {
  // dark blue background
  background(DARKBLUE);
  new Button(width / 2 - 50, height / 2 - 25, 100, 50, "Start").show();
}