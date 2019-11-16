const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//index hbs route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shah'
    })
})

//about  hbs route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        companyName: 'weather app',
        name: 'Shah'
    })
})

//help  hbs route
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shah',
        contactUs: 'smstahir1@gmail.com'
    })
})

//404
app.get('/help/*', (req, res) => {
    // res.send('404 not found')
    res.render('error', {
        title: 'Error',
        name: 'Shah',
        errorMessage: 'Article not found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        console.log('no search term')
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        weather: []
    })
})

//view weather
app.get('/weather', (req, res) => {
    if (!req.query.search) {
        console.log('no search term')
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.search, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, { time, temperature, precipProbability, summary }) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location,
                time: new Date(time * 1000),
                temperature,
                precipProbability,
                summary
            })
        })
    })

})

//404
app.get('*', (req, res) => {
    // res.send('404 not found')
    res.render('error', {
        title: 'Error',
        name: 'Shah',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('started')
})