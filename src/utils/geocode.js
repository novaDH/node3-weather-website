const request = require('request')

// Geocoding Callback
const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZHVtaXRydS1zaWx2aXUyazEzIiwiYSI6ImNqeWlxZXBuMzAyNjQzbm54cjViNXZ3aHoifQ.0PU7dYV8Q7Zo1j96MaGNbQ&limit=1'

request({url, json: true},(error, {body}) => { 
    if (error){
        callback('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0){
        callback('Unable to find location, try another search', undefined)
    } else {
        callback(undefined, {
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            location: body.features[0].place_name

        })
    }
})
}

module.exports = geocode









    //     const url1='https://api.darksky.net/forecast/9236b059e5b7015201dec514e8ffc1ce/45.665,25.615?units=si'
 
// request({url: url1, json: true},(error, response) => {
//     // console.log(response.body.currently)
//     if (error){
//         callback('Unable to connect to weather services!')
//     } else if (response.body.error){
//         callback('Error code: ' + response.body.code + '. Message: ' + response.body.error)
//     } else {
//     callback(response.body.daily.data[0].summary + ' It\'s currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability+'% chance of rain.')
//     }
// })
// }