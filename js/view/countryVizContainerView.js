class CountryVizContainerView{
  constructor(container, model){
    this.model = model;
    this.container = container;
    this.model.addObserver(this);
    this.countryContainer = null;
    this.countries = [];
  }
  update(model, changeDetails){
    if(changeDetails.type == "newCountry"){
      this.addCountry(changeDetails.value);
      // this.render();
    }else if(changeDetails.type == "removeCountry" ){
      for(let i = 0 ; i < this.countries.length; i++){
        if(this.countries[i].view.countryId == changeDetails.value){
          this.countries.splice(i,1);
          break;
        }
      }
      console.log(this.countries);
    }

  }

  addCountry(newCountry){
    let detailCountryView = new CountryDetailView(this.countryContainer, this.model, newCountry.data.name, newCountry.data.values, newCountry.name);
    let detailCountryViewController = new CountryDetailViewController(detailCountryView, this.model);
    let country ={
      view: detailCountryView,
      controller: detailCountryViewController
    }
    this.countries.push(country);
    country.controller.renderView();
  }

  render(){
    let content =`
    <h5>Country:</h5> 
    <div id="countryContainer">
    </div>
    `;
    // this.countries.map((country, index)=>{
    //   // console.log(country, index);
		// });
    this.container.html(content);
  }

  afterRender(){
    this.countryContainer =document.getElementById('countryContainer');
  }
}
