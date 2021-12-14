// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// const apiKey = "<a3a583989f0bfe311cc1ad4c3ae43e4e>&units=imperial";
const apiKey = "&appid=a3a583989f0bfe311cc1ad4c3ae43e4e";

/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
// Generate button event listener
document.getElementById("generate").addEventListener("click", performAction);

// Function called by the event listener
function performAction(e) {
  const newZip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(baseURL, newZip, apiKey).then(function (data) {
    console.log(data);
    //Add data to POST request
    postData("/add", {
      date: d,
      // temp: data.list[0].main.temp,
      temp: data.main.temp,
      // temp: temp,
      content: feelings,
    });
    console.log(postData);
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
    console.log("error", error);
    // Handleing the error
  }
};

// Function to POST Data
const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    // Create JSON string from a JavaScript object
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to GET Project Data
const updateUI = async () => {
  const request = await fetch("/data");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData[0].date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature: ${allData[0].temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `I feel: ${allData[0].content}`;
  } catch (error) {
    console.log("error", error);
  }
};
