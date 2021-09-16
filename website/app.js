/* Global Variables */
const BASE_URL = "http://localhost:5000";
const textArea = document.querySelector("#feelings");
const zipField = document.querySelector("#zip");
const submitBtn = document.querySelector("#generate");
const dateElement = document.querySelector("#date");
const tempElement = document.querySelector("#temp");
const contentElement = document.querySelector("#content");
const errorElement = document.querySelector("#error");

// Create a new date instance dynamically with JS

submitBtn.addEventListener("click", (e) => {
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

  let d = new Date();
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  const feeling = textArea.value;
  const zip = zipField.value;
  console.log("zip", zip);

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
});

window.addEventListener("load", (e) => {
  console.log("inside page load");
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
