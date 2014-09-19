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



var enemies = [];

// create & push enemies to the array
for (var i = 0; i < gameOptions.nEnemies; i++) {
  var o = {
    'cx': Math.random() * gameOptions.width,
    'cy': Math.random() * gameOptions.height,
    'r': Math.random() * 20
  };
  enemies.push(o);
}

gameBoard.selectAll('circle')
  .data(enemies)
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
  })




console.log(enemies, "enemies");
// Each circle is a node
// The data with each circle is an object, which has
// random cx, cy
//
// create empty array
// forEach to input random coordinates



gameBoard.append('svg:circle')
.attr('cx', '100')
.attr('cy', '150')
.attr('r', '10')
.attr('fill', 'black');
