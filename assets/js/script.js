// OpenWeather API Key
var geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

var searchUrl = "https://api.openweathermap.org/data/2.5/onecall?"

var apiUrlAppend = "&units=imperial&appid=94690d5aa9031fa309833301cd16d30b"
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

                var mainEl = $("#mainCard");
                var mainUlEl = $("<ul>");
                var mainTempEl = $("<li class='temp'></li>");
                var mainHumidEl = $("<li class='humidity'></li>");
                var mainWindEl = $("<li class='wind'></li>");
                var mainUvEl = $("<li class='uvi'></li>");
                var headerEl = $("<h2>");

                mainEl.empty();
                mainEl.append(headerEl);
                mainEl.children("h2").text(response[0].name+", "+response[0].state).css("display", "block");

                mainEl.append(mainUlEl);

                $("ul").append(mainTempEl);
                $("ul").append(mainHumidEl);
                $("ul").append(mainWindEl);
                $("ul").append(mainUvEl);

                $(".temp").text("Temperature: " + response2.current.temp + "F");
                $(".humidity").text("Humidity: " + response2.current.humidity);
                $(".wind").text("Wind Speed: " + response2.current.wind_speed + "mph");
                $(".uvi").text("UV Index: " + response2.current.uvi);


                if (response2.current.uvi < 2){
                    $(".uvi").css("background-color", "green", "color", "white")
                } else if (response2.current.uvi > 5){
                    $(".uvi").css("background-color", "red", "color", "white")
                } else {$(".uvi").css("background-color", "yellow")}

                // Now we build the forecast cards

                var forecastEl = $("#forecastCards")
                forecastEl.empty();

                for (let i = 0; i < 5; i++) {
                    forecastEl.append($("<div class='forecastDiv'></div>"))                    
                }

                
                var forcastDivsEl = $(".forecastDiv");
                var pEl = $('<p>')
                
                for (let i = 0; i < 5; i++) {

                    var dateTime = eval(response2.daily[i].dt*1000);
                    var fixedDate = new Date(dateTime);
                    var fixedDateDay = (fixedDate.getMonth()+1)+"/"+(fixedDate.getDate()+1);
                    console.log(fixedDateDay);
                    
                    forcastDivsEl.eq(i).append("<p>"+fixedDateDay+"</p>")
                    .append("<p>Temp: "+response2.daily[i].temp.day+"</p>")
                    .append("<p>Wind: "+response2.daily[i].wind_speed+"mph</p>")
                    .append("<p>Humidity: "+response2.daily[i].humidity+"</p>")

                }
    






            })

            
        }

        weatherFetch();

    })   

    // Function Ends Here, DO NOT LOSE
}
    


searchButtonEl.click(geoFetch);