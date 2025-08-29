console.log('Client side JavaScript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



//Interactive form for information to display client side
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value   

    //Render info upon immediate input, placeholder to tell user something is happening
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //Allows the API to validate the location to determine if the location can be used
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            //Render upon successful input
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})