// referencia = http://bl.ocks.org/nbremer/62cf60e116ae821c06602793d265eaf6

loadVehiclesHeatBlock = function() {
///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////	

var days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
	times = d3.range(24);

var margin = {
	top: 170,
	right: 50,
	bottom: 70,
	left: 50
};

var width = Math.max(Math.min(window.innerWidth, 1000), 500) - margin.left - margin.right - 20,
	gridSize = Math.floor(width / times.length),
	height = gridSize * (days.length+2);

d3.select("#vehiclesTrafficAccidents").remove(); // Clean if already rendered before
d3.select("#vehiclesTrafficAccidentsContainer").append('div').attr('id', 'vehiclesTrafficAccidents'); 

//SVG container
var svg = d3.select('#vehiclesTrafficAccidents')
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	.attr("class", "heatmapclass");

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Draw Heatmap /////////////////////////////////
///////////////////////////////////////////////////////////////////////////
	
//Based on the heatmap example of: http://blockbuilder.org/milroc/7014412

/*var colorScale = d3.scale.linear()
	.domain([0, d3.max(vehiclesAccidents, function(d) {return d.count; })/2, d3.max(vehiclesAccidents, function(d) {return d.count; })])
	.range(["#FFFFDD", "#3E9583", "#1F2D86"])
	//.interpolate(d3.interpolateHcl);*/

function toPaddedHexString(num, len) {
    str = num.toString(16);
    return "0".repeat(len - str.length) + str;
}

var colorScale = (carP, publicP, motorcycleP) => {
    return("#" + toPaddedHexString(Math.floor(200*carP)+55, 2) + toPaddedHexString(Math.floor(200*publicP)+55, 2) + toPaddedHexString(Math.floor(200*motorcycleP)+55, 2));
};

var dayLabels = svg.selectAll(".dayLabel")
    .data(days)
    .enter().append("text")
    .text(function (d) { return d; })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

var timeLabels = svg.selectAll(".timeLabel")
    .data(times)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", function(d, i) { return ((i >= 8 && i <= 17) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

var heatMap = svg.selectAll(".hour")
    .data(vehiclesAccidents)
    .enter().append("rect")
    .attr("x", function(d) { return (d.hour - 1) * gridSize; })
    .attr("y", function(d) { return (d.day - 1) * gridSize; })
    .attr("class", "hour bordered")
    .attr("width", gridSize)
    .attr("height", gridSize)
    .style("stroke", "white")
    .style("stroke-opacity", 0.6)
    .style("fill", function(d) { return colorScale(d.carPercentage, d.publicPercentage, d.motorcyclePercentage); });

//Append title to the top
svg.append("text")
	.attr("class", "title")
    .attr("x", width/2)
    .attr("y", -90)
    .style("text-anchor", "middle")
    .text("Veículos por Dia e Hora");
svg.append("text")
	.attr("class", "subtitle")
    .attr("x", width/2)
    .attr("y", -60)
    .style("text-anchor", "middle")

///////////////////////////////////////////////////////////////////////////
////////////////////////// Draw the legend ////////////////////////////////
///////////////////////////////////////////////////////////////////////////

var legendWidth = Math.min(width*0.8, 400);
//Color Legend container
var legendsvg = svg.append("g")
	.attr("class", "legendWrapper")
	.attr("transform", "translate(" + (width/2) + "," + (gridSize * days.length + 40) + ")");

//Draw the Rectangle
legendsvg.append("rect")
	.attr("class", "legendRect")
	.attr("x", -legendWidth/2)
	.attr("y", 0)
	//.attr("rx", hexRadius*1.25/2)
	.attr("width", legendWidth)
	.attr("height", 10)
	.style("fill", "url(#legend-traffic)");
	
//Append title
legendsvg.append("text")
	.attr("class", "legendTitle")
	.attr("x", 0)
	.attr("y", -10)
	.style("text-anchor", "middle")
	.text("Número de Acidentes");

//Set scale for x-axis
var xScale = d3.scale.linear()
	 .range([-legendWidth/2, legendWidth/2])
	 .domain([ 0, d3.max(vehiclesAccidents, function(d) { return d.count; })] );

//Define x-axis
var xAxis = d3.svg.axis()
	  .orient("bottom")
	  .ticks(5)
	  //.tickFormat(formatPercent)
	  .scale(xScale);

//Set up X axis
legendsvg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0," + (10) + ")")
	.call(xAxis);
};
