// Display a prepopulated list of cities
// List of cities
const cityListArr = [
  "Austin",
  "Chicago",
  "New York",
  "Orlando",
  "Seattle",
  "Denver",
  "Dallas",
];

// Create a button for each city
const cityListArea = $("#cityList");
for (let i = 0; i < cityListArr.length; i++) {
  let cityBtn = $("<button>")
    .attr("class", "btn btn-light cityBtn")
    .text(cityListArr[i]);
  cityListArea.append(cityBtn);
}
// Value for getting UV Index
const weatherAPIURL = "https://api.openweathermap.org/data/2.5/weather?";
const weatherAPIKey = "appid=18bc498477de9eed0592f5b6a20dc452&";
let UVValue = "";

// Get weather information
// Open weather connection information
//https://api.openweathermap.org/data/2.5/weather?q=London

// Current weather for selected city
$(".cityBtn").on("click", function () {
  let weatherAPICity = "q=" + $(this).text();
  let searchURL = weatherAPIURL + weatherAPIKey + weatherAPICity;
  // Empty previous search results
  $("#cityDisplay").empty();
  // Show right side once a search is triggered
  $("#rightSide").removeClass("hide");

  $.ajax({
    url: searchURL,
    method: "GET",
  }).then(function (response) {
    cityWeatherLookup(name);
    cityUVLookup(lat, long);

    // Create div to store weather information
    let cityObj = $("<div>").attr("id", "cityObj");
    // Get city name from response
    let cityNameObj = $("<h2>").text(response.name);
    // Get kelvin temp from response
    let kelvinTempObj = response.main.temp;
    // Convert kelvin to farenheit with two decimals
    let farenheitTempObj = $("<p>").text(
      "Temperature: " + ((kelvinTempObj - 273.15) * 1.8 + 32).toFixed(2) + " °F"
    );
    // Get humidity from response
    let humidityObj = $("<p>").text(
      "Humidity: " + response.main.humidity + " %"
    );
    // Get wind speed from response
    let windSpeedObj = $("<p>").text(
      "Wind Speed: " + response.wind.speed + " MPH"
    );

    // UV index lookup
    let cityObjLon = "&lon=" + response.coord.lon;
    let cityObjLat = "lat=" + response.coord.lat;

    let UVSearchURL =
      "http://api.openweathermap.org/data/2.5/uvi?" +
      weatherAPIKey +
      cityObjLat +
      cityObjLon;

    // Function to get UV index
    $.ajax({
      url: UVSearchURL,
      method: "GET",
    }).then(function (res) {
      console.log(res);
      let UVIndexValue = res.value;

      // Green index
      if (UVIndexValue >= 0 && UVIndexValue <= 2.99) {
        //UVValue = $("<p>").text("UV Index: " + UVIndexValue);
        UVValue = "UV Index: " + UVIndexValue;
      } else if (UVIndexValue >= 3 && UVIndexValue <= 5.99) {
        //UVValue = $("<p>").text("UV Index: " + UVIndexValue);
        UVValue = "UV Index: " + UVIndexValue;
      } else if (UVIndexValue >= 6 && UVIndexValue <= 7.99) {
        //UVValue = $("<p>").text("UV Index: " + UVIndexValue);
        UVValue = "UV Index: " + UVIndexValue;
      } else if (UVIndexValue >= 8 && UVIndexValue <= 10.99) {
        //let UVValue = $("<p>").text("UV Index: " + UVIndexValue);
        UVValue = "UV Index: " + UVIndexValue;
      } else {
        //UVValue = $("<p>").text("UV Index: " + UVIndexValue);
        UVValue = "UV Index: " + UVIndexValue;
      }
    });

    console.log(UVValue);
    cityObj.append(
      cityNameObj,
      farenheitTempObj,
      humidityObj,
      windSpeedObj,
      UVValue
    );

    $("#cityDisplay").append(cityObj);
  });
});
// 5 day forecast for selected city
