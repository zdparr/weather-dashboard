// Display a list of previously searched cities
$(document).ready(function () {
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
  const forecastAPIURL = "https://api.openweathermap.org/data/2.5/forecast?"

  // Get from local storage
  if (window.localStorage.length) {
    let lastCitySearch = JSON.parse(localStorage.getItem("city"));
    let lastCityName = lastCitySearch[0].cityName
    processCityBtn(lastCityName)
  }

  // Current weather for city button
  function processCityBtn(name) {
    let weatherAPICity = "q=" + name;
    let searchURL = weatherAPIURL + weatherAPIKey + weatherAPICity;
    // Empty previous search results
    $("#cityDisplay").empty();
    // Show right side once a search is triggered
    $("#rightSide").removeClass("hide");

    $.ajax({
      url: searchURL,
      method: "GET",
    }).then(function (response) {
      //console.log(response)

      let dateTime = moment(response.dt, "X").format(" (MM/DD/YYYY)")
      let iconcode = response.weather[0].icon
      let iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
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
        "Humidity: " + response.main.humidity + "%"
      );
      // Get wind speed from response
      let windSpeedObj = $("<p>").text(
        "Wind Speed: " + response.wind.speed + " MPH"
      );

      // UV index lookup
      let cityObjLon = "&lon=" + response.coord.lon;
      let cityObjLat = "lat=" + response.coord.lat;

      let UVSearchURL =
        "https://api.openweathermap.org/data/2.5/uvi?" +
        weatherAPIKey +
        cityObjLat +
        cityObjLon;

      processForecast(weatherAPICity)
      // Function to get UV index
      $.ajax({
        url: UVSearchURL,
        method: "GET",
      }).then(function (res) {
        let UVIndexValue = res.value;

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

  // Current weather for search
  function processSearchBtn() {
    let searchText = $("#searchText").val()

    // Clear out old searches
    if (window.localStorage.length) {
      localStorage.removeItem("city")
    }

    let cityObject = JSON.parse(localStorage.getItem("city")) || [];
    cityObject.push({
      cityName: searchText
    })
    localStorage.setItem("city", JSON.stringify(cityObject))

    let weatherSearchAPICity = "q=" + searchText;
    let weatherSearchURL = weatherAPIURL + weatherAPIKey + weatherSearchAPICity;
    // Empty previous search results
    $("#cityDisplay").empty();
    // Show right side once a search is triggered
    $("#rightSide").removeClass("hide");

    $.ajax({
      url: weatherSearchURL,
      method: "GET",
    }).then(function (response) {
      processForecast(weatherSearchAPICity)

      let dateTime = moment(response.dt, "X").format(" (MM/DD/YYYY)")
      let iconcode = response.weather[0].icon
      let iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
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
        "Humidity: " + response.main.humidity + "%"
      );
      // Get wind speed from response
      let windSpeedObj = $("<p>").text(
        "Wind Speed: " + response.wind.speed + " MPH"
      );

      // UV index lookup
      let cityObjLon = "&lon=" + response.coord.lon;
      let cityObjLat = "lat=" + response.coord.lat;

      let UVSearchURL =
        "https://api.openweathermap.org/data/2.5/uvi?" +
        weatherAPIKey +
        cityObjLat +
        cityObjLon;

      // Function to get UV index
      $.ajax({
        url: UVSearchURL,
        method: "GET",
      }).then(function (res) {
        let UVIndexValue = res.value;

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

  // Forecast Function
  function processForecast(city) {
    let weatherForecastAPICity = city
    let forecastURL = forecastAPIURL + weatherAPIKey + weatherForecastAPICity
    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (res) {
      let forecastList = res.list
      $("#forecastArea").empty()
      for (let i = 0; i < forecastList.length; i++) {
        let forecastInfo = res.list[i]
        let forecastDateTime = (res.list[i].dt_txt)
        if (forecastDateTime.match("12:00:00")) {
          let forecastBlock = $("<div>").attr("class", "forecastBox")
          let forecastDate = moment(forecastInfo.dt, "X").format(" (MM/DD/YYYY)")
          let forecastImageSrc = "https://openweathermap.org/img/w/" + forecastInfo.weather[0].icon + ".png";
          let forecastImage = $("<img>").attr("src", forecastImageSrc)
          let forecastKelvinTemp = forecastInfo.main.temp
          let forecastFarenheitTemp = $("<p>").text("Temp: " + ((forecastKelvinTemp - 273.15) * 1.8 + 32).toFixed(2) + " °F")
          let forecastHumidity = $("<p>").text("Humidity: " + forecastInfo.main.humidity + "%")

          forecastBlock.append(forecastDate, forecastImage, forecastFarenheitTemp, forecastHumidity)
          $("#forecastArea").append(forecastBlock)
        }

      }

    })
  }

  // Trigger for previously searched city
  $(".cityBtn").on("click", function () {
    processCityBtn($(this).text())
  });

  // Trigger for search box
  $("#searchBtn").on("click", function (event) {
    event.preventDefault()
    processSearchBtn()
  });

})

