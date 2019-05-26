//Example URL = https://krabbypattyson.github.io/2PlayerGames/TicTacToe?l=[["MQ==","MQ==","MQ=="],["Mw==","Mw==","MQ=="]];t="MA==";
var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");
//Create Gameboard
ctx.fillRect(200, 0, 2, 600);
ctx.fillRect(400, 0, 2, 600);
ctx.fillRect(0, 200, 600, 2);
ctx.fillRect(0, 400, 600, 2);

//Make a function to mark x's and o's
function mark(locX, locY, type){
  console.log("Marking: "+locX+" "+locY+" "+type);
  parseInt(type);
  if(type === 0 || type === "0"){ // O
    ctx.beginPath();
    ctx.arc(locX, locY, 80, 0, 2 * Math.PI);
    ctx.stroke();
  }
  else if(type === 1 || type === "1"){ // X
    ctx.beginPath();
    ctx.moveTo(locX-80, locY-80);
    ctx.lineTo(locX+80, locY+80);
    ctx.stroke(); //  \
    ctx.beginPath();
    ctx.moveTo(locX-80, locY+80);
    ctx.lineTo(locX+80, locY-80);
    ctx.stroke(); //  /
  }
}

//Clean up URL Parameters
var t = 0;
var wind;
var param = window.location.href;
if(param.indexOf("?") > -1){ //Check if there were any previous marks
  param = param.split("?");
  wind = param[0];
  param = atob(param[1]);
  while(param.indexOf("%22") > -1){
    param = param.replace("%22",'"');
  }
  while(param.indexOf("%27") > -1){
    param = param.replace("%27",'"');
  }
  eval(param);


  //We should have a variable named l (locations) that holds the locations and types of marks on the board so far
  //However, these locations are encoded, so we need to decode them
  for(var i = 0; i <= l.length-1; i++){
    l[i][0] = parseInt(atob(l[i][0]));
    l[i][1] = parseInt(atob(l[i][1]));
    l[i][2] = parseInt(atob(l[i][2]));
  }
  t = atob(t);
  //Our l variable has x sets of three numbers - the first two are x and y, and the last is the type of mark
  //Now we're gonna apply these marks onto the gameboard
  for(var i = 0; i <= l.length-1; i++){
    mark(l[i][0], l[i][1], l[i][2]);
  }
}
else{
  wind = window.location.href;
  var l = [];
}

//Now that the game is set up, we can take input from the player
var x, y;
var clickYet = false;
cnv.addEventListener("click",function(e){
  if(!clickYet){
    t++;
    t = t % 2;
    console.log(e.clientX+" "+cnv.offSetTop);
  	x = e.clientX - cnv.offsetLeft - 50;
    console.log(x);
  	y = e.clientY - cnv.offsetTop - 50;
  	x = Math.round(x / 100);
    y = Math.round(y / 100);
    if(x % 2 === 0){
      x++;
    }
    if(y % 2 === 0){
      y++;
    }
    if(x > 5){x = 5}
    if(y > 5){y = 5}
    x*=100;
    y*=100;
    mark(x, y, t);
    encode();
    clickYet = true;
  }
});
var str;
function encode(){
  str = "l=[";

    for(var i = 0; i <= parseInt(l.length-1); i++){
      str+= "['" + btoa(l[i][0]) + "','" + btoa(l[i][1]) + "','" + btoa(l[i][2]) + "'],";
     }
  str += "['" + btoa(x) + "','" + btoa(y) + "','" + btoa(t) + "']];t='" + btoa(t) + "';";
  document.getElementById("link").innerText = wind + "?" + btoa(str);
}
