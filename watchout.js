var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 10,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0,
  collisionsThisRound: 0
};


var gameBoard = d3.select('.gameBoard').append('svg:svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);
                  //.style('background-color', 'white');

var enemyPositions = [];

// create & push enemies to the array
function shuffle() {
  for (var i = 0; i < gameOptions.nEnemies; i++) {
    var o = {
      'cx': Math.random() * gameOptions.width,
      'cy': Math.random() * gameOptions.height
    };
    enemyPositions[i] = o;
  }
  return enemyPositions;
}

shuffle();

//initialize enemies
var enemies = gameBoard.selectAll('circle')
  .data(enemyPositions)
  .enter()
  .append('svg:circle')
  .attr('class', 'enemies')
  .attr('cx', function(d){
    return d.cx;
  })
  .attr('cy', function(d){
    return d.cy;
  })
  .attr('r', '10');

function update(){
  enemies.data(enemyPositions)
    .transition().duration(2000)
    .tween('custom', tweenWithCollisionDetection);
}

function tweenWithCollisionDetection(endData){
  var enemy = d3.select(this);
  var startPos = {
    x: parseFloat(enemy.attr('cx')),
    y: parseFloat(enemy.attr('cy'))
  }
  var endPos = {
    x: endData.cx,
    y: endData.cy
  }
  return function(t){
    checkCollision(enemy, onCollision);
    var enemyNextPos = {
      x: startPos.x + (endPos.x - startPos.x) * t,
      y: startPos.y + (endPos.y - startPos.y) * t
    };
    enemy.attr('cx', enemyNextPos.x)
        .attr('cy', enemyNextPos.y);
    gameStats.score += 0.01;
    d3.select('.current span').data([gameStats.score.toFixed(0)])
      .text(function(d){
        return d;
      });
  };
}

function checkCollision(enemy, onCollision){
  var radiusSum =  parseFloat(enemy.attr('r')) + parseFloat(player.attr('r'));
  var xDiff = parseFloat(enemy.attr('cx')) - parseFloat(player.attr('cx'));
  var yDiff = parseFloat(enemy.attr('cy')) - parseFloat(player.attr('cy'));
  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );
  if (separation < radiusSum){
    // Collision
    //
    onCollision();
  }
}

function onCollision(){
  gameStats.collisions++;
  if (gameStats.score > gameStats.bestScore) {
    gameStats.bestScore = gameStats.score.toFixed(0);
  }
  gameStats.score = 0;
  d3.selectAll('span').data([gameStats.bestScore,
    gameStats.score, gameStats.collisionsThisRound + gameStats.collisions])
      .text(function(d) {
        return d;
      });
}

setInterval(function(){
  shuffle();
  update();
}, 2000);

var player = gameBoard.selectAll('circle.player')
  .data([{
    cx: gameOptions.width / 2,
    cy: gameOptions.height / 2,
    r: 10
  }])
  .enter()
  .append('svg:circle')
  .attr('class', 'player')
  .attr('cx', function(d){
    return d.cx;
  })
  .attr('cy', function(d){
    return d.cy;
  })
  .attr('r', function(d){
    return d.r;
  });

var drag = d3.behavior.drag().on('drag', function(){
  var newX, newY;
  if (d3.event.x > gameOptions.width) {
    newX = gameOptions.width;
  } else {
    newX = Math.max(0, d3.event.x);
  }
  if (d3.event.y > gameOptions.height) {
    newY = gameOptions.height;
  } else {
    newY = Math.max(0, d3.event.y);
  }
  player.attr('cx', newX);
  player.attr('cy', newY);

});
d3.selectAll(".player").call(drag);



