const id = new URLSearchParams(window.location.search).get('cine');
const idAuditorio = new URLSearchParams(window.location.search).get('auditorio');
const idFuncion = new URLSearchParams(window.location.search).get('showtime');

fetch(`https://cinexunidos-production.up.railway.app/theatres/${id}/auditoriums/${idAuditorio}/showtimes/${idFuncion}`, {
    method: 'GET',
})
.then(response => response.json())
.then(data => {
    console.log(data);

    const informacionfuncion = document.getElementById('informacion-container');
    const pelicula = document.createElement('h2');
    pelicula.textContent = data.movie.name;
    pelicula.setAttribute('id','nombrePelicula');
    informacionfuncion.appendChild(pelicula);

    const poster = document.createElement('img');
    poster.src = `https://cinexunidos-production.up.railway.app/${data.movie.poster}`;
    poster.alt = data.movie.name;
    poster.classList.add('poster')
    informacionfuncion.appendChild(poster);

    const horario = document.createElement('p');
    horario.textContent = data.startTime;
    horario.setAttribute('id','horarioEmpieza');
    informacionfuncion.appendChild(horario);

    const rating = document.createElement('p');
    rating.textContent = data.movie.rating;
    informacionfuncion.appendChild(rating);

    const duracion = document.createElement('p');
    duracion.textContent = data.movie.runtime;
    informacionfuncion.appendChild(duracion);
    let contadordeAsientos = 0;
    const contenedorAsientos = document.getElementById('asientos-container');
    
    for (const row in data.seats) {
        if (data.seats.hasOwnProperty(row)) {
            console.log(`Fila ${row}:`);
            const fila = document.createElement('div');
            fila.classList.add('fila');

            const filaNumero = document.createElement('h3');
            filaNumero.textContent = `${row}`;
            filaNumero.style.paddingRight = '30px';
            filaNumero.style.marginTop = '5px';
            fila.appendChild(filaNumero);

            contadordeAsientos = 0;
            data.seats[row].forEach(seat => {
                const asiento = document.createElement('div');
                const numeroAsiento = document.createElement('p');
                numeroAsiento.textContent = contadordeAsientos;
                numeroAsiento.style.display = 'none';
                asiento.id = row +contadordeAsientos;
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = `Asiento ${asiento.id}`;

                // Agrega el evento mouseover para mostrar el tooltip
                asiento.addEventListener('mouseover', () => {
                tooltip.style.display = 'block';
                tooltip.style.top = `${asiento.offsetTop - tooltip.offsetHeight}px`;
                tooltip.style.left = `${asiento.offsetLeft + (asiento.offsetWidth - tooltip.offsetWidth) / 2}px`;
                });

                // Agrega el evento mouseout para ocultar el tooltip
                asiento.addEventListener('mouseout', () => {
                tooltip.style.display = 'none';
                });

                asiento.addEventListener('mouseenter',() => {
                     if(asiento.classList.contains('disponible')){
                        let movieName = document.getElementById('nombrePelicula').textContent

                        const mensaje ={
                            seat : asiento.id,
                            action :'enter'
                        };

                        message= {
                            content: mensaje,
                            action: 'seat-location',
                            location: localizacion,
                        };
                        console.log(message)
                        //socket.emit('send-message', message);
                    }
                });

                asiento.addEventListener('mouseleave',() => {
                    if(asiento.classList.contains('disponible')){
                       let movieName = document.getElementById('nombrePelicula').textContent

                       const mensaje ={
                        seat : asiento.id,
                        action :'leave'
                    };

                    message= {
                        content: mensaje,
                        action: 'seat-location',
                        location: localizacion,
                    };
                    console.log(message)
                    //socket.emit('send-message', message);
                    }
               })

                // Agrega el tooltip al asiento
                asiento.appendChild(tooltip);  
                asiento.appendChild(numeroAsiento);


                asiento.classList.add('asiento');


                if (seat === -1) {
                    asiento.style.visibility = 'hidden';
                }else{
                    if (seat === 0) {
                        asiento.classList.add('disponible');
                    }else{
                        if (seat === 1) {
                            asiento.classList.add('ocupado');
                        }
                    }
                }   
                fila.appendChild(asiento);


                if (asiento.classList.contains('disponible')){
                    asiento.addEventListener('click', () => {
                        
                        if (asiento.classList.contains('selecionado')) {
                            asiento.classList.remove('selecionado');
                            asiento.classList.add('disponible');
                            LiberarAsientos(asiento.id);
                        }else{
                            asiento.classList.add('selecionado');
                            asiento.classList.remove('disponible');
                            ReservarAsientos(asiento.id);
                        }
                    });
                }
            
                /* libera un asiento ilegalment haciendo click
                asiento.addEventListener('click', () => {
                        LiberarAsientos(numeroAsiento.textContent);
                        asiento.classList.add('disponible');
                });          
                */
                
                /*libera todos los asientos ilegalmente
                    LiberarAsientos(numeroAsiento.textContent);
                */

                contadordeAsientos++;
            });

            contenedorAsientos.appendChild(fila);
        }
    }

})
.catch(error => {
    console.error('Error:', error);
});

