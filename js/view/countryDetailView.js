class CountryDetailView{
  constructor(container, model, name, data, countryId){
    this.container = container;
    this.model = model;
    this.name = name;
    this.data = data;
    this.closeBtn = null;
    this.countryId = countryId;
    this.model.addObserver(this);
    this.vizContainer =null;
    this.label = null;
    this.svg =null;
  }

  render(){
    var divtest = document.createElement("div");
    divtest.id = `${this.name}Id`;
    divtest.innerHTML = `
    <div  class ="col-sm-12 country-viz" >
      <h7>${this.name}: <span id ="${this.countryId}Label">${this.model.currentValue}</span></h7>
      <button id="${this.countryId}Btn" type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div id="${this.countryId}Viz" class="uppperSpaceMin">
      </div>
    <div>
    `;
    this.container.appendChild(divtest);
  }

  afterRender(){
    this.closeBtn = document.getElementById(this.countryId+"Btn");
    this.vizContainer = document.getElementById(this.countryId+"Viz");
    this.label = document.getElementById(this.countryId+"Label");
    this.renderViz();
  }

  renderViz(){
    //Width and height
    let w = $("#"+this.countryId+"Viz").width()-20;
    let h = 50;
    let hText = h-10;
    let padding = 3;

    let dataset, xScale, yScale, xAxis, yAxis;  //Empty, for now

    //Function for converting CSV values from strings to Dates and numbers
    //Copy data into global dataset
    dataset = this.data;

    //Create SVG element
    this.svg = d3.select(this.vizContainer)
          .append("svg")
          .attr("width", w)
          .attr("height", h);

    this.svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length);
			   })
			   .attr("y", (d)=>{
           return hText -((hText-10)*((d.value/100)));
         })
			   .attr("width",  w / dataset.length - padding)
			   .attr("height", (d)=>{
           return (hText-10)*((d.value/100))
         })
         .attr("fill", function(d) {
					return "rgb(80, 181, 217)";
			   });

     this.svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d.value+"%";
			   })
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length) + ((w / dataset.length)/2 -20);
			   })
			   .attr("y", function(d) {
			   		return hText - hText*(d.value/100)-5;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");

     this.svg.selectAll("values")
         .data(dataset)
         .enter()
         .append("text")
         .text(function(d) {
            return d.name;
         })
         .attr("x", function(d, i) {
            return i * (w / dataset.length);
         })
         .attr("y", function(d) {
            return h;
         })
         .attr("font-family", "sans-serif")
         .attr("font-size", "8px")
         .attr("fill", "white");
  }

  updateVisualization(){
    //Width and height
    let w = $("#"+this.countryId+"Viz").width()-20;
    let h = 50;
    let hText = h-10;
    let padding = 3;

    let dataset, xScale, yScale, xAxis, yAxis;  //Empty, for now

    //Function for converting CSV values from strings to Dates and numbers
    //Copy data into global dataset
    dataset = this.data;

    this.svg.selectAll("rect")
         .data(dataset)
         .transition()
         .delay(function(d, i) {
						   return i * 100;		// One-tenth of an additional second delay for each subsequent element
					   })
			   .duration(500)
         .attr("x", function(d, i) {
            return i * (w / dataset.length);
         })
         .attr("y", (d)=>{
           return hText -((hText-10)*((d.value/100)));
         })
         .attr("width",  w / dataset.length - padding)
         .attr("height", (d)=>{
           return (hText-10)*((d.value/100))
         })
         .attr("fill", function(d) {
          return "rgb(80, 181, 217)";
         });

     this.svg.selectAll("text")
         .data(dataset)
         .transition()
         .delay(function(d, i) {
						   return i * 100;		// One-tenth of an additional second delay for each subsequent element
					   })
			   .duration(500)
         .text(function(d) {
            return d.value+"%";
         })
         .attr("x", function(d, i) {
            return i * (w / dataset.length) + ((w / dataset.length)/2 -20);
         })
         .attr("y", function(d) {
            return hText - hText*(d.value/100)-5;
         })
         .attr("font-family", "sans-serif")
         .attr("font-size", "11px")
         .attr("fill", "white");

         d3.select("values").remove();
         this.svg.selectAll("values")
             .data(dataset)
             .enter()
             .append("text")
             .text(function(d) {
                return d.name;
             })
             .attr("x", function(d, i) {
                return i * (w / dataset.length);
             })
             .attr("y", function(d) {
                return h;
             })
             .attr("font-family", "sans-serif")
             .attr("font-size", "8px")
             .attr("fill", "white");

  }
  update(model, changeDetails){
    if(changeDetails.type == "removeCountry" && this.countryId == changeDetails.value){
      let countryDetail = document.getElementById(`${this.name}Id`);
      this.container.removeChild(countryDetail);
    }else if(changeDetails.type == "newValue"){
      this.label.innerHTML=this.model.currentValue;
      this.model.getDataCountry(this.countryId)
		}else if(changeDetails.type == "newData"){
      if(this.model.currentData.data[this.countryId].values.length==6){
        this.data =this.model.currentData.data[this.countryId].values;
        this.svg.remove();
        this.renderViz();
      }
    }
  }
}
