"use strict";

window.addEventListener("load", () => {
  // SELECTORS--------------------------------------------------->
  const nightMode = document.querySelector(".night-mode");
  const sunMode = document.querySelector(".fa-sun");
  const moonMode = document.querySelector(".fa-moon");
  const errorSearch = document.querySelector(
    ".weather-search .fa-exclamation-circle"
  );
  const weatherContainer = document.querySelector(".weather-container");
  const inputlocation = document.querySelector(".weather-search input");
  const searchWeather = document.querySelector(".weather-search .fa-search");
  const weatherLocation = document.querySelector(".weather-location h4");
  const weatherTemp = document.querySelector(".weather-temperature h4");
  const weatherSideTemp = document.querySelector(
    ".weather-description .side-temp"
  );
  const weatherDescription = document.querySelector(
    ".weather-description .description"
  );

  const weatherWind = document.querySelector(".wind h3");
  const weatherHumidity = document.querySelector(".humidity h3");
  const weatherVisibility = document.querySelector(".visibility h3");
  const weatherIcon = document.querySelector(".weather-icon");
  const weatherDate = document.querySelector(".weather-date .date");
  const weatherTime = document.querySelector(".weather-date .time");

  const api = {
    key: "4c46689ee200284a12135dfb1051e32b",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  //   EVENTLISTENER------------------------------------------------------------>
  searchWeather.addEventListener("click", (e) => {
    e.preventDefault();

    // WEATHER------------------------------------>
    const city = inputlocation.value;

    if (inputlocation.value === "") {
      inputlocation.classList.add("error");
      errorSearch.classList.remove("hide");

      setTimeout(() => {
        errorSearch.classList.add("hide");
        inputlocation.classList.remove("error");
      }, 1000);
    } else {
      const getWeather = async () => {
        const cityWeather = await fetch(
          `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`
        );

        const data = await cityWeather.json();

        const locationCity = data.name;
        const locationCountry = data.sys.country;
        const temp = Math.round(data.main.temp);
        const sideTemp = Math.round(data.main.feels_like);
        const { description } = data.weather[0];
        // wind m/s to km/hr------------->
        const windy = Math.round(data.wind.speed);
        const wind = (windy * 18) / 5;
        const { humidity } = data.main;
        // visibility  km/hr---------------------->
        const { visibility } = data;
        const visible = visibility / 1000;

        const { icon } = data.weather[0];

        if (locationCountry === undefined) {
          weatherLocation.innerText = `${locationCity}`;
        } else {
          weatherLocation.innerText = `${locationCity}, ${locationCountry}`;
        }

        weatherTemp.innerHTML = `${temp}<span>&degC</span>`;

        weatherSideTemp.innerHTML = `Feels like ${sideTemp}<span>&degC</span>`;
        weatherDescription.innerText = `${description}`;
        weatherWind.innerText = `${Math.round(wind)}km/h`;
        weatherHumidity.innerText = `${humidity}%`;
        weatherVisibility.innerText = `${Math.round(visible)}km`;
        weatherIcon.innerHTML = `<img src="icons/${icon}.png">`;

        //   CLEAR THE INPUT--------------------------------->
        inputlocation.value = "";
      };

      getWeather();
    }
  });

  // DATE & TIME-------------------------------->
  const dateNow = new Date();
  const day = dateNow.getDate();
  const month = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();

  // DATE------->
  weatherDate.innerHTML = `${day}/${month}/${year}`;
  // TIME-------->
  const showTime = () => {
    let timeNow = new Date();
    let twentyFourHours = timeNow.getHours();
    let hours = timeNow.getHours();
    let minutes = timeNow.getMinutes();
    let seconds = timeNow.getSeconds();
    let mid = "PM";

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (hours > 12) {
      hours = hours - 12;
    }

    if (hours === 0) {
      hours = 12;
    }

    if (twentyFourHours < 12) {
      mid = "AM";
    }
    weatherTime.textContent = `${hours}:${minutes}:${seconds} ${mid}`;
  };
  showTime();
  setInterval(showTime, 1000);

  // NIGHT-MODE--------------------------------------->
  nightMode.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-sun")) {
      sunMode.classList.add("hide-mode");
      moonMode.classList.remove("hide-mode");
      weatherContainer.style.backgroundImage =
        "linear-gradient(rgb(0,0,0,0.4), rgb(0,0,0,0.4)), url(images/sun-1.jpg)";
    } else {
      sunMode.classList.remove("hide-mode");
      moonMode.classList.add("hide-mode");
      weatherContainer.style.backgroundImage =
        "linear-gradient(rgb(0,0,0,0.6), rgb(0,0,0,0.6)), url(images/night-1.jpg)";
    }
  });
});
