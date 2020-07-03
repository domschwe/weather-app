const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZG9tc2Nod2UiLCJhIjoiY2s5aGU1bWxuMHFkcTNscG5oc20yZmh3byJ9.UJUXjUzXbH95C06NtC_IDA&limit=1'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback ('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1], 
                long:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode