const apiURL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=`;

const apiKey = `b5336b399916a93179041061c8d1aa80`;

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const skyDescription = document.getElementById("sky");

const getData = async (city) => {
  const { data } = await axios.get(apiURL + city + `&appid=${apiKey}`);

  const location = data.city.name;
  document.getElementById("location").innerHTML = location;

  const temp = Math.round(data.list[0].main.temp) + "°";
  document.getElementById("temp").innerHTML = temp;

  const humidity = data.list[0].main.humidity + "%";
  document.getElementById("humid").innerHTML = humidity;

  const wind = Math.round(data.list[0].wind.speed) + "km";
  document.getElementById("wind").innerHTML = wind;

  const tomorrowTemp = Math.round(data.list[5].main.temp) + "°";
  document.getElementById("tomorrow-temp").innerHTML = tomorrowTemp;

  const day2 = Math.round(data.list[13].main.temp) + "°";
  document.getElementById("2-day").innerHTML = day2;

  const day3 = Math.round(data.list[21].main.temp) + "°";
  document.getElementById("3-day").innerHTML = day3;

  const currentDescription = data.list[0].weather[0].description;
  document.getElementsByClassName("description")[0].innerHTML =
    currentDescription;

  const time = data.list[8].dt;
  const date = new Date(time * 1000);
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const day = daysOfWeek[date.getDay(date)];
  document.getElementById("time").innerHTML = day;

  const tomorrowDay = data.list[16].dt;
  const tomorrowDate = new Date(tomorrowDay * 1000);
  const tomorrowDateShow = daysOfWeek[tomorrowDate.getDay(tomorrowDate)];
  document.getElementById("two-days").innerHTML = tomorrowDateShow;

  const threeDay = data.list[24].dt;
  const threeDayDate = new Date(threeDay * 1000);
  const threeDayDateShow = daysOfWeek[threeDayDate.getDay(threeDayDate)];
  document.getElementById("three-days").innerHTML = threeDayDateShow;

  if (data.list[0].weather[0].description == "clear sky") {
    skyDescription.src = "clear.png";
  } else if (data.list[0].weather[0].description == "rain") {
    skyDescription.src = "rain.png";
  } else if (data.list[0].weather[0].description == "moderate rain") {
    skyDescription.src = "rain.png";
  } else if (data.list[0].weather[0].description == "light rain") {
    skyDescription.src = "rain.png";
  } else if (data.list[0].weather[0].description == "snow") {
    skyDescription.src = "snow.png";
  } else if (data.list[0].weather[0].description == "overcast clouds")
    skyDescription.src = "clouds.png";
  else if (
    data.list[0].weather[0].description == "broken clouds" ||
    "few clouds"
  )
    skyDescription.src = "clouds.png";

  console.log(data.list[21]);
};

searchButton.addEventListener("click", (e) => {
  getData(searchBox.value);
});

const input = document.getElementById("text");

function Alert() {
  alert(input.value);
}

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    getData(searchBox.value);
  }
});
