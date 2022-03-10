avyGridTop = [];
avyGridMid = [];
avyGridBottom = [];

const dangerLow = "#00C346";
const dangerMod = "#FCFC00";
const dangerCons = "#FF9100";
const dangerHigh = "#CC332C";
const dangerEx = "#222222";
const problemBlue = "#0099ff";

const slider = document.getElementById('slider');
const sliderValue = document.getElementById('slider-value');

let overallArray = [];
let url = 'https://mountainlabmaps.com/json/' + 'avyJson' + yyyymmdd() + '.json';

async function getAvyData() {
  const response =  await fetch(url);
  const data = await response.json();
  console.log("data", data);
  return data;
}

getAvyData().then(data =>  { overallDanger = data.advisory.overall_danger_rose;
  overallArray = overallDanger.split(',');
  overallArray.forEach(matchColor);
  problem1Rose = data.advisory.danger_rose_1;
  problem2Rose = data.advisory.danger_rose_2;
  problem3Rose = data.advisory.danger_rose_3;
  problem1Array = problem1Rose.split(',');
  problem2Array = problem2Rose.split(',');
  problem3Array = problem3Rose.split(',');
  problem1Array.forEach(problem1RoseInterp);
  //check for warning
  if (data.advisory.avalanche_warning) {
    avyWarning = data.advisory.avalanche_warning;
    avyWarningClean = avyWarning.replace(/&nbsp;/g, ' ');
    avyWarningCleanNo = avyWarningClean.replace(/(\r\n|\n|\r)/gm, "");
    console.log("avy warning");
    document.getElementById("slideoutWarning").style.visibility = "visible";
    const warningDiv = document.createElement("div");
    const avyWarningContent = document.createTextNode(avyWarningCleanNo);
    warningDiv.appendChild(avyWarningContent);
    const currentDiv = document.getElementById("slideoutWarning_inner");
    currentDiv.insertAdjacentElement('beforeend', warningDiv);
  } else if (data.advisory.special_avalanche_bulletin) {
    avyWarning = data.advisory.avalanche_warning;
    avyWarningClean = avyWarning.replace(/&nbsp;/g, ' ');
    avyWarningCleanNo = avyWarningClean.replace(/(\r\n|\n|\r)/gm, "");
    console.log("avy warning");
    document.getElementById("slideoutWarning").style.visibility = "visible";
    const warningDiv = document.createElement("div");
    const avyWarningContent = document.createTextNode(avyWarningCleanNo);
    warningDiv.appendChild(avyWarningContent);
    const currentDiv = document.getElementById("slideoutWarning_inner");
    currentDiv.insertAdjacentElement('beforeend', warningDiv);
  }
  //full forecast
  avyReport = data.advisory.bottom_line;
  avyReportClean = avyReport.replace(/&nbsp;/g, ' ');
  avyReportCleanNo = avyReportClean.replace(/(\r\n|\n|\r)/gm, "");
  document.getElementById("report").innerText = avyReportCleanNo;
  //date issued
  dateIssued = data.advisory.date_issued;
  document.getElementById("forecastDate").innerText = dateIssued;
  //problem 1
  problemOne = data.advisory.avalanche_problem_1;
  console.log(problemOne)
  problemOneDesc = data.advisory.avalanche_problem_1_description;
  problemOneDescClean = problemOneDesc.replace(/&nbsp;/g, ' ');
  problemOneDescCleanNo = problemOneDescClean.replace(/(\r\n|\n|\r)/gm, "");
  document.getElementById("problem1").innerText = problemOne;
  document.getElementById("problem1Desc").innerText = problemOneDescCleanNo;
  //problem 2
  if (data.advisory.avalanche_problem_2) {
    console.log(data.advisory.avalanche_problem_2);
  problemTwo = data.advisory.avalanche_problem_2;
  problemTwoDesc = data.advisory.avalanche_problem_2_description;
  problemTwoDescClean = problemTwoDesc.replace(/&nbsp;/g, ' ');
  problemTwoDescCleanNo = problemTwoDescClean.replace(/(\r\n|\n|\r)/gm, "");
  document.getElementById("problem2").innerText = problemTwo;
  document.getElementById("problem2Desc").innerText = problemTwoDescCleanNo;
  document.getElementById("slideout2").style.visibility = "visible";
    const problem2Div = document.createElement("div");
    const problem2Content = document.createTextNode(problemTwoDescCleanNo);
    problem2Div.appendChild(problem2Content);
    const current2Div = document.getElementById("slideout2_inner");
    current2Div.insertAdjacentElement('beforeend', problem2Div);
  }
    //problem 3
  if (data.advisory.avalanche_problem_3) {
console.log(data.advisory.avalanche_problem_3)
    problemThree = data.advisory.avalanche_problem_3;
    problemThreeDesc = data.advisory.avalanche_problem_3_description;
    problemThreeDescClean = problemThreeDesc.replace(/&nbsp;/g, ' ');
    problemThreeDescCleanNo = problemThreeDescClean.replace(/(\r\n|\n|\r)/gm, "");
    document.getElementById("problem3").innerText = problemThree;
    document.getElementById("problem3Desc").innerText = problemThreeDescCleanNo;
    document.getElementById("slideout3").style.visibility = "visible";
    const problem3Div = document.createElement("div");
    const problem3Content = document.createTextNode(problemThreeDescCleanNo);
    problem3Div.appendChild(problem3Content);
    const current3Div = document.getElementById("slideout3_inner");
    current3Div.insertAdjacentElement('beforeend', problem3Div);
  }
});

