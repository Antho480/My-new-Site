const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apiKey = "4426a560be3690a163b70bea81d06706 ";

weatherForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const city = cityInput.value;

    if(city){
         try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData)
         }
         catch(error){
            console.error(error);
            displayError(error);
         }
    }
    else{
     displayError("Please enter a city ")
    }
});


async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl);
    
    if(!response.ok){
        throw new Error("Couldn't fetch the weather data")
    }
    else{
        return await response.json();
    }   
    
}

function displayWeatherInfo(data){
   const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";


    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

   citydisplay.textContent = city;
   tempdisplay.textContent = `${Math.floor(temp - 273.15).toFixed(1)}°C`;
   humiditydisplay.textContent = `Humidity: ${humidity}%`;
   descdisplay.textContent = description;
   weatheremoji.textContent = getWeatherEmoji(id);


   citydisplay.classList.add("citydisplay");
   tempdisplay.classList.add("tempdisplay");
   humiditydisplay.classList.add("humiditydisplay");
   descdisplay.classList.add("descdisplay");
   weatheremoji.classList.add("weatheremoji");

    card.appendChild(citydisplay)
    card.appendChild(tempdisplay)
    card.appendChild(humiditydisplay)
    card.appendChild(descdisplay)
    card.appendChild(weatheremoji)
};

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
           return "⛈";
        case(weatherId >= 300 && weatherId < 400):
          return "🌧";
        case(weatherId >= 500 && weatherId < 600):
          return "🌧";
        case(weatherId >= 600 && weatherId < 700):
            return "❄";
        case(weatherId >= 500 && weatherId < 600):
            return "🌫";
        case(weatherId === 800):
            return "☀";
        case(weatherId >= 801 && weatherId < 810):
          return "☁";
    }
};

function displayError(message){
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)
};
