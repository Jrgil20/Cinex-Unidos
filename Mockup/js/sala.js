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



  })
  .catch(error => {
    console.error('Error:', error);
  });