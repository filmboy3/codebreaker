function Brick() {
    this.r = random(20, 80);
    this.newX = random(100, width - 100);
    this.newY = random(100, height - 400)
    this.pos = createVector(this.newX, this.newY);
    this.total = 6;

    this.display = function(img) {
        push();
        translate(this.pos.x, this.pos.y);
        if (this.r > 60) {
            fill(196,241,250)
        } else if (this.r > 40) {
            fill(250,196,214)
        } else {
            fill(214,250,196)
        }
        beginShape();
        for (var i = 0; i < this.total; i++){
            let angle = map(i, 0, this.total, 0, TWO_PI);
            var x = this.r * cos(angle);
            var y = this.r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
        return ([this.pos.x - this.r / 2, this.pos.y - this.r / 2, this.r])
    }
}