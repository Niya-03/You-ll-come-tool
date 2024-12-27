import { html, render } from '../lib.js';
import { page } from '../lib.js';

const editTripTemplate = (data, submitTrip) => html`
    <section id="editTrip">
    <h2>Edit Trip</h2>

    <!-- Basics Section -->
    <details open>
        <summary>Basics</summary>
        <form id="basicsForm">
            <label for="destination">Destination:</label>
            <input value=${data.data.destination} type="text" name='destination' id="destination" required>

            <label for="beginDate">Begin Date:</label>
            <input value=${data.data.startDate} type="date" name="beginDate" id="tripDate" required>

            <label for="endDate">End Date:</label>
            <input value=${data.data.endDate} type="date" name="endDate" id="tripDate" required>

            <label for="tripImage">Upload Destination Image:</label>
            <input type="file" name="tripImage" id="tripImage" accept="image/*">
        </form>
    </details>

    <!-- Flight Section -->
    <details>
        <summary>Flight</summary>
        <form id="flightForm">
            <h3>Going</h3>
            <label for="goingCity">Departure City:</label>
            <input type="text" value=${data.data.goingFlight.departCity} name="goingCity" id="goingCity" placeholder="Departure city">

            <label for="goingDeparture">Departure Date & Time:</label>
            <input type="datetime-local" value=${data.data.goingFlight.departDate + 'T' + data.data.goingFlight.departHour} name="goingDeparture" id="goingDeparture">

            <label for="goingArriveCity">Arrival City:</label>
            <input type="text" value=${data.data.goingFlight.arriveCity} name="goingArriveCity" id="goingArriveCity" placeholder="Arrival city">

            <label for="goingArrival">Arrival Date & Time:</label>
            <input type="datetime-local" value=${data.data.goingFlight.arriveDate +'T'+ data.data.goingFlight.arriveHour} name="goingArrival" id="goingArrival">

            <label for="goingPrice">Price:</label>
            <input type="number" value= ${data.data.goingFlight.price} name="goingPrice" id="goingPrice" placeholder="Ticket price" step="0.01">

            <h3>Return</h3>
            <label for="returnCity">Departure City:</label>
            <input type="text" value=${data.data.returnFlight.departCity} name="returnCity" id="returnCity" placeholder="Departure city">

            <label for="returnDeparture">Departure Date & Time:</label>
            <input type="datetime-local" value=${data.data.returnFlight.departDate + 'T' + data.data.returnFlight.departHour} name="returnDeparture" id="returnDeparture">

            <label for="returnArrivalCity">Arrival City:</label>
            <input type="text" value=${data.data.returnFlight.arriveCity} name="returnArrivalCity" id="returnArrivalCity" placeholder="Arrival city">

            <label for="returnArrival">Arrival Date & Time:</label>
            <input type="datetime-local" value=${data.data.returnFlight.arriveDate + 'T' + data.data.returnFlight.arriveHour} name="returnArrival" id="returnArrival">

            <label for="returnPrice">Price:</label>
            <input type="number" value=${data.data.returnFlight.price} name="returnPrice" id="returnPrice" placeholder="Ticket price" step="0.01">
        </form>
    </details>

    <!-- Extra Transport Section -->
    <details>
        <summary>Extra Transport</summary>
        <form id="transportForm">
            <div class="transport-row">
                <label for="transportName">Transport Name:</label>
                <input type="text" value=${data.data.extraTransportDetails.name} name="transportName[]" placeholder="e.g., Taxi, Bus">

                <label for="transportPrice">Price:</label>
                <input type="number" value=${data.data.extraTransportDetails.price} name="transportPrice[]" placeholder="Price" step="0.01">
            </div>
            <button type="button" onclick="addTransportRow()">Add Another Transport</button>
        </form>
    </details>

    <!-- Accommodation Section -->
    <details>
        <summary>Accommodation</summary>
        <form id="accomodationForm">
            <label for="accomodationPlace">Place:</label>
            <input type="text" value=${data.data.accomodation.place} name="accomodationPlace" id="accomodationPlace" placeholder="Hotel name or location">

            <label for="accomodationPrice">Price:</label>
            <input type="number" value=${data.data.accomodation.price} name="accomodationPrice" id="accomodationPrice" placeholder="Cost per night" step="0.01">

            <label for="accomodationLink">Link:</label>
            <input type="url" value=${data.data.accomodation.link} name="accomodationLink" id="accomodationLink" placeholder="Link to accomodation">
        </form>
    </details>
    <button @click=${submitTrip}>Save</button>
</section>

`;

