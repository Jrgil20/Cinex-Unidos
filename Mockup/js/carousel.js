fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        // Aquí puedes acceder a los datos de los productos
        console.log(data.palomitas); 
        console.log(data.bebidas);
        console.log(data.snacks);

        // Ahora puedes usar estos datos para crear los sliders
        // Por ejemplo, para crear elementos HTML para cada producto y agregarlos a los divs correspondientes
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
