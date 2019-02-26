class MenuViewController{

  constructor(container, view){
    this.container = container;
    this.view = view;
  }

  addEventListener(){

  }

  renderView(){
    this.view.render();
    this.view.afterRender();
    this.addEventListener();
  }

}
