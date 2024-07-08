fetch('https://cinexunidos-production.up.railway.app/theatres', {
    method: 'GET',
  
  }).then(response => response.json())
     .then(data => {
      console.log(data);
      const peliculasContainer = document.getElementById('peliculas-container');
      data.forEach(cine => {
        
        cine.auditoriums.forEach(auditorio => {
            
            auditorio.showtimes.forEach(funciones => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.classList.add('funcion-card');
                const poster = document.createElement('img');
                poster.src = `https://cinexunidos-production.up.railway.app/${funciones.movie.poster}`;
                const pelicula = document.createElement('h3');
                pelicula.textContent = `Pelicula: ${funciones.movie.name}`;
                const rating = document.createElement('p');
                rating.textContent = `Rating: ${funciones.movie.rating}`;
                const hora = document.createElement('h4');
                hora.textContent = `Hora: ${funciones.startTime}`;
                const sala = document.createElement('p');
                sala.textContent = `Sala: ${auditorio.name}`;
                const Lugar = document.createElement('p');
                Lugar.textContent = `Cine: ${cine.name}`;

                peliculasContainer.appendChild(card);
                card.appendChild(poster);
                card.appendChild(pelicula);
                card.appendChild(rating);
                card.appendChild(hora);
                card.appendChild(Lugar);
                card.appendChild(sala);
                card.addEventListener('click', () => {
                  window.location.href = `funcion.html?cine=${cine.id}&auditorio=${auditorio.id}&showtime=${funciones.id}`;
                });

            } );
      });
    })
    }
    )
  .catch(error => {
     console.error('Error:', error);
  });
  
