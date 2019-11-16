const request = require('request')
const key = 'pk.eyJ1Ijoic21zdGFoaXIiLCJhIjoiY2o3ZDRwMTVxMDY0cjJ3bHhycGVvcXpkZSJ9.8uUi7jNY6-X-k_sTna4kYw'
const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=" + key + "&limit=1"

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect')
        } else if (body.features.length === 0) {
            callback('Unable to find location')
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
            })
        }
    })
}

module.exports = geoCode