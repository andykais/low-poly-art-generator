


// Vertex

function vertex(x, y) {
    this.x = x;
    this.y = y;
    this.r = snapSide / 4;
    this.red = 128;
    this.green = 128;
    this.blue = 128;
}


vertex.prototype.DrawNum = function(ctx) {

    this.avColor();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',1)';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(0, 0, 0, 1)";

    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.fill();
	ctx.strokeStyle = "rgba(255,255,255,0.5)";
	ctx.stroke();    
    ctx.closePath();
    ctx.shadowBlur = 0;
}


// Triangle

function triangle(v0, v1, v2, v3, v4, num) { // 3 sided polygon
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
	this.v3 = v3;
	this.v4 = v4;
    this.numvertices = num;
}

triangle.prototype.Draw = function(ctx) {
    // Draw edges
    ctx.beginPath();
	if (this.numvertices == 3) {
        var tmpVertex = new vertex(~~ ((this.v0.x + this.v1.x + this.v2.x) / 3), ~~ ((this.v0.y + this.v1.y + this.v2.y) / 3));
    }
	if (this.numvertices == 4) {
        var tmpVertex = new vertex(~~ ((this.v0.x + this.v1.x + this.v2.x + this.v3.x) / 4), ~~ ((this.v0.y + this.v1.y + this.v2.y + this.v3.y) / 4));
    }
	if (this.numvertices == 5) {
	    var tmpVertex = new vertex(~~ ((this.v0.x + this.v1.x + this.v2.x + this.v3.x + this.v4.x) / 5), ~~ ((this.v0.y + this.v1.y + this.v2.y + this.v3.y + this.v4.y) / 5));
	}
	tmpVertex.avColor();
    var lingrad = ctx.createLinearGradient(this.v0.x, this.v0.y, Math.max(this.v1.x, this.v2.x), Math.max(this.v1.y, this.v2.y));
    //lingrad.addColorStop(0, 'rgb(' + ~~ ((tmpVertex.red + this.v0.red) / 2) + ',' + ~~ ((tmpVertex.green + this.v0.green) / 2) + ',' + ~~ ((tmpVertex.blue + this.v0.blue) / 2) + ')');
    //lingrad.addColorStop(1, 'rgb(' + ~~ ((tmpVertex.red + this.v1.red + this.v2.red) / 3) + ',' + ~~ ((tmpVertex.green + this.v1.green + this.v2.green) / 3) + ',' + ~~ ((tmpVertex.blue + this.v1.blue + this.v2.blue) / 3) + ')');
	lingrad.addColorStop(0, 'rgb(' + ~~ (tmpVertex.red) + ',' + ~~ (tmpVertex.green) + ',' + ~~ (tmpVertex.blue) + ')');
	lingrad.addColorStop(1, 'rgb(' + ~~ (tmpVertex.red) + ',' + ~~ (tmpVertex.green) + ',' + ~~ (tmpVertex.blue) + ')');
    ctx.fillStyle = lingrad;
    ctx.moveTo(this.v0.x, this.v0.y);
    ctx.lineTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);
	if (this.numvertices > 3) {
	   ctx.lineTo(this.v3.x, this.v3.y);
	}
	if (this.numvertices > 4) {
	   ctx.lineTo(this.v4.x, this.v4.y);
	}
	ctx.lineTo(this.v0.x, this.v0.y);
    ctx.fill();
    ctx.closePath();

    delete tmpVertex;
    delete lingrad;

} // Draw
vertex.prototype.avColor = function() {
    var result = [0, 0, 0];
    var startX = 0,
        startY = 0;
    if (this.x < snapSide/2)  {    
        startX = 0;
    } else {
    if (this.x + snapSide / 2 > sourceImg.width)  {
        startX = sourceImg.width - snapSide
    } else {
        startX = this.x - snapSide / 2
    }
    }
    if (this.y < snapSide / 2)  {    
        startY = 0;                
    } else {
    if (this.y + snapSide / 2 > sourceImg.height)  {
        startY = sourceImg.height - snapSide
    } else {
        startY = this.y - snapSide / 2
    }
    }
    startX = ~~startX-4; // offset since if we don't do this it's grabbing color 4 pixels to the right
    startY = ~~startY;
    var tempColor = imgCtx.getImageData(startX+1, startY+1, snapSide-2, snapSide-2).data;
	
    for (i = 0; i < (snapSide-2) * (snapSide-2); i++) {
        result[0] += tempColor[4 * i];
        result[1] += tempColor[4 * i + 1];
        result[2] += tempColor[4 * i + 2];
    }
    this.red = ~~ (result[0] / i);
    this.green = ~~ (result[1] / i);
    this.blue = ~~ (result[2] / i);
    return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';

}

