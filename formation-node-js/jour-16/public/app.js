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
const userCount = document.getElementById('user-count');

let currentUsername = '';

// Rejoindre le chat
joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if (username) {
        currentUsername = username;
        socket.emit('join', username);// Envoie "le nom" au serveur

        // Passer à l'écran de chat
        loginScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
        messageInput.focus();
    }
});

// Envoyer un message (bouton)
sendBtn.addEventListener('click', sendMessage);

// Envoyer un message (touche Entrée)
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Fonction pour envoyer un message
function sendMessage() {
    const message = messageInput.value.trim();

    if (message) {
        socket.emit('chat-message', { message }); // Envoie "le message" au serveur 
        messageInput.value = '';
        messageInput.focus();
    }
}

// Écouter les événements Socket.IO

// Quand un utilisateur rejoint
socket.on('user-joined', (data) => {
    addSystemMessage(data.message); // Affiche "le message" dans le chat    
    updateUserCount(data.users);
});

// Quand un message est reçu
socket.on('chat-message', (data) => {
    addUserMessage(data.username, data.message, data.timestamp); // Affiche "le message" dans le chat           
});

// Quand un utilisateur quitte
socket.on('user-left', (data) => {
    addSystemMessage(data.message); // Affiche "le message" dans le chat
    updateUserCount(data.users); // Met à jour le compteur d'utilisateurs
});

// Fonctions d'affichage

function addSystemMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'system');
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    scrollToBottom();
}

function addUserMessage(username, message, timestamp) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'user');

    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="username">${username}</span>
            <span class="timestamp">${timestamp}</span>
        </div>
        <div class="message-content">${message}</div>
    `;

    messagesDiv.appendChild(messageDiv);
    scrollToBottom();
}

function updateUserCount(count) {
    userCount.textContent = `${count} utilisateur${count > 1 ? 's' : ''}`;
}

function scrollToBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Focus sur l'input au chargement
usernameInput.focus();
