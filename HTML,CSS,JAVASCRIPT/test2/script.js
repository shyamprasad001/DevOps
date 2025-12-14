var cityInputEl = document.getElementById("cityInput");
var weatherReportEL = document.getElementById("weatherReport");

function searchCity(event) {
  if (event.key === "Enter") {
    var cityInput = cityInputEl.value;
    if (cityInput.trim() !== "") {
      getWeather(cityInput);
      weatherReportEL.textContent = "";
    } else {
      alert("Enter Valid Location");
    }
  }
}

const apiKey = WEATHER_API_KEY;

async function getWeather(location) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`;

  try {
    const response = await fetch(url);
    const weatherData = await response.json();

    const place = document.createElement("div");
    place.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;
    place.classList.add("place");
    weatherReportEL.appendChild(place);

    const date = new Date(weatherData.location.localtime);
    const time = document.createElement("p");
    time.textContent = `${date.toLocaleDateString("en-US", {
      weekday: "long",
    })} ${date.getDate()} ${date.toLocaleDateString("en-US", {
      month: "long",
    })}`;
    time.classList.add("date");
    weatherReportEL.appendChild(time);

    const temp = document.createElement("p");
    temp.textContent = `${weatherData.current.temp_c} °C`;
    temp.classList.add("temperature");
    weatherReportEL.appendChild(temp);

    const skyCondition = document.createElement("p");
    skyCondition.textContent = `${weatherData.current.condition.text}`;
    skyCondition.classList.add("sky-condition");
    weatherReportEL.appendChild(skyCondition);

    const minMaxTemp = document.createElement("p");
    minMaxTemp.textContent = `${weatherData.forecast.forecastday[0].day.maxtemp_c}°C / ${weatherData.forecast.forecastday[0].day.mintemp_c}°C`;
    minMaxTemp.classList.add("minmax-temp");
    weatherReportEL.appendChild(minMaxTemp);
  } catch (error) {
    alert("Failed To Fetch the weather Data");
  }
}

cityInputEl.addEventListener("keydown", searchCity);
