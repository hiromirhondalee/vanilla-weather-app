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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2 forcast-day-group">
          <div class="forecast-day">Fri</div>
          <div class="forecast-icon">
            <image src="http://openweathermap.org/img/wn/01d.png"></image>
          </div>
          <div class="forecast-temperatures">
            <span class="forecast-max-temperature">38°</span>
            <span class="forecast-min-temperature">28°</span>
          </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "b1710895b469eb434ca65896f4e0d1be";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayInfo);
}

function displayInfo(response) {
  celsiusTemp = response.data.main.temp;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let dateElement = document.querySelector("#last-updated-date-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);

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
}

function celsiusUnitSelect() {
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
}

function handleSearch(event) {
  event.preventDefault();

  celsiusUnitSelect();

  let city = document.querySelector("#city-name-search").value;
  search(city);
}

function convertToFahrenheit(event) {
  event.preventDefault();

  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = fahrenheitTemp;

  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);

  celsiusUnitSelect();
}

search("Tokyo");
displayForecast();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

let celsiusTemp = null;

let fahrenheitUnit = document.querySelector("#fahreinheit");
fahrenheitUnit.addEventListener("click", convertToFahrenheit);

let celsiusUnit = document.querySelector("#celsius");
celsiusUnit.addEventListener("click", convertToCelsius);
