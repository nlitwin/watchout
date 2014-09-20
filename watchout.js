var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
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
      'cy': Math.random() * gameOptions.height,
      'r': Math.random() * 20
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
  .attr('r', function(d){
    return d.r;
  });

function update(){
  enemies.data(enemyPositions)
    .transition().duration(1000)
    .attr('cx', function(d){
      return d.cx;
    })
    .attr('cy', function(d){
      return d.cy;
    })
    //.attr('fill', 'black')
    .attr('r', function(d){
      return d.r;
    });
}

setInterval(function(){
  shuffle();
  update();
}, 1000);

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


