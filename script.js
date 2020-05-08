var loadCities = []

init();

// function to render saved cities
function renderCities() {
    for (var i = 0; i < loadCities.length; i++) {
    var newBtn = $("<button>");
    var br = $("<br>");
    newBtn.addClass("btn btn-light city");
    newBtn.attr("data-name", loadCities[i]);
    newBtn.text(loadCities[i]);
    $("#newCities").append(newBtn);
    $("#newCities").append(br);
  }
}

// function to run and page load
function init() {
  var storedCities = JSON.parse(localStorage.getItem("loadCities"));

  if (storedCities !== null) {
    loadCities = storedCities;
  }
  renderCities();
}

// function to save cities in local storage
function storeCities() {
  localStorage.setItem("loadCities", loadCities);
}

// on click event for search
$(".searchBtn").on("click", function() {

    var cityName = $(".cityNameInput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=de86690dd9d7e0f7bd2fcb9973ca0788"

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
            console.log(response);

        var date = new Date(JSON.stringify(response.dt)*1000);
        $("#date").text(date);

        $("#name").text(response.name);
        console.log(response.name);

        var temperature = Math.floor(((JSON.parse(response.main.temp) - 273.15) * 1.80 + 32));

        $("#temp").text("Temperature: " + temperature + "F");
        console.log(temperature);

        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        console.log(response.main.humidity);

        $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
        console.log(response.wind.speed);

        var newBtn = $("<button>");
        var br = $("<br>");
        newBtn.addClass("btn btn-light city");
        newBtn.attr("data-name", response.name);
        newBtn.text(response.name);
        $("#newCities").append(newBtn);
        $("#newCities").append(br);

        var addedCityName = $(newBtn).attr("data-name");
        loadCities.push(addedCityName);
        localStorage.setItem("loadCities", JSON.stringify(loadCities));

      // second ajax call
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var secondQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=de86690dd9d7e0f7bd2fcb9973ca0788";

      $.ajax({
        url: secondQuery,
        method: "GET"
      })
        .then(function(response) {
            console.log(response);

            $("#icon").empty();
            var weatherIcon = $("<img>");
            var iconCode = response.current.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png"
            weatherIcon.attr("src", iconURL);
            $("#icon").append(weatherIcon);

            if (response.current.uvi < 3) {
            $("#uvIndex").empty();
            var UVI = $("<span>");
            UVI.text("UV Index: " + response.current.uvi);
            UVI.addClass("low");
            $("#uvIndex").append(UVI);
            } else if (response.current.uvi > 7) {
              $("#uvIndex").empty();
              var UVI = $("<span>");
              UVI.text("UV Index: " + response.current.uvi);
              UVI.addClass("high");
              $("#uvIndex").append(UVI);
            } else {
              $("#uvIndex").empty();
              var UVI = $("<span>");
              UVI.text("UV Index: " + response.current.uvi);
              UVI.addClass("moderate");
              $("#uvIndex").append(UVI);
            }
            console.log(response.current.uvi);

            var date0 = new Date(JSON.stringify(response.daily[0].dt)*1000);
            $("#day0").html(`<b>${(date0.getMonth() +1)}/${date0.getDate()}/${date0.getFullYear()}</b> <br> ${response.daily[0].weather[0].description}`);
            console.log(date0);
            var day0Icon = $("<img>");
            var day0Code = response.daily[0].weather[0].icon;
            var day0URL = "http://openweathermap.org/img/w/" + day0Code + ".png"
            day0Icon.attr("src", day0URL);
            $("#day0").append(day0Icon);

            var date1 = new Date(JSON.stringify(response.daily[1].dt)*1000);
            $("#day1").html(`<b>${(date1.getMonth() +1)}/${date1.getDate()}/${date1.getFullYear()}</b> <br> ${response.daily[1].weather[0].description}`);
            var day1Icon = $("<img>");
            var day1Code = response.daily[1].weather[0].icon;
            var day1URL = "http://openweathermap.org/img/w/" + day1Code + ".png"
            day1Icon.attr("src", day1URL);
            $("#day1").append(day1Icon);

            var date2 = new Date(JSON.stringify(response.daily[2].dt)*1000);
            $("#day2").html(`<b>${(date2.getMonth() +1)}/${date2.getDate()}/${date2.getFullYear()}</b> <br> ${response.daily[2].weather[0].description}`);
            var day2Icon = $("<img>");
            var day2Code = response.daily[2].weather[0].icon;
            var day2URL = "http://openweathermap.org/img/w/" + day2Code + ".png"
            day2Icon.attr("src", day2URL);
            $("#day2").append(day2Icon);

            var date3 = new Date(JSON.stringify(response.daily[3].dt)*1000);
            $("#day3").html(`<b>${(date3.getMonth() +1)}/${date3.getDate()}/${date3.getFullYear()}</b> <br> ${response.daily[3].weather[0].description}`);
            var day3Icon = $("<img>");
            var day3Code = response.daily[3].weather[0].icon;
            var day3URL = "http://openweathermap.org/img/w/" + day3Code + ".png"
            day3Icon.attr("src", day3URL);
            $("#day3").append(day3Icon);

            var date4 = new Date(JSON.stringify(response.daily[4].dt)*1000);
            $("#day4").html(`<b>${(date4.getMonth() +1)}/${date4.getDate()}/${date4.getFullYear()}</b> <br> ${response.daily[4].weather[0].description}`);
            var day4Icon = $("<img>");
            var day4Code = response.daily[4].weather[0].icon;
            var day4URL = "http://openweathermap.org/img/w/" + day4Code + ".png"
            day4Icon.attr("src", day4URL);
            $("#day4").append(day4Icon);
          });
          // on click event for previously saved cities
          $(".city").on("click", function() {
          
            var cityName = $(this).attr("data-name");
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=de86690dd9d7e0f7bd2fcb9973ca0788";
          
            $.ajax({
                url: queryURL,
                method: "GET"
              })
                .then(function(response) {

                  var date = new Date(JSON.stringify(response.dt)*1000);
                  $("#date").text(date);
          
                $("#name").text(response.name);
          
                var temperature = Math.floor(((JSON.parse(response.main.temp) - 273.15) * 1.80 + 32));
          
                $("#temp").text("Temperature: " + temperature + " F");
          
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
          
                $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
          
                // second ajax call
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                var secondQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=de86690dd9d7e0f7bd2fcb9973ca0788";

                $.ajax({
                  url: secondQuery,
                  method: "GET"
                })
                  .then(function(response) {
                      console.log(response);
              
                      $("#icon").empty();
                      var weatherIcon = $("<img>");
                      var iconCode = response.current.weather[0].icon;
                      var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png"
                      weatherIcon.attr("src", iconURL);
                      $("#icon").append(weatherIcon);
              
                      if (response.current.uvi < 3) {
                        $("#uvIndex").empty();
                        var UVI = $("<span>");
                        UVI.text("UV Index: " + response.current.uvi);
                        UVI.addClass("low");
                        $("#uvIndex").append(UVI);
                        } else if (response.current.uvi > 7) {
                          $("#uvIndex").empty();
                          var UVI = $("<span>");
                          UVI.text("UV Index: " + response.current.uvi);
                          UVI.addClass("high");
                          $("#uvIndex").append(UVI);
                        } else {
                          $("#uvIndex").empty();
                          var UVI = $("<span>");
                          UVI.text("UV Index: " + response.current.uvi);
                          UVI.addClass("moderate");
                          $("#uvIndex").append(UVI);
                        }
                      console.log(response.current.uvi);
              
                      var date0 = new Date(JSON.stringify(response.daily[0].dt)*1000);
                      $("#day0").html(`<b>${(date0.getMonth() +1)}/${date0.getDate()}/${date0.getFullYear()}</b> <br> ${response.daily[0].weather[0].description}`);
                      console.log(date0);
                      var day0Icon = $("<img>");
                      var day0Code = response.daily[0].weather[0].icon;
                      var day0URL = "http://openweathermap.org/img/w/" + day0Code + ".png"
                      day0Icon.attr("src", day0URL);
                      $("#day0").append(day0Icon);
              
                      var date1 = new Date(JSON.stringify(response.daily[1].dt)*1000);
                      $("#day1").html(`<b>${(date1.getMonth() +1)}/${date1.getDate()}/${date1.getFullYear()}</b> <br> ${response.daily[1].weather[0].description}`);
                      var day1Icon = $("<img>");
                      var day1Code = response.daily[1].weather[0].icon;
                      var day1URL = "http://openweathermap.org/img/w/" + day1Code + ".png"
                      day1Icon.attr("src", day1URL);
                      $("#day1").append(day1Icon);
              
                      var date2 = new Date(JSON.stringify(response.daily[2].dt)*1000);
                      $("#day2").html(`<b>${(date2.getMonth() +1)}/${date2.getDate()}/${date2.getFullYear()}</b> <br> ${response.daily[2].weather[0].description}`);
                      var day2Icon = $("<img>");
                      var day2Code = response.daily[2].weather[0].icon;
                      var day2URL = "http://openweathermap.org/img/w/" + day2Code + ".png"
                      day2Icon.attr("src", day2URL);
                      $("#day2").append(day2Icon);
              
                      var date3 = new Date(JSON.stringify(response.daily[3].dt)*1000);
                      $("#day3").html(`<b>${(date3.getMonth() +1)}/${date3.getDate()}/${date3.getFullYear()}</b> <br> ${response.daily[3].weather[0].description}`);
                      var day3Icon = $("<img>");
                      var day3Code = response.daily[3].weather[0].icon;
                      var day3URL = "http://openweathermap.org/img/w/" + day3Code + ".png"
                      day3Icon.attr("src", day3URL);
                      $("#day3").append(day3Icon);
              
                      var date4 = new Date(JSON.stringify(response.daily[4].dt)*1000);
                      $("#day4").html(`<b>${(date4.getMonth() +1)}/${date4.getDate()}/${date4.getFullYear()}</b> <br> ${response.daily[4].weather[0].description}`);
                      var day4Icon = $("<img>");
                      var day4Code = response.daily[4].weather[0].icon;
                      var day4URL = "http://openweathermap.org/img/w/" + day4Code + ".png"
                      day4Icon.attr("src", day4URL);
                      $("#day4").append(day4Icon);
              });
      });
})})})

