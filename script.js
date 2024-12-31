const API_KEY = "333495539fbe4b8b93182401242812";
const baseURL = "https://api.weatherapi.com/v1/current.json";

function weatherRequest(fetchRequest) {

    let requestURL = `${baseURL}?key=${API_KEY}&q=${fetchRequest}&aqi=no`
    // http://api.weatherapi.com/v1/current.json?key=333495539fbe4b8b93182401242812&q=London&aqi=no

    fetch(requestURL)
    .then((response) => {
        if (response.ok){
            return response.json();
        }
    })
    .then((data) => {
        displayweather(data);
    })

}

function displayweather(data) {
    const weatherCard = document.querySelector(".weather-card");

    let locationname = data["location"].name;
    let locationregion = data["location"].region;
    let locationcountry = data["location"].country;

    let locationtime = new Date(data["location"].localtime_epoch*1000);

    //set icon.
    weatherCard.querySelector("#weather-icon").setAttribute("src", data["current"]["condition"]["icon"]);

    //set location name
    weatherCard.querySelector("#location-name").textContent = `${locationname}, ${locationregion}, ${locationcountry}`

    //set location time
    weatherCard.querySelector("#current-time").textContent = `Current Time: ${locationtime.toDateString()}, ${locationtime.toLocaleTimeString()}`

    //set location temperature
    weatherCard.querySelector("#temperature").textContent = `Temperature: ${data["current"].temp_c} °C`

    //set temperature information
    weatherCard.querySelector("#description").textContent = data["current"]["condition"]["text"];
}


const textfield = document.querySelector("#location")
document.getElementById('search-button').addEventListener('click', function() {
    const weatherCard = document.getElementById('weather-card');
    weatherRequest(textfield.value);
    weatherCard.classList.remove('hidden');
});