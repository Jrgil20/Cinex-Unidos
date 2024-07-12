//abrimos el socket
const socket = io({
    auth: {
        token: 'ABC-456', // Se debería sustituir por un token real...
        name: 'user1',
    },
});

// le enviamos un mensaje al socket
socket.emit('send-message', message);

// recibimos un mensaje del socket
socket.on('connect', () => {

    $usernamePic.innerHTML = `<img src="https://api.dicebear.com/9.x/initials/svg?seed=${username}" alt="${username}" />`;
    console.log('Connected');
});

socket.on('disconnect', () => {
    $onlineStatus.classList.add('hidden');
    $offlineStatus.classList.remove('hidden');
    console.log('Disconnected');
});


socket.on('online-users', renderUsers);

socket.on('new-message', renderMessage);

//cerramos el socket
socket.close();