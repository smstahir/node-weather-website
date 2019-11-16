const request = require('request')
const key = 'e3fb8d4dc8af77b9b98ef8bcf129f1af'
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + key + '/' + latitude + ',' + longitude + '?units=auto'
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('error', undefined)
        } else if (body.error) {
            callback('error', undefined)
        } else {
            callback(undefined, body.currently)
        }
    })
}


module.exports = forecast