avyGridTop = [];
avyGridMid = [];
avyGridBottom = [];

const dangerLow = "#00C346";
const dangerMod = "#FCFC00";
const dangerCons = "#FF9100";
const dangerHigh = "#CC332C";
const dangerEx = "#222222";

const slider = document.getElementById('slider');
const sliderValue = document.getElementById('slider-value');

let overallArray = [];
let url = 'https://mountainlabmaps.com/json/' + 'avyJson' + yyyymmdd() + '.json';

async function getAvyData() {
  const response =  await fetch(url);
  const data = await response.json();
  return data;
}

getAvyData().then(data =>  { overallDanger = data.advisory.overall_danger_rose;
  overallArray = overallDanger.split(',');
  overallArray.forEach(matchColor);
  avyReport = data.advisory.bottom_line;
  console.log(avyReport);
  avyReportClean = avyReport.replace(/&nbsp;/g, ' ');
  console.log(avyReportClean);
  avyReportCleanNo = avyReportClean.replace(/(\r\n|\n|\r)/gm, "");
  document.getElementById("avyReport").innerText = avyReportCleanNo;
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

  // Value indicator
  sliderValue.textContent = e.target.value + '%';
});


mapboxgl.accessToken = 'pk.eyJ1IjoiamNoaWxsIiwiYSI6ImNrZGl0cGlpbzA4ZmEzMm8wZHdkYmJiNDMifQ.C941o-cDXISu58gsmm8sIw';
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
map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1 });

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
'fill-opacity': 0.7
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
'fill-opacity': 0.7
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
'fill-opacity': 0.7
}
});

const button = document.querySelector('.toggle');
const pane = document.querySelector('.pane');

button.addEventListener('click', () => {
  pane.classList.toggle('open');
});


});