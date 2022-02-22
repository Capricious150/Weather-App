// OpenWeather API Key
var geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

var searchUrl = "https://api.openweathermap.org/data/2.5/onecall?"

var apiUrlAppend = "&appid=94690d5aa9031fa309833301cd16d30b"
var apiUrlAppend2 = ",us&appid=94690d5aa9031fa309833301cd16d30b"


var searchButtonEl = $(".searchBtn")
var stateSelectEl = $("#states")
var citySearchEl= $("form").children("input");




function geoFetch(event){

    event.preventDefault();
    console.log(citySearchEl.val());
    console.log(stateSelectEl.val());

    var citySearch = citySearchEl.val();
    var stateSelect = stateSelectEl.val();

    citySearch = citySearch.toLowerCase();
    stateSelect = stateSelect.toLowerCase();

    var geoFetch = geoCodeUrl+citySearch+","+stateSelect+apiUrlAppend2;
    console.log(geoFetch);

 $.get({
        url: geoFetch
    })
    .then(function (response){
        console.log(response);
        console.log(response[0].lon);
        console.log(response[0].lat);

        var coords = {
            lon: response[0].lon,
            lat: response[0].lat
        }
        
        console.log(coords);


        function weatherFetch(){

            var lat = "lat="+coords.lat;
            var lon = "&lon="+coords.lon;

            console.log (lat +" and "+ lon);

            var weatherFetch = searchUrl+lat+lon+apiUrlAppend;
            console.log(weatherFetch);

            $.get({
                url:weatherFetch
            })
            .then(function (response2){
                console.log(response2);
                console.log(response2.current.temp);
                console.log(response2.daily[0].temp.day);
            })

            
        }

        weatherFetch();

    })   

    // Function Ends Here, DO NOT LOSE
}
    


searchButtonEl.click(geoFetch);