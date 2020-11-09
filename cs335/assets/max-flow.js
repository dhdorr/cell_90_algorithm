class Cell{
  constructor(locX, locY, cap, visited, x, y){
    this.locX = locX;
    this.locY = locY;
    this.cap = cap;
    this.visited = visited;
    this.x = x;
    this.y = y;
  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
}

function draw_rect( ctx, stroke, fill )
{
    stroke = 'blue';
    fill = 'lightgrey';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    //ctx.lineWidth = 5;
    var offset = 50;
    var rLen = 20;
    var boardDim = 10;
    var min = 0;
    var max = 30;
    var capacity = 0;
    let cells = [];
    var edgeAmount;
    var cellLocX = 0;
    var cellLocY = 0;
    var xInit = 1;
    var yInit = 2;
    var initDist = 0;
    let visited = [];
    //chess board
    for(var i = 0; i < boardDim; i++){
      visited[i] = [];
      for(var j = 0; j < boardDim; j++){
        visited[i][j] = false;
        if(j%2 === i%2){
          ctx.fillStyle = 'lightgrey';
          ctx.rect(i*rLen + offset, j*rLen + offset, rLen, rLen);
        }
      }
    }
    //ctx.stroke();
    ctx.fill();
    ctx.restore( );

    //graph
    for(i = 0; i < boardDim; i++){
      cells[i] = [];
      for(j = 0; j < boardDim; j++){
        cellLocX = rLen*j + offset + boardDim;
        cellLocY = rLen*i + offset + boardDim;
        capacity = Math.floor(Math.random()*(max-min)) + min;
        if(capacity%2 != 0){
          capacity += 1;
        }
        const myCell = new Cell(cellLocX, cellLocY, capacity, visited, j, i);
        cells[i][j] = myCell;
        ctx.fillText(capacity, j*rLen + 5 + offset, i*rLen + 10 + offset);
      }
    }
    edgeAmount = Math.floor(Math.random()*(30-15)) + 15;

    //test
    visited[1][2] = true;
    let myQueue = [];
    var dist = 0;
    var t = cells[1][2];
    var myX = 1;
    var myY = 2;
    var prevX = 1;
    var prevY = 2;
    var result = 0;
    myQueue.push(cells[1][2]);
    let dx = [2,2,-2,-2,1,1,-1,-1];
    let dy = [1,-1,1,-1,2,-2,2,-2];
    var idkx = [2,2,-2,-2,1,1,-1,-1];
    var idky = [1,-1,1,-1,2,-2,2,-2];
    var tempX = 20;
    var tempY = 2;
    var sresult = 0;
    let capList = [];

    //ctx.moveTo(cells[1][2].locX, cells[1][2].locY);
    ctx.beginPath();
    ctx.moveTo(cells[1][2].locX, cells[1][2].locY);
    while(myQueue.length !== 0){
      t = myQueue[0];
      capList.push(t.cap);
      myQueue.splice(0,1);
      ctx.moveTo(cells[myX][myY].locX, cells[myX][myY].locY);
      //myQueue.push(cells[myX][myY]);

      if(t.x === 6 && t.y === 7){
        sresult = t.getX();
        //myQueue.pop();
      }
      //else{
        for(var u = 0; u < 8; u++){
          //works with cells[][].x/.
          myX = cells[myX][myY].x + dx[u];
          myY = cells[myX][myY].y + dy[u];
          //myX = myX + idkx[i];
          //myY = myY + idky[i];
          if(myX > 0 && myX <= 10 && myY > 0 && myY <= 10 && !visited[myX][myY]){
            myQueue.push(cells[myX][myY]);
            ctx.lineTo(cells[myX][myY].locX,cells[myX][myY].locY);
            visited[myX][myY] = true;
            sresult = cells[myX][myY].y;
          }
          //sresult = visited.length;
        }
      //}
      ctx.stroke();
      //myQueue.shift();
    }
    /*
    else{
      for(i = 0; i < 8; i++){
        myX = t.x + dx[i];
        myY = t.y + dy[i];
        if(myX >= 0 && myX <= 10 && myY >= 0 && myY <= 10 && visited[myX][myY] == false){
          visited[myX][myY] = true;
          myQueue.push(cells[myX][myY]);
          //ctx.stroke();
        }
      }
    }

    var prevCap = 30;
    var maxFLow = 0;
    for(i = 0; i < 10; i++){
      for(j = 0; j < 10; j++){
        if (visited[i][j] && cells[i][j].cap < prevCap){
          capacity = cells[i][j].cap;
          prevCap = capacity;
        }
      }
    }*/



    ctx.fillText("Max Moves: " + sresult, 300, 50);
    ctx.fillText("Used Vertices: " + edgeAmount, 400, 50);
    ctx.fillText("Unused Vertices: " + edgeAmount, 500, 50);
    ctx.fillText("Max Flow: " + capList[3], 300, 80);
    ctx.fillText("Moves Made: " + dist, 300, 110);
}

function draw_grid( rctx, rminor, rmajor, rstroke, rfill  )
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    rctx.restore( );
}



