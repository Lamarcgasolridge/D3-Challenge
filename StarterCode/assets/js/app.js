// Set up the chart
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create svg wrapper
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv("assets/data/data.csv").then(function(CensusData) {
    CensusData.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
    });
  
    // Create the scales for the chart 
    const xScale = d3.scaleLinear()
      .domain(d3.extent(CensusData, d => d.age))
      .range([0, width])
  
    const yScale = d3.scaleLinear()
      .domain([6,d3.max(CensusData, d => d.smokes)])
      .range([height, 0])
    
    // Set up the axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
  
  
  // Append to chartGroup
    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
    chartGroup.append("g").call(yAxis);
