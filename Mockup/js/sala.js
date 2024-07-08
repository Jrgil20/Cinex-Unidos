const id = new URLSearchParams(window.location.search).get('cine');
const idAuditorio = new URLSearchParams(window.location.search).get('auditorio');

fetch(`https://cinexunidos-production.up.railway.app/theatres/${id}/auditoriums/${idAuditorio}`, {
    method: 'GET',
}).then(response => response.json())
  .then(data => {
    const informacionContainer = document.getElementById('informacion-container');
    const nombreAuditorio = document.createElement('h2');
    nombreAuditorio.textContent = data.name;
    const capacidadAuditorio = document.createElement('p');
    capacidadAuditorio.textContent = `Capacidad: ${data.capacity}`;
    informacionContainer.appendChild(nombreAuditorio);
    informacionContainer.appendChild(capacidadAuditorio);

    const showtimes = data.showtimes;
    const funcionescontainer = document.getElementById('funciones-container');
    const funcionTitle = document.createElement('h2');
    funcionTitle.textContent = 'Funciones';
    showtimes.forEach(showtime => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.classList.add('funcion-card');

      const poster = document.createElement('img');
      poster.src = `https://cinexunidos-production.up.railway.app/${showtime.movie.poster}`

      const pelicula = document.createElement('h3');
      pelicula.textContent = `Pelicula: ${showtime.movie.name}`;

      const rating = document.createElement('p');
      rating.textContent = `Rating: ${showtime.movie.rating}`;

      const hora = document.createElement('h4');
      hora.textContent = `Hora: ${showtime.startTime}`;


      card.appendChild(poster);
      card.appendChild(pelicula);
      card.appendChild(rating);
      card.appendChild(hora);
      card.addEventListener('click', () => {
        window.location.href = `funcion.html?cine=${id}&auditorio=${idAuditorio}&showtime=${showtime.id}`;
      });
      informacionContainer.appendChild(card);
    });

  })
  .catch(error => {
    console.error('Error:', error);
  });