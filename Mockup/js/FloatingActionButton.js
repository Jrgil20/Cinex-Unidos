const main = document.querySelector('main');

const menuFlotante = document.createElement('div');
menuFlotante.classList.add('floating-menu');
main.appendChild(menuFlotante);

const floatingMenuIcon2 = document.createElement('div');
floatingMenuIcon2.classList.add('floating-menu-icon');
floatingMenuIcon2.classList.add('oculto');
floatingMenuIcon2.innerHTML = '<i class="fa-solid fa-gear"></i>';
menuFlotante.appendChild(floatingMenuIcon2);

const floatingMenuIcon3 = document.createElement('div');
floatingMenuIcon3.classList.add('floating-menu-icon');
floatingMenuIcon3.classList.add('oculto');
floatingMenuIcon3.innerHTML = '<i class="fa-regular fa-message"></i>';
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

const floatingModal = document.createElement('div');
floatingModal.classList.add('modal');
floatingModal.id = 'floatingModal';
main.appendChild(floatingModal);

const floatingModalContent = document.createElement('div');
floatingModalContent.classList.add('modal-content');
floatingModal.appendChild(floatingModalContent);

const floatingModalClose = document.createElement('span');
floatingModalClose.classList.add('close');
floatingModalClose.innerHTML = '&times;';
floatingModalContent.appendChild(floatingModalClose);

floatingMenuIcon2.addEventListener('click', () => {
    floatingModal.style.display = 'block';
});

floatingModalClose.onclick = function () {
    floatingModal.style.display = 'none';
}

const floatingModalForm = document.createElement('form');
floatingModalForm.classList.add('modal-form');
floatingModalContent.appendChild(floatingModalForm);

const floatingModalCheckbox = document.createElement('input');
floatingModalCheckbox.type = 'checkbox';
floatingModalCheckbox.id = 'checkbox';
floatingModalForm.appendChild(floatingModalCheckbox);

const floatingModalLabel = document.createElement('label');
floatingModalLabel.htmlFor = 'checkbox';
floatingModalLabel.textContent = 'Elegir Tema De color';
floatingModalForm.appendChild(floatingModalLabel);

const floatingModal2 = document.createElement('div');
floatingModal2.classList.add('modal');
floatingModal2.id = 'floatingModal2';
main.appendChild(floatingModal2);

const floatingModalContent2 = document.createElement('div');
floatingModalContent2.classList.add('modal-content');
floatingModal2.appendChild(floatingModalContent2);

const floatingModalClose2 = document.createElement('span');
floatingModalClose2.classList.add('close');
floatingModalClose2.innerHTML = '&times;';
floatingModalContent2.appendChild(floatingModalClose2);

floatingMenuIcon3.addEventListener('click', () => {
    floatingModal2.style.display = 'block';
});

floatingModalClose2.onclick = function () {
    floatingModal2.style.display = 'none';
}

window.onclick = function (event) {

    if (event.target === floatingModal2) {
        floatingModal2.style.display = 'none';
    }else if (event.target === floatingModal) {
        floatingModal.style.display = 'none';
    }
}

