class MapView{

  constructor(container, model){
    this.container = container;
    this.mapView = null;
    this.mapViewController =null;
    this.model = model;

    this.dateView = new DateView($('#datesContainer'), this.model);
    this.dateViewController =new DateViewController(this.dateView, this.model);

    this.valueDropView = new ValueDropView($("#dropDownValues"), this.model);
    this.valueDropViewController =new ValueDropViewController(this.valueDropView, this.model);
    this.countriesView = new CountriesView(document.getElementById('map-container'), this.model);
    this.contriesViewController = new CountriesViewController(this.countriesView, this.model);

    this.countryVizContainerView = new CountryVizContainerView($("#countriesViz"), this.model);
    this.countryVizContainerViewController = new CountryVizContainerViewController(this.countryVizContainerView, this.model);
  }

  render(){
    this.valueDropViewController.renderView();
    this.dateViewController.renderView();
    this.contriesViewController.renderView();
    this.countryVizContainerViewController.renderView();
  }

  afterRender(){

  }

}
