class ValueDropView{

  constructor(container, model){
    this.container = container;
    this.model = model;
    this.dropwDown = null;
    this.label = null;
    this.links = null;
    this.active = null;
    this.label = null;
    this.model.addObserver(this);

  }

  render(){
    let dropDownHtml = `
    <div class="dropdown col-sm-6">
      <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        How important is:
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <label class="form-check-label" for="dropdownCheck">
          World Values Survey:
        </label>
        <a class="dropdown-item active" href="#">Religion</a>
        <a class="dropdown-item" href="#">Work</a>
        <a class="dropdown-item" href="#">Politics</a>
        <a class="dropdown-item" href="#">Leisure_Time</a>
        <a class="dropdown-item" href="#">Happiness</a>
        <a class="dropdown-item" href="#">Friends</a>
        <a class="dropdown-item" href="#">Family</a>
        <a class="dropdown-item" href="#">First_choice</a>
        <div class="dropdown-divider"></div>
        <label class="form-check-label" for="dropdownCheck">
          Gapminder Values:
        </label>
        <a class="dropdown-item" href="#">Economy</a>
        <a class="dropdown-item" href="#">Life</a>

      </div>
    </div>
    <div class="col-sm-6 val-selected">
        <h4 id="current-value" class="value">Religion</h4>
    </div>
    <div class="col-sm-12">
      <hr>
    </div>
    `;
    this.container.html(dropDownHtml);
  }

  afterRender(){
    this.links = document.querySelectorAll(".dropdown-item");
    this.active = this.container.find(".active")[0];
    this.label =document.getElementById("current-value");
  }

  setActive(link){
    link.classList.add("active");
    this.active.classList.remove("active");
    this.active = link;
  }

  //update info when modified in model
	update(model, changeDetails){

		if(changeDetails.type == "newValue"){
			this.renderLabel();
		}

  }
  renderLabel(){
    this.label.innerHTML= this.model.getCurrentValue();
  }
}
