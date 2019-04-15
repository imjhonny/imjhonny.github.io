let button;

function setup() {
  // put setup code here
  button = createButton("submit");
  button.position(100, 65);
  button.mousePressed(vibrate);
}

function draw() {
  // put drawing code here
}

function vibrate() {
  navigator.vibrate([500]);
  console.log("vibrate");
}
