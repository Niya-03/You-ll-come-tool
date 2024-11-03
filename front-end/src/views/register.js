import { html, render } from '../lib.js';

const registerTemplate = () => html`
<section id="register">
    <img id="signup-logo" src="./front-end/images/logo.png">
    <h1 id="signup-header">
        Sign Up
    </h1>
    <div class="signup-div">
        <form>
            <div>
                <input type="text" placeholder="First name"></input>
            </div>
            <div>
                <input type="text" placeholder="Last name"></input>
            </div>
            <div>
                <input type="email" placeholder="Email"></input>
            </div>
            <div>
                <input type="password" placeholder="Password"></input>
            </div>
            <div>
                <input type="password" placeholder="Confirm password"></input>
            </div>
            <div>
                <p><input type="checkbox">I agree with everything you want to do with my data. Thanks :)</input></p>
            </div>
            <div>
                <p><input type="checkbox">I trust you have good privacy policy</input></p>
            </div>
                <button type="submit" id="next-btn">Next</button>
            
                <p>If you dont have an account, sign in <a href="/login">here</a></p>
            
        </form>
    </div>
    <section>
`;

export function showRegisterView(ctx) {
    console.log("this is register")
    render(registerTemplate());
}