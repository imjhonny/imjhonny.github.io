class MapViewController{

  constructor(view){
    this.view = view;
  }

  renderView(){
    this.view.render();
    this.view.afterRender();
  }

  addEventListener(){

  }
}
