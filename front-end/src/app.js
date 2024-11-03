import {page} from './lib.js';
import { showHomeView } from './views/home.js';
import { showDashboardView } from './views/dashboard.js';
import { showDetailsView } from './views/details.js';
import { showLoginView } from './views/login.js';
// updateNav();

page('/',showHomeView);
page('/alltrips', showDashboardView);
page('/details', showDetailsView);
page('/login', showLoginView);



page.start();

// document.getElementById('logoutBtn').addEventListener('click', async () => {
//     await userApi.logout(); 
//     page.redirect('/');
//     updateNav();});