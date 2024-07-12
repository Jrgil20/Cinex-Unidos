const temaLink = document.getElementById('tema-link');
const temaOscuroLink = document.querySelector('link[href="tema-oscuro.css"]');


function aplicarTema(tema) {
  if (tema === 'oscuro') {
    temaLink.href = 'css/tema-oscuro.css';
  } else {
    temaLink.href = 'css/tema-claro.css';
  }
}



themeOption = localStorage.getItem('themeOption');
if (themeOption === 'true') {
  // Detecta la preferencia del usuario al cargar la página
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    aplicarTema('oscuro');
  } else {
    aplicarTema('claro');
  }
} else {
  themeColor = localStorage.getItem('themecolor');
  aplicarTema(themeColor);
}