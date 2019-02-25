class MenuViewController{

  constructor(container, view){
    this.container = container;
    this.view = view;
  }

  addEventListener(){
    // this.view.mapLink.on("click", ()=>{
    //   showView('map');
    //   this.view.selectMenu('map');
    // });
    // this.view.explorationLink.on("click", ()=>{
    //   showView('exploration');
    //   this.view.selectMenu('discover');
    // });
  }

  renderView(){
    this.view.render();
    this.view.afterRender();
    this.addEventListener();
  }

}
