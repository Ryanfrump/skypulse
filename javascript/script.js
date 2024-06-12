"use strict";

document.addEventListener("DOMContentLoaded", async function () {
  const url = "https://api.weather.gov/points/37.1041,-113.5841/";
  const response = await fetch(url);
  const data = await response.json();

  const forecastUrl = data.properties.forecastHourly;
  const forecastResponse = await fetch(forecastUrl);
  console.log(forecastUrl);

  // getting where current temp is from api
  const forecastData = await forecastResponse.json();
  console.log(forecastData);
  const currentWeather = forecastData.properties.periods[0];

  // taking info from api and turning it into info on the web page
  const temperature2 = currentWeather.temperature;
  const weatherCondition = currentWeather.shortForecast;
  const windSpeed = currentWeather.windSpeed;

  document.getElementById("temperature").textContent = temperature2;
  document.getElementById("condition").textContent = weatherCondition;
  document.getElementById("wind").textContent = windSpeed;

  // loop over start times for chart
  const timeAndTemp = function () {
    let times = [];
    let temperatures = [];

    for (let i = 0; i < 24; i++) {
      let startTime = forecastData.properties.periods[i].startTime;
      let string = startTime.substring(11, 16);
      times.push(string);
      temperatures.push(forecastData.properties.periods[i].temperature);
    }
    return { times, temperatures };
  };

  // Get times and temp for labels
  const { times, temperatures } = timeAndTemp();

  // Data for the chart
  const data1 = {
    labels: times,
    datasets: [
      {
        label: "Temperature",
        data: temperatures,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "#0499aa",
        borderWidth: 4,
      },
    ],
  };

  // adding chart from get element
  const ctx = document.getElementById("myChart");

  // the chart
  new Chart(ctx, {
    type: "bar",
    data: data1,
    options: {
      plugins: {
        title: {
          display: true,
          text: "24 Hour Forecast",
        },
      },
      responsive: true,
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
      maintainAspectRatio: false,
    },
  });
});
