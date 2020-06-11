const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&%20exclude=hourly,daily&appid=276d18028d17059ec66fa8a2aa637f5f&units=metric&lang=pt_br'

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connetct to weather service!', undefined)
        } else if (body.message) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                temperature: Math.round(body.current.temp),
                weather: body.current.weather[0].description,
                min: Math.round(body.daily[0].temp.min),
                max: Math.round(body.daily[0].temp.max)
            })
        }
    })        
}

module.exports = forecast