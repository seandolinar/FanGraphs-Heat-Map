var margin = {left: 140, top:10, right:10, bottom: 140}

var width = (900 - margin.left - margin.right)/7*8;
var height = (900 - margin.top - margin.bottom);

// heatmap = 

var heatmap = []

d3.json('data.json', function(error, json) {

  heatmap=json.den
  var data = json.xy
  var x_axis = json.x_axis
  var y_axis = json.y_axis

  var dx = heatmap[0].length,
      dy = heatmap.length;

  var x = d3.scale.linear()
      .domain(x_axis) //only does stuff to the axis
      .range([0, width]);

  var y = d3.scale.linear()
      .domain(y_axis)
      .range([height, 0]);

  var zValues = [0,.01,.1,.2,.3]
  var color = d3.scale.linear()
      .domain(zValues)
      .range(['#336699', "#336699","#ffcc00","#ffcc00",'#ff3300'])

  var alpha = d3.scale.linear()
      .domain(zValues)
      .range([0,1,1])

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickPadding(10)
      .tickSize(10)

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickPadding(10)
      .tickSize(10)

  var container = d3.select('#d3-container')

  container.append("canvas")
      .attr("width", dx)
      .attr("height", dy)
      .style("width", width + "px")
      .style("height", height+ "px")
      .style('margin-top', margin.top+'px')
      .style('margin-left', margin.left+'px')
      .call(drawImage);

  var chart = container.append("svg")
      .attr("width", width+margin.left+margin.right)
      .attr("height", height+margin.bottom+margin.top)

  chart.append("g")
      .attr('class', 'x axis')
      .attr('transform', 'translate(' + margin.left + ',' + (margin.top + height) + ")")
      .call(xAxis)
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width/2)
      .attr('y', 65)
      .text('(feet)')

  chart.append("g")
      .attr("class", "y axis")
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(yAxis)
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', -width/2)
      .attr('y', -55)
      .attr('transform', 'rotate(-90)')
      .text('(feet)')

  var plot = chart.append('g')
      .attr('class', 'plot')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

//   plot.selectAll('new')
//     .data(data)
//     .enter()
//     .append('circle')
//     .attr('cx', function(d) {return x(d.px);})
//     .attr('cy', function(d) {return y(d.pz);})
//     .attr('r',5)

  plot.append('rect')
    .attr('class', 'border')
    .attr('stroke', 'black')
    .attr('stroke-width',5)
    .attr('fill-opacity', 0)
    .style('height', height)
    .style('width', width)

  plot.append('rect')
    .attr('x', x(-.7))
    .attr('y', height-10)
    .attr('height', '10px')
    .attr('width', x(.7)-x(-.7) + 'px')

  plot.append('text')
    .attr('x', x(0))
    .attr('y', height-15)
    .attr('text-anchor', 'middle')
    .text('Home Plate')
    
    
   plot.append('text')
    .attr('x', x(-3))
    .attr('y', height-400)
    .attr('text-anchor', 'middle')
    .text('RHB')

   plot.append('text')
    .attr('x', x(3))
    .attr('y', height-400)
    .attr('text-anchor', 'middle')
    .text('LHB')

  plot.append('rect')
    .attr('x', x(-1) + 'px').attr('y', y(3.5) + 'px').attr('width', x(1)-x(-1)+'px').attr('height', y(1.5)-y(3.5)+'px')
    .attr('fill-opacity',0)
    .attr('stroke', 'black')
    .attr('stroke-width', '2px')
    
    d3.select('#title-1').text('Pitcher Name -- Called Strikes')
    d3.select('#title-2').text('2015 Sliders')
    
    $('#logo-container').append('<img id="fg-logo" src="http://www.fangraphs.com/blogs/wp-content/uploads/2015/07/FG_logo_white.png" />')


  function drawImage(canvas) {
    var context = canvas.node().getContext("2d"),
        image = context.createImageData(dx, dy);

    for (var y = dy, p = -1; y >= 0; y = y-1) {
      for (var x = 0; x < dx; ++x) {
        var c = d3.rgb(color(heatmap[x][y]));
        var a = alpha(heatmap[x][y])
        image.data[++p] = c.r;
        image.data[++p] = c.g;
        image.data[++p] = c.b;
        image.data[++p] = 255*a;
      }
    }

    context.putImageData(image, 0, 0);
  }
})
