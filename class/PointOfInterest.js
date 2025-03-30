// class pointOfInterest
class PointOfInterest {
    constructor(game, x, y, info = "?") {
        this.x = x;
        this.y = y;
        this.neighbors = [];
        this.state = "unvisited";
        this.game = game;
        this.info = info;
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


        // if clicked and neighbor of current
        if (this.isClicked() && this.onNeighborIsCurrent()) {
            this.state = "current";
            this.currentNeighbor().setState("visited");

            // play event
            this.game.state = "event";
            this.game.fuel--;
        }

        // show info
        if (this.info !== "") {
            fill(0, 255, 0);
            textSize(10);
            textAlign(CENTER, CENTER);
            text(this.info, this.x, this.y + 20);
        }

        // show state if neighbor is current
        if (this.onNeighborIsCurrent()) {
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

    isClicked() {
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
}