// Inicializar EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Reemplazar con tu clave pública de EmailJS
})();

// Coordenadas de la oficina
const OFFICE_LOCATION = {
    lat: 9.016469091719279,
    lng: -79.51954492474937
};

// Inicializar el mapa
const map = L.map('map').setView([OFFICE_LOCATION.lat, OFFICE_LOCATION.lng], 15);

// Añadir el mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Crear un icono personalizado para el marcador
const customIcon = L.icon({
    iconUrl: 'img/marker.png', // Asegúrate de tener este archivo
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Añadir el marcador con popup
const marker = L.marker([OFFICE_LOCATION.lat, OFFICE_LOCATION.lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(`
        <div class="map-popup">
            <h5>Nixon Tours</h5>
            <p>¡Ven a visitarnos!</p>
            <p><small>Ciudad de Panamá, cerca de Albrook Mall</small></p>
        </div>
    `)
    .openPopup();

// Elementos del DOM
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const spinner = submitBtn.querySelector('.spinner-border');
const successToast = new bootstrap.Toast(document.getElementById('successToast'));
const errorToast = new bootstrap.Toast(document.getElementById('errorToast'));

// Validación del formulario
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Mostrar spinner
    submitBtn.disabled = true;
    spinner.classList.remove('d-none');

    // Recoger datos del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    try {
        // Enviar email usando EmailJS
        await emailjs.send(
            "YOUR_SERVICE_ID", // Reemplazar con tu Service ID
            "YOUR_TEMPLATE_ID", // Reemplazar con tu Template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message
            }
        );

        // Mostrar mensaje de éxito
        successToast.show();
        
        // Limpiar formulario
        form.reset();
        form.classList.remove('was-validated');

        // Registrar lead en Google Analytics (si está disponible)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Contact',
                'event_label': formData.subject
            });
        }
    } catch (error) {
        console.error('Error:', error);
        errorToast.show();
    } finally {
        // Ocultar spinner y habilitar botón
        submitBtn.disabled = false;
        spinner.classList.add('d-none');
    }
});

// Validación en tiempo real del teléfono
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        value = value.match(new RegExp('.{1,4}', 'g')).join('-');
    }
    e.target.value = value;
});

// Inicializar tooltips y popovers de Bootstrap
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Inicializar todos los tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}); 