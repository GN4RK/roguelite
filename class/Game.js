// class Game
class Game {

    constructor() {
        this.state = "menu";
        this.money = 10;
        this.health = 100;
        this.event = "";
        this.pointOfInterest = [];
        this.numberOfPoints = NUMBER_OF_POINTS;
        this.fuel = 10;
        this.buttonMenu = new Button(width / 2 - 50, height / 2 - 25, 100, 50, "Start", () => {
            this.state = "generating";
        });
        this.buttonRegenerate = new Button(width - 200, 0, 200, 50, "Regenerate", () => {
            this.state = "generating";
        });
        this.resumeButton = new Button(width / 2 - 50, height / 2 + 50, 100, 50, "Ok", () => {
            this.state = "play";
        });
    }

    generating() {
        this.state = "generating";
        // generating screen
        background(DARKBLUE);
        fill(255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Generating...", width / 2, height / 2);
    
        let start = new PointOfInterest(this, 50, 100, "start");
        let end = new PointOfInterest(this, width - 50, height - 50, "end");
        start.setState("current");
        this.pointOfInterest = [
            start,
            end
        ];
    
        // generate points of interest
        for (let i = 0; i < this.numberOfPoints; i++) {
            let x = random(50, width - 50);
            let y = random(100, height - 50);
            this.pointOfInterest.push(new PointOfInterest(this, x, y));
        }
        
        // add neighbors
        for (let i = 0; i < this.pointOfInterest.length; i++) {
            for (let j = i + 1; j < this.pointOfInterest.length; j++) {
                if (
                    this.pointOfInterest[i].distanceTo(this.pointOfInterest[j]) < NEIGHBOR_DISTANCE 
                    && !this.pointOfInterest[i].isNeighbor(this.pointOfInterest[j])
                ) {
                    if (!this.pointOfInterest[i].isNeighbor(this.pointOfInterest[j])) {
                        this.pointOfInterest[i].addNeighbor(this.pointOfInterest[j]);
                    }
                    if (!this.pointOfInterest[j].isNeighbor(this.pointOfInterest[i])) {
                        this.pointOfInterest[j].addNeighbor(this.pointOfInterest[i]);
                    }
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
            this.state = "generating";
            return;
        }
    
        // if two points are too close, regenerate
        for (let i = 0; i < this.pointOfInterest.length; i++) {
            for (let j = i + 1; j < this.pointOfInterest.length; j++) {
                if (this.pointOfInterest[i].distanceTo(this.pointOfInterest[j]) < 50) {
                    console.log("Two points are too close");
                    this.state = "generating";
                    return;
                }
            }
        }
        
        // if there is a point without neighbors, regenerate
        if (this.pointOfInterest.some(poi => !poi.hasNeighbor())) {
            console.log("There is a point without neighbors");
            this.state = "generating";
            return;
        }

        // adds event to the map
        this.addEvents();       

        this.state = "play";
    }

    play() {
        // background
        gradientBG(0, 0, width, height, color(0, 4, 35), color(26, 30, 89));
    
        // draw links between points
        this.drawLinks();

        // draw points of interest
        this.pointOfInterest.forEach(poi => {
            poi.show();
        });

        // HUD
        new InfoBox(0, 0, 200, 50, "Fuel: " + this.fuel).show();
        new InfoBox(200, 0, 200, 50, "Money: " + this.money + "$").show();
        new InfoBox(400, 0, 200, 50, "Health: " + this.health).show();
    
        // Regenerate button
        this.buttonRegenerate.show();

        this.checkEnd();
        this.checkGameOver();

    }

    menu() {
        // dark blue background
        background(DARKBLUE);
        this.buttonMenu.show();
    }

    checkEnd() {
        if (this.pointOfInterest[1].state === "current") {
            this.state = "menu";
        }
    }

    checkGameOver() {
        if (this.health <= 0) {
            this.state = "gameover";
        }
    }

    playEvent() {

        switch(this.event) {
            case "shop":
                this.shopEvent();
                break;
            case "pirate":
                this.pirateEvent();
                break;
            case "lucky":
                this.luckyEvent();
                break;
            case "?":
            case "wait":
                // wait for user to click
                this.resumeButton.show();
                break;
            default:
                console.log("Unknown event: " + this.event);
                break;
        }
        
    }

    drawLinks() {

        stroke(0, 255, 0);
        strokeWeight(1);

        // collect all couple of neighbors
        let couples = [];
        for (let i = 0; i < this.pointOfInterest.length; i++) {
            this.pointOfInterest[i].neighbors.forEach(pointOfInterest => {
                couples.push([this.pointOfInterest[i], pointOfInterest]);
            });
        }

        if (debug < 2) {
            console.log(couples);
            debug++;
        }

        // remove duplicates
        removeDuplicatePairs(couples);

        // draw all couple of neighbors
        couples.forEach(couple => {
            // dotted line
            drawingContext.setLineDash([5, 10]);
            line(couple[0].x, couple[0].y, couple[1].x, couple[1].y);
        });
        
        // reset line dash
        drawingContext.setLineDash([]);
    }

    addEvents() {
        // add shops to 2 random points
        let shopCount = 0;
        while (shopCount < 2) {
            let randomIndex = Math.floor(random(1, this.pointOfInterest.length - 1));
            // cannot be start or end point
            if (
                this.pointOfInterest[randomIndex].info == "?") {
                this.pointOfInterest[randomIndex].setAsShop();
                shopCount++;
            }
        }

        // add pirates to 2 random points
        let pirateCount = 0;
        while (pirateCount < 2) {
            let randomIndex = Math.floor(random(1, this.pointOfInterest.length - 1));
            if (
                this.pointOfInterest[randomIndex].info == "?") {
                this.pointOfInterest[randomIndex].setAsPirate();
                pirateCount++;
            }
        }

        // add lucky points to 2 random points
        let luckyCount = 0;
        while (luckyCount < 2) {
            let randomIndex = Math.floor(random(1, this.pointOfInterest.length - 1));
            if (
                this.pointOfInterest[randomIndex].info == "?") {
                this.pointOfInterest[randomIndex].setAsLucky();
                luckyCount++;
            }
        }
    }

    pirateEvent() {
        background(100, 0, 0);
        fill(255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("You have been attacked by space pirates!", width / 2, height / 2);
        // lose health and money
        let lostHealth = Math.floor(random(1, 100));
        let lostMoney = Math.floor(random(1, 10));
        this.health -= lostHealth;
        this.money -= lostMoney;
        this.event = "wait";
    }

    shopEvent() {
        background(0, 100, 0);
        fill(255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("You have found a shop!", width / 2, height / 2);
        this.event = "wait";
    }

    luckyEvent() {
        background(0, 0, 100);
        fill(255);
        textSize(30);
        textAlign(CENTER, CENTER);
        // found random fuel and money
        let foundFuel = Math.floor(random(1, 10));
        let foundMoney = Math.floor(random(1, 10));
        this.fuel += foundFuel;
        this.money += foundMoney;
        text("You have found " + foundFuel + " Fuel Units and " + foundMoney + "$", width / 2, height / 2);

        this.event = "wait";
    }

    gameOver() {
        background(0, 0, 0);
        fill(255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Game Over", width / 2, height / 2);
        text("You have lost all your health", width / 2, height / 2 + 50);
    }
}