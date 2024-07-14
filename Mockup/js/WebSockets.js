
//abrimos el socket
const socket = io('https://cinexunidos-production.up.railway.app',{
    auth: {
        token: 'ABC-456', // Se debería sustituir por un token real...
        name: 'user1',
    },
});

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

        if (action === 'seat-location'){

            if (id !== socket.id) {
                
                const {action,seat} =content;
                console.log(`mensaje entrante dice : ${action} y ${seat}`);
                if(action === 'enter'){
                    document.getElementById(seat).classList.remove('disponible');
                    document.getElementById(seat).classList.add('mouse');
                }else
                if(action === 'leave'){
                    document.getElementById(seat).classList.add('disponible');
                    document.getElementById(seat).classList.remove('mouse');
                }
            }

        }
    }
}



// se conecta el socket un mensaje del socket
    socket.on('connect', () => {
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
