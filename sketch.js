let button;

function setup() {
  // put setup code here
  navigator.vibrate([50, 100, 150]);
  button = createButton("submit");
  button.position(100, 65);
  button.mousePressed(vibrate);
}

function draw() {
  // put drawing code here
}

function vibrate() {
  navigator.vibrate([500]);
}
