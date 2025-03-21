let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users"));

let status = currentUser.isLoggedIn;
let cuFn = currentUser.firstName;
let cuLn = currentUser.lastName;
let friends = users.filter((user) => user.id != currentUser.id);
console.log(currentUser.isLoggedIn == true);

function updateDisplay() {
  JSON.parse(localStorage.getItem("users"));
  let sentMessage = users[senderIndex].messages.sent;
  let receivedMessage = users[receiverIndex].messages.received;
  console.log(sentMessage, receivedMessage);
}

if (status == false) {
  window.location.href = login.html;
}

let info = document.getElementById("my-info");
let greeting = document.createElement("div");
greeting.id = "users-name";
greeting.className =
  "flex px-[10px] py-[15px] text-[12px] lg:text-[16px] justify-between border-b border-[#c0c0c0]";
greeting.innerHTML = `<p>Welcome back!</p> <p class="font-bold">${cuFn} ${cuLn}</p>`;
info.insertAdjacentElement("beforeBegin", greeting);

let contacts = document.getElementById("contacts");

function getFriend(id) {
  let currentFriend = friends.find((friend) => friend.id == id);

  //   updating chat head
  let chatHead = document.querySelector("#chat-head");
  chatHead.innerHTML = `<div id="name" class="flex font-bold items-center gap-2">
                          <p>${currentFriend.firstName}</p>
                          <p>${currentFriend.lastName}</p>
                      </div>
                      <div class="w-[50px] h-[50px] border-2 border-purple-800 rounded-full overflow-hidden">
                          <img src="https://img.freepik.com/free-photo/smiley-african-woman-with-golden-earrings_23-2148747979.jpg?uid=R98690155&ga=GA1.1.1473969789.1733597413&semt=ais_authors_boost"
                          alt="" class="object-cover">
                      </div>`;

  messageArea.insertAdjacentElement("afterbegin", chatHead);

  //   getting messages
  let openUser = friends.find((friend) => friend.id == currentFriend.id);

  if (openUser) {
    console.log(openUser);
    document.getElementById("chat").style.display = "block";
    let sendbtn = document.getElementById("sendbtn");

    sendbtn.addEventListener("click", () => {
      let text = document.getElementById("text").value;

      if (currentUser.isLoggedIn == true) {
        let sender = users.find((user) => currentUser.id == user.id);
        let senderIndex = users.indexOf(sender);

        let receiver = users.find((user) => openUser.id == user.id);
        let receiverIndex = users.indexOf(receiver);

        let senderName = sender.firstName;

        let receiverName = receiver.firstName;

        let message = {
          senderName,
          receiverName,
          text,
          date: Date(),
        };

        users[senderIndex].messages.sent.push(message);
        users[receiverIndex].messages.received.push(message);

        localStorage.setItem("users", JSON.stringify(users));

        users[senderIndex].messages.sent.forEach((message) => {
          if (message) {
            let textStyle = document.getElementById("bubbles");
            let sent = document.createElement("div");
            sent.id = "sent";
            sent.className =
              "p-2 text-[12px] lg:text-[18px] md:ml-[200px] lg:ml-[400px]";
            sent.innerHTML = `
                    <div class="bg-purple-800 rounded-xl p-3 text-white">
                        <p>${message.text}</p>
                    </div>
                    <div id="bBtom" class="flex items-center mt-1 mx-3">
                                <p id="timeStamp" class="text-[10px] lg:text-[15px] w-full">${message.date}</p>
                                <i class="fa-solid fa-check" style="color: #000000;"></i>
                            </div>`;
            textStyle.insertAdjacentElement("beforeend", sent);
          }
        });

        currentUser.messages.received.forEach((message) => {
          if (message) {
            console.log(currentUser.messages)
            let textStyle = document.getElementById("bubbles");
            let received = document.createElement("div");
            received.id = "received";
            received.className = `p-2 text-[12px] lg:text-[18px] md:mr-[200px] lg:mr-[400px]`;
            received.innerHTML = `
            <div class="bg-white rounded-xl p-3 text-white">
                <p>${message.text}</p>
            </div>
            <div id="bBtom" class="flex items-center mt-1 mx-3">
                        <p id="timeStamp" class="text-[10px] lg:text-[15px] w-full">${message.date}</p>
                        <i class="fa-solid fa-check" style="color: #000000;"></i>
                    </div>`;
            textStyle.insertAdjacentElement("beforeend", received);
          }
        });
      }
    });
  }
}


let myFriends = friends.forEach((friend) => {
  let friendCard = document.createElement("div");
  friendCard.onclick = function () {
    getFriend(`${friend.id}`);
  };
  friendCard.setAttribute("data-role", "friend");

  friendCard.className =
    "grid grid-cols-[1fr_4fr] items-center gap-2 py-[15px] border-b border-[#f1f1f1] px-[5px]";

  friendCard.innerHTML = `<div id="right" class="w-[50px] h-[50px] border-2 border-purple-800 rounded-full overflow-hidden">
                            <img src="https://img.freepik.com/free-photo/smiley-african-woman-with-golden-earrings_23-2148747979.jpg?uid=R98690155&ga=GA1.1.1473969789.1733597413&semt=ais_authors_boost"
                                alt="" class="object-cover">
                        </div>
                        <div id= "left" class="w-full flex space-x-2 items-center px-2">
                            <div id="info" class="w-full">
                                <p id="name" class="lg:text-[18px] font-bold">${friend.firstName} ${friend.lastName}</p>
                                <p id="id"  class="hidden">${friend.id}</p>
                                <p class="text-[8px] lg:text-[14px]">last activity: 10:24pm</p>
                            </div>
                            <p id="unread"
                                class="bg-purple-800 rounded-full min-w-[25px] h-fit p-1 flex justify-center text-white text-[12px]">
                                2</p>
                        </div>`;

  contacts.insertAdjacentElement("beforeBegin", friendCard);
});

info.insertAdjacentElement("beforeBegin", greeting);
