import { html, render } from '../lib.js';

const detailsTemplate = (data) => html`
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

        <div class="flight-options">
            <h3>Flight Options</h3>
            <!-- Going Box -->
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
                <div class="price">Price: ${data.data.goingFlight.price}</div>
            </div>

            <!-- Return Box -->
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
                <div class="price">Price: ${data.data.returnFlight.price}</div>
            </div>
        </div>


        <div class="extra-transport">
            <h3>Extra Transport</h3>

            <!-- Transport rows -->
            <div class="transport-row">
                <p class="text-field">Type: ${data.data.extraTransportDetails.name}</p>
                <span class="transport-price">Price: ${data.data.extraTransportDetails.price}</span>
            </div>
            
        </div>

        <div class="accommodation">
            <h3>Accommodation</h3>
            <!-- Row for place -->
            <div class="accommodation-row">
                <p class="text-field">Place: ${data.data.accomodation.place}</p>
            </div>
            <!-- Row for price -->
            <div class="accommodation-row">
                <p class="text-field">Price: ${data.data.accomodation.price} euro</p>
            </div>
            <!-- Row for link -->
            <div class="accommodation-row">
                <p class="text-field">Link: <a href=${data.data.accomodation.link}
                        target="_blank">${data.data.accomodation.link}</a></p>
            </div>
        </div>
    </div>

    <button id="copyButton" class="fixed-copy-btn">Share with your friends!</button>
    <span id="copyMessage" class="copy-message">Link copied!</span>
</section>
`;

export async function showDetailsView(ctx) {
    const tripId = ctx.params.tripId;
    const url = 'http://127.0.0.1:5001/details/' + tripId;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        debugger;
        render(detailsTemplate(data));
    } catch (error) {
        return alert(error);
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

