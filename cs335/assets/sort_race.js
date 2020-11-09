//Derek Dorr
//Team DRK
//CS 335 T-TH @ 4pm
//08/04/2019
//Project 2 Sort Race
//HEX conversions
var A = 10;
var B = 11;

var steps = 0;//counts the steps taken to insert sort array
var qsteps = -1;//counts the steps taken to quick sort array
var msteps = 0;//counts the steps taken to merge sort array
var finished = false; //not fully implemented, but would control a while loop to display race

//Put any sample array in array
var array = [0,11,10,3,2,8,4,7,6,5,1,9];
var myArr1 = array.slice();
var testar = array.slice();

var count = 0;


function getData()
{


  //var array = [0,B,A,3,2,8,4,7,6,5,1,9];

while (!finished){
  myArr1 = insertSort();
  document.getElementById("demo").innerHTML = myArr1 + "&ensp;Steps Taken:&ensp;" + steps + "<br>";
  var stopme = prompt("Continue?", steps);
}
  var myArr2 = mergeSort();
  //document.getElementById("demo").innerHTML = myArr2 + "&ensp;merge reached:&ensp;" + steps + "<br>";

  var myArr3 = quickSort(testar);

  document.getElementById("demo").innerHTML = myArr1 + " Insertion Steps Taken: " + steps + "<br>"
   + myArr2 + " Merge Steps Taken: " + msteps + "<br>" + myArr3 + " Quick Steps Taken: " + qsteps;


  //Displays the outcome of the race
  //document.getElementById("demo").innerHTML = myArr1 + "&ensp;Steps Taken:&ensp;" + steps + "<br>"
  //+ myArr2 + "&ensp;Steps Taken:&ensp;" + msteps + "<br>" + myArr3 + "&ensp;Steps Taken:&ensp;" + qsteps;
}

function insertSort()
{//RECURSION!
  var myArr = myArr1.slice();
  //var strng;
  if(count < myArr.length){
    var temp = myArr[count];
    var j = count-1;
    while(j >= 0 && myArr[j] > temp){
      myArr[j+1] = myArr[j];
      j--;
    }
    steps += 1;
    myArr[j+1] = temp;
    //var stopme = prompt("Continue?", steps);
    //if (stopme != null) {
      //document.getElementById("demo").innerHTML = strng + "&ensp;Steps Taken:&ensp;" + steps + "<br>"
      count += 1;
      //loops back thru the start of insert sort
      //myArr = insertSort(myArr, count);
      return myArr;
    //}
    //count += 1;
    //myArr = insertSort(myArr, count);
  }
  finished = true;
  return myArr;
}

function mergeSort()
{
  var myArr = array.slice();
  var step = 1;
  while(step < myArr.length){
    var leftNode = 0;
    while(leftNode + step < myArr.length){
      msteps += 1;
      mergeHelper(myArr, leftNode, step);
      leftNode += step*2;
    }
    step *= 2;
    //msteps += 1;
  }
  return myArr;
}
function mergeHelper(myArr, leftNode, step){
  var rightNode = leftNode + step;
  var end = Math.min(leftNode + step * 2 - 1, myArr.length - 1);
  var goLeft = leftNode;
  var goRight = rightNode;
  var temp = [];
  for(var i = leftNode; i <= end; i++){
    if ((myArr[goLeft] <= myArr[goRight] || goRight > end) && goLeft < rightNode){
      temp[i] = myArr[goLeft];
      goLeft++;
    }
    else{
      temp[i] = myArr[goRight];
      goRight++;
    }
  }
  for(var j = leftNode; j <= end; j++){
    myArr[j] = temp[j];
  }
}


function quickSort(array)
{
  qsteps +=1;
  var myArr = array.slice();
  if(myArr.length < 2){
    return myArr;
  }
  var pivot = myArr[0];
  var split1 = [];
  var split2 = [];

  for(var i = 1; i < myArr.length; i ++){
    if(myArr[i] < pivot) {
      split1.push(myArr[i]);
    }
    else {
      split2.push(myArr[i]);
    }
  }
  return quickSort(split1).concat(pivot, quickSort(split2));
}
