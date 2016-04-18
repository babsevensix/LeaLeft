var posizioni = [ 
    L.latLng(41.88451216480288,12.463416520896356), //Roma
    L.latLng(45.43423778818443,12.338805198669434), //Venezia
    L.latLng(45.464088787666256,9.19182300567627), //Milano
    L.latLng(40.83576203938251,14.248580932617188), //Napoli
    L.latLng(37.50244037178123,15.088090896606445), //Catania
];
var romaContorno = [
    L.latLng(41.96765920367816, 12.3980712890625),
    L.latLng(41.9921602333763,12.503814697265623),
    L.latLng(41.95949009892465,12.581405639648438),
    L.latLng(41.916585116228354,12.615737915039062),
    L.latLng(41.81175536180908,12.571792602539062),
    L.latLng(41.79742381156324,12.481155395507812),
    L.latLng(41.81840820614331,12.396011352539062),
    L.latLng(41.864447405239375,12.37335205078125),
    L.latLng( 41.953873231845826,12.38433837890625),
    L.latLng( 41.96765920367816,12.3980712890625)
];

var mymap = L.map('mapid').setView([41.88451216480288,12.463416520896356], 12);
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 18, attribution: osmAttrib});
mymap.addLayer(osm);
//addMarker();
addCircle();
addPolyline();
//spostamento();
setTimeout(addPolygon, 3000);


function addPolyline(){
    var polyline = L.polyline(posizioni, {color: 'red'}).addTo(mymap);
    mymap.fitBounds(polyline.getBounds());
}


function addPolygon(){
    L.polygon(romaContorno,{color:'orange'}).addTo(mymap);
    setTimeout(function(){
        mymap.fitBounds(romaContorno);
    }, 3000);
}

function spostamento(){
    var posIndex = 0;
    setInterval(function(){
        mymap.panTo(posizioni[posIndex],{animate : true, duration:3});
        posIndex++;
        if (posIndex >= posizioni.length){
            posIndex = 0;
        }
    }, 5000);       
}

function addCircle(){
    var posizione = new L.LatLng(41.88451216480288,12.463416520896356);
    var circle = new L.Circle(posizione,1000)
    mymap.addLayer(circle);
}

function addMarker(){
    var marker = new L.Marker([41.88451216480288,12.463416520896356],{title : 'Centro di Roma'});
    marker.bindPopup( '<p>Questo è il centro di Roma</p>' );
    mymap.addLayer(marker);
}

function addRectangle(){
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
}