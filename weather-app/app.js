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




