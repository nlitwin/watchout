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
                  .attr('height', gameOptions.height)
                  .style('background-color', 'white');

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

shuffle(enemyPositions);

//initialize enemies
var enemies = gameBoard.selectAll('circle')
  .data(enemyPositions)
  .enter()
  .append('svg:circle')
  .attr('cx', function(d){
    return d.cx;
  })
  .attr('cy', function(d){
    return d.cy;
  })
  .attr('fill', 'black')
  .attr('r', function(d){
    return d.r;
  });

function update(enemyPositions){
  enemies.data(enemyPositions)
              .transition().duration(800)
              .attr('cx', function(d){
                return d.cx;
              })
              .attr('cy', function(d){
                return d.cy;
              })
              .attr('fill', 'black')
              .attr('r', function(d){
                return d.r;
              });
}
setInterval(function(){update(shuffle())}, 1000);
