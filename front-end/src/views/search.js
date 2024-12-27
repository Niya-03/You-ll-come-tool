import {html, render} from '../lib.js';

const dashboardTemplate = (data) => html `
    <section id="dashboard">
    ${data.length ? data.map(x => cardTemp(x)) : html `<h2>No Results Found.</h2>`}
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

export async function showSearchView(ctx){
    try{
        debugger;
        let query = ctx.params.query;
        const response = await fetch('http://127.0.0.1:5001/search/' + query);
        const data = await response.json();
 
        debugger;
        render(dashboardTemplate(data.data));
    }catch(error){
        return alert(error);
    }
    
    
}