
// VARIABLES
var width = 800;
var height = 600;

var dataset;
var xScale;
var yScale;

// LOAD JSON
d3.json("../data/visInfo.json", function(data) {
    dataset = data;
    initialize();
    viewVar("Programming");
});


//Create SVG element
var svg = d3.select("#bar-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

// Initialize basic info
var initialize = function(){
  //Create barss
   xScale = d3.scaleBand()
              .domain(d3.range(dataset.length))
              .rangeRound([0, width])
              .paddingInner(0.05);

   yScale = d3.scaleLinear()
          .domain([0, 10])
          .range([0, height]);
}

// Load de information from a specific field
var viewVar = function(type){
  //Generate guide lines
      svg.selectAll("line")
         .data(dataset)
         .enter()
         .append("line")
         .attr("x1", function(d,i) {
            return xScale(i);
         })
         .attr("x2", function(d,i) {
            return xScale(i);
         })
         .attr("y1", function(d){
           return  height - yScale(d[type]);
         })
         .attr("y2", function(d) {
            return yScale(d[type]);
         })
         .attr("stroke", "#ddd")
         .attr("stroke-width", 1);

      //Generate circles last, so they appear in front
      svg.selectAll("circle")
         .data(dataset)
         .enter()
         .append("circle")
         .attr("cx", function(d, i) {
            return  xScale(i);
         })
         .attr("cy", function(d) {
            return yScale(d[type]);
         })
         .attr("r", 5);

    // svg.selectAll("rect")
    //    .data(dataset)
    //    .enter()
    //    .append("rect")
    //    .attr("x", function(d, i) {
    //       return xScale(i);
    //    })
    //    .attr("y", function(d) {
    //       return height - yScale(d[type]);
    //    })
    //    .attr("width", xScale.bandwidth())
    //    .attr("height", function(d) {
    //       return yScale(d[type]);
    //    })
    //    .attr("fill", function(d) {
    //     return "rgb(0, 0, " + Math.round(d[type] * 100) + ")";
    //    });

    // Create labels
    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text(function(d) {
          return d[type];
       })
       .attr("text-anchor", "middle")
       .attr("x", function(d, i) {
          return xScale(i) + xScale.bandwidth() / 2;
       })
       .attr("y", function(d) {
          return height - yScale(d[type]) + 14;
       })
       .attr("font-family", "sans-serif")
       .attr("font-size", "11px")
       .attr("fill", "white");

}

// update the information for a new one
var update = function(type){

  //Generate circles last, so they appear in front
  svg.selectAll("circle")
      .data(dataset)
      .transition()
      .delay(function(d, i) {
        return i / dataset.length * 1000;
      })
      .duration(500)
      .attr("cx", function(d, i) {
        return  xScale(i);
      })
      .attr("cy", function(d) {
        return yScale(d[type]);
      })
      .attr("r", 5);

  svg.selectAll("line")
      .data(dataset)
      .transition()
     .delay(function(d, i) {
       return i / dataset.length * 1000;
     })
     .duration(500)
     .attr("x1", function(d,i) {
        return xScale(i);
     })
     .attr("x2", function(d,i) {
        return xScale(i);
     })
     .attr("y1", function(d){
       return  height - yScale(d[type]);
     })
     .attr("y2", function(d) {
        return yScale(d[type]);
     })
     .attr("stroke", "#ddd")
     .attr("stroke-width", 1);

  // svg.selectAll("rect")
  //    .data(dataset)
  //    .transition()
	//    .delay(function(d, i) {
	// 	   return i / dataset.length * 1000;
	//    })
	//    .duration(500)
  //    .attr("x", function(d, i) {
  //       return xScale(i);
  //    })
  //    .attr("y", function(d) {
  //       return height - yScale(d[type]);
  //    })
  //    .attr("width", xScale.bandwidth())
  //    .attr("height", function(d) {
  //       return yScale(d[type]);
  //    })
  //    .attr("fill", function(d) {
  //     return "rgb(0, 0, " + Math.round(d[type] * 100) + ")";
  //    });

  // Create labels
  svg.selectAll("text")
     .data(dataset)
     .transition()
	   .delay(function(d, i) {
		   return i / dataset.length * 1000;
	   })
	   .duration(500)
     .text(function(d) {
        return d[type];
     })
     .attr("text-anchor", "middle")
     .attr("x", function(d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
     })
     .attr("y", function(d) {
        return height - yScale(d[type]) + 14;
     })
     .attr("font-family", "sans-serif")
     .attr("font-size", "11px")
     .attr("fill", "white");

}

d3.selectAll(".block-info")
    .on("click", function() {
    update(String(this.id));
});

//On click, update with new data
d3.select("h1")
    .on("click", function() {
      update("Information_Visualization");

});
