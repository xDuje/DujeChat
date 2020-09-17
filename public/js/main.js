const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Url l
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Ulaz C
socket.emit('joinRoom', { username, room });

// get soba i user
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message od servera
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  // scrollanje
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// posalji - submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // primi mssg text
  let msg = e.target.elements.msg.value;
  
  msg = msg.trim();
  
  if (!msg){
    return false;
  }

  // mssg serveru
  socket.emit('chatMessage', msg);

  // izbrisi output
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// ime sobe doom
function outputRoomName(room) {
  roomName.innerText = room;
}

// dodavanje korisnika u doom
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user=>{
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
 }
