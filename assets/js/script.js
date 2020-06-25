

var APIkey = "1f40db029d8aa5986ddf3ab9927c8d74";

var getWeatherData = function(city) {
    //current conditions in user-entered city --  weather API url
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&exclude=hourly,minutely&appid=" + APIkey;

    //make a request to the url
    fetch(weatherUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        
        var cityID = data.id;
        console.log(cityID)
        var latitude = data.coord.lat;
        var currentTemp = data.main.temp;
        

        //end fetch function for original call    
        });

        
    });
};

getWeatherData("Los Angeles");



//get lat and long coordinates 
//getCityData fetch -- IMPORTANT DATAPOINTS : coord.lat, coord.long , weather.icon , main.temp

//"https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&long=" + longitude + "&units=imperial&exclude=hourly,minutely&appid=1f40db029d8aa5986ddf3ab9927c8d74";