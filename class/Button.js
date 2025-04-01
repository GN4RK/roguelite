// class button
class Button {
    constructor(x, y, w, h, text, onClick) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.onClick = onClick;
        this.clickState = "waiting";
    }
  
    show() {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.text, this.x + this.w / 2, this.y + this.h / 2);
        if (this.clickState == "released") {
            this.clickState = "waiting";
            this.onClick();
        }
        if (this.isPressed()) {
            this.clickState = "pressed";
        }

        if (this.clickState == "pressed" && mouseIsPressed == false) {
            this.clickState = "released";
        }
    }
  
    isPressed() {
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y 
            && mouseY < this.y + this.h 
            && mouseIsPressed
        ) {
            return true;
        }
        return false;
    }
}