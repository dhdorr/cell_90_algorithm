//Derek Dorr
//Team DRK
//CS 335 Project 3 Knights Max Flow
//05/04/2019

var cells = [];
function draw_board( ctx, stroke, fill )
{
    stroke = 'blue';
    fill = 'black';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    //ctx.lineWidth = 5;
    var offset = 50;
    var rLen = 20;
    var boardDim = 10;
    var min = 0;
    var max = 30;
    var capacity;
    let cells = [];
    var edgeAmount;
    var cellLocX = 0;
    var cellLocY = 0;
    var xInit = 1;
    var yInit = 2;
    var initDist = 0;
    var j = 0;
    var xAxis;
    //var cells = [];
    //chess board
    //chess board
    for(var l = 0; l < boardDim; l++){
      for(var b = 0; b < boardDim; b++){
        if(b%2 === l%2){
          ctx.fillStyle = 'lightgrey';
          ctx.rect(l*rLen + offset, b*rLen + offset, rLen, rLen);
        }
      }
    }
    //ctx.stroke();
    ctx.fill();
    ctx.restore( );


    for(var i = 0; i < boardDim*boardDim; i++){
      capacity = Math.floor(Math.random()*(max-min)) + min;
      xAxis = i % 10;
      if(i%10 === 0){
        j += 1;
      }
      cellLocX = rLen*xAxis + offset + boardDim-5;
      cellLocY = rLen*(j-1) + offset + boardDim+5;
      cells[i] = new Cell(xAxis, j-1, capacity, false, cellLocX, cellLocY);
      ctx.fillText(capacity, xAxis*rLen + offset+5, j*rLen + offset-10);
    }
    //ctx.fillText("yay", 300, 100);
    knightsMove(ctx, cells);
}

function knightsMove(ctx, cells){
  var myX = 0;
  var myY = 0;
  var count = 0;
  var result = 0;
  var dist = 0;
  var q;
  var t;
  var dx = [1, 1, -1, -1, -2, 2, -2, 2];
  var dy = [2, -2, 2, -2, -1, -1, 1, 1];
  var isDone = false;
  var withinFlow = false;
  var maxFlow = cells[21].cap;
  var pathFlow = 0;
  q = cells.slice(21,22);
  cells[21].visited = true;
  ctx.beginPath();
  ctx.moveTo(cells[21].xLoc, cells[21].yLoc);
  //ctx.lineTo(cells[47].xLoc, cells[47].yLoc);
  //ctx.stroke();
  while(q.length > 0 || !isDone){
    t = q.splice(0,1);
    pathFlow = t[0].cap;
    maxFlow = (maxFlow + pathFlow)/2;
    ctx.fillText(t[0].x + ", " + t[0].y, 300, 100 + dist*10);

    if(!isDone){
      ctx.lineTo(t[0].xLoc, t[0].yLoc);
      dist += 1;
    }
    for(var i = 0; i < 8; i++){
    //Once myX and myY are determined, the program will have to loop through
    //cells to find the coressponding x and y values.
      //var testValue = Math.floor(Math.random()*(7-0)) + 0;
      myX = t[0].x + dx[i];
      myY = t[0].y + dy[i];
      if(myX >= 0 && myX <= 10 && myY >= 0 && myY <= 10){
        for(var j = 0; j < 100; j++){
          if(cells[j].x === myX && cells[j].y === myY && cells[j].visited === false && isDone === false){
            //ctx.fillText(cells[j].x + ", " + cells[j].y, 300, 80 + count*10);
            cells[j].visited = true;
            q = cells.slice(j, j+1);
            if(myX === 8 && myY === 7){
              isDone = true;
              result = cells[j].cap;
              ctx.lineTo(cells[j].xLoc, cells[j].yLoc);
            }
          }
        }
      }
    }
    ctx.stroke();
  }
  count = 100 - dist;
  //pathFlow = cells[78].cap;
  //maxFlow = (maxFlow + pathFlow)/2;
  var tested = Math.round(maxFlow);
  ctx.fillText("Unused Vertices: " + count, 300, 60);
  ctx.fillText("Used Vertices:", 300, 90);
  ctx.fillText("Max Flow: " + tested + "  Steps: " + dist, 420, 60);

  //fordFulkerson(ctx, cells);
}

/*function fordFulkerson(ctx, cells){
  var rGraph = [];
  var temp = [];
  var testValue = Math.floor(Math.random()*(30-15)) + 15; //pathflow
  for(var u = 0; u < cells.length; u++){
    rGraph.push(cells[u]);
  }
  var parent = [];
  var maxFlow = 0;

  while(){
    for(var v = )
  }
}*/

class Cell {
  constructor(x, y, cap, visited, xLoc, yLoc){
    this.x = x;
    this.y = y;
    this.cap = cap;
    this.visited = visited;
    this.xLoc = xLoc;
    this.yLoc = yLoc;
  }
}
