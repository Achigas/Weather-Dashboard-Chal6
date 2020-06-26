var cityInputEl = document.getElementById("city-input");
var cityFormEl = document.getElementById("city-form");
var searchEl = document.getElementById("search-button");
var searchHistoryEl = document.getElementById("search-history")
var currentContainerEl = document.getElementById("current-container")
var forecastContainerEl = document.getElementById("forecast-container")

var APIkey = "1f40db029d8aa5986ddf3ab9927c8d74";

var displayCurrentData = function(city, data) {

    //Endpoints to dislay current data 
    var tempCurrent = Math.round(data.current.temp);
    var humidity = Math.round(data.current.humidity);
    var windSpeed = data.current.wind_speed;
    var uvIndex = data.current.uvi;
    var iconCurrent = data.current.weather[0].icon;

    //create HTML for city/date/icon
    currentContainerEl.textContent = ""
    var divCityHeader = document.createElement("div")
    var headerCityDate = document.createElement("h2");
    var currentdate = moment().format("L");
    var imageIcon = document.createElement("img");
    imageIcon.setAttribute('src', "") 
    imageIcon.setAttribute('src', "https://openweathermap.org/img/wn/" + iconCurrent + "@2x.png")
    headerCityDate.textContent = city + "   (" + currentdate + ")";

    //Append to container for current data
    divCityHeader.appendChild(headerCityDate)
    divCityHeader.appendChild(imageIcon)
    currentContainerEl.appendChild(divCityHeader)

    //create element to display weather data
    var divCurrent = document.createElement("div")
    var tempEl = document.createElement("p");
    var humidityEl = document.createElement("p");
    var windSpeedEl = document.createElement("p");
    var UVIndexEl = document.createElement ("p");

    //add current weather data to page
    tempEl.textContent = "Temperature: " + tempCurrent;
    humidityEl.textContent = "Humidity: " + humidity;
    windSpeedEl.textContent = "Wind Speed: " + windSpeed;
    UVIndexEl.textContent = "UV Index: " + uvIndex;

    //append elements to section
    divCurrent.appendChild(tempEl);
    divCurrent.appendChild(humidityEl);
    divCurrent.appendChild(windSpeedEl);
    divCurrent.appendChild(UVIndexEl);

    currentContainerEl.appendChild(divCurrent);
    
}

var displayForecastData = function(data) {
    console.log(data)

    for (var i=1; i < 6; i++) {
        var tempForecast = Math.round(data.daily[i].temp.day);
        var humidityForecast = data.daily[i].humidity;
        var iconForecast = data.daily[i].weather[0].icon;

    var cardEl = document.createElement("div");
    cardEl.setAttribute("class","card");

    var cardBodyEl = document.createElement("div");
    cardBodyEl.setAttribute("class","card-body");

    var cardDateEl = document.createElement("h6");
    cardDateEl.textContent = "current date";

    var cardIconEl = document.createElement("img");
    cardIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + iconForecast + "@2x.png")

    var cardTempEl = document.createElement("p");
    cardTempEl.setAttribute("class", "card-text");
    cardTempEl.textContent = "Temperature:" + tempForecast + "°F";

    var cardHumidEl = document.createElement("p")
    cardHumidEl.setAttribute("class", "card-text");
    cardHumidEl.textContent = "Humidity: " + humidityForecast + "%";

    cardBodyEl.appendChild(cardDateEl)
    cardBodyEl.appendChild(cardIconEl)
    cardBodyEl.appendChild(cardTempEl)
    cardBodyEl.appendChild(cardHumidEl)
    
    cardEl.appendChild(cardBodyEl);
    forecastContainerEl.appendChild(cardEl);

    }
}


var getCityData = function() {
    event.preventDefault();
    var city = cityInputEl.value.trim()

    //build out user input validation

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

    getWeatherData(cityName,latitude,longitude);
        });
    });
};

var getWeatherData = function(city,latitude,longitude) { 
    ///5-day forecast API
    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&exclude=minutely,hourly&appid=" + APIkey;
        
    fetch(forecastUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        displayCurrentData(city, data);
        displayForecastData(data);

 
        //end response/then function 
        });

    //end fetch/then function  
    });
};

cityFormEl.addEventListener("submit", getCityData);


//get lat and long coordinates 
//getCityData fetch -- IMPORTANT DATAPOINTS : coord.lat, coord.long , weather.icon , main.temp

//"https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&long=" + longitude + "&units=imperial&exclude=hourly,minutely&appid=1f40db029d8aa5986ddf3ab9927c8d74";