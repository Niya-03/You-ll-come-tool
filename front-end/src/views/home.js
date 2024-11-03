import {html, render} from '../lib.js';

const homeTemplate = () => html `
    <section id="home">
            <h1>Welcome to You'll come tool. The app to use to make your friends go to budget trips.</h1>
        </section>
`;

export function showHomeView(ctx){
    console.log("this is home")
    render(homeTemplate());
}