import { html, render } from '../lib.js';
import { updateNav } from '../util.js';
import { page } from '../lib.js';


const adminTemplate = (data) => html`
    <section id='adminPage'>
    <div id="adminPage">
        <h1>Admin Panel</h1>
        <div id="usersList">
            ${data.length ? data.map(x => cardTemp(x)) : html `<h2>No users.</h2>`}
        </div>
    </div>
    <section>
`
const cardTemp = (item) => html `
    <div class="userCard">
        <p href=${item.userId}>User email: ${item.email} </p>
         ${item.is_admin ? '' : html `<button data-userId=${item.userId} id='deleteUserBtn'>Delete user</button>`}
    </div>
`

export async function showAdminView(ctx) {
    try {
        const response = await fetch('http://127.0.0.1:5001/allUsers');
        const data = await response.json();
        console.log(data)
        render(adminTemplate(data.data));
        const deleteUserBtn = document.getElementById('deleteUserBtn')
        deleteUserBtn.addEventListener('click', deleteUser);
    } catch (error) {
        return alert(error);
    }
    
}


async function deleteUser(e){
    e.preventDefault();
    let userId = e.target.dataset.userid;

    try{
        const response = await fetch(`http://127.0.0.1:5001/deleteUser/${userId}`, {
            method: 'DELETE'
        });
        const data = await response.json();

        if(response.ok){
            showAdminView();
        }
    }catch(e){
        return alert(e)
    }
    
}