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
    poster.src = data.movie.poster;
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

    const contenedorAsientos = document.getElementById('asientos-container');
    for (const row in data.seats) {
        if (data.seats.hasOwnProperty(row)) {
            console.log(`Fila ${row}:`);
            const fila = document.createElement('div');
            fila.classList.add('fila');
            data.seats[row].forEach(seat => {
                const asiento = document.createElement('div');
                asiento.classList.add('asiento');
                if (seat === 1) {
                    asiento.classList.add('selecionado');
                }else{
                    if (seat === 2) {
                        asiento.classList.add('ocupado');
                    }
                }

                fila.appendChild(asiento);


                asiento.addEventListener('click', () => {
                    if (asiento.classList.contains('selecionado')) {
                        asiento.classList.remove('selecionado');
                    }else{
                        asiento.classList.add('selecionado');
                    }
                });

            });

            contenedorAsientos.appendChild(fila);
        }
    }

})
.catch(error => {
    console.error('Error:', error);
});