/*    ctx.beginPath();
    ctx.moveTo(cells[xInit][yInit].locX, cells[xInit][yInit].locY);
    var cellPrevX = xInit;
    var cellPrevY = yInit;
    var biggestCap = 0;
    for(var k = 0; k < boardDim; k++){
      for(var p = 0; p < boardDim; p++){
        biggestCap = cells[cellPrevX][cellPrevY].cap;
        if(k == cellPrevX - 1 && p == cellPrevY - 2){
          biggestCap = cells[k][p].cap;
          cellPrevX = k;
          cellPrevY = p;
          ctx.lineTo(cells[k][p].locX,cells[k][p].locY);
          //ctx.moveTo(cells[k][p].locX, cells[k][p].locY);
              }
              else if(k == cellPrevX - 2 && p == cellPrevY - 1){
                biggestCap = cells[k][p].cap;
                cellPrevX = k;
                cellPrevY = p;
                ctx.lineTo(cells[k][p].locX,cells[k][p].locY);
                //ctx.moveTo(cells[k][p].locX, cells[k][p].locY);
              }
              else if(k == cellPrevX - 1 && p == cellPrevY + 2){
                biggestCap = cells[k][p].cap;
                cellPrevX = k;
                cellPrevY = p;
                ctx.lineTo(cells[k][p].locX,cells[k][p].locY);
                //ctx.moveTo(cells[k][p].locX, cells[k][p].locY);
              }
              else if(k == cellPrevX - 2 && p == cellPrevY + 1){
                biggestCap = cells[k][p].cap;
                cellPrevX = k;
                cellPrevY = p;
                ctx.lineTo(cells[k][p].locX,cells[k][p].locY);
                //ctx.moveTo(cells[k][p].locX, cells[k][p].locY);
              }
              else if(k == cellPrevX + 1 && p == cellPrevY - 2){
                biggestCap = cells[k][p].cap;
                cellPrevX = k;
                cellPrevY = p;
                ctx.lineTo(cells[k][p].locX,cells[k][p].locY);
                //ctx.moveTo(cells[k][p].locX, cells[k][p].locY);
              }
              else if(k == cellPrevX + 2 && p == cellPrevY - 1){
                biggestCap = cells[k][p].cap;
                cellPrevX = k;
                cellPrevY = p;
                ctx.lineTo(cells[k][p].locX,cells[k][p].locY);
                //ctx.moveTo(cells[k][p].locX, cells[k][p].locY);
              }
              else if(k == cellPrevX + 1 && p == cellPrevY + 2){
                biggestCap = cells[k][p].cap;
                cellPrevX = k;
                cellPrevY = p;
                ctx.lineTo(cells[k][p].locX,cells[k][p].locY);
                //ctx.moveTo(cells[k][p].locX, cells[k][p].locY);
              }
              else if(k == cellPrevX + 2 && p == cellPrevY + 1){
                biggestCap = cells[k][p].cap;
                cellPrevX = k;
                cellPrevY = p;
                ctx.lineTo(cells[k][p].locX,cells[k][p].locY);
                //ctx.moveTo(cells[k][p].locX, cells[k][p].locY);
              }
            }
          }
          ctx.stroke();*/
