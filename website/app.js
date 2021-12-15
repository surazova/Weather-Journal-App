// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=a3a583989f0bfe311cc1ad4c3ae43e4e&units=imperial";

// Date formatting after it's retrieved from API
let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

// Event listener to add function to existing HTML DOM element (Generate Button)
document.getElementById("generate").addEventListener("click", performAction);

// Function called by event listener
function performAction(e) {
  const newZip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(baseURL, newZip, apiKey).then(function (data) {
    postData("/newData", {
      date: d,
      temp: data.main.temp,
      content: feelings,
    });
    updateUI();
  });
}

// Function to GET Web API Data
const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error");
  }
};

// Function to POST Data
const postData = async (url = "", data = {}) => {
  // console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.error("Error");
  }
};

// Function to GET Project Data
const updateUI = async () => {
  const request = await fetch("/data");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${newDate}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature: ${allData[0].temp} &#8457`;
    document.getElementById(
      "content"
    ).innerHTML = `Today, I feel ${allData[0].content}`;
  } catch (error) {
    console.error("Error");
  }
};
