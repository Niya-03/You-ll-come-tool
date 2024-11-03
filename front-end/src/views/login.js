import {html, render} from '../lib.js';

const loginTemplate = () => html `
    <section id="login">
    <img src="./front-end/images/logo.png" id="signin-logo">
    <h1 id="signin-header">
        Sign In
    </h1>
    <div class="signin-div">

        <form>
            <div>
                <input type="email" placeholder="Email"></input>
            </div>

            
            <div>
                <input type="password" placeholder="Password"></input>
            </div>


            <div>
                <button type="submit" id="next-btn">Submit</button>
            </div>

            <section id="error-msg">
                <h4>There was an error. Try again</h4>
            </section>

            <div>
                If you dont have an account, sign up <a href="">here</a>
            </div>

        </form>
    </div>

        </section>
`;

export function showLoginView(ctx){
    console.log("this is login")
    render(loginTemplate());
}