import {page} from './lib.js';
import { showHomeView } from './views/home.js';
import { showDashboardView } from './views/dashboard.js';
import { showDetailsView } from './views/details.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showaddTripView } from './views/addTrip.js';
import { clearUserData, updateNav } from './util.js';
 updateNav();

page('/',showHomeView);
page('/alltrips', showDashboardView);
page('/details', showDetailsView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/add', showaddTripView);



page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    // await userApi.logout(); 
    clearUserData();
    page.redirect('/');
    updateNav();});