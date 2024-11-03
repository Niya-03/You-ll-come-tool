import {html, render} from '../lib.js';

const dashboardTemplate = () => html `
    <section id="dashboard">
    <div class="card">
        <img src="./front-end/images/milano.jpg" alt="Destination 1" class="card-image">
        <div class="card-content">
            <h3 class="destination-name">Destination Name 1</h3>
            <p class="trip-year">Year: 2024</p>
            <p class="creator-name">Created by: User 1</p>
            <a href="/details" class="details-button">Details</a>
        </div>
    </div>
</section>
`;

export function showDashboardView(ctx){
    console.log("this is dashboard")
    render(dashboardTemplate());
}