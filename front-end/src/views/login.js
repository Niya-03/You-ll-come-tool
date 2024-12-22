import {html, render} from '../lib.js';
import { updateNav } from '../util.js';
import { page } from '../lib.js';


const loginTemplate = (signin) => html `
    <section id="login">
    <img src="./front-end/images/logo.png" id="signin-logo">
    <h1 id="signin-header">
        Sign In
    </h1>
    <div class="signin-div">

        <form @submit=${signin} id="login-form">
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
    render(loginTemplate(signin));
}



async function signin(e) {
    e.preventDefault();
    const errorParagraph = document.getElementById("errorMessage");
    errorParagraph.innerText = "";
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');

    if (email.value == "" || password.value == "") {
        return alert("Fill all fields!");
    }

    const user = {
        email: email.value,
        password: password.value
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }

    const url = 'http://127.0.0.1:5001/signin';

    try {
        
        const response = await fetch(url, options);

        if(!response.ok){
            throw new Error(response.json())
        }
        debugger;
        const result = await response.json();

        localStorage.setItem('user', JSON.stringify({'email':result.data.email ,'userId':result.data.userId}));
        updateNav();
        page.redirect('/');

    } catch (error) {
        console.log(error)
    }


    errorParagraph.innerHTML = "invalid user credentials";
    errorParagraph.style.color = 'red';

  
    

}
