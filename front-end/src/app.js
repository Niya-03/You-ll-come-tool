import {page} from './lib.js';
import { showHomeView } from './views/home.js';
import { showDashboardView } from './views/dashboard.js';
import { showDetailsView } from './views/details.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showaddTripView } from './views/addTrip.js';
import { clearUserData, updateNav } from './util.js';
import { showMyDashboardView } from './views/myTrips.js';
import { showEditTripView } from './views/edit.js';

updateNav();

page('/',showHomeView);
page('/alltrips', showDashboardView);
page('/details/:tripId', showDetailsView);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/add', showaddTripView);
page('/mytrips', showMyDashboardView);
page('/edit/:tripId', showEditTripView)



page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    // await userApi.logout(); 
    clearUserData();
    page.redirect('/');
    updateNav();});