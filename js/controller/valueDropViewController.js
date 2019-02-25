class ValueDropViewController{

  constructor(view, model){
    this.view = view;
    this.model = model;
  }

  addEventListener(){
    // Loop through the links and add addEventListener
    // modify the current value
    for(var i = 0; i < this.view.links.length; i++){
      let link = this.view.links[i];
      this.view.links[i].addEventListener("click", ()=>{
        this.model.setCurrentValue(link.innerHTML);
        this.view.setActive(link);
      });
    } 
  }

  renderView(){
    this.view.render();
    this.view.afterRender();
    this.addEventListener();
  }

}
