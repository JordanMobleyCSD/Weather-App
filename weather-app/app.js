// const request = require('request') // no longer used since we got rid o the old requet at the bottom 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const address = process.argv[2]

//error handling if no address is provided 
if (!address) {
    console.log('Please provide an address')
} else {
    // callback chaining so they work together instead of logging seperately
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
         return console.log(error)
    }

        forecast(latitude, longitude, (error, forecastData) => {
             if (error) {
                return console.log(error)
        }

        console.log(location)
        console.log(forecastData)
})
})
}

console.log(process.argv)









//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)






// --- Old request --- //
// const url = 'https://api.weatherstack.com/current?access_key=fabe066a5798f70ffa9ba43ffeffc112&query=35.0074,80.9451&units=f'
// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + '- It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' +response.body.current.feelslike + ' degrees out.'
//     )}
    
//     // console.log(response.body.current)
    
// })