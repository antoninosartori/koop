const newsletter_form = document.querySelector('.newsletter_form');
const newsletter_input = document.querySelector('.newsletter_input');
const newsletter_button = document.querySelector('.newsletter_button');

const newsletter_loading = document.querySelector('.newsletter_loading');
const newsletter_sentMessage = document.querySelector('.newsletter_sent-message');
const newsletter_errorMessage = document.querySelector('.newsletter_error-message');
const spanError = document.querySelector('.spanError');

let errorMessageText;

const API_KEY = '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'

// Ha ocurrido un error, intente nuevamente!

newsletter_form.addEventListener('submit', (event) => {
    event.preventDefault();
    newsletter_loading.classList.add('newsletter_inactive');
    newsletter_sentMessage.classList.add('newsletter_inactive');
    newsletter_errorMessage.classList.add('newsletter_inactive');

    const email = event.target.email.value;
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(email === '') {
        newsletter_loading.classList.add('newsletter_inactive');
        newsletter_sentMessage.classList.add('newsletter_inactive');
        newsletter_errorMessage.classList.remove('newsletter_inactive');

        errorMessageText = 'Por favor, escriba un email';
        spanError.textContent = errorMessageText;
        return
    }

    if(email && !regexEmail.test(email)){
        newsletter_loading.classList.add('newsletter_inactive');
        newsletter_sentMessage.classList.add('newsletter_inactive');
        newsletter_errorMessage.classList.remove('newsletter_inactive');

        errorMessageText = 'Por favor, escribe un email valido';
        spanError.textContent = errorMessageText;
        return;
    }

    newsletter_loading.classList.remove('newsletter_inactive');

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': API_KEY
        },
        body: JSON.stringify({email})
        };
          
    fetch('https://api.sendinblue.com/v3/contacts', options)
        .then(response => response.json())
        .then(response => {
            newsletter_loading.classList.add('newsletter_inactive');
            newsletter_sentMessage.classList.remove('newsletter_inactive');
            newsletter_errorMessage.classList.add('newsletter_inactive');
            console.log(response)
        })
        .catch(err => {
            console.error(err)
            newsletter_loading.classList.add('newsletter_inactive');
            newsletter_sentMessage.classList.add('newsletter_inactive');
            newsletter_errorMessage.classList.remove('newsletter_inactive');
            spanError.textContent = 'Lo siento, ha ocurrido un error. Intente nuevamente'
        })

})