window.onload = InspecionarAsientos();

function ReservarAsientos(asiento) {
    console.log('reservando asiento',asiento);
    fetch(`https://cinexunidos-production.up.railway.app/theatres/${id}/auditoriums/${idAuditorio}/showtimes/${idFuncion}/reserve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            seat: asiento,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function LiberarAsientos(asiento) {
    console.log('Liberando asiento: ', asiento);
    fetch(`https://cinexunidos-production.up.railway.app/theatres/${id}/auditoriums/${idAuditorio}/showtimes/${idFuncion}/reserve`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            seat: asiento,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function InspecionarAsientos() {
    const evtSource = new EventSource(`https://cinexunidos-production.up.railway.app/theatres/${id}/auditoriums/${idAuditorio}/showtimes/${idFuncion}/reservation-updates`);

    evtSource.onmessage = function(event) {
        console.log('message', event.data);
        const dataObj = JSON.parse(event.data); 
        if (dataObj.result === 'SEAT_RESERVED') {
            console.log('Asiento '+dataObj.seat+' reservado');
            document.getElementById(dataObj.seat).classList.remove('disponible');
        } else {
            if (dataObj.result === 'SEAT_RELEASED') {
                console.log('Asiento '+dataObj.seat+' liberado');
                document.getElementById(dataObj.seat).classList.add('disponible');
            }
        };

    evtSource.onerror = function(error) {
        console.error('EventSource failed:', error);
    };
}
}

function pagarAsientos(){
    let total, moneda, metodo, infoMetodo;

    total = 3;
    moneda = 'USD';
    
    if(metodo === 'CREDIT_CARD' || metodo === 'DEBIT_CARD'){
        let numeroTarjeta,fechaExp,cvv,titular;
  
        infoMetodo = {number:numeroTarjeta, expirationDate:fechaExp, cvv:cvv, name:titular}; 

        fetch('https://cinexunidos-production.up.railway.app/payments',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                totalAmount: total,
                currency:currency,
                paymentMethod: metodo,
                paymentMethodInfo: infoMetodo,
            }),
        })
        .then(alert("Pago procesado con exito"))
        .catch(error => console.error(error));
    }

    if(metodo === 'PAGO_MOVIL'){
        let banco,correo,cedula,telefono;

        infoMetodo = {email:correo, phone:telefono, ssn:cedula, bank:banco};

        fetch('https://cinexunidos-production.up.railway.app/payments',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                totalAmount: total,
                currency:currency,
                paymentMethod: metodo,
                paymentMethodInfo: infoMetodo,
            }),
        })
        .then(alert("Pago procesado con exito"))
        .catch(error => console.error(error));
    }

    if(metodo === 'ZELLE'){
        let correo,telefono;

        infoMetodo = {email:correo, phone:telefono};

        fetch('https://cinexunidos-production.up.railway.app/payments',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                totalAmount: total,
                currency:currency,
                paymentMethod: metodo,
                paymentMethodInfo: infoMetodo,
            }),
        })
        .then(alert("Pago procesado con exito"))
        .catch(error => console.error(error));
    }
}
