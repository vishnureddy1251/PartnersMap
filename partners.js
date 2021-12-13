(function () {
	// body...

	var margin = {top:0, left:0, right:0, bottom:0},
	height = 400 - margin.top - margin.bottom,
	width = 800 - margin.left - margin.right;

	var svg = d3.select("#map")
		.append("svg")
		.attr("height", height + margin.top + margin.bottom)
		.attr("width", width + margin.left + margin.right)
		.append("g")
		.attr("transform", "translate("+ margin.left +", "+margin.top +")");


		d3.queue()

		//.defer(d3.json, "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
		.defer(d3.json, "states.json")
		.defer(d3.json, "partners.json")
		.defer(d3.json, 'https://gist.githubusercontent.com/GbalsaC/db387adae4e84e999960ef79267ceada/raw/0cf2b08280452c7dbb04f81fafcb304bb841bc36/test1.json')
		.await(ready)

		var projection = d3.geoAlbersUsa()
		.translate([width / 2, height / 2])
		.scale(850)

		var path = d3.geoPath()
		.projection(projection)

			function ready (error, ...allData) {
			
    var data = allData[0];
    var partners = allData[1];
	 var testData = allData[2];
	 console.log(testData)
		var states = topojson.feature(data, data.objects.states).features
		

		svg.selectAll(".state")
			.data(states)
			.enter().append("path")
			.attr("class", "state")
			.attr("id", function(d){
			return "state-"+d.id
		})
			.attr("d", path)

		svg.selectAll(".wafflehouses")
			.data(partners)
			.enter().append("circle")
			.attr("class", "wafflehouses")
			.attr("r",2)
			.attr("cx", function(d){
			var coords = projection([d.longitude, d.latitude])
			return coords[0]
		})
			.attr("cy", function(d){	
			var coords = projection([d.longitude, d.latitude])
			return coords[1]
		})

}

})();