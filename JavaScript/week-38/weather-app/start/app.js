async function fetchWeather(path) {
  const data = await fetch(path)
    .then(response => response.json())

    return data
}

async function renderWeather() {
  const url = "./weather.json";
  const weatherData = await fetchWeather(url)
  const currentFormattedDate = date.toISOString().substring(0, 10)

  const currentDayWeather = weatherData.weather_data
    .find(data => currentFormattedDate === data.date);

    const temperatures = currentDayWeather.temperatures.split("-")

    const currentHour = date.getHours();
    let currentTemp;
    const morningTime = currentHour < 10
    const middayTime = currentHour > 10 && currentHour < 17

    if (morningTime) {
      currentTemp = temperatures[0]
    } else if (middayTime) {
      currentTemp = temperatures[1]
    } else {
      currentTemp = temperatures[2]
    }

  printWeather(currentTemp)
}

renderWeather()

function printWeather(input) {
  const weatherContent = document.querySelector("#tempratur");

  weatherContent.textContent = "Senaste mätning: " + input
}

const todayDisplay = document.querySelector("#today");

const veckoDagar = [
  "Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"
];

let date = new Date();
let currentDay = date.getDay()
const formatDate = date.getDate() + "/" + (date.getMonth() + 1)
console.log(currentDay)

const nextWeatherDay = document.querySelector("#button-next");
nextWeatherDay.addEventListener('click', nextDay)

function nextDay() {
  
  if (currentDay < 6) {
    currentDay += 1
  } else {
    currentDay = 0
  }

  console.log("current day:", currentDay)
  formatTime(currentDay);
}

const formatTime = (day) => {
    // date = new Date()

    console.log("pow", day)

    const currentHour = date.getHours()
    const currentMinute = date.getMinutes().toString().padStart(2, '0');
    const currentSecond = date.getSeconds().toString().padStart(2, '0')
    const currentDate = `(${date.getDate()}/${(date.getMonth() + 1)})`
    const currentDay2 = veckoDagar[day];

    // dag - tid - (datum)
    todayDisplay.textContent = `
    ${currentDay2} kl: ${currentHour}:${currentMinute}:${currentSecond} ${currentDate}
    `


};
setInterval(() => {
  formatTime(currentDay)
}, 1000)
