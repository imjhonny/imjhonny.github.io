class CountryDetailViewController{

  constructor(view, model){
    this.view =view;
    this.model = model;
  }

  renderView(){
    this.view.render();
    this.view.afterRender();
    this.addEventListener();
  }

  addEventListener(){
    this.view.closeBtn.addEventListener("click", ()=>{
      this.model.removeCountry(this.view.countryId);
    });
  }
}
