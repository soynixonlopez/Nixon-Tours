// Función para cargar componentes HTML
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Si es el header, activar el link actual
        if (elementId === 'header') {
            setActiveNavLink();
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Función para marcar el link activo en el navbar
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Función para inicializar el efecto de scroll en el navbar
function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Función para inicializar el botón "Back to Top"
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Función para inicializar el formulario del newsletter
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Aquí puedes agregar la lógica para manejar la suscripción
            console.log('Newsletter subscription:', email);
            this.reset();
        });
    }
}

// Función principal para inicializar todos los componentes
async function initComponents() {
    // Cargar componentes
    await loadComponent('header', '/components/header.html');
    await loadComponent('footer', '/components/footer.html');
    
    // Inicializar funcionalidades
    initNavbarScroll();
    initBackToTop();
    initNewsletterForm();
    
    // Inicializar AOS si está disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initComponents); 