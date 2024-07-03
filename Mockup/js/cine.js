const id = new URLSearchParams(window.location.search).get('cine');

fetch('https://cinexunidos-production.up.railway.app/theatres/${}'+id, {
    
  method: 'GET',

}).then(response => response.json())
   .then(data => {
    console.log(data);

    const nombreCine = document.createElement('h2');
    nombreCine.textContent = data.name;

    const localizacionCine = document.createElement('p');
    localizacionCine.textContent = data.location;

    const contenedorInformacion = document.getElementById('informacion-container');
    contenedorInformacion.appendChild(nombreCine);
    contenedorInformacion.appendChild(localizacionCine);

    const auditorios = data.auditoriums;
    const contenedorAuditorios = document.getElementById('auditorio-container');

    auditorios.forEach(auditorio => {
        const cartaAuditorio = document.createElement('div');
        cartaAuditorio.classList.add('carta-auditorio');

        const nombreAuditorio = document.createElement('h3');
        nombreAuditorio.textContent = auditorio.name;

        const capacidadAuditorio = document.createElement('p');
        capacidadAuditorio.textContent = `Capacidad: ${auditorio.capacity}`;

        cartaAuditorio.appendChild(nombreAuditorio);
        cartaAuditorio.appendChild(capacidadAuditorio);

        
        contenedorAuditorios.appendChild(cartaAuditorio);

        cartaAuditorio.addEventListener('click', () => {
            window.location.href = 'auditorio.html?cine='+ id + '&auditorio=' + auditorio.id;
            src
        });
    
    });


  })
.catch(error => {
   console.error('Error:', error);
});

