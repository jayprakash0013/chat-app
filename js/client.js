const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('MessageInp');
const messageContainer = document.querySelector(".container");

var audio1 = new Audio(`send.mp3`);
var audio2 = new Audio(`Receive.mp3`);
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append( messageElement);
    
}

//Adding an event listener
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    audio1.play();
    socket.emit('send',message);
    messageInput.value= '';
});
const name = prompt("Enter Your name");
socket.emit('new-user-joined',name);
socket.on('user-joined' , name=>{
append(`${name} joined the chat`,'right');

});

socket.on('receive',data=>{
    append(`${data.name}: ${data.message} `,'left');
    audio2.play();
});


socket.on('left',name=>{
    append(`${name} left the chat`,'left');
});