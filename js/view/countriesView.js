class CountriesView{

  constructor(container, model){
    this.container = container;
    this.model = model;
    this.map = null;
    this.model.addObserver(this);
    this.hoverCountry = null;
  }

  render(){
    this.container.innerHTML='';
    this.map = new Datamap({element: this.container,
                model: this.model,
                responsive:false,
                done: function() {}, //callback when the map is done drawing
                dataUrl: null, //if not null, datamaps will attempt to fetch this based on dataType ( default: json )
                geographyConfig: {
                  dataUrl: null, //if not null, datamaps will fetch the map JSON (currently only supports topojson)
                  hideAntarctica: true,
                  borderWidth: 1,
                  borderOpacity: 1,
                  borderColor: '#FDFDFD',
                  popupOnHover: true, //disable the popup while hovering
                  highlightOnHover: true,
                  highlightBorderColor: 'rgba(207, 206, 206, 0.2)',
                  highlightBorderWidth: 1,
                  highlightBorderOpacity: 1,
                  popupTemplate: function(geography, data) {
                    let text=`<div class="hoverinfo"> <h5> ${geography.properties.name} </h5>  `;
                    // Display all the value percentage of the country
                    data.values.map((value, index)=>{
                      text += `
                      <div>
                        ${value.name}: <strong>${value.value}% </strong
                      <div>
                      `;
                    });
                    text+="</div>";
                    return text;
                 },
                },
                fills: {
                  defaultFill: 'rgba(50,54,71,1)', // Any hex, color name or rgb/rgba value
                  Veryimportant: 'rgba(240,223,12,1)',
                  Ratherimportant: 'rgba(240,223,12,0.3)',
                  Notveryimportant: 'rgba(232,88,93,0.3)',
                  Notatallimportant: 'rgba(232,88,93,1)',
                  Noanswer: 'rgba(255,255,255,0.5)',
                  //
                  Veryhappy: 'rgba(240,223,12,1)',
                  Ratherhappy:'rgba(240,223,12,0.3)',
                  Quitehappy: 'rgba(240,223,12,0.3)',
                  Notveryhappy: 'rgba(232,88,93,0.3)',
                  Notatallhappy: 'rgba(232,88,93,1)',
                  Ahighlevelofeconomicgrowth: 'rgba(240,223,12,1)',
                  Economicgrowth: 'rgba(240,223,12,1)',
                  Makingsurethiscountryhasstrongdefenseforces: 'rgba(232,88,93,1)',
                  Seeingthatpeoplehavemoresayabouthowaredoneattheirjobsandintheircommunities: 'rgba(80,181,217,1)' ,
                  Peoplehavemoresayabouthowthings: 'rgba(232,88,93,1)' ,
                  Tryingtomakeourcitiesandcountrysidemorebeautiful: 'rgba(214,173 ,208,1)'
                },
                done: function(datamap) {
                    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                      let localData = datamap.options.data[geography.id];
                     if ( localData && localData.values ) {
                       datamap.options.model.addCountry(geography.id);
                     }
                    });
                },
                data: {}

              });

              // this.map.legend({
              //   legendTitle : "How important:",
              //   labels: {
              //     q0: "one"
              //
              //   },
              // });
  }



  afterRender(){

  }


  update(model, changeDetails){
    if(changeDetails.type == "newData"){
      this.render();
      this.map.updateChoropleth(this.model.currentData.data);
    }else if(changeDetails.type == "cleanMap"){
    }
  }

   cleanMap(){
    let tempData = this.model.getCleanData();
    this.map.updateChoropleth(tempData.data);
  }

  getHighestVal(values){
    let fill = "veryImportant";
    return fill;
  }
}
