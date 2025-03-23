// class button
class Button {
    constructor(x, y, w, h, text) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
    }
  
    show() {
        fill(255);
        if (this.isClicked()) {
            fill(200);
        }

        rect(this.x, this.y, this.w, this.h);
        fill(0);

        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.text, this.x + this.w / 2, this.y + this.h / 2);
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