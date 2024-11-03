import {html, render} from '../lib.js';

const homeTemplate = () => html `
    <section id="home">
    <div class="intro-block">
        <h1>Ready for your next trip?</h1>
    </div>
</section>

<section id="airplane-section">
    <div class="parallax-background"></div>
    <div class="airplane-content">
        <div class="text-content">
            <h2>Are you sick of sending pictures of pages of trip planning? But how much is the plane ticket? Where will we stay?</h2>
            <p>I am sick too. Now you can send one link with all the information and make your friends come too</p>
        </div>
        <a href="/alltrips"><button class="check-trips-btn" href="/alltrips">See all trips</button></a>
    </div>
</section>
`;

export function showHomeView(ctx){
    console.log("this is home")
    render(homeTemplate());
}