// Display a prepopulated list of cities
const cityListArr = [
  "Atlanta",
  "Austin",
  "Chicago",
  "New York",
  "Orlando",
  "Seattle",
  "Denver",
  "Miami",
  "Dallas",
  "San Francisco",
];

// Sort array alphabetically
cityListArr.sort();

const cityListArea = $("#cityList");
for (let i = 0; i < cityListArr.length; i++) {
  let cityBtn = $("<button>")
    .attr("class", "btn btn-light cityBtn")
    .text(cityListArr[i]);
  cityListArea.append(cityBtn);
}
// Value for getting UV Index
let UVValue = "";


// Get weather information
// Open weather connection information
//https://api.openweathermap.org/data/2.5/weather?q=London
const weatherAPIURL = "https://api.openweathermap.org/data/2.5/weather?";
const weatherAPIKey = "appid=18bc498477de9eed0592f5b6a20dc452&";
// Current weather for selected city
function processCityBtn(name) {
  let weatherAPICity = "q=" + $(name).text();
  let searchURL = weatherAPIURL + weatherAPIKey + weatherAPICity;
  // Empty previous search results
  $("#cityDisplay").empty();
  // Show right side once a search is triggered
  $("#rightSide").removeClass("hide");

  $.ajax({
    url: searchURL,
    method: "GET",
  }).then(function (response) {
    console.log(response)

    let dateTime = moment(response.dt, "X").format(" (MM/DD/YYYY)")
    let iconcode = response.weather[0].icon
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    let iconImage = $("<img>").attr("src", iconurl)

    // Create div to store weather information
    let cityObj = $("<div>").attr("id", "cityObj");
    // Get city name from response
    let cityNameObj = $("<h2>").append(response.name, dateTime, iconImage);
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
      let UVIndexValue = res.value;

      // Green index
      if (UVIndexValue >= 0 && UVIndexValue <= 2.99) {
        UVValue = $("<p>").text("UV Index: " + UVIndexValue);
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

      // Add city pages to city block
      cityObj.append(
        cityNameObj,
        farenheitTempObj,
        humidityObj,
        windSpeedObj,
        UVValue
      );

      // Add city block to page
      $("#cityDisplay").append(cityObj);
    });


  });
}

function processSearchBtn() {
  let searchText = $("#searchText").val()
  console.log(searchText)
  let weatherAPICity = "q=" + searchText;
  let searchURL = weatherAPIURL + weatherAPIKey + weatherAPICity;
  // Empty previous search results
  $("#cityDisplay").empty();
  // Show right side once a search is triggered
  $("#rightSide").removeClass("hide");

  $.ajax({
    url: searchURL,
    method: "GET",
  }).then(function (response) {
    console.log(response)

    let dateTime = moment(response.dt, "X").format(" (MM/DD/YYYY)")
    let iconcode = response.weather[0].icon
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    let iconImage = $("<img>").attr("src", iconurl)

    // Create div to store weather information
    let cityObj = $("<div>").attr("id", "cityObj");
    // Get city name from response
    let cityNameObj = $("<h2>").append(response.name, dateTime, iconImage);
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
      let UVIndexValue = res.value;

      // Green index
      if (UVIndexValue >= 0 && UVIndexValue <= 2.99) {
        UVValue = $("<p>").text("UV Index: " + UVIndexValue);
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

      // Add city pages to city block
      cityObj.append(
        cityNameObj,
        farenheitTempObj,
        humidityObj,
        windSpeedObj,
        UVValue
      );

      // Add city block to page
      $("#cityDisplay").append(cityObj);
    });


  });
}

$(".cityBtn").on("click", function () {
  processCityBtn(this)
});

$("#searchBtn").on("click", function (event) {
  event.preventDefault()
  processSearchBtn()
});
// 5 day forecast for selected city
