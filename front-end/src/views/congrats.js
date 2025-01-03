import { html, render } from '../lib.js';


const congratsTemplate = (tripId) => html`
    <section id="congrats">
        
              
        <div class="pyro">
            <div class="before"></div>
            <div class="after"></div>
        </div>

        <h1 id="main-text">Pack up the bags! You're coming too</h1>
        <a id="detailsButton" href='/details/${tripId}'>Check the info</a>
    
        
    </section>
`;

export function showCongratsView() {
    let tripId = sessionStorage.cTripId;
    let bg = document.getElementById('mainElement')
    bg.style.backgroundColor = '#052242'

    let body = document.querySelector('body');
    body.style.overflow = 'hidden';

    render(congratsTemplate(tripId))
    //sessionStorage.clear();

    document.getElementById('detailsButton')
    .addEventListener('click', () => {bg.style.backgroundColor = '#9adae5a5'
    body.style.overflow = 'scroll';}
)


}



