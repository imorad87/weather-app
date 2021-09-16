/* Global Variables */
const BASE_URL = "http://localhost:5000";
const textArea = document.querySelector("#feelings");
const zipField = document.querySelector("#zip");
const submitBtn = document.querySelector("#generate");
const dateElement = document.querySelector("#date");
const tempElement = document.querySelector("#temp");
const contentElement = document.querySelector("#content");
const errorElement = document.querySelector("#error");

const API_KEY = "a1edb8224b82873a5d0d57b7d24df3a7";

function getTempreature(apiKey) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipField.value}&units=metric&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => data.main.temp)
    .catch((err) => {
      console.log(err);
    });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!zipField.value || !textArea.value) {
    errorElement.innerHTML = "<span class='err'>Please enter a zip code and a feeling.</span>";
    errorElement.classList.add("active");
    setTimeout(() => {
      errorElement.innerHTML = "";
      errorElement.classList.remove("active");
    }, 3500);
    return;
  }
  let temp = 0;
  console.log("inside submit");
  await getTempreature(API_KEY).then((data) => {
    temp = data;
  });

  let d = new Date();
  let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
  const feeling = textArea.value;
  const zip = zipField.value;

  fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      ACCEPT: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newDate,
      feeling,
      zip,
      temp,
    }),
  })
    .then(() => {
      zipField.value = "";
      textArea.value = "";
      location.reload();
    })
    .catch((err) => {
      errorElement.innerHTML = err.message;
    });
};

submitBtn.addEventListener("click", handleSubmit);

window.addEventListener("load", (e) => {
  e.preventDefault();
  fetch("http://localhost:5000/pd")
    .then((res) => res.json())
    .then((dataItems) => {
      if (dataItems.length <= 0) {
        return;
      }
      console.log(dataItems);
      const data = dataItems[dataItems.length - 1];
      dateElement.innerHTML = data.date;
      contentElement.innerHTML = data.feeling;
      tempElement.innerHTML = data.temp;
    });
});
