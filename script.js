document.getElementById("weatherForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const city = document.getElementById("city").value.trim();
  const lat = document.getElementById("lat").value.trim();
  const lon = document.getElementById("lon").value.trim();

  const ;
  let url = "";

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  } else {
    document.getElementById("result").innerHTML = "Please enter a City or both Latitude and Longitude.";
    return;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const icon = data.weather[0].icon;
      const html = `
        <p>Description: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon" />
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Cloudiness: ${data.clouds.all}%</p>
      `;
      document.getElementById("result").innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("result").innerHTML = "Error retrieving weather data.";
    });
});
