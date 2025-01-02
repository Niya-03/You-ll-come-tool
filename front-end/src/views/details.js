import { html, render } from '../lib.js';
import { page } from '../lib.js';   

const detailsTemplate = (data, tripId, userId, fullPrice, calc, isAdmin, goingList, userIdHasJoined) => html`
    <section id="details">
    
    <div class="container">

        <div class="detailBox">
            <h2><i>${data.data.ownerFirstName}'s trip</i></h2>
        </div>

        <div class="detailBox">
            <h2>Destination: ${data.data.destination}</h2>
        </div>

        <div class="detailBox">
            <h2>Dates: ${data.data.startDate} to ${data.data.endDate}</h2>
        </div>

        <div class="detailButtons">
            ${userId == data.data.ownerId || isAdmin ? html`<a id='editBtn' href="/edit/${tripId}" class="details-button">Edit</a>` : ''}
            ${userId == data.data.ownerId || isAdmin ? html`<a id='deleteBtn' href="/delete/${tripId}" class="details-button">Delete</a>` : ''}
        </div>
    

        <div class="flight-options">
            <h3>Flight Options</h3>
 
            <div class="flight-box">
                <div class="box-title">Going</div>
                <div class="details">
                    <p>Departs: ${data.data.goingFlight.departDate}</p>
                    <p>City: ${data.data.goingFlight.departCity}</p>
                    <p>Hour: ${data.data.goingFlight.departHour}</p>
                </div>
                <div class="details">
                    <p>Arrives: ${data.data.goingFlight.arriveDate}</p>
                    <p>City: ${data.data.goingFlight.arriveCity}</p>
                    <p>Hour: ${data.data.goingFlight.arriveHour}</p>
                </div>
                <div class="divider"></div>
                <div class="price">Price: ${data.data.goingFlight.price}€</div>
            </div>

  
            <div class="flight-box">
                <div class="box-title">Return</div>
                <div class="details">
                    <p>Departs: ${data.data.returnFlight.departDate}</p>
                    <p>City: ${data.data.returnFlight.departCity}</p>
                    <p>Hour: ${data.data.returnFlight.departHour}</p>
                </div>
                <div class="details">
                    <p>Arrives: ${data.data.returnFlight.arriveDate}</p>
                    <p>City: ${data.data.returnFlight.arriveCity}</p>
                    <p>Hour: ${data.data.returnFlight.arriveHour}</p>
                </div>
                <div class="divider"></div>
                <div class="price">Price: ${data.data.returnFlight.price}€</div>
            </div>
        </div>


        <div class="extra-transport">
            <h3>Extra Transport</h3>

      
            <div class="transport-row">
                <p class="text-field">Type: ${data.data.extraTransportDetails.name}</p>
                <span class="transport-price">Price: ${data.data.extraTransportDetails.price}€</span>
            </div>
            
        </div>

        <div class="accommodation">
            <h3>Accommodation</h3>

            <div class="accommodation-row">
                <p class="text-field">Place: ${data.data.accomodation.place}</p>
            </div>

            <div class="accommodation-row">
                <p class="text-field">Price: ${data.data.accomodation.price}€</p>
            </div>
   
            <div class="accommodation-row">
                <p class="text-field">Link: <a href=${data.data.accomodation.link}
                target="_blank">${data.data.accomodation.link}</a></p>
            </div>
        </div>

        <div class='calculator'>
            <p class="text-field">Full price: ${fullPrice}€<p>
            <p class="text-field">How many people are coming?</p>
            <input id='pCount' @change=${calc} placeholder='Count of people'>
            <p id='pResult' class="text-field">Price per person: </p>
        </div>
    </div>


    <button id="copyButton" class="fixed-copy-btn">Share with your friends!</button>
    <span id="copyMessage" class="copy-message">Link copied!</span>

    
    ${userId ? html`<button
            id="addGoingBtn"
            type="button"
            class="add-going-btn ${userIdHasJoined ? 'going' : ''}">
            ${userIdHasJoined ? 'Leave the trip' : 'Will you join them?'}
            
        </button>` : ''}
   
    ${userId ? html`<div class='goingList'>       
        ${goingList.data.length ? goingList.data.map(x => cardTemp(x)) : ''}
    </div>` : ''}

    

</section>
`;

