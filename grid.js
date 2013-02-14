grid = new Array();
transitions = ["fadeIn"];
squareSize = 200;
ratios = [[1,1]];
sizes = [1, 2];
mosaicDivs = new Array();
divsCounter = 0;
candidatesForPlayer = new Array();
gridHeight = 0;
gridWidth = 0;

function initGrid() {
  $("#grid").html("");
  var viewportWidth = $("#grid").width();
  var viewportHeight = $("#grid").height();
  gridHeight = Math.floor(viewportHeight/squareSize)+1;
  gridWidth = Math.floor(viewportWidth/squareSize)+1;
  for (l=0;l<=gridHeight;l++) {
    grid[l]=new Array();
    for (c=0;c<=gridWidth;c++) {
    grid[l][c]=true;
    }
  }
  fillPageForGood();
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addBackgroundToDiv(size,src) {
  if (mosaicDivs[size].length == 0) {ratio=0}
  mosaicDivs[size].eq(0).addClass("hasBackground").css({"background":"url("+src+") center center no-repeat",'background-size': 'cover'});
  mosaicDivs[size] = mosaicDivs[size].slice(1);
}

function fillPageForGood() {
  for(l=0;l<gridHeight;l++) {
    for(c=0;c<gridWidth;c++) {
      if (grid[l][c] == true) {
        var size = sizes[Math.floor(Math.random()*(sizes.length))];
        var ratio = ratios[Math.floor(Math.random()*(ratios.length))];
        if (size == 1) ratio = ratios[0];
        if(isSpaceAvailable(l,c,size,ratio)){
          createBlock(l,c,size,ratio);
          //c = c + (size*ratio[0])-1;
        } else {
          createBlock(l,c,1,ratios[0]);
        }
      }
    }
  }

mosaicDivs[0]=$("#grid div[size=1] div").sort(function() { return (Math.round(Math.random())-0.5); });
mosaicDivs[1]=$("#grid div[size=2] div").sort(function() { return (Math.round(Math.random())-0.5); });
  
}


function slideSwitch(activeSlide) {
  nextSlide =  $("#grid div").eq(Math.floor(Math.random()*$("#grid div").length));
  var transition = transitions[Math.floor(Math.random()*transitions.length)];
  activeSlide.toggleClass("flip");
    //activeSlide.addClass(transition);
    var t=setTimeout(function(){
        //activeSlide.removeClass(transition);
        slideSwitch(nextSlide);
    },Math.floor(Math.random()*1000));    
}


function isSpaceAvailable(l,c,size,ratio) {
  var isAvailable = true;
  for (k=l;k<=l-1+(size*ratio[1]);k++) {
    if (typeof(grid[k]) != "undefined") {
      for (j=c;j<=c-1+(size*ratio[0]);j++) {
        if (typeof(grid[k][j]) != "undefined") {
          if (grid[k][j] == false) isAvailable=false;
        }
      }
    }
  }
  return isAvailable;
}



function createBlock(l,c,size,ratio,divclass) {
  if (typeof(divclass) == "undefined") {divclass = "";}

  for (k=l;k<=l-1+(size*ratio[1]);k++) {
    if (typeof(grid[k]) != "undefined") {
      for (j=c;j<=c-1+(size*ratio[0]);j++) {
        if (typeof(grid[k][j]) != "undefined") {
          grid[k][j] = false;
        }
      }
    }
  }
  divsCounter++;
  divsCounter++;
  var blockWidth = size*ratio[0]*squareSize;
  var blockHeight = size*ratio[1]*squareSize;
  var div = "<div ratio=\""+ratio[0]+"-"+ratio[1]+"\" size=\""+size+"\" class=\""+divclass+"\" style=\"width:"+blockWidth+"px; height:"+blockHeight+"px;position:absolute;left:"+c*squareSize+"px;top:"+l*squareSize+"px;\"><div class=\"front\"></div><div class=\"back\"></div></div>";
  $("#grid").append(div);
}