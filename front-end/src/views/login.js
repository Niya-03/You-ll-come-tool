import {html, render} from '../lib.js';
import { updateNav } from '../util.js';

const loginTemplate = () => html `
    <section id="login">
    <img src="./front-end/images/logo.png" id="signin-logo">
    <h1 id="signin-header">
        Sign In
    </h1>
    <div class="signin-div">

        <form id="login-form">
            <div>
                <input id="login-email" type="email" placeholder="Email"></input>
            </div>

            
            <div>
                <input id="login-password" type="password" placeholder="Password"></input>
            </div>


            <div>
                <button type="submit" id="next-btn">Submit</button>
            </div>

            <section id="error-msg">
                <h4>There was an error. Try again</h4>
            </section>

            <div>
                <p>If you dont have an account, sign up <a href="/register">here</a></p>
            </div>

        </form>
        <h2 id="errorMessage"></h2>
    </div>

        </section>
`;

export function showLoginView(ctx){
    console.log("this is login")
    render(loginTemplate());
}

const USERS = [
    {
        "email": "a@b.c",
        "password": "123"
    },
    {
        "email": "d@b.c",
        "password": "123"
    }, {
        "email": "e@b.c",
        "password": "123"
    }, {
        "email": "f@b.c",
        "password": "123"
    },
];


//1. Capture user input
//2. Check if user exists
//3. check if user credentials match provided details
//4. if match => go to home lese go to signin fail


const loginform = document.getElementById('login-form');
if (loginform) {
    loginform.addEventListener('submit', signin);
}


function signin(e) {
    e.preventDefault();
    const errorParagraph = document.getElementById("errorMessage");
    errorParagraph.innerText = "";
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');

    if (email.value == "" || password.value == "") {
        return;
    }

    for (let user of USERS) {
        if (user.email == email.value) {
            if (user.password == password.value) {
                updateNav();
                //page.redirect('/');
                
            }
        }
    }


    errorParagraph.innerHTML = "invalid user credentials";
    errorParagraph.style.color = 'red';

}