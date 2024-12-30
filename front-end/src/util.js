function setUserData(data){
    localStorage.setItem('user', JSON.stringify(data));
}

function getUserData(){
    return JSON.parse(localStorage.getItem('user'));
}

function clearUserData(){
    localStorage.removeItem('user');
}

function getUserToken(){
    return getUserData().accessToken;
}


function updateNav(){
    const userData = getUserData();

    if(userData){
        document.querySelector('nav .guest').style.display = 'none';
        document.querySelector('nav .user').style.display = 'block';
        document.querySelector('nav .admin').style.display = 'none';

        if(userData.isAdmin){
            document.querySelector('nav .admin').style.display = 'block';
        }

    }else {
        document.querySelector('nav .guest').style.display = 'block';
        document.querySelector('nav .user').style.display = 'none';
        document.querySelector('nav .admin').style.display = 'none';
    }
}

export {
    setUserData,
    getUserData,
    clearUserData,
    getUserToken,
    updateNav
}