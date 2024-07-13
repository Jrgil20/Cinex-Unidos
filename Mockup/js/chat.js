document.addEventListener("DOMContentLoaded", () => {
    const $idChat = document.querySelector("#idChat"),
        $mensaje = document.querySelector("#mensaje"),
        $enviar = document.querySelector("#enviar");

    const enviarMensaje = async (idChat, token, mensaje) => {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const respuestaHttp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: idChat,
                text: mensaje,
            }),
        });
        return {
            respuesta: await respuestaHttp.json(),
            codigo: respuestaHttp.status,
        };
    }
    $enviar.addEventListener("click", async () => {
        const token = "";
            $mensaje = $mensaje.value,
            $idChat = $idChat.value;
        if (!token || !$mensaje || !$idChat) {
            return alert("Rellena todos los campos");
        }
        const respuesta = await enviarMensaje(idChat, token, mensaje);
        alert(JSON.stringify(respuesta));
    });
});

recibirMensajes();

function recibirMensajes(){
    const token = "";
    fetch(`https://api.telegram.org/${token}/getUpdates` )
    .then(response => response.json())
    .then(data => console.log(data));
}