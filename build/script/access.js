let signUp = document.getElementById("signUp");

users = JSON.parse(localStorage.getItem("users")) || [];

//clear Error
function clearErr(id) {
  document.getElementById(id).style.display = "none";
}

function genId() {
  let platformId = `${"BFL-"}${Math.floor(Math.random() * 100000)}`;
  toString(platformId);
  let check = users.find((user) => user.id == platformId);
  if (check) {
    console.log(found);
    genId();
    return;
  }
  return platformId;
}

// signUp funtion
signUp.addEventListener("click", () => {
  //getting data
  let firstName = document.getElementById("fsName").value;
  let lastName = document.getElementById("lsName").value;
  let email = document.getElementById("mail").value;
  let password = document.getElementById("pass").value;
  let username = `${firstName}${lastName}`;
  console.log(firstName, lastName, email, password, username);

  //validating input
  if (firstName == "") {
    document.getElementById("fnError").style.display = "block";
  }
  if (lastName == "") {
    document.getElementById("lnError").style.display = "block";
  }
  if (email == "") {
    document.getElementById("eError").style.display = "block";
  }
  if (!email.includes("@")) {
    document.getElementById("invalid").style.display = "block";
    setInterval(() => {
      document.getElementById("invalid").style.display = "none";
    }, 5000);
  }
  if (password == "") {
    document.getElementById("passError").style.display = "block";
  } else {
    const user = users.find((user) => user.email == email);

    if (!user) {
      console.log("mol");
      let id = genId();

      let uData = {
        firstName,
        lastName,
        username,
        email,
        password,
        id,
        isLoggedIn:false,
        messages:{
          sent:[
            
          ],
          received:[

          ]
        }
      };
      console.log(uData);
      console.log(users);

      users.push(uData);
      console.log(users);

      localStorage.setItem("users", JSON.stringify(users));
      console.log(JSON.parse(localStorage.getItem("users")));
      alert("Your account has been successfully created");
      window.location.href = "login.html";
    } else {
      console.log("found");
      alert(
        `User Already Exist with username(${user.email}). Log in instead!!`
      );
      return;
    }
    window.location.href = "login.html";
  }
});


