class Menu{
  constructor(container){
    this.container = container;
    this.mapLink =null;
    this.explorationLink = null;
  }

  render(){
    let menu =`
    <div class="row d-flex align-items-baseline">
      <div class="col-sm-6 menu">
        <a class = "active-menu" id="mapLink" href="#">
          <h1 >World Map Visualization</h1>
        </a>
        <a class="" id="discoveryLink" target="_blank" href="https://docs.google.com/document/d/15nYfWOxgXAxJAj-FCHq1dgf_IkhWFRHb3vj8qHlSFaQ/edit?usp=sharing"> / Discovery Process</a>
      </div>
      <div class="col-sm-6 d-flex align-items-baseline ">
        <h8 >By: Jonathan Ramirez</h8>

      </div>
      <div class="col-sm-12">
        <hr>
      </div>
    </div>
    `;
    this.container.html(menu);
  }

  selectMenu(item){
    switch (item) {
      case 'map':
        this.mapLink.addClass('active-menu');
        this.explorationLink.removeClass('active-menu');
        break;
      case 'discover':
        this.mapLink.removeClass('active-menu');
        this.explorationLink.addClass('active-menu');
      break;
      default:
        this.mapLink.addClass('active-menu');
        this.explorationLink.removeClass('active-menu');

    }
  }

  afterRender(){
    this.mapLink = this.container.find("#mapLink");
    this.explorationLink = this.container.find("#discoveryLink");
  }

}
