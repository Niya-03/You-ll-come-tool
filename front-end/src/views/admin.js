import { html, render } from '../lib.js';
import { updateNav } from '../util.js';
import { page } from '../lib.js';


const adminTemplate = (data) => html`
    <div id="adminPage">
        <h1>Admin Panel</h1>
        <div id="usersList">
    
        </div>
    </div>
`


export function showAdminView(ctx) {
    render(adminTemplate(data));
}