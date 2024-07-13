
//abrimos el socket
const socket = io('https://cinexunidos-production.up.railway.app',{
    auth: {
        token: 'ABC-456', // Se debería sustituir por un token real...
        name: 'user1',
    },
});

document.addEventListener('DOMContentLoaded', (event) => {
    //enviamos un mensaje
    document.getElementById('sendButton').addEventListener('click', () => {
        const mensaje = chatInput.value;
        if (mensaje.trim() !== '') {
            
            chatInput.value = '';

            const message= {
                content: mensaje,
                action: 'chat-message',
                location: localizacion,
            }
            console.log(message)
            socket.emit('send-message', message);
        }
    });
});

// recibimos un mensaje del socket
const ProcesarMessage = (payload) =>{
    //console.log(payload);
    const { id, message, name } = payload;
    //console.log(` id: ${id} de nombre ${name} manda el mensaje ${message}`);
    const { content,action,location} = message;
    console.log(` el mensaje es un ${action} mandado desde ${location}`);
    if (location === localizacion){
        if (action === 'chat-message'){
            const chatMessage = document.createElement('div');
            chatMessage.classList.add('chat-message');
            chatMessage.textContent = content;
            

            if (id !== socket.id) {
                console.log(`mensaje entrante dice : ${content}`);
                chatMessage.classList.add('incoming');
            }

            chatMessages.appendChild(chatMessage);
        }
    }
}



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

//recibe un nuevo mensaje
socket.on('new-message', ProcesarMessage);

//cerramos el socket
window.addEventListener('unload', () => {
   socket.close();
})
