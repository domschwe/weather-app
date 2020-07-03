console.log("Client side JS loaded");

fetch("http://localhost:3000/weather?address=!").then((response) => {
  response.json().then((data) => {
      if (data.error) {
          console.log(data.error)
      } else {
          console.log(data.location)
          console.log(data.forecastData)
      }
  });
});

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit", (e) =>  {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
  response.json().then((data) => {
      if (data.error) {
          messageOne.textContent = data.error
          console.log(data.error)
      } else {
          messageOne.textContent ="Weather for " + data.location + ":"
          messageTwo.textContent = data.forecastData
          console.log(data.location)
          console.log(data.forecastData)
      }
  });
});
})