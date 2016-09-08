var map = 0;
var arrayTeams = new Array("No team", "Yellow", "Blue", "Red");
var arrayMove = new Array("No move", "Walk", "Roller", "Bike");

var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

var id;
var markers = {};
function addMarker(user) {
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">' + user.nickname + '</h1>'+
      '<div id="bodyContent">'+
      '<p>Team: ' + arrayTeams[user.team] + '</p>'+
      '<p>Move: ' + arrayMove[user.move] + '</p>'+
      '</div>'+
      '</div>';
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: user.location,
        map: map,
        title: user.nickname,
        icon: 'https://www.pokemonconnect.co/media/img/t' + user.team + '.png'
    });
    
    id= marker.__gm_id;
    console.log(id);
    
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function showPosition(position) {
    /*Calculate teh distance checking if the user has movced*/
    var distance = getDistance(position.coords.latitude,position.coords.longitude,userObject.location.lat,userObject.location.lng);
    if (distance > '0.01'){
        userObject.location = {lat: position.coords.latitude, lng: position.coords.longitude};
        
        if (map == 0){
            var styles = [
                {
                    featureType: "poi",
                    stylers: [
                    {   visibility: "off" }
                    ]   
                }
            ];
            
            var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
            
            var mapOptions = {
                zoom: 18,
                center: new google.maps.LatLng(userObject.location.lat, userObject.location.lng),
                disableDefaultUI: true,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            };
            
            /*var mapOptions = {
                zoom: 18,
                center: new google.maps.LatLng(userObject.location.lat, userObject.location.lng),
                disableDefaultUI: true,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                }
            };*/
    
            $('#view_map').html('');
            map = new google.maps.Map(document.getElementById('view_map'), mapOptions);
            
            map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
    
        }
        
        //Show to us our position
        output(userObject);
        //Show to users our position
        ws.send(JSON.stringify(userObject));
    }
}

