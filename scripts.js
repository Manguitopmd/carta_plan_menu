// Cargar secciones dinámicamente
function loadSection(section) {
    fetch(`${section}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            // Reaplicar animaciones después de cargar el contenido
            document.querySelectorAll('.animate-slide-up, .animate-bounce-in').forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
            });
        })
        .catch(error => console.error('Error cargando la sección:', error));
}

// Modal con soporte para WhatsApp
function openModal(title, description, price, whatsappUrl = null) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-price').textContent = price;
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    // Personalizar el contenido del modal si hay URL de WhatsApp
    if (whatsappUrl) {
        modalContent.innerHTML = `
            <h3 id="modal-title" class="text-2xl font-bold" style="color: var(--header-bg);">${title}</h3>
            <p id="modal-description" class="mt-2">${description}</p>
            <p id="modal-price" class="price-text font-bold mt-4">${price}</p>
            <a href="${whatsappUrl}" target="_blank" class="mt-6 whatsapp-bg text-white px-6 py-3 rounded-full font-semibold hover:bg-whatsapp-hover transition duration-200 w-full flex items-center justify-center gap-2">
                <i class="fab fa-whatsapp"></i> Hacer pedido por WhatsApp
            </a>
            <button class="mt-4 text-white px-4 py-2 rounded" style="background-color: var(--header-bg);" onmouseover="this.style.backgroundColor='#6b1717'" onmouseout="this.style.backgroundColor=var(--header-bg)" onclick="closeModal()">Cerrar</button>
        `;
    }

    modal.classList.remove('hidden');
    setTimeout(() => modalContent.classList.replace('scale-0', 'scale-100'), 10);
}

function closeModal() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    modalContent.classList.replace('scale-100', 'scale-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// Formulario de reservas a WhatsApp
function sendReservation(event) {
    event.preventDefault();
    const form = document.getElementById('reservationForm');
    const name = form.name.value;
    const phone = form.phone.value;
    const date = form.date.value;
    const time = form.time.value;
    const people = form.people.value;
    const message = `Reserva:\nNombre: ${name}\nTeléfono: ${phone}\nFecha: ${date}\nHora: ${time}\nPersonas: ${people}`;
    const whatsappUrl = `https://wa.me/51930288404?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    form.reset();
}

// Control de música
const audio = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
audio.volume = 0.5; // Volumen al 50%
audio.play();

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
    }
}