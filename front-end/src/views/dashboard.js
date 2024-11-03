import {html, render} from '../lib.js';

const dashboardTemplate = () => html `
    <section id="dashboard">
    <div class="trip">
        
        <img src='' alt="example1" />
        <h3 class="destination">Milano 2024</h3>
        <p class="creator">By Niya</p>

        <a class="details-btn" href="/details">Details</a>
    </div>
</section>
`;

export function showDashboardView(ctx){
    console.log("this is dashboard")
    render(dashboardTemplate());
}