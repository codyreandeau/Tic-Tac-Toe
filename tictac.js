 $(document).ready(function() {
  var player = 'O';
  var comp = 'X';

 var game = (function() {
  
   var board;

  function game() {
    board = ['', '', '','', '', '','', '', ''];
  }

  game.prototype.addPlayer = function(tile) {
    board[+tile] = player;
  };

  game.prototype.addComp = function(tile) {
    board[+tile] = comp;
  };

  game.prototype.listX = function() {
    var x = [];
    for (var tile in board) {
      if (board[tile] === player) {
        x.push(tile);
      }
    }
    return x;
  };

  game.prototype.listO = function() {
    var o = [];
    for (var tile in board) {
      if (board[tile] === comp) {
        o.push(tile);
      }
    }
    return o;
  };

  game.prototype.remainingTiles = function() {
    var remaining = [];
    if(board[4] === ''){
      remaining.push(4);
    }else if(board[0] === player &&
             board[1] === player &&
             board[2] === ''){
             remaining.push(2);
    }else if(board[3] === player &&
             board[4] === player &&
             board[5] === ''){
             remaining.push(5);
    }else if(board[6] === player &&
             board[7] === player &&
             board[8] === ''){
             remaining.push(8);
    }else if(board[1] === player &&
             board[2] === player &&
             board[0] === ''){
             remaining.push(0);
    }else if(board[4] === player &&
             board[5] === player &&
             board[3] === ''){
             remaining.push(3);
    }else if(board[7] === player &&
             board[8] === player &&
             board[6] === ''){
             remaining.push(6);
    }else if(board[0] === player &&
             board[3] === player &&
             board[6] === ''){
             remaining.push(6);
    }else if(board[1] === player &&
             board[4] === player &&
             board[7] === ''){
             remaining.push(7);
    }else if(board[2] === player &&
             board[5] === player &&
             board[8] === ''){
             remaining.push(8);
    }else if(board[6] === player &&
             board[3] === player &&
             board[0] === ''){
             remaining.push(0);
    }else if(board[7] === player &&
             board[4] === player &&
             board[1] === ''){
             remaining.push(1);
    }else if(board[8] === player &&
             board[5] === player &&
             board[2] === ''){
             remaining.push(2);
    }else if(board[0] === player &&
             board[4] === player &&
             board[8] === ''){
             remaining.push(8);
    }else if(board[8] === player &&
             board[4] === player &&
             board[0] === ''){
             remaining.push(0);
    }else if(board[2] === player &&
             board[4] === player &&
             board[6] === ''){
             remaining.push(6);
    }else if(board[6] === player &&
             board[4] === player &&
             board[2] === ''){
             remaining.push(2);
    }else if(board[0] === player &&
             board[2] === player &&
             board[1] === ''){
             remaining.push(1);
    }else if(board[3] === player &&
             board[5] === player &&
             board[4] === ''){
             remaining.push(4);
    }else if(board[6] === player &&
             board[8] === player &&
             board[7] === ''){
             remaining.push(7);
    }else if(board[0] === player &&
             board[6] === player &&
             board[3] === ''){
             remaining.push(3);
    }else if(board[1] === player &&
             board[7] === player &&
             board[4] === ''){
             remaining.push(4);
    }else if(board[2] === player &&
             board[8] === player &&
             board[5] === ''){
             remaining.push(5);
    }else{
    for (var i in board) {
      if (board[i] === '') {
        remaining.push(i);
      }
    }
  }
   return remaining;
}
 return game;
})();

  var gameboard = new game(),
    $tiles = $('.tile'),
    wins = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
    
    $('.tile').click(function() {
      if ($(this).text() !== '') {
        return;
      }

      placePlayer(this);
      gameboard.addPlayer($(this).attr('id'));

      var winner = checkForWin(player);
      if (winner) {
        flash(getTiles(winner));
        return;
      }

      var compMove = nextMove();
      placeComp(compMove);
      gameboard.addComp(compMove.attr('id'));

     var winner = checkForWin(comp);
      if (winner) {
        flash(getTiles(winner));
        return;
      }

      if (gameboard.remainingTiles().length === 0) {
        flash($('.tile'));
      }
    });

    $('#reset').click(function() {
      reset();
    });

  function placePlayer(tile) {
    place(player, tile);
  }

  function placeComp(tile) {
    place(comp, tile);
  }

  function place(type, tile) {
    $(tile).text(type);
  }

  function check(type, tile) {
    return $('#' + tile).text() === type;
  }

  function getTiles(tileNums) {
    var tiles = _.map(tileNums, function(t) {
      return '#' + t;
    }).join(', ');
    return $(tiles)
  }

  function flash($tiles) {
    for (var i = 0; i < 5; i += 1) {
      $tiles
        .queue(function() {
          $(this).addClass('winner')
          $(this).dequeue()
        })
        .delay(50)
        .queue(function() {
          $(this).removeClass('winner')
          $(this).dequeue()
        })
        .delay(50);
    }

    $tiles.queue(function() {
      reset();
      $(this).dequeue();
    });
  }

  function reset() {
    $tiles.text('');
    gameboard = new game();
  }

  function checkForWin(type) {
    return _.find(wins, function(condition) {
      return condition.every(function(tile) {
        return check(type, tile);
      });
    });
  }
   
 $('#X').on('click', function(){
  player = 'X';
  comp = 'O';
  reset();
});
   
$('#O').on('click', function(){
  player = 'O';
  comp = 'X';
  reset();
});
  
 function nextMove() {
   return $('#' + _.sample(gameboard.remainingTiles()));
    };
 });