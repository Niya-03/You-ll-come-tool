import {html, render} from '../lib.js';

const myDashboardTemplate = (data) => html `
    <section id="dashboard">
    ${data.length ? data.map(x => cardTemp(x)) : html `<h2>No Trips yet.</h2>`}
</section>
`;

const cardTemp = (item) => html `
    <div class="card">
        <img src=${item.image} alt="Destination 1" class="card-image">
        <div class="card-content">
            <h3 class="destination-name">${item.destination}</h3>
            <p class="trip-year">When: ${item.startDate}</p>
            <p class="creator-name">Created by: ${item.firstName} ${item.lastName}</p>
            <a href="/details/${item.tripId}" class="details-button">Details</a>
        </div>
    </div>
`

export async function showMyDashboardView(ctx){
    try{
        const userData = JSON.parse(localStorage.getItem('user'));
        const userId = userData.userId;
        const response = await fetch('http://127.0.0.1:5001/myTrips/' + userId);
        const data = await response.json();
        console.log(data)
        debugger;
        render(myDashboardTemplate(data.data));
    }catch(error){
        return alert(error);
    }
    
    
}