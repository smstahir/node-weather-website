
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('/weather?search=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                alert(data.error)
            } else {
                document.querySelector('#location').textContent = data.location
                document.querySelector('#time').textContent = data.time
                document.querySelector('#temperature').textContent = (data.temperature + '°C')
                document.querySelector('#precipitation').textContent = data.precipProbability
                document.querySelector('#summary').textContent = data.summary
                console.log('Location:', data.location)
                console.log('Time:', data.time)
                console.log('Temperature:', data.temperature)
                console.log('Precipitation:', data.precipProbability)
                console.log('Summary:', data.summary)
            }
        })
    })
})