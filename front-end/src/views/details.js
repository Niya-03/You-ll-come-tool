import {html, render} from '../lib.js';

const detailsTemplate = () => html `
    <section id="details">
    <div class="container">
        <div class="detailBox">
            <h2><i>Niya's trip</i></h2>
        </div>

        <div class="detailBox">
            <h2>Destination: Milano</h2>
        </div>

        <div class="detailBox">
            <h2>Dates: 01.01.25 - 04.01.25</h2>
        </div>

        <div class="flight-options">
            <h3>Flight Options</h3>
            <!-- Going Box -->
            <div class="flight-box">
                <div class="box-title">Going</div>
                <div class="details">
                    <p>Departs:</p>
                    <p>City:</p>
                    <p>Hour:</p>
                </div>
                <div class="details">
                    <p>Arrives:</p>
                    <p>City:</p>
                    <p>Hour:</p>
                </div>
                <div class="divider"></div>
                <div class="price">Price:</div>
            </div>

            <!-- Return Box -->
            <div class="flight-box">
                <div class="box-title">Return</div>
                <div class="details">
                    <p>Departs:</p>
                    <p>City:</p>
                    <p>Hour:</p>
                </div>
                <div class="details">
                    <p>Arrives:</p>
                    <p>City:</p>
                    <p>Hour:</p>
                </div>
                <div class="divider"></div>
                <div class="price">Price:</div>
            </div>
        </div>


        <div class="extra-transport">
            <h3>Extra Transport</h3>

            <!-- Transport rows -->
            <div class="transport-row">
                <p class="text-field">Metro: </p>
                <span class="transport-price">Price: </span>
            </div>
            <div class="transport-row">
                <p class="text-field">Bus: </p>
                <span class="transport-price">Price: </span>
            </div>
            
        </div>

        <div class="accommodation">
            <h3>Accommodation</h3>
            <!-- Row for place -->
            <div class="accommodation-row">
                <p class="text-field">Place: The Old Town</p>
            </div>
            <!-- Row for price -->
            <div class="accommodation-row">
                <p class="text-field">Price: 250 euro</p>
            </div>
            <!-- Row for link -->
            <div class="accommodation-row">
                <p class="text-field">Link: <a href="https://example.com"
                        target="_blank">https://example.com</a></p>
            </div>
        </div>
    </div>
</section>
`;

export function showDetailsView(ctx){
    console.log("this is details")
    render(detailsTemplate());
}