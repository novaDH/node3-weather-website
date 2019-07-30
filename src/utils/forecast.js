const request = require('request')
// Forecast Callback

const forecast = (longitude, latitude, callback) => {
const url='https://api.darksky.net/forecast/9236b059e5b7015201dec514e8ffc1ce/'+latitude+','+longitude+'?units=si'
 
request({url, json: true},(error, {body}) => {
    if (error){
        callback('Unable to connect to weather services!', undefined)
    } else if (body.error){
        callback('Error code: ' + body.code + '. Message: ' + body.error, undefined)
    } else {
        callback(undefined, body.daily.data[0].summary + ' It\'s currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability+'% chance of rain.')
    }
})
}

module.exports = forecast