import {html, render} from '../lib.js';

const addTripTemplate = () => html `
    <section id="addTrip">
    <h2>Add a New Trip</h2>

    <!-- Basics Section -->
    <details open>
        <summary>Basics</summary>
        <form id="basicsForm">
            <label for="destination">Destination:</label>
            <input type="text" id="destination" placeholder="Enter destination" required>

            <label for="tripDate">Trip Date:</label>
            <input type="date" id="tripDate" required>

            <label for="tripImage">Upload Destination Image:</label>
            <input type="file" id="tripImage" accept="image/*">
        </form>
    </details>

    <!-- Flight Section -->
    <details>
        <summary>Flight</summary>
        <form id="flightForm">
            <h3>Going</h3>
            <label for="goingCity">City:</label>
            <input type="text" id="goingCity" placeholder="Departure city">

            <label for="goingDeparture">Departure Date & Time:</label>
            <input type="datetime-local" id="goingDeparture">

            <label for="goingPrice">Price:</label>
            <input type="number" id="goingPrice" placeholder="Ticket price" step="0.01">

            <h3>Return</h3>
            <label for="returnCity">City:</label>
            <input type="text" id="returnCity" placeholder="Return city">

            <label for="returnDeparture">Return Date & Time:</label>
            <input type="datetime-local" id="returnDeparture">

            <label for="returnPrice">Price:</label>
            <input type="number" id="returnPrice" placeholder="Ticket price" step="0.01">
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
            <input type="text" id="accommodationPlace" placeholder="Hotel name or location">

            <label for="accommodationPrice">Price:</label>
            <input type="number" id="accommodationPrice" placeholder="Cost per night" step="0.01">

            <label for="accommodationLink">Link:</label>
            <input type="url" id="accommodationLink" placeholder="Link to accommodation">
        </form>
    </details>
    <button>Save</button>
</section>

`;

export function showaddTripView(ctx){
    console.log("this is add")
    render(addTripTemplate());
}