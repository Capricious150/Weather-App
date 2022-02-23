// To get a forecast, we need to use the GeoLocater API in OpenWeather.
// I've set up several variables, which will allow us to quickly format the URLs needed for the fetch from that API
// and later the fetch from their forecast API

var geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var searchUrl = "https://api.openweathermap.org/data/2.5/onecall?"
var apiUrlAppend = "&units=imperial&appid=94690d5aa9031fa309833301cd16d30b"
var apiUrlAppend2 = ",us&appid=94690d5aa9031fa309833301cd16d30b"

// My global variables are extremely limited due to some issues with scope in my functions below. 
var searchButtonEl = $(".searchBtn")
var stateSelectEl = $("#states")
var citySearchEl= $("form").children("input");




function geoFetch(event){
    
    event.preventDefault();
    console.log(citySearchEl.val());
    console.log(stateSelectEl.val());
    
    // Declare a couple more variables and format them. The code breaks if the following two variables are global. I suspect they're
    // being cleared before the "Prevent Default" can happen.

    var citySearch = citySearchEl.val();
    var stateSelect = stateSelectEl.val();

    citySearch = citySearch.toLowerCase();
    stateSelect = stateSelect.toLowerCase();

    var geoFetch = geoCodeUrl+citySearch+","+stateSelect+apiUrlAppend2;
    console.log(geoFetch);

    // This is the beginning of my fetch. Because of some issues with scope, and some difficulties I had returning their outputs, I 
    // ultimately nest several functions within one-another. First, we have the smaller, simpler fetch to get my longitude and latitude

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


        // This function does the bulk of the work on my page. I left a number of console.logs in tact better show my process

        function weatherFetch(){

            var lat = "lat="+coords.lat;
            var lon = "&lon="+coords.lon;

            console.log (lat +" and "+ lon);

            var weatherFetch = searchUrl+lat+lon+apiUrlAppend;
            console.log(weatherFetch);

            // Here is another nested function. It's where we actually get our weather data

            $.get({
                url:weatherFetch
            })
            .then(function (response2){
                console.log(response2);
                console.log(response2.current.temp);
                console.log(response2.daily[0].temp.day);

                // Towards the end of coding this, I realized I forgot to include the current date. I cannibalized the date-formatting
                // code I use further below (around line 140), slapped some 2's onto the variables to keep it sanitized, and used it again
                var dateTime2 = eval(response2.current.dt*1000);
                var fixedDate2 = new Date(dateTime2);
                var fixedDateDay2 = (fixedDate2.getMonth()+1)+"/"+(fixedDate2.getDate());

                // We will be using the results of this fetch to build the page. The next 7 lines set up some variables for dynamic HTML

                var mainEl = $("#mainCard");
                var mainUlEl = $("<ul>");
                var mainTempEl = $("<li class='temp'></li>");
                var mainHumidEl = $("<li class='humidity'></li>");
                var mainWindEl = $("<li class='wind'></li>");
                var mainUvEl = $("<li class='uvi'></li>");
                var headerEl = $("<h2>");

                // Empty the div, so folks can search again
                mainEl.empty();

                // Append a header element which will contain the date, city & state. There is a non-zero chance that the response is an array,
                // so we include an index position to avoid the code breaking.
                mainEl.append(headerEl);
                mainEl.children("h2").text(response[0].name+", "+response[0].state+", "+fixedDateDay2).css("display", "block");

                // Populate the div with the temperature, humidity, wind speed, and UV index. Use list elements to give them bullets
                mainEl.append(mainUlEl);

                $("ul").append(mainTempEl);
                $("ul").append(mainHumidEl);
                $("ul").append(mainWindEl);
                $("ul").append(mainUvEl);

                $(".temp").text("Temperature: " + response2.current.temp + "F");
                $(".humidity").text("Humidity: " + response2.current.humidity);
                $(".wind").text("Wind Speed: " + response2.current.wind_speed + "mph");
                $(".uvi").text("UV Index: " + response2.current.uvi);

                // Some very basic conditional formatting to whether the UV index is mild, moderate, or greater-than moderate
                if (response2.current.uvi < 2){
                    $(".uvi").css("background-color", "green", "color", "white")
                } else if (response2.current.uvi > 5){
                    $(".uvi").css("background-color", "red", "color", "white")
                } else {$(".uvi").css("background-color", "yellow")}

                // Now we build the forecast cards
                // Start by declaring another variable and emptying the div, as above

                var forecastEl = $("#forecastCards")
                forecastEl.empty();

                // Fast loop to make 5 divs
                for (let i = 0; i < 5; i++) {
                    forecastEl.append($("<div class='forecastDiv'></div>"))                    
                }

                // Give the newly created divs a variable. This one will be an array of 5.
                var forcastDivsEl = $(".forecastDiv");
                
                // Another loop. This one populates the forecast cards. Uses the new Date, getMonth and getDate methods to build a 
                // human-legible date.
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

        // Invoke the weatherFetch function inside the geoFetch function. 
        weatherFetch();

    })   

    // Function Ends Here, DO NOT LOSE
}
    

// Set up an event listener for the search button
searchButtonEl.click(geoFetch);