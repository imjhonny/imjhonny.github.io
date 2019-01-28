
// VARIABLES
var width = 700;
var height = 450;

var dataset;
var xScale;
var yScale;
var yAxis;
var radiusCircles = 8;

var currentColor;

var color = d3.scaleOrdinal(d3.schemeCategory10);


var btn = document.getElementById("addMemberBtn");
btn.addEventListener("click", addGroupMemeber);

// var groupChart;
// LOAD JSON
d3.json("../data/visInfo.json", function(data) {
    dataset = data;
    initialize();
    intiateRadialGraph(data[51]);
    viewVar("Information_Visualization");
    // groupChart=  RadarChart.draw("#group-skills", "../data/avenger.csv");

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
              .rangeRound([radiusCircles/2, width-13])
              .paddingInner(0.05);

   yScale = d3.scaleLinear()
          .domain([0, 10])
          .range([0, height-radiusCircles]);

  var yScaleAxis = d3.scaleLinear()
         .domain([0, 10])
         .range([height-radiusCircles , radiusCircles+(radiusCircles/2)]);

  //Define Y axis
	yAxis = d3.axisLeft()
					  .scale(yScaleAxis)
					  .ticks(3);
}

// Load de information from a specific field
var viewVar = function(type){

  currentColor = rgbToHex($('#'+type+"_span").css("background-color"));

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
  //     return "rgba(0, 0, " + Math.round(d[type] * 100) +"0.1"+ ")";
  //    });

  //Generate guide lines
      svg.selectAll("line")
         .data(dataset)
         .enter()
         .append("line")
         .attr("x1", function(d,i) {
           return radiusCircles/2 +  xScale(i);
         })
         .attr("x2", function(d,i) {
           return radiusCircles/2 +  xScale(i);
         })
         .attr("y1", function(d){
           return height - yScale(d[type]);
         })
         .attr("y2", function(d) {
            return height;
         })
         .attr("stroke", "#ddd")
         .attr("stroke-width", 1);

      //Generate circles last, so they appear in front
      svg.selectAll("circle")
         .data(dataset)
         .enter()
         .append("circle")
         .attr("cx", function(d, i) {
            return radiusCircles/2 +  xScale(i);
         })
         .attr("cy", function(d) {
           return height +radiusCircles + - yScale(d[type]);
         })
         .style('fill', function(d,i){
           return currentColor;
         })
         .attr("r", radiusCircles)
         .on("click", function(d) {
            console.log("on click" + d.Name);
          })
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut)
          .on("click", showUser);

          //Create Y axis
  			svg.append("g")
  				.attr("class", "axis")
  				.attr("transform", "translate(" + (width-10)  + ",0)")
  				.call(yAxis);


    // Create labels
    // svg.selectAll("text")
    //    .data(dataset)
    //    .enter()
    //    .append("text")
    //    .text(function(d) {
    //       return d[type];
    //    })
    //    .attr("text-anchor", "middle")
    //    .attr("x", function(d, i) {
    //       return xScale(i) + xScale.bandwidth() / 2;
    //    })
    //    .attr("y", function(d) {
    //       return height - yScale(d[type]) + 14;
    //    })
    //    .attr("font-family", "sans-serif")
    //    .attr("font-size", "11px")
    //    .attr("fill", "white");

}

// update the information for a new one
var update = function(type){
  currentColor = $('#'+type+"_span").css("background-color");

  //Generate circles last, so they appear in front
  svg.selectAll("circle")
      .data(dataset)
      .transition()
      .delay(function(d, i) {
        return i / dataset.length * 1000;
      })
      .duration(500)
      .style('fill', function(d,i){

        return currentColor;
      })
      .attr("cx", function(d, i) {
        return  radiusCircles/2 + xScale(i);
      })
      .attr("cy", function(d) {
        return height +radiusCircles + - yScale(d[type]);
      })
      .attr("r", radiusCircles);

  svg.selectAll("line")
      .data(dataset)
      .transition()
     .delay(function(d, i) {
       return i / dataset.length * 1000;
     })
     .duration(500)
     .attr("x1", function(d,i) {
       return radiusCircles/2 +  xScale(i);
     })
     .attr("x2", function(d,i) {
       return radiusCircles/2 +  xScale(i);
     })
     .attr("y1", function(d){
       return   height -yScale(d[type]);
     })
     .attr("y2", function(d) {
        return height;
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
  //     return "rgba(0, 0, " + Math.round(d[type] * 100) +"0.1"+ ")";
  //    });

  // Create labels
  // svg.selectAll("text")
  //    .data(dataset)
  //    .transition()
	//    .delay(function(d, i) {
	// 	   return i / dataset.length * 1000;
	//    })
	//    .duration(500)
  //    .text(function(d) {
  //       return d[type];
  //    })
  //    .attr("text-anchor", "middle")
  //    .attr("x", function(d, i) {
  //       return xScale(i) + xScale.bandwidth() / 2;
  //    })
  //    .attr("y", function(d) {
  //       return height - yScale(d[type]) + 14;
  //    })
  //    .attr("font-family", "sans-serif")
  //    .attr("font-size", "11px")
  //    .attr("fill", "white");

}


// show modal with user information
function showUser(d){
  $('#userInfo').modal('show');
  document.getElementById('userName').innerHTML= d.Name;
  document.getElementById('userMajor').innerHTML = d.Major + " / " + d.Future_Degree ;
  document.getElementById("p2").innerHTML = d.About;
  document.getElementById("p1").innerHTML = d.Expectations;
  changeUserInfo(d);
}

// Create Event Handlers for mouse
function handleMouseOver(d, i) {  // Add interactivity
    // Use D3 to select element, change color and size
    d3.select(this)
      .transition()
      .delay(function(d, i) {
        return i / dataset.length * 1000;
      })
      .duration(250)
      .attr("fill", "orange")
      .attr("r", radiusCircles*2);
}
// Create Event Handlers for mouse
function handleMouseOut(d, i) {  // Add interactivity
    // Use D3 to select element, change color and size
    d3.select(this)
      .transition()
      .delay(function(d, i) {
        return i / dataset.length * 1000;
      })
      .duration(250)
      .attr("fill", "black")
      .attr("r", radiusCircles);
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

function addGroupMemeber() {
  $('#userInfo').modal('hide');
  var userName =  document.getElementById("userName").innerHTML;
  var userInfo =/* template */`
       <li id="member">${userName}</li>
  `;
  var ul = document.getElementById("group-members");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(userName));
  // li.setAttribute("id", "element4");
  ul.appendChild(li);
}
