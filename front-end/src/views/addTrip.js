import { html, render } from '../lib.js';

const addTripTemplate = (submitTrip) => html`
    <section id="addTrip">
    <h2>Add a New Trip</h2>

    <!-- Basics Section -->
    <details open>
        <summary>Basics</summary>
        <form id="basicsForm">
            <label for="destination">Destination:</label>
            <input type="text" name='destination' id="destination" placeholder="Enter destination" required>

            <label for="beginDate">Begin Date:</label>
            <input type="date" name="beginDate" id="tripDate" required>

            <label for="endDate">End Date:</label>
            <input type="date" name="endDate" id="tripDate" required>

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
            <input type="text"  name="goingCity" id="goingCity" placeholder="Departure city">

            <label for="goingDeparture">Departure Date & Time:</label>
            <input type="datetime-local" name="goingDeparture" id="goingDeparture">

            <label for="goingArriveCity">Arrival City:</label>
            <input type="text"  name="goingArriveCity" id="goingArriveCity" placeholder="Arrival city">

            <label for="goingArrival">Arrival Date & Time:</label>
            <input type="datetime-local" name="goingArrival" id="goingArrival">

            <label for="goingPrice">Price:</label>
            <input type="number" name="goingPrice" id="goingPrice" placeholder="Ticket price" step="0.01">

            <h3>Return</h3>
            <label for="returnCity">Departure City:</label>
            <input type="text" name="returnCity" id="returnCity" placeholder="Departure city">

            <label for="returnDeparture">Departure Date & Time:</label>
            <input type="datetime-local" name="returnDeparture" id="returnDeparture">

            <label for="returnArrivalCity">Arrival City:</label>
            <input type="text" name="returnArrivalCity" id="returnArrivalCity" placeholder="Arrival city">

            <label for="returnArrival">Arrival Date & Time:</label>
            <input type="datetime-local" name="returnArrival" id="returnArrival">

            <label for="returnPrice">Price:</label>
            <input type="number" name="returnPrice" id="returnPrice" placeholder="Ticket price" step="0.01">
        </form>
    </details>

    <!-- Extra Transport Section -->
    <details>
        <summary>Extra Transport</summary>
        <form id="transportForm">
            <div class="transport-row">
                <label for="transportName">Transport Name:</label>
                <input type="text" name="transportName[]" placeholder="e.g., Taxi, Bus">

                <label for="transportPrice">Price:</label>
                <input type="number" name="transportPrice[]" placeholder="Price" step="0.01">
            </div>
            <button type="button" onclick="addTransportRow()">Add Another Transport</button>
        </form>
    </details>

    <!-- Accommodation Section -->
    <details>
        <summary>Accommodation</summary>
        <form id="accommodationForm">
            <label for="accommodationPlace">Place:</label>
            <input type="text"  name="accommodationPlace" id="accommodationPlace" placeholder="Hotel name or location">

            <label for="accommodationPrice">Price:</label>
            <input type="number" name="accommodationPrice" id="accommodationPrice" placeholder="Cost per night" step="0.01">

            <label for="accommodationLink">Link:</label>
            <input type="url" name="accommodationLink" id="accommodationLink" placeholder="Link to accommodation">
        </form>
    </details>
    <button @click=${submitTrip}>Save</button>
</section>

`;

export function showaddTripView(ctx) {
    render(addTripTemplate(submitTrip));
}

async function submitTrip(e) {
    e.preventDefault();

    const basicsForm = document.getElementById('basicsForm');
    const flightForm = document.getElementById('flightForm');
    const transportForm = document.getElementById('transportForm');
    const accommodationForm = document.getElementById('accommodationForm');

    const basicsInfo = new FormData(basicsForm);
    const flightInfo = new FormData(flightForm);
    const transportInfo = new FormData(transportForm);
    const accomInfo = new FormData(accommodationForm);



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

    const accommodationPlace = accomInfo.get('accommodationPlace');
    const accommodationPrice = parseFloat(accomInfo.get('accommodationPrice'));
    const accommodationLink = accomInfo.get('accommodationLink');

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
        accommodationPlace,
        accommodationPrice,
        accommodationLink,
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
        method: 'POST',
        body: formData
    }

    const url = 'http://127.0.0.1:5001/add';

    try {
        const response = await fetch(url,options);       

        const result = await response.json();

        
    } catch (error) {
        alert(error);
    }


}