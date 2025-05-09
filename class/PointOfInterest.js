// class pointOfInterest
class PointOfInterest {
    constructor(game, x, y, info = "?") {
        this.x = x;
        this.y = y;
        this.neighbors = [];
        this.state = "unvisited";
        this.game = game;
        this.info = info;
        this.clickState = "waiting";
    }

    addNeighbor(neighbor) {
        this.neighbors.push(neighbor);
    }

    show() {
        stroke(255);
        strokeWeight(1);

        // if mouse is over the point, show the neighbors
        strokeWeight(2);
        stroke(255);
        if (dist(this.x, this.y, mouseX, mouseY) < 15) {
            this.neighbors.forEach(neighbor => {
                line(this.x, this.y, neighbor.x, neighbor.y);
            });
        }

        fill(255,213,76);
        switch (this.state) {
            case "visited":
                fill(0, 255, 0);
                break;
            case "current":
                // add a rotating square
                fill(255, 0, 0);
                rectMode(CENTER);
                push();
                translate(this.x, this.y);
                rotate(frameCount / 25.0);
                rect(0, 0, 30, 30);
                pop();
                rectMode(CORNER);
                fill(255,213,76);
                break;
            case "clicked":
                fill(255, 0, 0);
                break;
        }

        // draw the point
        strokeWeight(1);
        stroke(0);
        circle(this.x, this.y, 30);

        if (this.isPressed() && this.onNeighborIsCurrent()) {
            this.clickState = "pressed";
        }

        if (this.clickState == "pressed" && mouseIsPressed == false && this.onNeighborIsCurrent()) {
            this.clickState = "released";
        }

        // if clicked and neighbor of current
        if (this.clickState == "released" && this.onNeighborIsCurrent()) {

            if (this.state != "visited") {
                // play event
                this.game.state = "event";
                this.game.event = this.info;
            }
            this.state = "current";
            this.currentNeighbor().setState("visited");

            this.game.fuel--;
            
            this.clickState = "waiting";
        }

        // show info
        if ((this.info == "start") || (this.info == "end")) {
            fill(0, 255, 0);
            textSize(10);
            textAlign(CENTER, CENTER);
            text(this.info, this.x, this.y + 20);
        }

        // show state if neighbor is current or if already visited
        if (this.onNeighborIsCurrent() || this.state == "visited") {
            fill(255, 0, 0);
            textSize(10);
            textAlign(CENTER, CENTER);
            text(this.state, this.x, this.y - 20);
            text(this.info, this.x, this.y + 20);
        }
    }

    distanceTo(other) {
        return dist(this.x, this.y, other.x, other.y);
    }

    isNeighbor(other) {
        return this.neighbors.includes(other);
    }

    hasNeighbor() {
        return this.neighbors.length > 0;
    }

    setState(state) {
        this.state = state;
    }

    isPressed() {
        return (dist(this.x, this.y, mouseX, mouseY) < 15 && mouseIsPressed);
    }

    isCurrent() {
        return this.state === "current";
    }

    onNeighborIsCurrent() {
        return this.neighbors.some(neighbor => neighbor.isCurrent());
    }

    currentNeighbor() {
        return this.neighbors.find(neighbor => neighbor.isCurrent());
    }

    setAsShop() {
        this.info = "shop";
    }

    setAsPirate() {
        this.info = "pirate";
    }

    setAsLucky() {
        this.info = "lucky";
    }
}