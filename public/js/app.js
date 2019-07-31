

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

    fetch('/weather?address='+ location).then((response) => {

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