var loadCities = []

init();

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

function init() {
  var storedCities = JSON.parse(localStorage.getItem("loadCities"));

  if (storedCities !== null) {
    loadCities = storedCities;
  }
  renderCities();
}

function storeCities() {
  localStorage.setItem("loadCities", loadCities);
}


$(".searchBtn").on("click", function() {

    var cityName = $(".cityNameInput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=de86690dd9d7e0f7bd2fcb9973ca0788"

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
            console.log(response);

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
        // addedCityName.split('"').join('');
        loadCities.push(addedCityName);
        localStorage.setItem("loadCities", JSON.stringify(loadCities));

        });
});

$(".city").on("click", function() {

  var cityName = $(this).attr("data-name");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=de86690dd9d7e0f7bd2fcb9973ca0788"

  $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {

      $("#name").text(response.name);

      var temperature = Math.floor(((JSON.parse(response.main.temp) - 273.15) * 1.80 + 32));

      $("#temp").text("Temperature: " + temperature + " F");

      $("#humidity").text("Humidity: " + response.main.humidity + "%");

      $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");

      });
});