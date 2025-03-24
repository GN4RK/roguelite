// class InfoBox
class InfoBox {
    constructor(x, y, w, h, text) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
    }

    show() {
        stroke(0,255,0);
        fill(0,0,0);
        rect(this.x, this.y, this.w, this.h);
        fill(0,255,0);
        stroke(0,255,0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.text, this.x + this.w / 2, this.y + this.h / 2);
    }
}