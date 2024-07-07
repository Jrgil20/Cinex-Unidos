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
    informacionfuncion.appendChild(pelicula);

    const poster = document.createElement('img');
    poster.src = `https://cinexunidos-production.up.railway.app/${data.movie.poster}`;
    poster.alt = data.movie.name;
    poster.classList.add('poster')
    informacionfuncion.appendChild(poster);

    const horario = document.createElement('p');
    horario.textContent = data.startTime;
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
            contadordeAsientos = 0;
            data.seats[row].forEach(seat => {
                const asiento = document.createElement('div');
                const numeroAsiento = document.createElement('p');
                numeroAsiento.textContent = row +contadordeAsientos;
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
                            LiberarAsientos(numeroAsiento.textContent);
                        }else{
                            asiento.classList.add('selecionado');
                            asiento.classList.remove('disponible');
                            ReservarAsientos(numeroAsiento.textContent);
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