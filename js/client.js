const socket = io('http://localhost:8000')
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messagecontainer = document.querySelector('.container');
let audio = new Audio('ting.mp3');



const append = (message,position)=> {
 const messageElement = document.createElement('div');
  messageElement.innerHTML = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messagecontainer.append(messageElement)
  if(position == 'left'){
    audio.play();
    }
 }
 

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = ''
})


const name = prompt('Enter Your name');    
socket.emit('new-user-joined',name);

socket.on('user-joined' , data => {
    append(`${data} joined `,'left')
})


socket.on('recieve', data => {
    append(`${data.name} : ${data.message}`,'left')
    
})
socket.on('left', data => {
    append(`${data.name}  left `,'right')
})
