var spaceNodes, spaces, turn, moves, pieceSelected;

window.onload = function(){
  spaceNodes = document.querySelectorAll(".moveable");
  spaces = [];
  for (var i = 0; i < spaceNodes.length; ++i) {
    spaces[i] = spaceNodes[i];
  }
  newGame();
  spaces.forEach(function(el){
    el.addEventListener("click", function(e){
      if(!pieceSelected && this.className.indexOf("space") === -1){
        selectPiece(el);
      }
    })
  });
};

function selectPiece(space){
  // pieceSelected = true;
  var neighbors = findNeighbors(space);
  console.log(neighbors);

}

function findNeighbors(space){

  var row, neighbors = {}, side = false, id = parseInt(space.id);

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
    for (var property in neighbors){
      if (neighbors.hasOwnProperty(property)){
        if(neighbors[property] < 1 || neighbors[property] > 32){
          delete neighbors[property];
        }
      }
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

function takePiece(){

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