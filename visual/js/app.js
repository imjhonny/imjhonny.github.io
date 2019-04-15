// initializa map


// initialize the model
let worldViz = new WorldViz();

// Initialize views and CONTROLLERS
let container = $("#main-content");
let explorationView = new Exploration(container);
explorationViewController = new ExplorationController(explorationView);

let menuView = new Menu($("#menu"));
menuViewController = new MenuViewController($("#menu"), menuView);

let mapView = new MapView(container, worldViz);
mapViewController = new MapViewController(mapView);



function showView(view){
  switch (view) {
    case 'exploration':
      explorationViewController.renderView();
      break;
    case 'map':
      mapViewController.renderView();
    default:
      mapViewController.renderView();
  }
}
menuViewController.renderView();
showView('map');
worldViz.loadValue();
