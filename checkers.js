var spaceNodes, spaces, turn, moves, pieceSelected;

Object.prototype.borders = function(val) {
  for(var prop in this) {
    if(this.hasOwnProperty(prop) && this[prop] === val) {
      return prop;   
    }
  }
  return false;
};

window.onload = function(){
  spaceNodes = document.querySelectorAll(".moveable");
  spaces = [];
  for (var i = 0; i < spaceNodes.length; ++i) {
    spaces[i] = spaceNodes[i];
  }
  newGame();
  spaces.forEach(function(el){
    el.addEventListener("click", function(e){
      if(!pieceSelected && this.className.indexOf(turn) != -1){
        selectPiece(el);
      } else if(!pieceSelected){
        return null;
      } else if(pieceSelected.piece === el){
        pieceSelected = false;
      } else if(pieceSelected.neighbors.borders(el)){
        el.className.indexOf("space") != -1 ? makeMove(pieceSelected.piece, el) : null;
      } else{
        var opp = turn === "red" ? "blue" : "red";
        for(var property in pieceSelected.neighbors){
          if(pieceSelected.neighbors[property].className.indexOf(opp) != -1){
            tempNeigh = findNeighbors(pieceSelected.neighbors[property]);
            for(var prop in tempNeigh){
              if(tempNeigh[property] === el && el.className.indexOf("space") != -1){
                takePiece(pieceSelected.piece, el, pieceSelected.neighbors[property])
              }
            }
          }
        }
      }
    })
  });
};

function selectPiece(space){
  var neighbors = findNeighbors(space);
  pieceSelected = {piece: space, neighbors: neighbors};
}

function findNeighbors(space){

  var row, neighbors = {}, side = false, id = parseInt(space.id);
  debugger
  if([8, 16, 24, 32].indexOf(id) != -1){
    side = "left";
  } else if ([1, 9, 17, 25].indexOf(id) != -1){
    side = "right";
  }

  row = Math.ceil(id/4)%2 === 0 ? "even" : "odd";

  if(side === "left"){
    if(id === 32){
      neighbors.dr = 28;
    } else {
      neighbors.dr = id - 4;
      neighbors.ur = id + 4;
    }
  } else if(side === "right"){
    if(id === 1){
      neighbors.ul = 5;
    } else {
      neighbors.ul = id + 4;
      neighbors.dl = id - 4;
    }
  } else{
    if(row === "odd"){
      neighbors.ul = id + 4;
      neighbors.ur = id + 3;
      neighbors.dl = id - 4;
      neighbors.dr = id - 5;
    } else{
      neighbors.ul = id + 5;
      neighbors.ur = id + 4;
      neighbors.dl = id - 3;
      neighbors.dr = id - 4;
    }
  }
  for (var property in neighbors){
    if (neighbors.hasOwnProperty(property)){
      if(neighbors[property] < 1 || neighbors[property] > 32){
        delete neighbors[property];
      }
    }
  }
  for (var property in neighbors){
    if (neighbors.hasOwnProperty(property)){
      neighbors[property] = document.getElementById(neighbors[property])
    }
  }

  return neighbors;
}

function changeSpace(space, color){
  space.className = "moveable " + color;
}

function makeMove(space_1, space_2){
  changeSpace(space_1, "space");
  changeSpace(space_2, turn);
  turn = turn === "red" ? "blue" : "red";
  pieceSelected = false;
}

function takePiece(space_1, space_2, taken){
  makeMove(space_1, space_2);
  changeSpace(taken, "space");
  turn = turn === "red" ? "blue" : "red";
  pieceSelected = false;
}

function newGame(){

  spaces.forEach(function(el){
    if(parseInt(el.id) < 13){
      changeSpace(el, 'red');
    } else if(parseInt(el.id) > 20){
      changeSpace(el, 'blue');
    } else {
      changeSpace(el, 'space');
    }

  });

  turn = "red";
  moves = [];

}