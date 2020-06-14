$(document).ready(function () {
    const temp;
  const APIKEY = "d09c23f63f6ff9ee58c620e0cd55a6b8";
  const $searchInput = $("#searchInput");
  const $searchForm = $("#searchForm");
  const $historyList = $("#historyList");

  let searchHistory = localStorage.getItem("searchHistory");

  function renderSearches(searches) {
    $historyList.empty();
    searches.forEach((search) => {
      const linkTag = $("<a>");
      linkTag.attr("href", "#");
      linkTag.addClass("list-group-item");
      linkTag.addClass("list-group-item-action");
      linkTag.addClass("historySearch");
      linkTag.text(search);

      $historyList.append(linkTag);
    });
    return;
  }

  if (searchHistory) {
    const searches = JSON.parse(searchHistory);
    renderSearches(searches);
  } else {
    let searchHistory = [];
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }

  //   const searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

  $searchForm.on("submit", async function (event) {
    const searches = JSON.parse(localStorage.getItem("searchHistory"));
    const input = $searchInput.val();
    console.log(input);
    searches.unshift($searchInput.val());
    if (searches.length > 5) {
      searches.shift();
    }
    localStorage.setItem("searchHistory", JSON.stringify(searches));
    renderSearches(searches);

    const queryUrl =
      "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&appid=" +
      APIKEY;

    var settings = {
      async: true,
      crossDomain: true,
      url: queryUrl,
      method: "GET",
    };
    await $.ajax(settings).done(async function (response) {
      console.log(response);
      const temp = response.main.temp + "\u00B0" + "F";
      const humid = response.main.humidity + "%";
      const wind = response.wind.speed + " MPH";
      const lat = response.coord.lat;
      const lon = response.coord.lon;
      $("#cityHeader").text(response.name);
      $("#temp").text(temp);
      $("#humid").text(humid);
      $("#wind").text(wind);
      const uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKEY +"&lat=" + lat + "&lon=" + lon;
      const uvSettings = {
        async: true,
        crossDomain: true,
        url: uvURL,
        method: "GET"
      };
      await $.ajax(uvSettings).done(function (response) {
          $("#uv").text(response.value);
          if(response.value >5) {
              $("#uv").css("background-color", "red");
              $("#uv").css("color", "white");
          } else {
            $("#uv").css("background-color", "green");
            $("#uv").css("color", "black");
          }
      });
    });
    const forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + input + "&cnt=5&appid=" + APIKEY;
    console.log(forecastURL);
    const forecastSettings = {
        async: true,
        url: forecastURL,
        method: "GET"
    }
    await $.ajax(forecastSettings).done(function (response) {
        console.log(response);
    });
    $searchInput.val("");
  });

  $(".historySearch").click(async function (e) {
      const input = $(this).text();
      const queryUrl =
      "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&appid=" +
      APIKEY;

    var settings = {
      async: true,
      crossDomain: true,
      url: queryUrl,
      method: "GET",
    };
    await $.ajax(settings).done(async function (response) {
      console.log(response);
      const temp = response.main.temp + "\u00B0" + "F";
      const humid = response.main.humidity + "%";
      const wind = response.wind.speed + " MPH";
      const lat = response.coord.lat;
      const lon = response.coord.lon;
      $("#cityHeader").text(response.name);
      $("#temp").text(temp);
      $("#humid").text(humid);
      $("#wind").text(wind);
      const uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKEY +"&lat=" + lat + "&lon=" + lon;
      const uvSettings = {
        async: true,
        crossDomain: true,
        url: uvURL,
        method: "GET"
      };
      await $.ajax(uvSettings).done(function (response) {
          $("#uv").text(response.value);
          if(response.value >5) {
              $("#uv").css("background-color", "red");
              $("#uv").css("color", "white");
          } else {
            $("#uv").css("background-color", "green");
            $("#uv").css("color", "black");
          }
      });
    });
    });


});
