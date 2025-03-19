let signIn = document.getElementById("signIn");
let email = document.getElementById("mail");
let password = document.getElementById("pass");

let users = JSON.parse(localStorage.getItem("users")) || [];

console.log(users)
//Login function
let loginMail = document.querySelector("#mail").value;
let loginPass = document.querySelector("#password").value;

function clearErr(id) {
  document.getElementById(id).style.display = "none";
}

signIn.addEventListener("click", () => {

  //validation
  if (email.value == "") {
    document.getElementById("eError").style.display = "block";
  }
  if (!email.value.includes("@")) {
    document.getElementById("invalid").style.display = "block";
    setInterval(() => {
      document.getElementById("invalid").style.display = "none";
    }, 5000);
  }
  if (password.value == "") {
    document.querySelector("#passError").style.display = "block";
  }

  const user = users.find((user) => user.email === email.value);
  const userIndex = users.indexOf(user)
  console.log(userIndex);
  if (user) {
    if (user.password !== password.value) {
      alert("Incorrect password!!! 🙅‍♂️🔐 Please check your Password");
    }
    console.log(user)
    users[userIndex].isLoggedIn=true
    console.log(users[userIndex])
    console.log(users)
    
    localStorage.setItem("currentUser",JSON.stringify(user))
    localStorage.setItem("users",JSON.stringify(users))

    alert("login successfull");
    window.location.href = "chats.html";

  } else {
    alert("User not found!!! 🤷‍♂️ Please check your email");
  }
});