const cardTemp = (item) => html `
    <div class="goingList-item">
        <p>${item.firstName} ${item.lastName}</p>
    </div>
`

let fPrice;

function calc(){
    let count = Number(document.getElementById('pCount').value).toFixed(0);
    document.getElementById('pResult').textContent = `Price per person: ${(fPrice/count).toFixed(2)}€`;

}

let tripIdg;
let userIdg;

export async function showDetailsView(ctx) {
    const tripId = ctx.params.tripId;
    tripIdg = tripId;
    const url = 'http://127.0.0.1:5001/details/' + tripId;
    try {
        const response = await fetch(url);
        const data = await response.json();
        let userId = 0;
        let isAdmin;

        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));
            userId = user.userId;
            isAdmin = user.isAdmin;
            userIdg = userId;
        } else {
            userId = null;
        }

        let fullPrice =
            (parseFloat(String(data.data.goingFlight.price)) || 0) +
            (parseFloat(String(data.data.returnFlight.price)) || 0) +
            (parseFloat(String(data.data.extraTransportDetails.price)) || 0) +
            (parseFloat(String(data.data.accomodation.price)) || 0);

        fPrice = fullPrice;

        const response2 = await fetch(`http://127.0.0.1:5001/getGoingTrip/${tripId}`);
        const goingList = await response2.json();
        let userIdHasJoined = goingList.data.some(x => x.userId === userId);

        render(detailsTemplate(data, tripId, userId, fullPrice, calc, isAdmin, goingList, userIdHasJoined));

        if(document.getElementById('deleteBtn')){
            document.getElementById('deleteBtn').addEventListener('click', deleteTrip);
        }

        if( document.getElementById('addGoingBtn')){
            document.getElementById('addGoingBtn').addEventListener('click', toggleGoing);
        }
        

    } catch (error) {
        return alert(error);
    }

    // async function addGoing(e){
    //     debugger;
    //     e.preventDefault();

    //     const response = await fetch(`http://127.0.0.1:5001/addGoingTrip/${tripIdg}/${userIdg}`, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         }            
    //     });

    //     if (response.ok){
    //         await updateGoingList();
    //     }

    // }

    async function toggleGoing(e) {
        e.preventDefault();
    
        const isGoing = document.getElementById('addGoingBtn').classList.contains('going');
    
        try {
            const response = await fetch(
                isGoing
                    ? `http://127.0.0.1:5001/removeGoingTrip/${tripIdg}/${userIdg}`
                    : `http://127.0.0.1:5001/addGoingTrip/${tripIdg}/${userIdg}`,
                {
                    method: isGoing ? 'DELETE' : 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            if (response.ok) {
    
                const button = document.getElementById('addGoingBtn');
                if (isGoing) {
                    button.textContent = "Will you join them?";
                    button.classList.remove('going');
                } else {
                    button.textContent = "Leave the trip";
                    button.classList.add('going');
                }
                debugger;
               return page.redirect(`/details/${tripIdg}`)
            } else {
                console.error("Failed to toggle going status");
            }
        } catch (error) {
            console.error("Error in toggleGoing:", error);
        }
    }
    

    async function deleteTrip(e) {
        e.preventDefault();
      
            try{
                const response = await fetch(`http://127.0.0.1:5001/deleteTrip/${tripIdg}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
        
                if(response.ok){
                    page.redirect('/alltrips');
                }
            }catch(e){
                return alert(e)
            }
    
    }

    document.getElementById("copyButton").addEventListener("click", () => {
        const pageLink = window.location.href;

        navigator.clipboard.writeText(pageLink)
            .then(() => {
                const copyMessage = document.getElementById("copyMessage");
                copyMessage.classList.add("visible");
                setTimeout(() => {
                    copyMessage.classList.remove("visible");
                }, 2000);
            })
            .catch((err) => console.error("Failed to copy: ", err));
    });
}

