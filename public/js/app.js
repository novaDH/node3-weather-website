console.log('JS loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')

// msgOne.textContent = 'from javascript'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    msgOne.textContent = 'Loading ...'
    msgTwo.textContent = ''

    fetch('http://127.0.0.1:3000/weather?address='+ location).then((response) => {

    response.json().then((data) => {
        if (data.error){
            msgOne.textContent = data.error
        } else {
            // console.log(data)
            
            msgOne.textContent = data.state
            msgTwo.textContent = data.location
        
    }
    })
})
})