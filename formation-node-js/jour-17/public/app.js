// Connexion au serveur Socket.IO
const socket = io();

// Éléments DOM
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const roomSelect = document.getElementById('room-select');
const roomNameDisplay = document.getElementById('room-name');
const userList = document.getElementById('users-list');
const recipientSelect = document.getElementById('recipient-select');
const leaveBtn = document.getElementById('leave-btn');
const typingIndicator = document.getElementById('typing-indicator');

let currentUsername = '';
let currentRoom = '';
let typingTimeout;

// Rejoindre
joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const room = roomSelect.value;

    if (username) {
        currentUsername = username;
        currentRoom = room;

        socket.emit('join', { username, room });

        roomNameDisplay.innerText = `Salle: ${room}`;
        loginScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
        messageInput.focus();
    }
});

// Envoyer message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const msg = messageInput.value.trim();
    const recipient = recipientSelect.value;

    if (msg) {
        if (recipient === 'all') {
            socket.emit('chat-message', msg);
        } else {
            socket.emit('private-message', {
                toId: recipient,
                message: msg
            });
        }

        messageInput.value = '';
        messageInput.focus();
        socket.emit('stop-typing');
    }
}

// Typing
messageInput.addEventListener('input', () => {
    socket.emit('typing');
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => socket.emit('stop-typing'), 1000);
});

// ÉVÉNEMENTS SOCKET

// Mise à jour liste utilisateurs
socket.on('room-users', ({ room, users }) => {
    updateUserList(users);
});

// Message reçu (Public ou Privé)
// Le serveur envoie maintenant 'message' unifié pour système/chat
// et 'private-message' pour les MPs
socket.on('message', (data) => {
    outputMessage(data);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on('private-message', (data) => {
    outputPrivateMessage(data);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Typing
socket.on('typing', (data) => {
    typingIndicator.innerText = `${data.username} écrit...`;
    typingIndicator.classList.remove('hidden');
});

socket.on('stop-typing', () => {
    typingIndicator.classList.add('hidden');
});

// Quitter
leaveBtn.addEventListener('click', () => {
    window.location.reload();
});


// DOM MANIPULATION

function updateUserList(users) {
    userList.innerHTML = '';
    recipientSelect.innerHTML = '<option value="all">Envoyer à tous</option>';

    users.forEach(user => {
        // Liste Sidebar
        const li = document.createElement('li');
        li.innerText = user.username;
        if (user.id === socket.id) li.classList.add('current-user');
        userList.appendChild(li);

        // Select pour MP (ne pas s'ajouter soi-même)
        if (user.id !== socket.id) {
            const option = document.createElement('option');
            option.value = user.id;
            option.innerText = user.username;
            recipientSelect.appendChild(option);
        }
    });
}

function outputMessage(message) {
    const div = document.createElement('div');

    if (message.username === 'Système') {
        div.classList.add('message', 'system');
        div.innerText = message.text;
    } else {
        div.classList.add('message', 'user');
        div.innerHTML = `
            <span class="username">${message.username}</span>
            <div class="message-content">${message.text}</div>
            <span class="timestamp">${message.timestamp}</span>
        `;
    }
    document.getElementById('messages').appendChild(div);
}

function outputPrivateMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message', 'user', 'private');
    div.innerHTML = `
        <span class="username">🔒 ${message.from}</span>
        <div class="message-content">${message.message}</div>
        <span class="timestamp">${message.timestamp}</span>
    `;
    document.getElementById('messages').appendChild(div);
}
