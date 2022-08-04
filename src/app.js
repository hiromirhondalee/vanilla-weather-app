function formatDate(timestamp) {
  let date = new Date(timestamp);

  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dayIndex];

  let currentDate = date.getDate();

  let monthIndex = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[monthIndex];

  let year = date.getFullYear();

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${currentDate} ${month} ${year}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let dailyForecast = response.data.daily;

  forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 forcast-day-group">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
          <div class="forecast-icon">
            <image src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }.png"></image>
          </div>
          <div class="forecast-temperatures">
            <span class="forecast-max-temperature">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="forecast-min-temperature">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>`;
    }
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
}

function getForecast(coordinates) {
  let apiKey = "b1710895b469eb434ca65896f4e0d1be";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayInfo(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let dateElement = document.querySelector("#last-updated-date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconId = response.data.weather[0].icon;
  let iconElement = document.querySelector("#weather-icon-main");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "b1710895b469eb434ca65896f4e0d1be";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayInfo);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name-search").value;
  search(city);
}

search("Tokyo");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);
