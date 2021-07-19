// Set up the chart
var svgWidth = 860;
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
      .domain(d3.extent(CensusData, d => d.obesity))
      .range([0, width])
  
    const yScale = d3.scaleLinear()
      .domain([1,26])
      .range([height, 0])
    
    // Set up the axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
  
  
  // Append to chartGroup
    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
    chartGroup.append("g").call(yAxis);

  // Add circles    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(CensusData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.obesity))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "14")
    .attr("fill", "green")
    .attr("opacity", ".8");  

  // Add state names
    chartGroup.append("g")
    .selectAll('text')
    .data(CensusData)
    .enter()
    .append("text")
    .text(d=>d.abbr)
    .attr("x",d=>xScale(d.obesity))
    .attr("y",d=>yScale(d.healthcare))
    .classed(".stateText", true)
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
    .attr("fill", "white");



  })

