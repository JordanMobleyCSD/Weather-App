const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) +'&access_token=${MB_TOKEN}'

    // No need to use response anymore with destructuring because we can directly refrence the body
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address

            })
        }
    })
}



module.exports = geocode




// // Geocoding to change location into lat and long
// // Input address and convert to lat/long 

// const geoCodeURL = 'https://api.mapbox.com/search/geocode/v6/forward?q=Los%20Angeles&access_token=pk.eyJ1IjoiYWthcmk0IiwiYSI6ImNtZXgxMXZ1bjEwOXgya3BvbzNhYXZ4amkifQ.0AEHIBqpB6kwBLN2CgwP_g'

// request({ url: geoCodeURL, json: true }, (error, response) => {
// if (error) {
//     console.log.log('Unable to connect to location services')
// } else if (body.features.length === 0) {
// console.log('Unable to find location. Try another search.')
// } else {
//     const latitude = body.features[0].geometry.coordinates[1]
//     const longitude = body.features[0].geometry.coordinates[0]
//     console.log(latitude, longitude)
// }
// })