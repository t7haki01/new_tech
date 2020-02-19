window.addEventListener('load', function (e) {
    var webSocket = new WebSocket('ws://127.0.0.1:7000');
    webSocket.onopen = function () {
        console.log("Connection");
    }
});



function sendMessage() {

}

function enterPressed(e) {
    if (e.keyCode == 13) {
    }
}

function emptyInput() {
    let chatInput = document.getElementById("chatInput");
    chatInput.value = "";
}

function updateChat() {
    let chatInput = document.getElementById("chatInput");
    let chatDisplay = document.getElementById("chatDisplay");

    chatDisplay.append('<li>').text(chatInput.value);
}