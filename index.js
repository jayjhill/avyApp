avyGridTop = [];
avyGridMid = [];
avyGridBottom = [];





let overallArray = [];
let url = 'https://mountainlabmaps.com/json/' + 'avyJson' + yyyymmdd() + '.json';
console.log(url);

async function getAvyData() {
  const response =  await fetch(url);
  const data = await response.json();
  return data;
}

getAvyData().then(data =>  { overallDanger = data.advisory.overall_danger_rose;
  console.log(overallDanger.length);
  for(var i in overallDanger)
  overallArray.push([i, overallDanger [i]]);
  console.log(overallArray);
});




// fetch(url)
//   .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
//   .then(data =>  { overallDanger = data.advisory.overall_danger_rose;
//     console.log(overallDanger);
//     for(var i in overallDanger)
//     overallArray.push([i, overallDanger [i]]);
  
//   });

// console.log(overallArray);


function yyyymmdd() {
var now = new Date();
var y = now.getFullYear();
var m = now.getMonth() + 1;
var d = now.getDate();
var mm = m < 10 ? '0' + m : m;
var dd = d < 10 ? '0' + d : d;
return '' + y + mm + dd;
}



// //arrays with x,y data specific to the rose png
// var topArray = [
// {x: 198, y: 132},
// {x: 219, y: 138},
// {x: 233, y: 157},
// {x: 225, y: 179},
// {x: 201, y: 187},
// {x: 177, y: 176},
// {x: 163, y: 156},
// {x: 178, y: 138},
// {x: 204, y: 104},
// {x: 254, y: 120},
// {x: 277, y: 163},
// {x: 252, y: 213},
// {x: 195, y: 229},
// {x: 149, y: 208},
// {x: 128, y: 165},
// {x: 149, y: 122},
// {x: 200, y: 69},
// {x: 290, y: 102},
// {x: 327, y: 175},
// {x: 286, y: 254},
// {x: 197, y: 284},
// {x: 112, y: 254},
// {x: 76, y: 175},
// {x: 115, y: 103}
// ];


function yyyymmdd() {
var now = new Date();
var y = now.getFullYear();
var m = now.getMonth() + 1;
var d = now.getDate();
var mm = m < 10 ? '0' + m : m;
var dd = d < 10 ? '0' + d : d;
return '' + y + mm + dd;
}



// var img = new Image();

// img.src = 'https://mountainlabmaps.com/images/avy' + yyyymmdd() + '.png';
// console.log(img.src);
// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');
// img.onload = function() {
// ctx.drawImage(img, 0, 0);
// img.style.display = 'none';
// topArray.forEach(pickArray);
// function pickArray(event) {
// var x = event.x;
// var y = event.y;

// var pixel = ctx.getImageData(x, y, 1, 1);
// var data = pixel.data;
// var r = data[0];
// var g = data[1];
// var b = data[2];

// //var rgb = {r, g, b};
// var rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
// avyGridTop.push(rgb);

// }
// }


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


});