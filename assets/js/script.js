var getWeatherData = function(city) {
    //format the open weather API url
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&exclude=hourly,minutely&appid=1f40db029d8aa5986ddf3ab9927c8d74";

    //make a request to the url
    fetch(weatherUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

getWeatherData("Los Angeles");


//get lat and long coordinates 

"https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&long=" + longitude + "&units=imperial&exclude=hourly,minutely&appid=1f40db029d8aa5986ddf3ab9927c8d74";