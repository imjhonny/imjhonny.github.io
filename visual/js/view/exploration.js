// class exploration containing all the process
class Exploration{

  // container is the div that contains the info
  constructor(container ){
    this.container = container;
  }

  render(){
    let exploration =`
    <div class="row ">
      <div  class="text-center d-flex align-items-center flex-column bd-highlight mb-3">
        <div class="col-sm-6">
          <h2>Discovery process for World Values Survey online Tools</h2>
          <h5>How does religion affect the world? Does it affect tolerance towards others? Or are religious countries a better place to live, are they more peaceful?</h5>
          <img class="img-fluid"src="img/01.jpg" alt="closes wave">
          <p>Start by selecting the closest wave to the present <b>2010-2014</b></p>

          <img class="img-fluid"src="img/02.jpg" alt="">
          <p>I take first a general view of the importance of religion index through a color gradient. In wealthy countries like Japan fails with -48, and Sweden:-47. Meanwhile less developed countries have a higher index: Colombia:71, Iraq:95, Mexico 68.</p>

          <img class="img-fluid"src="img/03.jpg" alt="">
          <p>I selected 5 countries in order to compare them an visualize and compare their values. The countries were the following: Iraq, Sweden, Japan, Colombia, and the United States.</p>

          <img class="img-fluid"src="img/04.jpg" alt="">
          <p>From the visualization, we can deduce that religion is very important in countries like Colombia, Iraq, and the United States. While not very important or not at all important for Japan and Sweden. </p>

          <img class="img-fluid"src="img/05.jpg" alt="">
          <p>In the timeline, religion has become more important for Colombia during the past 20 years</p>

          <img class="img-fluid"src="img/06.jpg" alt="">
          <p>While in Iraq religion has become less important during the past 5 years. </p>

          <img class="img-fluid"src="img/07.jpg" alt="">
          <p>In Japan, religion is mostly not at all important during the past 20 years. </p>
          <hr>

          <p>I want to visualize and compare other parameters like the feeling of happiness, how important other values are, and get a insight of how religion can affect other values of a country.
          </p>

        </div>
      </div>
    </div>
    `;
    this.container.html(exploration);
  }

}
