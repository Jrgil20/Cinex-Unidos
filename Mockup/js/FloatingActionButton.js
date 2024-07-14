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
        document.getElementById('socket').src ='js/WebSockets.js';
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
    floatingModal.style.display = 'inline-block';
});

floatingModalClose.onclick = function () {
    floatingModal.style.display = 'none';
}

const floatingModalForm = document.createElement('form');
floatingModalForm.classList.add('modal-form');
floatingModalContent.appendChild(floatingModalForm);

const floatingModalTitle = document.createElement('h2');
floatingModalTitle.textContent = 'Preferencias';
floatingModalForm.appendChild(floatingModalTitle);

const modalForm = document.querySelector('.modal-content'); 
const userNameLabel = document.createElement('h5');
userNameLabel.textContent = 'Nombre de Usuario';
userNameLabel.style.marginBottom = '10px';
modalForm.appendChild(userNameLabel);

const userNameInput = document.createElement('input');
userNameInput.classList.add('user-name-input');
userNameInput.placeholder = 'Tu nombre';
userNameInput.setAttribute('required', true);
modalForm.appendChild(userNameInput); 

const saveButton = document.createElement('button');
saveButton.type = 'submit';
saveButton.textContent = 'Guardar Preferencias';
saveButton.classList.add('save-button');
modalForm.appendChild(saveButton);

saveButton.addEventListener('click', function() {
    console.log('Guardar preferencias...');
  });

const floatingModalCheckbox = document.createElement('input');
floatingModalCheckbox.type = 'checkbox';
floatingModalCheckbox.id = 'checkbox';
floatingModalForm.appendChild(floatingModalCheckbox);

const floatingModalLabel = document.createElement('label');
floatingModalLabel.htmlFor = 'checkbox';
floatingModalLabel.textContent = 'Elegir Tema De color';
floatingModalForm.appendChild(floatingModalLabel);

const floatingModalSwitch = document.createElement('label');
floatingModalSwitch.classList.add('switch');
floatingModalSwitch.style.display = 'none';
floatingModalForm.appendChild(floatingModalSwitch);

const floatingModalSwitchInput = document.createElement('input');
floatingModalSwitchInput.type = 'checkbox';
floatingModalSwitchInput.id = 'switchInput'; // Add an id to the input element
floatingModalSwitch.appendChild(floatingModalSwitchInput);

const floatingModalSwitchSlider = document.createElement('span');
floatingModalSwitchSlider.classList.add('slider');
floatingModalSwitch.appendChild(floatingModalSwitchSlider);

const themeOption = localStorage.getItem('themeOption');
if (themeOption === 'true') {
    floatingModalCheckbox.checked = false;
    floatingModalSwitch.style.display = 'none';
} else {
    floatingModalCheckbox.checked = true;
    floatingModalSwitch.style.display = 'inline-block';
}

floatingModalCheckbox.addEventListener('change', () => {
    if (floatingModalCheckbox.checked) {
        floatingModalSwitch.style.display = 'inline-block';
        localStorage.setItem('themeOption', false);
    } else {
        floatingModalSwitch.style.display = 'none';
        localStorage.setItem('themeOption', true);
    }
});

const themeColor = localStorage.getItem('themecolor');
if (themeColor === 'oscuro') {
    floatingModalSwitchInput.checked = true;
} else {
    floatingModalSwitchInput.checked = false;
}

floatingModalSwitchInput.addEventListener('change', () => {
    if (floatingModalSwitchInput.checked) {
        localStorage.setItem('themecolor', 'oscuro');
    } else {
        localStorage.setItem('themecolor', 'claro');
    }
    location.reload();
});


/* se deberia crear una funcion crear modal flotante */

/* Floating Modal 2 */
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


const chatWindow = document.createElement('div');
chatWindow.classList.add('chat-window');
chatWindow.setAttribute('id','ventanaChat');
floatingModalContent2.appendChild(chatWindow);

const chatHeader = document.createElement('div');
chatHeader.classList.add('chat-header');
chatHeader.textContent = 'Chat con Soporte Tecnico';
chatWindow.appendChild(chatHeader);

const chatMessages = document.createElement('div');
chatMessages.classList.add('chat-messages');
chatWindow.appendChild(chatMessages);

const chatInput = document.createElement('input');
chatInput.classList.add('chat-input');
chatInput.placeholder = 'Escribe tu Mensaje...';
chatWindow.appendChild(chatInput);

const chatSendButton = document.createElement('button');
chatSendButton.classList.add('chat-send-button');
chatSendButton.setAttribute('id','sendButton');
chatSendButton.textContent = 'Enviar Mensaje';
chatWindow.appendChild(chatSendButton);



floatingMenuIcon3.addEventListener('click', () => {
    floatingModal2.style.display = 'inline-block';
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