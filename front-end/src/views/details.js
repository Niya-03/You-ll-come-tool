import {html, render} from '../lib.js';

const detailsTemplate = (data) => html `
    <section id="details">
    <div class="container">
        <div class="detailBox">
            <h2><i>${data.ownerFirstName}'s trip</i></h2>
        </div>

        <div class="detailBox">
            <h2>Destination: ${data.destination}</h2>
        </div>

        <div class="detailBox">
            <h2>Dates: ${data.startDate} - ${data.endDate}</h2>
        </div>

        <div class="flight-options">
            <h3>Flight Options</h3>
            <!-- Going Box -->
            <div class="flight-box">
                <div class="box-title">Going</div>
                <div class="details">
                    <p>Departs:</p>
                    <p>City: ${data.goingFlight.departCity}</p>
                    <p>Hour: ${data.goingFlight.departHour}</p>
                </div>
                <div class="details">
                    <p>Arrives:</p>
                    <p>City: ${data.goingFlight.arriveCity}</p>
                    <p>Hour: ${data.goingFlight.arriveHour}</p>
                </div>
                <div class="divider"></div>
                <div class="price">Price: ${data.goingFlight.price}</div>
            </div>

            <!-- Return Box -->
            <div class="flight-box">
                <div class="box-title">Return</div>
                <div class="details">
                    <p>Departs:</p>
                    <p>City: ${data.returnFlight.departCity}</p>
                    <p>Hour: ${data.returnFlight.departHour}</p>
                </div>
                <div class="details">
                    <p>Arrives:</p>
                    <p>City: ${data.returnFlight.arriveCity}</p>
                    <p>Hour: ${data.returnFlight.arriveHour}</p>
                </div>
                <div class="divider"></div>
                <div class="price">Price: ${data.returnFlight.price}</div>
            </div>
        </div>


        <div class="extra-transport">
            <h3>Extra Transport</h3>

            <!-- Transport rows -->
            <div class="transport-row">
                <p class="text-field">Type: ${data.extraTransportDetails.name}</p>
                <span class="transport-price">Price: ${data.extraTransportDetails.price}</span>
            </div>
            
        </div>

        <div class="accommodation">
            <h3>Accommodation</h3>
            <!-- Row for place -->
            <div class="accommodation-row">
                <p class="text-field">Place: ${data.accomodation.place}</p>
            </div>
            <!-- Row for price -->
            <div class="accommodation-row">
                <p class="text-field">Price: ${data.accomodation.price} euro</p>
            </div>
            <!-- Row for link -->
            <div class="accommodation-row">
                <p class="text-field">Link: <a href=${data.accomodation.link}
                        target="_blank">${data.accomodation.link}</a></p>
            </div>
        </div>
    </div>
</section>
`;

export async function showDetailsView(ctx){
    const tripId = ctx.params.tripId;
    const url = 'http://127.0.0.1:5001/details/' + tripId;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)

        render(detailsTemplate(data));
    } catch (error) {
        return alert(error);
    }
    
}