class CountryVizContainerViewController{
  constructor(view, model){
    this.view =view;
    this.model = model;
  }

  renderView(){
    this.view.render();
    this.view.afterRender();
  }

  addEventListener(){

  }

}
