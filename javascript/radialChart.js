const widthRad = 500,
  heightRad = 500,
  chartRadius = heightRad / 2 - 40;

var values= [0,2,4,6,8,10];




let svgRad = d3.select('#userGraph').append('svg')
  .attr('width', widthRad)
  .attr('height', heightRad)
  .append('g')
  .attr('transform', 'translate(' + widthRad / 2 + ',' + heightRad / 2 + ')');

let tooltip = d3.select('userGraph').append('div')
  .attr('class', 'tooltip');

const PI = Math.PI,
  arcMinRadius = 10,
  arcPadding = 10,
  labelPadding = -5,
  numTicks = 6;

var numArcs = 0;
var arcWidth = 0;
var arc;
var radialAxis;
var scale;
var ticks;
var keys;
var axialAxis;
var arcs;

function intiateRadialGraph(data){
  let dataRadial = [];
  addValue(data, dataRadial, 'Information_Visualization');
  addValue(data, dataRadial, 'Statistics');
  addValue(data, dataRadial, 'Mathematics');
  addValue(data, dataRadial, 'Drawing_and_Art');
  addValue(data, dataRadial, 'Computer_usage');
  addValue(data, dataRadial, 'Programming');
  addValue(data, dataRadial, 'Code_repository');
  addValue(data, dataRadial, 'Computer_Graphics_Programming');
  addValue(data, dataRadial, 'HCI_Programming');
  addValue(data, dataRadial, 'Experience_Evaluation');
  addValue(data, dataRadial, 'Communication');
  addValue(data, dataRadial, 'Collaboration');



  scale = d3.scaleLinear()
    .domain([0, d3.max(dataRadial, d => d.value) * 1.1])
    .range([0, (2 * PI)-(PI/2)] );

  ticks = scale.ticks(numTicks);
  keys = Object.keys(dataRadial);
  //number of arcs
  numArcs = keys.length;
  arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

  arc = d3.arc()
    .innerRadius((d, i) => getInnerRadius(i))
    .outerRadius((d, i) => getOuterRadius(i))
    .startAngle(0)
    .endAngle((d, i) => scale(d))

  radialAxis = svgRad.append('g')
    .attr('class', 'r axis')
    .selectAll('g')
      .data(dataRadial)
      .enter().append('g');

  // radialAxis.append('circle')
  //   .data(dataRadial)
  //   .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

  radialAxis.append('text')
    .data(dataRadial)
    .attr('x', labelPadding)
    .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
    .text(d => d.name);

  axialAxis = svgRad.append('g')
    .attr('class', 'a axis')
    .selectAll('g')
      .data(ticks)
      .enter().append('g')
        .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

  axialAxis.append('line')
    .attr('x2', chartRadius);

  axialAxis.append('text')
    .data(values)
    .attr('x', chartRadius + 10)
    .style('text-anchor', d => (scale(d.value) >= PI && scale(d.value) < 2 * PI ? 'end' : null))
    .text(d => d);

  //data arcs
  arcs = svgRad.append('g')
    .attr('class', 'data')
    .selectAll('path')
      .data(dataRadial)
      .enter().append('path')
      .attr('class', 'arc')
      .style('fill', function(d,i){
        let tag =  document.getElementById(d.name).getElementsByClassName("square");
        tag[0].style.backgroundColor  = color(i);
        return color(i);
      });


  arcs.transition()
    .delay((d, i) => i * 200)
    .duration(10)
    .attrTween('d', arcTween);

  arcs.on('mousemove', showTooltip);
  arcs.on('mouseout', hideTooltip);

}


function changeUserInfo (data){
  let dataRadial = [];
  addValue(data, dataRadial, 'Information_Visualization');
  addValue(data, dataRadial, 'Statistics');
  addValue(data, dataRadial, 'Mathematics');
  addValue(data, dataRadial, 'Drawing_and_Art');
  addValue(data, dataRadial, 'Computer_usage');
  addValue(data, dataRadial, 'Programming');
  addValue(data, dataRadial, 'Code_repository');
  addValue(data, dataRadial, 'Computer_Graphics_Programming');
  addValue(data, dataRadial, 'HCI_Programming');
  addValue(data, dataRadial, 'Experience_Evaluation');
  addValue(data, dataRadial, 'Communication');
  addValue(data, dataRadial, 'Collaboration');

  arcs.data(dataRadial)
    .transition()
      .delay((d, i) => i * 10)
      .duration(0)
      .attrTween('d', arcTween);

}

function arcTween(d, i) {
  let interpolate = d3.interpolate(0, d.value);
  return t => arc(interpolate(t), i);
}

function showTooltip(d) {
  tooltip.style('left', (d3.event.pageX + 10) + 'px')
    .style('top', (d3.event.pageY - 25) + 'px')
    .style('display', 'inline-block')
    .html(d.value);
}

function hideTooltip() {
  tooltip.style('display', 'none');
}

function rad2deg(angle) {
  return angle * 180 / PI;
}

function getInnerRadius(index) {
  return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
}

function getOuterRadius(index) {
  return getInnerRadius(index) + arcWidth;
}

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function addValue(arrO, arrN, key){
  let info = {};
  info['name']= key ;
  info['value']=arrO[key];
  arrN.push(info)
}

function rgbToHex(color) {
    color = ""+ color;
    if (!color || color.indexOf("rgb") < 0) {
        return;
    }

    if (color.charAt(0) == "#") {
        return color;
    }

    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
        r = parseInt(nums[2], 10).toString(16),
        g = parseInt(nums[3], 10).toString(16),
        b = parseInt(nums[4], 10).toString(16);

    return "#"+ (
        (r.length == 1 ? "0"+ r : r) +
        (g.length == 1 ? "0"+ g : g) +
        (b.length == 1 ? "0"+ b : b)
    );
}
