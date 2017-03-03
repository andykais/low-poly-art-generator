var ctx, imgCtx, info;
var canvas, sourceImg;
var snapSide = 6;
var currentIndex = 0;

var nearestV = new Array();

var vertices = new Array();
var triangles = new Array();


var polygonvertices = new Array();
var polygonindex = 0;

var DELTA = 1.0e-5;
var canvasWidth = 300,
    canvasHeight = 300;

/////////////////////

function draw() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i in triangles) {
	setTimeout(triangles[i].Draw(ctx),0);
        //triangles[i].Draw(ctx, i);
    }

    for (var i in vertices) {
        vertices[i].DrawNum(ctx);
    }


}

function reDraw() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    /*for (var i in triangles) {
        triangles[i].Draw(ctx, i);
    }*/

	for (var i in triangles) {
	setTimeout(triangles[i].Draw(ctx),0);
        //triangles[i].Draw(ctx, i);
    }
	
    for (var i in vertices) {
        vertices[i].DrawNum(ctx);
    }


}

function verticesDetect(x, y) {
    // nearestV.length = 0;
	while (nearestV.length > 0){
	   nearestV.pop();
	}
    for (i in vertices) {
        if (Math.abs(vertices[i].x - x) < snapSide) {
            if (Math.abs(vertices[i].y - y) < snapSide) {
                vertices[i].r = snapSide;
                nearestV.push(i);
            }
        } else {
            vertices[i].r = snapSide / 4;
        }
    }
    return nearestV;
}




function init() {
    svgBox = document.getElementById('svgBox');


    canvas = document.getElementById('canvas');
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    info = document.getElementById('info');
    sourceImg = document.getElementById('sourceImg');

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        imgCtx = sourceImg.getContext('2d');

    }

    initInterface();

    canvas.onmousedown = function(e) {
	
	    
	
	
        var tempX = ~~ (e.pageX - canvas.offsetLeft);
        var tempY = ~~ (e.pageY - canvas.offsetTop);
		
		//triangles.push(new triangle(new vertex(0,0),new vertex(200,0),new vertex(300,300)));
		//triangles.push(new triangle(new vertex(400,300),new vertex(400,100),new vertex(300,300)));
		
		
        if (verticesDetect(tempX, tempY).length == 0) {
            var v = new vertex(tempX, tempY);
            v.avColor();
            vertices.push(v);
			
			
			
			//MY CODE
			//if (polygonindex == 0){
				polygonvertices.push(v);
				polygonindex=polygonindex+1;
				delete v;
				//alert(polygonindex);
				if (polygonindex == 1){ //if it's the first point we show vertice
				   //vertices = new Array();
				   //vertices.push(v);
				}
				if (polygonindex > 4) // if we reach maximum of 5 points we auto close the polygon
				{
					var newtri = new triangle(polygonvertices[0],polygonvertices[1],polygonvertices[2],polygonvertices[3],polygonvertices[4],5);
					triangles.push(newtri);
					polygonindex = 0;
					while(polygonvertices.length > 0) {
						polygonvertices.pop();
					}
					/*while(vertices.length > 0) {
						vertices.pop();
					}*/
					//newtri.Draw(ctx,1);
					draw();
					
				}
			
            draw();
            canvas.onmousemove = function(e) {
                var tempX = ~~ (e.pageX - canvas.offsetLeft);
                var tempY = ~~ (e.pageY - canvas.offsetTop);

                //vertices[vertices.length - 1].x = tempX;
                //vertices[vertices.length - 1].y = tempY;

                draw();
            }
            canvas.onmouseup = function(e) {
                var tempX = ~~ (e.pageX - canvas.offsetLeft);
                var tempY = ~~ (e.pageY - canvas.offsetTop);

				
				
			//}
			
			
                canvas.onmousemove = function(e) {
                    void(0)
                }
                tempVertex = verticesDetect(tempX, tempY);
                if (tempVertex.length > 1) {
                    vertices.splice(tempVertex[tempVertex.length - 1], 1);
                } else {
                    vertices[vertices.length - 1].r = snapSide / 4;
                }
                canvas.onmousemove = function(e) {

                    if (verticesDetect(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop).length > 0) {}
                    reDraw();
                }
            }

        } else {
            tempVertex = verticesDetect(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)[0];
			
						//MY CODE
			if (  polygonvertices.length > 0 && vertices[tempVertex].x == polygonvertices[0].x &&
			      vertices[tempVertex].y == polygonvertices[0].y) // if it's the same as the start point close off polygon
		    {
				
				if (polygonindex == 3) // if we reach maximum of 5 points we auto close the polygon
				{  
				   var newtri = new triangle(polygonvertices[0],polygonvertices[1],polygonvertices[2],polygonvertices[2],polygonvertices[2],3);
				   triangles.push(newtri);
				}
				if (polygonindex == 4) // if we reach maximum of 5 points we auto close the polygon
				{
				   var newtri = new triangle(polygonvertices[0],polygonvertices[1],polygonvertices[2],polygonvertices[3],polygonvertices[3],4);
				   triangles.push(newtri);
				}
				//newtri.Draw(ctx,1);
				polygonindex = 0;
				while(polygonvertices.length > 0) {
					polygonvertices.pop();
				}
				/*while(vertices.length > 0) {
					vertices.pop();
				}*/
				
			} else { // if it's not the starting point just add to polygon vertices
			    //var v = new vertex(vertices[tempVertex].x,vertices[tempVertex].y);
				var v = vertices[tempVertex];
				//v.avColor();
			    polygonvertices.push(v);
				polygonindex=polygonindex+1;
				delete v;
				if (polygonindex > 4) // if we reach maximum of 5 points we auto close the polygon
				{
					var newtri = new triangle(polygonvertices[0],polygonvertices[1],polygonvertices[2],polygonvertices[3],polygonvertices[4],5);
					triangles.push(newtri);
					polygonindex = 0;
					//newtri.Draw(ctx,1);
					while(polygonvertices.length > 0) {
						polygonvertices.pop();
					}
				}
				//alert("what");
			}
			draw();
			
			
			
            canvas.onmousemove = function(e) {
			    //if it's moved we simply remove the added polygon point so it's a move only.
			    if (polygonvertices.length > 0){
				    polygonindex = polygonindex-1;
				    polygonvertices.pop();
				}
                var tempX = ~~ (e.pageX - canvas.offsetLeft);
                var tempY = ~~ (e.pageY - canvas.offsetTop);

                vertices[tempVertex].x = tempX;
                vertices[tempVertex].y = tempY;
				
			
			
			
				
				
				
				
			
                draw();
            }
            canvas.onmouseup = function(e) {
			
			
			
			
			
			
                canvas.onmousemove = function(e) {
                    if (verticesDetect(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop).length > 0) {}
			
					
                    reDraw();
                }
            }



        }

    }

    draw();

}
