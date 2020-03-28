// Create function get get the bar chart and bubble chart
function plotInfo(idInput){
// function plots(id){
  // Use d3 t read Json file
  d3.json("samples.json").then((data)=>{
    // var name=data.names;
    // var meta=data.metadata;
    var sample=data.samples
    var selectSample=sample.filter(s => s.id.toString() === idInput)[0];
    console.log(data);
    // console.log(name);
    // console.log(meta);
    console.log(sample);
    console.log(selectSample);
  //  Use the first data set in samples to create bar chart
  //  Pick top 10 hightest sample values and create x axis and y axis
    var otu_id=selectSample.otu_ids;
    var value=selectSample.sample_values.slice(0,10).reverse();
    var otu_label=selectSample.otu_labels.slice(0,10);
    
    console.log(otu_id);
    console.log(value);
    console.log(otu_label);

    var otu_y=otu_id.map(d => "OTU " + d);
    console.log(otu_y);

    var barTrace = {
      x: value,
      y: otu_y,
      text: otu_label,
      marker: {
        color: 'royalblue'},
        type:"bar",
        orientation: "h",
    };

    var barData=[barTrace];
    var barLayout={
      title: "Top 10 OTU",
      font:{
        family: 'Raleway, sans-serif'
      },
      showlegend: false,
      xaxis: {
        tickangle: 0
      },
      yaxis: {
        zeroline: false,
        gridwidth: 2
      },
      bargap :0.05
    };

    Plotly.newPlot("bar",barData,barLayout);

    // Create bubble chart
    var bubbleTrace={
      x: otu_id,
      y: selectSample.sample_values,
      text: selectSample.otu_labels,
      mode: "markers",
      marker: {
        size: selectSample.sample_values,
        color: otu_id,
        }
    };
    var bubbleData=[bubbleTrace];
    var bubbleLayout={
      xaxis:{title: "OTU ID"},
      showlegend: false,
      height: 600,
      width: 1000
    };

  Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  });
};

// Create a function to update demographic data
function demoInfo(idInput){
  
  // Display sample metadata
  // Use d3 select the panel section in html
  // Use object.entries to console.log report values
  d3.json("samples.json").then((data)=>{
    var meta=data.metadata;
    var selectData=meta.filter(m=>m.id===parseInt(idInput))[0];
    console.log (selectData);
  
    demoKeys=d3.keys(selectData);
    demoValues=d3.values(selectData);
    console.log(demoKeys);
    console.log(demoValues);

    // Clear the data when refresh the ID
    d3.select("ul").remove();

    // Set var to connect class in html 
    // Create ul and li in pannel to put the data in
    d3.select("#sample-metadata").append("ul");
    var ul=d3.select("#sample-metadata ul");
    
    Object.entries(selectData).forEach(([key, value]) => {
      ul.append('li').text(`${key}: ${value}`);
    });
  });
  };

  // Bonus 
  function gauge(idInput){
    d3.json("samples.json").then((data)=>{
      var meta=data.metadata;
      var selectData=meta.filter(m=>m.id===parseInt(idInput))[0];
      console.log (selectData);
      var metaWfreq=selectData.wfreq;
      console.log(metaWfreq);

      var wfreqdata = [
        {
          type: "indicator",
          mode: "gauge+number",
          value: metaWfreq,
          title: { text: "Belly Button Wash Frenquency (Scrubs per Week)", font: { size: 18} },
          gauge: {
            axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 1], color: "powderblue" },
              { range: [1, 2], color: "lightblue" },
              { range: [2, 3], color: "lightskyblue"},
              { range: [3, 4], color: "skyblue" },
              { range: [4, 5], color: "deepskyblue" },
              { range: [5, 6], color: "lightsteelblue" },
              { range: [6, 7], color: "dodgerblue" },
              { range: [7, 8], color: "cornflowerblue" },
              { range: [8, 9], color: "	steelblue" }
            ],
          }
        }
      ];
      
      var layout = {
        width: 500,
        height: 400,
        margin: { t: 15, r: 15, l: 15, b: 15 },
        paper_bgcolor: "lavender",
        font: { color: "darkblue", family: "Arial" }
      };
      
      Plotly.newPlot('gauge',wfreqdata, layout);
    });
  };
  // set up the function for id change
  function optionChanged(idInput){
    plotInfo(idInput);
    demoInfo(idInput);
    gauge(idInput);
  };

  function init(){
    var dropdown=d3.select("#selDataset");
    // read the json data 
    d3.json("samples.json").then((data)=> {
      console.log(data);
      // get the id from dataset for the dropdown menu
      data.names.forEach(function(name){
        dropdown.append("option").text(name).property("value");
      });
    // call function to display graphics and info 
    plotInfo(data.names[0]);
    demoInfo(data.names[0]);
    gauge(data.names[0]);
    });
  };

  init();