let tripIdGl;

export async function showEditTripView(ctx) {
    const tripId = ctx.params.tripId;
    tripIdGl = tripId;
    const url = 'http://127.0.0.1:5001/details/' + tripId;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            debugger;
            render(editTripTemplate(data, submitTrip));
        } catch (error) {
            return alert(error);
        }

    
}


async function submitTrip(e) {
    e.preventDefault();

    const basicsForm = document.getElementById('basicsForm');
    const flightForm = document.getElementById('flightForm');
    const transportForm = document.getElementById('transportForm');
    const accomodationForm = document.getElementById('accomodationForm');

    const basicsInfo = new FormData(basicsForm);
    const flightInfo = new FormData(flightForm);
    const transportInfo = new FormData(transportForm);
    const accomInfo = new FormData(accomodationForm);



    const destination = basicsInfo.get('destination');
    const beginDate = basicsInfo.get('beginDate');
    const endDate = basicsInfo.get('endDate');
    const tripImage = document.getElementById('tripImage')

    const goingCity = flightInfo.get('goingCity');
    const goingDeparture = flightInfo.get('goingDeparture');
    const goingArriveCity = flightInfo.get('goingArriveCity');
    const goingArrival = flightInfo.get('goingArrival');
    const goingPrice = parseFloat(flightInfo.get('goingPrice'));
    const returnCity = flightInfo.get('returnCity');
    const returnDeparture = flightInfo.get('returnDeparture');
    const returnArrivalCity = flightInfo.get('returnArrivalCity');
    const returnArrival = flightInfo.get('returnArrival');
    const returnPrice = parseFloat(flightInfo.get('returnPrice'));

    const transportName = transportInfo.get('transportName[]');
    const transportPrice = parseFloat(transportInfo.get('transportPrice[]'));

    const accomodationPlace = accomInfo.get('accomodationPlace');
    const accomodationPrice = parseFloat(accomInfo.get('accomodationPrice'));
    const accomodationLink = accomInfo.get('accomodationLink');

    const userId = JSON.parse(localStorage.getItem('user')).userId;

    let bdc = new Date(beginDate);
    let edc = new Date(endDate);

    if(edc < bdc){
        return alert('End date must be after the begin date!')
    }

    let tripObj = {
        destination,
        beginDate,
        endDate,
        goingCity,
        goingDeparture,
        goingArriveCity,
        goingArrival,
        goingPrice,
        returnCity,
        returnDeparture,
        returnArrivalCity,
        returnArrival,
        returnPrice,
        transportName,
        transportPrice,
        accomodationPlace,
        accomodationPrice,
        accomodationLink,
        userId
    };

    const formData = new FormData();

    for (let key in tripObj) {
        // if(!tripObj[key]){
        //     return alert('Fill all fields!');
        // }

        formData.append(key, tripObj[key]);
    }

    if (tripImage && tripImage.files.length > 0) {
        formData.append('tripImage', tripImage.files[0]);
    }

    const options = {
        method: 'PUT',
        body: formData
    }

    const url = 'http://127.0.0.1:5001/edit/' + tripIdGl;

    try {
        const response = await fetch(url,options);       

        const result = await response.json();
        page.redirect('/');

        
    } catch (error) {
        alert(error);
    }


}