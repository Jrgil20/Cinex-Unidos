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
                        //console.log(message)
                        socket.emit('send-message', message);
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
                    //console.log(message)
                    socket.emit('send-message', message);
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

const asientosSeleccionados = [];

function ReservarAsientos(asiento) {
    console.log('reservando asiento',asiento);
    asientosSeleccionados.push(asiento); // Agregar asiento a la lista de asientos seleccionados

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
    const index = asientosSeleccionados.indexOf(asiento);
    if (index > -1) {
        asientosSeleccionados.splice(index, 1); // Eliminar asiento de la lista de asientos seleccionados
    }

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

const tarjetaForm = document.getElementById('tarjeta-credito-form');

tarjetaForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Extract form data
    const numeroTarjeta = document.getElementById('numero-tarjeta').value;
    const vencimiento = document.getElementById('vencimiento').value;
    const codigoSeguridad = document.getElementById('codigo-seguridad').value;
    const titular = document.getElementById('nombre-tarjeta').value;

    const infoMetodo = {number:numeroTarjeta, expirationDate: vencimiento, cvv:codigoSeguridad, name:titular}; 
    // Reset form fields
    tarjetaForm.reset();

    pagarAsientos(asientosSeleccionados,'CREDIT_CARD',infoMetodo);
});

const debitform = document.getElementById('debit-card-form');

debitform.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Extract form data
    const numeroTarjeta = document.getElementById('numero-tarjeta-debito').value;
    const vencimiento = document.getElementById('vencimiento-debito').value;
    const codigoSeguridad = document.getElementById('codigo-seguridad-debito').value;
    const titular = document.getElementById('nombre-tarjeta-debito').value;

    const infoMetodo = {number:numeroTarjeta, expirationDate: vencimiento, cvv:codigoSeguridad, name:titular};
    // Reset form fields
    debitform.reset();

    pagarAsientos(asientosSeleccionados,'DEBIT_CARD',infoMetodo);
});

const pagoMovilForm = document.getElementById('pago-movil-form');

pagoMovilForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Extract form data
    const banco = document.getElementById('banco').value;
    const correo = document.getElementById('correo').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;

    const infoMetodo = {email:correo, phone:telefono, ssn:cedula, bank:banco};
    // Reset form fields
    pagoMovilForm.reset();

    pagarAsientos(asientosSeleccionados,'PAGO_MOVIL',infoMetodo);

});

const zelleForm = document.getElementById('zelle-form');

zelleForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Extract form data
    const correo = document.getElementById('correo-zelle').value;
    const telefono = document.getElementById('telefono-zelle').value;
    
    const infoMetodo = {email:correo, phone:telefono};
    // Reset form fields
    zelleForm.reset();

    pagarAsientos(asientosSeleccionados,'ZELLE',infoMetodo);
});

function pagarAsientos(asientosSeleccionados,metodo,infoMetodo){

    total = asientosSeleccionados.length*1.2;
    
    moneda = 'USD';
    
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


window.addEventListener('DOMContentLoaded', () => {
    const pagarButton = document.getElementById('pagar-button');
    const modalContainer = document.getElementById('modal-container');
    const paymentRadios = document.getElementsByName('payment-option');
    const paymentForms = document.querySelectorAll('form');
    const closeButton = document.querySelector('.close');
  
    pagarButton.addEventListener('click', () => {
      modalContainer.style.display = 'block';
    });
  
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        modalContainer.style.display = 'none';
      }
    });
  
    paymentRadios.forEach((radio) => {
        radio.addEventListener('change', () => {
          paymentForms.forEach((form) => {
            form.style.display = 'none';
          });
    
          const selectedOption = radio.value;
          const selectedForm = document.getElementById(`${selectedOption}-form`);
          selectedForm.style.display = 'block';
        });
      });

      closeButton.addEventListener('click', () => {
        const modal = document.getElementById('modal-container');
        modal.style.display = 'none';
      });
  });
