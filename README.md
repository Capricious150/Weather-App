# Weather-App

## View page at: https://capricious150.github.io/Weather-App/

## To Use:
Load the page referenced in the header above in a browser.

Enter a US City into the search box, and choose a state from the dropdown before submitting. 
The page will be populated with some data from today's weather, and a five day forecast. 

## Known Issues:
Right now, there is not a feature built in to alert users to 400-type responses, so nonsense cities will just
fail silently.

The final product calls for two features which weren't included in this iteration due to time constraints:
Missing features are:
    1. Icons for current weather code
    2. History buttons


![Preview Image](/assets/images/Preview.png)

### Design and Philosophy:
This project was a learning experience. 

It was powered by the OpenWeather api, GeoLocater api and jQuery. The page is a mix of elements coded into HTML and CSS and dynamically added through Javascript. 

Normally I prefer to segment my code into modular functions, but I struggled with issues around scope and locality in this one, and as such ended up nesting functions within functions within functions. If I were to rewrite it, I would build it from the ground up such that functions are returning values that can be used in other functions. However, in this case I ran out of time, and my code wasn't designed with that in mind from the beginning.

This project expanded my understanding ajax get method, use of 3rd party APIs, scope, jQuery (particularly when interacting with arrays), and objects. 