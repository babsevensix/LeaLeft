var mymap = L.map('mapid').setView([41.88451216480288,12.463416520896356], 12);
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 18, attribution: osmAttrib});
mymap.addLayer(osm);

var marker = new L.Marker([41.88451216480288,12.463416520896356],{title : 'Centro di Roma'});
marker.bindPopup( '<p>Questo è il centro di Roma</p>' );
mymap.addLayer(marker);

var ne =[41.90911210198959, 12.462444305419922];
var sw =[41.897932883580054, 12.442960739135742];
var bounds = [ne, sw];
var rectangle = new L.Rectangle(bounds,{color:"#ff7800", weight:3,opacity:0.7,fillOpacity:0.5});
mymap.addLayer(rectangle);


setInterval(function(){
    var rectangleInTheMap =mymap.hasLayer(rectangle); 
    if (rectangleInTheMap){
        mymap.removeLayer(rectangle);
    }else{
        mymap.addLayer(rectangle);
    }
},1000);