class DateViewController{

  constructor(view, model){
    this.view = view;
    this.model = model;
  }

  addEventListener(){
    // Loop through the links and add addEventListener
    // modify the current value
    for(var i = 0; i < this.view.buttons.length; i++){
      let button = this.view.buttons[i];
      this.view.buttons[i].addEventListener("click", ()=>{
        console.log("date");
        this.model.setCurrentWave( button.querySelectorAll(".input-val")[0].id);
      });
    }
  }

  renderView(){
    this.view.render();
    this.view.afterRender();
    this.addEventListener();
  }
}
