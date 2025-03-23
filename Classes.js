// class button
class Button {
    constructor(x, y, w, h, text, onClick) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.onClick = onClick;
    }
  
    show() {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.text, this.x + this.w / 2, this.y + this.h / 2);
        if (this.isClicked()) {
            this.onClick();
        }
    }
  
    isClicked() {
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y 
            && mouseY < this.y + this.h 
            && mouseIsPressed
        ) {
            return true;
        }
        return false;
    }
}

// class pointOfInterest
class PointOfInterest {
    constructor(x, y, neighbors = []) {
        this.x = x;
        this.y = y;
        this.neighbors = neighbors;
        this.state = "unvisited";
    }

    addNeighbor(neighbor) {
        this.neighbors.push(neighbor);
    }

    show() {
        switch (this.state) {
            case "unvisited":
                fill(255);
                break;
            case "visited":
                fill(0, 255, 0);
                break;
            case "current":
                // add a rotating square
                fill(255, 0, 0, 255);
                rectMode(CENTER);
                push();
                translate(this.x, this.y);
                rotate(frameCount / 25.0);
                rect(0, 0, 30, 30);
                pop();
                rectMode(CORNER);
        }
        
        // if mouse is over the point, show the neighbors
        strokeWeight(2);
        stroke(255);
        if (dist(this.x, this.y, mouseX, mouseY) < 15) {
            this.neighbors.forEach(neighbor => {
                line(this.x, this.y, neighbor.x, neighbor.y);
            });
        }
        strokeWeight(1);
        stroke(0);
        fill(255,213,76);
        circle(this.x, this.y, 30);

        
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
}