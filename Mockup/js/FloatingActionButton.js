const main = document.querySelector('main');

const menuFlotante = document.createElement('div');
menuFlotante.classList.add('floating-menu');
main.appendChild(menuFlotante);

const floatingMenuIcon2 = document.createElement('div');
floatingMenuIcon2.classList.add('floating-menu-icon');
floatingMenuIcon2.classList.add('oculto');
floatingMenuIcon2.innerHTML = '<i class="fa-regular fa-message"></i>';
menuFlotante.appendChild(floatingMenuIcon2);


const floatingMenuIcon3 = document.createElement('div');
floatingMenuIcon3.classList.add('floating-menu-icon');
floatingMenuIcon3.classList.add('oculto');
floatingMenuIcon3.innerHTML = '<i class="fa-solid fa-info"></i>';
menuFlotante.appendChild(floatingMenuIcon3);



const floatingMenuIcon = document.createElement('div');
floatingMenuIcon.classList.add('floating-menu-icon');
floatingMenuIcon.innerHTML = '<i class="fa-solid fa-plus"></i>';
menuFlotante.appendChild(floatingMenuIcon);

floatingMenuIcon.addEventListener('click', () => {
    if (floatingMenuIcon.innerHTML === '<i class="fa-solid fa-plus"></i>') {
        floatingMenuIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        floatingMenuIcon2.classList.remove('oculto');
        floatingMenuIcon3.classList.remove('oculto');
    } else {
        floatingMenuIcon.innerHTML = '<i class="fa-solid fa-plus"></i>';
        floatingMenuIcon2.classList.add('oculto');
        floatingMenuIcon3.classList.add('oculto');
    }

});

