class DateView{

  constructor(container, model){
    this.container = container;
    this.model = model;
    this.buttons = null;
  }

  render(){
    let buttons =`
    <div class="btn-group btn-group-toggle col" data-toggle="buttons">
      <label class="btn btn-secondary dat-btn active col">
        <input class="input-val" type="radio" name="options" id="1995-1998" autocomplete="off" checked> 1995-1998
      </label>
      <label class="btn btn-secondary dat-btn col">
        <input class="input-val" type="radio" name="options" id="1999-2004" autocomplete="off"> 1999-2004
      </label>
      <label class="btn btn-secondary dat-btn col">
        <input class="input-val" type="radio" name="options" id="2005-2009" autocomplete="off"> 2005-2009
      </label>
      <label class="btn btn-secondary dat-btn col">
        <input class="input-val" type="radio" name="options" id="2010-2014" autocomplete="off"> 2010-2014
      </label>
    </div>
    `;
    this.container.html(buttons);
  }

  afterRender(){
    this.buttons = document.querySelectorAll(".dat-btn");
  }
}
