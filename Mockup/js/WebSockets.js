
//abrimos el socket
const socket = io('https://cinexunidos-production.up.railway.app',{
    auth: {
        token: 'ABC-456', // Se debería sustituir por un token real...
        name: 'user1',
    },
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('sendButton').addEventListener('click', () => {
        const message = chatInput.value;
        if (message.trim() !== '') {
            const chatMessage = document.createElement('div');
            chatMessage.classList.add('chat-message');
            chatMessage.textContent = message;
            // Corrección: Agrega el mensaje al contenedor de mensajes, no a sí mismo
            chatMessages.appendChild(chatMessage);
            chatInput.value = '';
            socket.emit('send-message', message);
        }
    });
});

// recibimos un mensaje del socket
const renderMessage = (payload) => {
    //toma los datos del payload y los almacena en variables
    const { id, message, name } = payload;
    // Crea un elemento <div> para el mensaje
    const $divElement = document.createElement('div');
    // Agrega la clase 'message' al elemento <div>
    $divElement.classList.add('message');

    if (id !== socket.id) {
        // compara el id del paylod con el id del socket de comunicacion
        $divElement.classList.add('incoming');
        // que hara esta clase incoming, parece diferenciar los mensajes entrantes d elos salientes
    }

    // Agrega el contenido del mensaje al elemento <div>
    //ivElement.innerHTML = `<small>${name}</small><p>${message}</p>`;
    console.log(message);
    // Agrega el elemento <div> al chat
    //document.getElementById('ventanaChat').appendChild($divElement);

};

// se conecta el socket un mensaje del socket
socket.on('connect', () => {

   // $usernamePic.innerHTML = `<img src="https://api.dicebear.com/9.x/initials/svg?seed=${username}" alt="${username}" />`;
    console.log('Connected');
});

socket.on('disconnect', () => {
    //$onlineStatus.classList.add('hidden');
    //$offlineStatus.classList.remove('hidden');
    console.log('Disconnected');
});


//socket.on('online-users', renderUsers);

socket.on('new-message', renderMessage);

//cerramos el socket
window.addEventListener('unload', () => {
   socket.close();
})
