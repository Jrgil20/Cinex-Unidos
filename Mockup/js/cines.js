fetch('https://cinexunidos-production.up.railway.app/theatres', {
  method: 'GET',

}).then(response => response.json())
   .then(data => {
    console.log(data);
    const cinesContainer = document.getElementById('cines-container');
    data.forEach(cine => {
        const carta = document.createElement('div');
        carta.classList.add('card');
        const nombreCine = document.createElement('h3');
        nombreCine.textContent = cine.name;
        const direccion = document.createElement('p');
        direccion.textContent = cine.location;

        carta.addEventListener('click', () => {
         window.location.href = `cine.html?cine=${cine.id}`;

        });

        carta.appendChild(nombreCine);
        carta.appendChild(direccion);
        cinesContainer.appendChild(carta);
    });
  })
.catch(error => {
   console.error('Error:', error);
});