function matchColor(v) {
  if (v == '2') {
    newVal = dangerLow;
    avyGridTop.push(newVal);
  } else if (v == '4') {
    newVal = dangerMod;
    avyGridTop.push(newVal);
  } else if (v == '6') {
    newVal = dangerCons;
    avyGridTop.push(newVal);
  } else if (v == '8') {
    newVal = dangerHigh;
    avyGridTop.push(newVal);
  } else if (v == '10') {
    newVal = dangerEx;
    avyGridTop.push(newVal);
  }
}

function problem1RoseInterp(v) {
  if (v == '16') {
    newVal = problemBlue;
    problem1Array.push(newVal);
  } 
}






function yyyymmdd() {
var now = new Date();
var y = now.getFullYear();
var m = now.getMonth() + 1;
var d = now.getDate();
var mm = m < 10 ? '0' + m : m;
var dd = d < 10 ? '0' + d : d;
return '' + y + mm + dd;
}



slider.addEventListener('input', (e) => {
  // Adjust the layers opacity. layer here is arbitrary - this could
  // be another layer name found in your style or a custom layer
  // added on the fly using `addSource`.
  map.setPaintProperty(
    'SLC_LessThan8000',
      'fill-opacity',
      parseInt(e.target.value, 10) / 100
  );
  map.setPaintProperty(
    'SLC_8000to9500',
      'fill-opacity',
      parseInt(e.target.value, 10) / 100
  );
  map.setPaintProperty(
    'SLC_GreaterThan9500',
      'fill-opacity',
      parseInt(e.target.value, 10) / 100
  );

  // Value indicator
  sliderValue.textContent = e.target.value + '%';
});


mapboxgl.accessToken = 'pk.eyJ1IjoiamNoaWxsIiwiYSI6ImNrbHh4aDc3MTBlbGgycG52Nmh4NWc1NW0ifQ.nq3E7MWpqV7XNmFEdmdVgQ';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y', // stylesheet location
center: [-111.651, 40.621], // starting position [lng, lat]
zoom: 12, // starting zoom
pitch: 50,
bearing: 0,
});

map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
})
)

map.on('load', function() {

map.addSource('mapbox-dem', {
'type': 'raster-dem',
'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
'tileSize': 512,
'maxzoom': 14
});
// add the DEM source as a terrain layer with exaggerated height
map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.2 });

//console.log(avyGridTop);

// add a sky layer that will show when the map is highly pitched
map.addLayer({
'id': 'sky',
'type': 'sky',
'paint': {
'sky-type': 'atmosphere',
'sky-atmosphere-sun': [0.0, 0.0],
'sky-atmosphere-sun-intensity': 15
}
});

var colorOne = 'rgb(255,0,0)';

map.addLayer({
id: 'SLC_LessThan8000',
type: 'fill',
source: {
type: 'vector',
url: 'mapbox://jchill.a3iffyuy'
},
'source-layer': 'SLC_LessThan8000',
'paint': {
'fill-color': [
'match',
['get', 'gridcode'],
'0',
avyGridTop[16],
'1',
avyGridTop[17],
'2',
avyGridTop[18],
'3',
avyGridTop[19],
'4',
avyGridTop[20],
'5',
avyGridTop[21],
'6',
avyGridTop[22],
'7',
avyGridTop[23],
/* other */ '#ffffff'
],
'fill-opacity': 1
}
});

map.addLayer({
id: 'SLC_8000to9500',
type: 'fill',
source: {
type: 'vector',
url: 'mapbox://jchill.15vi4pm2'
},
'source-layer': 'SLC_8000to9500',
'paint': {
'fill-color': [
'match',
['get', 'gridcode'],
'0',
avyGridTop[8],
'1',
avyGridTop[9],
'2',
avyGridTop[10],
'3',
avyGridTop[11],
'4',
avyGridTop[12],
'5',
avyGridTop[13],
'6',
avyGridTop[14],
'7',
avyGridTop[15],
/* other */ '#ffffff'
],
'fill-opacity': 1
}
});



map.addLayer({
id: 'SLC_GreaterThan9500',
type: 'fill',
source: {
type: 'vector',
url: 'mapbox://jchill.bvz2202i'
},
'source-layer': 'SLC_GreaterThan9500',
'paint': {
'fill-color': [
'match',
['get', 'gridcode'],
'0',
avyGridTop[0],
'1',
avyGridTop[1],
'2',
avyGridTop[2],
'3',
avyGridTop[3],
'4',
avyGridTop[4],
'5',
avyGridTop[5],
'6',
avyGridTop[6],
'7',
avyGridTop[7],
/* other */ '#ffffff'
],
'fill-opacity': 1
}
});




});