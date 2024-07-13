 const productos = [{
    "palomitas": [
        { "nombre": "Palomitas Pequeñas", "precio": 5 },
        { "nombre": "Palomitas Medianas", "precio": 8 },
        { "nombre": "Palomitas Grandes", "precio": 12 }
    ],
    "bebidas": [
        { "nombre": "Refresco", "precio": 3 },
        { "nombre": "Agua", "precio": 2 },
        { "nombre": "Jugo", "precio": 4 }
    ],
    "snacks": [
        { "nombre": "Chocolate", "precio": 3 },
        { "nombre": "Papas Fritas", "precio": 4 },
        { "nombre": "Nachos", "precio": 6 }
    ]
}]

function createCarousel(images, title, description) {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');

    // Add images to the carousel
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        carousel.appendChild(img);
    });
    
    // Add title and description to the carousel
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    carousel.appendChild(titleElement);
    
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    carousel.appendChild(descriptionElement);
    
    return carousel;
}

function showProductosCarousel() {
    const productosCarousel = createCarousel(productos[0].palomitas);
    // Code to display the productos carousel on the page
}

function showBebidasCarousel() {
    const bebidasCarousel = createCarousel(productos[0].bebidas);
    // Code to display the bebidas carousel on the page
}

function showSnacksCarousel() {
    const snacksCarousel = createCarousel(productos[0].snacks);
    // Code to display the snacks carousel on the page
}