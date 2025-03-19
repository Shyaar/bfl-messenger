let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let status = currentUser.isLoggedIn
console.log(status)

if(status == false){
    window.location.href = login.html
}

let info = document.getElementById('my-info')




