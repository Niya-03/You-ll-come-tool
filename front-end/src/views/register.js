import { html, render } from '../lib.js';
import { page } from '../lib.js';
import { updateNav } from '../util.js';

const registerTemplate = (signup) => html`
<section id="register">
    <img id="signup-logo" src="./front-end/images/logo.png">
    <h1 id="signup-header">
        Sign Up
    </h1>
    <div class="signup-div">
        <form @submit=${signup} id="signup-form">
            <div>
                <input id="firstname" type="text" placeholder="First name"></input>
            </div>
            <div>
                <input id="lastname" type="text" placeholder="Last name"></input>
            </div>
            <div>
                <input id="reg-email" type="email" placeholder="Email"></input>
            </div>
            <div>
                <input id="reg-password" type="password" placeholder="Password"></input>
            </div>
            <div>
                <input id="confirm-password" type="password" placeholder="Confirm password"></input>
            </div>
            <div>
                <p><input id="terms" type="checkbox">I agree with everything you want to do with my data. Thanks :)</input></p>
            </div>
            <div>
                <p><input id="privacy" type="checkbox">I trust you have good privacy policy</input></p>
            </div>
                <button type="submit" id="next-btn">Next</button>
            
                <p>If you dont have an account, sign in <a href="/login">here</a></p>
            
        </form>
    </div>
    <section>
`;



export function showRegisterView(ctx) {
    console.log("this is register")
    render(registerTemplate(signup));
}



// const registerBtn = document.getElementById('next-btn');
// registerBtn.addEventListener('click', signup)


// const form = document.getElementById('signup-form');
// if (form) {
//     form.addEventListener('submit', signup);
// }



function stopFormDefault(event) {
    event.preventDefault();
    // actual logic, e.g. validate the form
    console.log('Form submission cancelled.');
}

function signup(e) {
    e.preventDefault();

    let user;

    if(localStorage.getItem('user') == null){
         user = {
                    firstName: undefined,
                    lastName: undefined,
                    email: undefined,
                    password: undefined,
                };
            
    }else{
        user = localStorage.getItem('user');
        user = JSON.parse();
    }

    const password = document.getElementById('reg-password');
    const confirmPassword = document.getElementById('confirm-password');

    if (password.value == "" || password.value != confirmPassword.value) {
        console.log("passwords are different");
        return;
    }

    const terms = document.getElementById('terms');
    const privacy = document.getElementById('privacy');

    if (!terms.checked) {
        console.log('Terms not checked');
        return;
    }

    if (!privacy.checked) {
        console.log('privacy not checked!');
        return;
    }

    user.firstName = document.getElementById('firstname').value;
    user.lastName = document.getElementById('lastname').value;
    user.email = document.getElementById('reg-email').value;
    user.password = password.value;


    const url = "http://127.0.0.1:5001/signup"
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    };
    fetch(url, options).then(responseArrived).then(responseBodyReceived).catch(errorHappened);

    localStorage.setItem('user', JSON.stringify(user));

    //window.location.replace('signup-2.html');
    updateNav();
    page.redirect('/');

}

function responseBodyArrived(response){
    console.log(response);
}

function responseArrived(response) {
    if (!response.ok) {
        throw new Error("Failed to get data.");
    }
    return response.json();
}

function responseBodyReceived(response) {
    window.localStorage.setItem('user-id', response.data.id);
    window.localStorage.setItem('user-first-name', response.data.first_name);
    window.location.replace("signup-2.html");
}

function errorHappened(response) {
    console.log("Error!!!");
    console.log(response);
}