// weatherapp.com
// weatherapp.com/help
// weatherapp.com/about

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//establishes paths so pages loads if you dont explicitly declare a path
const app = express()
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(path.join(__dirname, '../public'))
//configures public server - static directory
app.use(express.static(publicDirectoryPath))



//Renaming the default path that the computer is looking for views to live in
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
// Allows us to render the hbs pages WITHOUT using html or res.send
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)




app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jordan Mobley'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jordan Mobley'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Jordan Mobley'
    })
})



//Can return html and JSON elements to page 
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Jordan',
//         age: 26
//     })
// })

// //challenge to add two new routes to server (about, weather)
// //challenge update lst two routes, weather = JSON, about = title HTML
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is needed'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
            forecast: forecastData, 
            location,
            address: req.query.address
        })
        })
    })

    // res.send({
    //     forecast: 'It is currently sunny',
    //     location: 'Live from Charlotte',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a search term'
        })
    }

    req.query
    res.send( {
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jordan Mobley',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jordan Mobley',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

