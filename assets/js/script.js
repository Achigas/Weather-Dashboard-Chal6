var cityInputEl = document.getElementById("city-input");
var cityFormEl = document.getElementById("city-form");
var searchEl = document.getElementById("search-button");
var currentContainerEl = document.getElementById("current-container")
var forecastContainerEl = document.getElementById("forecast-container")

var APIkey = "1f40db029d8aa5986ddf3ab9927c8d74";

var displayCityData = function(city) {
    var headerCityDate = document.createElement("h2");
    var currentdate = moment().format("L");
    headerCityDate.textContent = city + "   (" + currentdate + ")";

    currentContainerEl.appendChild(headerCityDate)
    
}


var getCityData = function() {
    event.preventDefault();
    var city = cityInputEl.value.trim()

    //current conditions in user-entered city//using it to get long and latitude for One call weather API url
    var cityInfoUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;

    //make a request to the url
    fetch(cityInfoUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        //variables set for data needed from this pull 
        var cityID = data.id;
        var cityName = data.name;
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;

    displayCityData(cityName)
    getWeatherData(latitude,longitude);
        });
    });
};

var getWeatherData = function(latitude,longitude) { 
    ///5-day forecast API
    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=minutely,hourly&appid=" + APIkey;
        
    fetch(forecastUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        
        //Endpoints to dislay current data 
        var tempCurrent = Math.floor(data.current.temp);
        var humidity = data.current.humidity;
        var windSpeed = data.current.wind_speed;
        var uvIndex = data.current.uvi;
        var iconCurrent = data.current.weather.icon;

        console.log(tempCurrent, humidity, windSpeed, uvIndex, iconCurrent)

    for (var i=0; i < 5; i++)
        var tempForecast = data.daily[i].temp;
        var humidityForecast = data.daily[i].humidity;
        var iconForecast = data.daily[i].weather.icon;

        console.log(tempForecast, humidityForecast, iconForecast)

        //endpoints to display 5 dat forecast cards
 
        //end response/then function 
        });

    //end fetch/then function   
    });
};

cityFormEl.addEventListener("submit", getCityData);


//get lat and long coordinates 
//getCityData fetch -- IMPORTANT DATAPOINTS : coord.lat, coord.long , weather.icon , main.temp

//"https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&long=" + longitude + "&units=imperial&exclude=hourly,minutely&appid=1f40db029d8aa5986ddf3ab9927c8d74";