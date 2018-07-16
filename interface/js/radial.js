///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////	

loadRadial = function() {
	var margin = {
		top: 50,
		right: 20,
		bottom: 20,
		left: 20
	};
	var width = window.innerWidth - margin.left - margin.right - 20 - 210;
	var height = window.innerHeight - margin.top - margin.bottom - 20 - 100;

	d3.select("#weatherRadial").remove(); // Clean if already rendered before
	d3.select("#weatherRadialContainer").append('div').attr('id', 'weatherRadial');

	//SVG container
	var svg = d3.select("#weatherRadial")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")");

	///////////////////////////////////////////////////////////////////////////
	//////////////////////////// Create scales ////////////////////////////////
	///////////////////////////////////////////////////////////////////////////

	//Parses a string into a date
	var parseDate = d3.time.format("%Y-%m-%d").parse;

	//Turn strings into actual numbers/dates
	weatherBoston.forEach(function(d) {
		d.date = parseDate(d.date);
	});

	//Set the minimum inner radius and max outer radius of the chart
	var	outerRadius = Math.min(width, height, 500)/2,
		innerRadius = outerRadius * 0.4;

	//Base the color scale on average temperature extremes
	var colorScale = d3.scale.linear()
		.domain([-15, 7.5, 30])
		.range(["#2c7bb6", "#ffff8c", "#d7191c"])
		.interpolate(d3.interpolateHcl);

	//Scale for the heights of the bar, not starting at zero to give the bars an initial offset outward
	var barScale = d3.scale.linear()
		.range([innerRadius, outerRadius])
		.domain([0,100]); 

	//Scale to turn the date into an angle of 360 degrees in total
	//With the first datapoint (Jan 1st) on top
	var angle = d3.scale.linear()
		.range([-180, 180])
		.domain(d3.extent(weatherBoston, function(d) { return d.date; }));	 

	///////////////////////////////////////////////////////////////////////////
	///////////////////////////// Create Axes /////////////////////////////////
	///////////////////////////////////////////////////////////////////////////

	//Wrapper for the bars and to position it downward
	var barWrapper = svg.append("g")
		.attr("transform", "translate(" + 0 + "," + 0 + ")");
		
	//Draw gridlines below the bars
	var axes = barWrapper.selectAll(".gridCircles")
		.data([0,25,50,75,100])
			.enter().append("g");
	//Draw the circles
	axes.append("circle")
		.attr("class", "axisCircles")
		.attr("r", function(d) { return barScale(d); });
	//Draw the axis labels
	axes.append("text")
		.attr("class", "axisText")
		.attr("y", function(d) { return barScale(d); })
		.attr("dy", "0.3em")
		.text(function(d) { return d});

	//Add January for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", 7)
		.attr("y", -outerRadius * 1.1)
		.attr("dy", "0.9em")
		.text("Janeiro");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", 0)
		.attr("y1", -innerRadius * 0.65)
		.attr("x2", 0)
		.attr("y2", -outerRadius * 1.1);
	//Add February for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", outerRadius * 0.6)
		.attr("y", -outerRadius * 1.0)
		.attr("dx", "0.7em")
		.attr("dy", "2.0em")
		.text("Fevereiro");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", 30)
		.attr("y1", -innerRadius * 0.55)
		.attr("x2", outerRadius * 0.6)
		.attr("y2", -outerRadius * 0.95);
	//Add March for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", outerRadius * 0.9)
		.attr("y", -outerRadius * 0.5)
		.attr("dx", "2.0em")
		.attr("dy", "1.3em")
		.text("Março");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", 50)
		.attr("y1", -innerRadius * 0.3)
		.attr("x2", outerRadius * 1.0)
		.attr("y2", -outerRadius * 0.5);

	//Add April for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", outerRadius * 1.1)
		.attr("y", 0)
		.attr("dx", "0.5em")
		.attr("dy", "1.1em")
		.text("Abril");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", innerRadius * 0.65)
		.attr("y1", 0)
		.attr("x2", outerRadius * 1.1)
		.attr("y2", 0);
	//Add May for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", outerRadius * 0.9)
		.attr("y", outerRadius * 0.5)
		.attr("dx", "1.0em")
		.attr("dy", "1.3em")
		.text("Maio");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", 30)
		.attr("y1", innerRadius * 0.55)
		.attr("x2", outerRadius * 0.6)
		.attr("y2", outerRadius * 0.95);
	//Add June for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", outerRadius * 0.6)
		.attr("y", outerRadius * 1.0)
		.attr("dx", "-2.3em")
		.attr("dy", "0.7em")
		.text("Junho");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", 50)
		.attr("y1", innerRadius * 0.3)
		.attr("x2", outerRadius * 1.0)
		.attr("y2", outerRadius * 0.5);

	//Add July for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", 7)
		.attr("y", outerRadius * 1.1)
		.attr("dx", "-4.0em")
		.attr("dy", "0.9em")
		.text("Julho");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", 0)
		.attr("y1", innerRadius * 0.65)
		.attr("x2", 0)
		.attr("y2", outerRadius * 1.1);
	//Add August for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", -outerRadius * 0.6)
		.attr("y", outerRadius * 1.0)
		.attr("dx", "-3.7em")
		.attr("dy", "-0.94em")
		.text("Agosto");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", -30)
		.attr("y1", innerRadius * 0.55)
		.attr("x2", -outerRadius * 0.6)
		.attr("y2", outerRadius * 0.95);
	//Add September for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", -outerRadius * 0.9)
		.attr("y", outerRadius * 0.5)
		.attr("dx", "-6.0em")
		.attr("dy", "-1.0em")
		.text("Setembro");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", -50)
		.attr("y1", innerRadius * 0.3)
		.attr("x2", -outerRadius * 1.0)
		.attr("y2", outerRadius * 0.5);

	//Add October for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", -outerRadius * 1.1)
		.attr("y", 0)
		.attr("dx", "-4.0em")
		.attr("dy", "-0.9em")
		.text("Outubro");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", -innerRadius * 0.65)
		.attr("y1", 0)
		.attr("x2", -outerRadius * 1.1)
		.attr("y2", 0);
	//Add November for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", -outerRadius * 0.9)
		.attr("y", -outerRadius * 0.5)
		.attr("dx", "-4.0em")
		.attr("dy", "-1.1em")
		.text("Novembro");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", -50)
		.attr("y1", -innerRadius * 0.3)
		.attr("x2", -outerRadius * 1.0)
		.attr("y2", -outerRadius * 0.5);
	//Add December for reference
	barWrapper.append("text")
		.attr("class", "january")
		.attr("x", -outerRadius * 0.6)
		.attr("y", -outerRadius * 1.0)
		.text("Dezembro");
	//Add a line to split the year
	barWrapper.append("line")
		.attr("class", "yearLine")
		.attr("x1", -30)
		.attr("y1", -innerRadius * 0.55)
		.attr("x2", -outerRadius * 0.6)
		.attr("y2", -outerRadius * 0.95);


	///////////////////////////////////////////////////////////////////////////
	////////////////////////////// Draw bars //////////////////////////////////
	///////////////////////////////////////////////////////////////////////////

	//Draw a bar per day were the height is the difference between the minimum and maximum temperature
	//And the color is based on the mean temperature
	barWrapper.selectAll(".tempBar")
		.data(weatherBoston)
		.enter().append("rect")
		.attr("class", "tempBar")
		.attr("transform", function(d,i) { return "rotate(" + (angle(d.date)) + ")"; })
		.attr("width", 1.5)
		.attr("height", function(d,i) { return barScale(d.max_temp) - barScale(d.min_temp); })
		.attr("x", -0.75)
		.attr("y", function(d,i) {return barScale(0); })
		.style("fill", "#a52a2a");
		
	///////////////////////////////////////////////////////////////////////////
	//////////////// Create the gradient for the legend ///////////////////////
	///////////////////////////////////////////////////////////////////////////

	//Extra scale since the color scale is interpolated
	var tempScale = d3.scale.linear()
		.domain([0, 100])
		.range([0, width]);

	//Calculate the variables for the temp gradient
	var numStops = 10;
	tempRange = tempScale.domain();
	tempRange[2] = tempRange[1] - tempRange[0];
	tempPoint = [];
	for(var i = 0; i < numStops; i++) {
		tempPoint.push(i * tempRange[2]/(numStops-1) + tempRange[0]);
	}//for i

	//Create the gradient
	svg.append("defs")
		.append("linearGradient")
		.attr("id", "legend-weather")
		.attr("x1", "0%").attr("y1", "0%")
		.attr("x2", "100%").attr("y2", "0%")
		.selectAll("stop") 
		.data(d3.range(numStops))                
		.enter().append("stop") 
		.attr("offset", function(d,i) { return tempScale( tempPoint[i] )/width; })   
		.attr("stop-color", function(d,i) { return colorScale( tempPoint[i] ); });

};