// on click event for previously saved cities
$(".city").on("click", function() {
          
  var cityName = $(this).attr("data-name");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=de86690dd9d7e0f7bd2fcb9973ca0788";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {

        var date = new Date(JSON.stringify(response.dt)*1000);
        $("#date").text(date);

      $("#name").text(response.name);

      var temperature = Math.floor(((JSON.parse(response.main.temp) - 273.15) * 1.80 + 32));

      $("#temp").text("Temperature: " + temperature + " F");

      $("#humidity").text("Humidity: " + response.main.humidity + "%");

      $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");

      // second ajax call
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var secondQuery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=de86690dd9d7e0f7bd2fcb9973ca0788";

      $.ajax({
        url: secondQuery,
        method: "GET"
      })
        .then(function(response) {
            console.log(response);
    
            $("#icon").empty();
            var weatherIcon = $("<img>");
            var iconCode = response.current.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png"
            weatherIcon.attr("src", iconURL);
            $("#icon").append(weatherIcon);
    
            if (response.current.uvi < 3) {
              $("#uvIndex").empty();
              var UVI = $("<span>");
              UVI.text("UV Index: " + response.current.uvi);
              UVI.addClass("low");
              $("#uvIndex").append(UVI);
              } else if (response.current.uvi > 7) {
                $("#uvIndex").empty();
                var UVI = $("<span>");
                UVI.text("UV Index: " + response.current.uvi);
                UVI.addClass("high");
                $("#uvIndex").append(UVI);
              } else {
                $("#uvIndex").empty();
                var UVI = $("<span>");
                UVI.text("UV Index: " + response.current.uvi);
                UVI.addClass("moderate");
                $("#uvIndex").append(UVI);
              }
            console.log(response.current.uvi);
    
            var date0 = new Date(JSON.stringify(response.daily[0].dt)*1000);
            $("#day0").html(`<b>${(date0.getMonth() +1)}/${date0.getDate()}/${date0.getFullYear()}</b> <br> ${response.daily[0].weather[0].description}`);
            console.log(date0);
            var day0Icon = $("<img>");
            var day0Code = response.daily[0].weather[0].icon;
            var day0URL = "http://openweathermap.org/img/w/" + day0Code + ".png"
            day0Icon.attr("src", day0URL);
            $("#day0").append(day0Icon);
    
            var date1 = new Date(JSON.stringify(response.daily[1].dt)*1000);
            $("#day1").html(`<b>${(date1.getMonth() +1)}/${date1.getDate()}/${date1.getFullYear()}</b> <br> ${response.daily[1].weather[0].description}`);
            var day1Icon = $("<img>");
            var day1Code = response.daily[1].weather[0].icon;
            var day1URL = "http://openweathermap.org/img/w/" + day1Code + ".png"
            day1Icon.attr("src", day1URL);
            $("#day1").append(day1Icon);
    
            var date2 = new Date(JSON.stringify(response.daily[2].dt)*1000);
            $("#day2").html(`<b>${(date2.getMonth() +1)}/${date2.getDate()}/${date2.getFullYear()}</b> <br> ${response.daily[2].weather[0].description}`);
            var day2Icon = $("<img>");
            var day2Code = response.daily[2].weather[0].icon;
            var day2URL = "http://openweathermap.org/img/w/" + day2Code + ".png"
            day2Icon.attr("src", day2URL);
            $("#day2").append(day2Icon);
    
            var date3 = new Date(JSON.stringify(response.daily[3].dt)*1000);
            $("#day3").html(`<b>${(date3.getMonth() +1)}/${date3.getDate()}/${date3.getFullYear()}</b> <br> ${response.daily[3].weather[0].description}`);
            var day3Icon = $("<img>");
            var day3Code = response.daily[3].weather[0].icon;
            var day3URL = "http://openweathermap.org/img/w/" + day3Code + ".png"
            day3Icon.attr("src", day3URL);
            $("#day3").append(day3Icon);
    
            var date4 = new Date(JSON.stringify(response.daily[4].dt)*1000);
            $("#day4").html(`<b>${(date4.getMonth() +1)}/${date4.getDate()}/${date4.getFullYear()}</b> <br> ${response.daily[4].weather[0].description}`);
            var day4Icon = $("<img>");
            var day4Code = response.daily[4].weather[0].icon;
            var day4URL = "http://openweathermap.org/img/w/" + day4Code + ".png"
            day4Icon.attr("src", day4URL);
            $("#day4").append(day4Icon);
    })})});