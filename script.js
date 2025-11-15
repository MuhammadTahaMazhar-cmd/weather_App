const apiKey = "8537c3352dffdce9befd4161023f0bde"; // 👈 yahan apna OpenWeatherMap API key lagao
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
      alert("City not found. Try again!");
      return;
    }

    // Weather details
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText = `${data.main.temp}°C`;
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `Wind: ${data.wind.speed} km/h`;

    weatherCard.classList.remove("hidden");

    // Change background according to weather
    const weatherType = data.weather[0].main.toLowerCase();
    if (weatherType.includes("cloud")) {
      document.body.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
    } else if (weatherType.includes("rain")) {
      document.body.style.background = "linear-gradient(135deg, #667db6, #0082c8)";
    } else if (weatherType.includes("clear")) {
      document.body.style.background = "linear-gradient(135deg, #2980b9, #6dd5fa)";
    } else {
      document.body.style.background = "linear-gradient(135deg, #00aaff, #004e92)";
    }

  } catch (error) {
    alert("Error fetching weather data.");
    console.error(error);
  }
}
