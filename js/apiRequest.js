const fetch = require("node-fetch");
const City = require('./model');

async function getWeatherByCityName(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return City.buildModelFromJson(json);
    } else {
        return response.status;
    }
}

async function getWeatherByCoordinates(latitude, longitude) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_KEY}`;

    let response = await fetch(url);
    if (response.ok) {
        let json = await response.json();
        return City.buildModelFromJson(json);
    } else {
        return response.status;
    }
}

module.exports = {
    getWeatherByCityName,
    getWeatherByCoordinates
}