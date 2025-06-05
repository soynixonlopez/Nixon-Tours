// Precios base según tipo de visitante
const PRICES = {
    nacional: {
        pasadia: {
            adult: 45,
            child: 22.50
        },
        camping: {
            adult: 85,
            child: 42.50
        },
        estadia: {
            standard: {
                base: 95,
                adult: 20,
                child: 10
            },
            superior: {
                base: 125,
                adult: 25,
                child: 12.50
            },
            deluxe: {
                base: 155,
                adult: 30,
                child: 15
            }
        }
    },
    extranjero: {
        pasadia: {
            adult: 65,
            child: 32.50
        },
        camping: {
            adult: 115,
            child: 57.50
        },
        estadia: {
            standard: {
                base: 125,
                adult: 25,
                child: 12.50
            },
            superior: {
                base: 165,
                adult: 30,
                child: 15
            },
            deluxe: {
                base: 195,
                adult: 35,
                child: 17.50
            }
        }
    }
};

// Discount Codes
const DISCOUNT_CODES = {
    'NIXON10': 0.10,
    'SUMMER20': 0.20,
    'FAMILY15': 0.15
};

// Form Elements
const form = document.getElementById('quotationForm');
const packageTypeInputs = document.getElementsByName('packageType');
const cabinSection = document.getElementById('cabinSection');
const nightsContainer = document.getElementById('nightsContainer');
const quoteResult = document.getElementById('quoteResult');
const quoteDetails = document.getElementById('quoteDetails');
const totalPrice = document.getElementById('totalPrice');

// Show/Hide Sections Based on Package Type
packageTypeInputs.forEach(input => {
    input.addEventListener('change', () => {
        const isEstadia = input.value === 'estadia';
        cabinSection.style.display = isEstadia ? 'block' : 'none';
        nightsContainer.style.display = input.value !== 'pasadia' ? 'block' : 'none';
    });
});

// Calculate Quote
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    // Get form values
    const visitorName = document.getElementById('visitorName').value;
    const visitorType = document.getElementById('visitorType').value;
    const packageType = document.querySelector('input[name="packageType"]:checked').value;
    const travelDate = document.getElementById('travelDate').value;
    const adults = parseInt(document.getElementById('adults').value);
    const children = parseInt(document.getElementById('children').value);
    const transport = document.getElementById('transport').checked;
    const photography = document.getElementById('photography').checked;
    const discountCode = document.getElementById('discountCode').value.toUpperCase();
    
    let subtotal = 0;
    let details = [];

    // Add visitor information
    details.push({
        item: 'Nombre',
        value: visitorName,
        price: null
    });
    details.push({
        item: 'Tipo de Visitante',
        value: visitorType === 'nacional' ? 'Nacional' : 'Extranjero',
        price: null
    });
    details.push({
        item: 'Fecha de Viaje',
        value: new Date(travelDate).toLocaleDateString(),
        price: null
    });

    // Calculate package price
    if (packageType === 'pasadia' || packageType === 'camping') {
        const prices = PRICES[visitorType][packageType];
        const adultPrice = prices.adult * adults;
        const childPrice = prices.child * children;
        subtotal = adultPrice + childPrice;

        details.push({
            item: `Adultos (${adults})`,
            value: null,
            price: adultPrice
        });
        if (children > 0) {
            details.push({
                item: `Niños (${children})`,
                value: null,
                price: childPrice
            });
        }
    } else if (packageType === 'estadia') {
        const cabinType = document.querySelector('input[name="cabinType"]:checked').value;
        const nights = parseInt(document.getElementById('nights').value);
        const cabin = PRICES[visitorType].estadia[cabinType];
        
        const basePrice = cabin.base * nights;
        const adultPrice = cabin.adult * adults * nights;
        const childPrice = cabin.child * children * nights;
        subtotal = basePrice + adultPrice + childPrice;

        details.push({
            item: `Cabaña ${cabinType.charAt(0).toUpperCase() + cabinType.slice(1)} (${nights} noches)`,
            value: null,
            price: basePrice
        });
        details.push({
            item: `Adultos (${adults})`,
            value: null,
            price: adultPrice
        });
        if (children > 0) {
            details.push({
                item: `Niños (${children})`,
                value: null,
                price: childPrice
            });
        }
    }

    // Add transport cost if selected
    if (transport) {
        const transportCost = 50 * (adults + children);
        subtotal += transportCost;
        details.push({
            item: 'Transporte 4x4',
            value: null,
            price: transportCost
        });
    }

    // Add photography cost if selected
    if (photography) {
        subtotal += 80;
        details.push({
            item: 'Servicio Fotográfico',
            value: null,
            price: 80
        });
    }

    // Apply discount if valid code
    let discount = 0;
    if (discountCode && DISCOUNT_CODES.hasOwnProperty(discountCode)) {
        discount = subtotal * DISCOUNT_CODES[discountCode];
        details.push({
            item: `Descuento (${discountCode})`,
            value: null,
            price: -discount
        });
    }

    // Calculate tax
    const tax = (subtotal - discount) * 0.07;
    details.push({
        item: 'ITBMS (7%)',
        value: null,
        price: tax
    });

    // Calculate total
    const total = subtotal - discount + tax;

    // Display results
    displayQuote(details, total);
    quoteResult.style.display = 'block';

    // Scroll to results
    quoteResult.scrollIntoView({ behavior: 'smooth' });
});

// Display Quote Details
function displayQuote(details, total) {
    quoteDetails.innerHTML = details.map(detail => {
        if (detail.price === null) {
            return `
                <tr>
                    <td>${detail.item}:</td>
                    <td class="text-end">${detail.value}</td>
                </tr>
            `;
        }
        return `
            <tr>
                <td>${detail.item}:</td>
                <td class="text-end">$${detail.price.toFixed(2)}</td>
            </tr>
        `;
    }).join('');

    totalPrice.textContent = `$${total.toFixed(2)}`;
}

// Form Validation
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar jsPDF
    window.jsPDF = window.jspdf.jsPDF;

    // Set min date to today
    const travelDate = document.getElementById('travelDate');
    const today = new Date().toISOString().split('T')[0];
    travelDate.min = today;

    // Validate adults and children
    const adultsInput = document.getElementById('adults');
    const childrenInput = document.getElementById('children');

    adultsInput.addEventListener('change', () => {
        if (parseInt(adultsInput.value) < 1) {
            adultsInput.value = 1;
            showToast('Debe haber al menos 1 adulto', 'error');
        }
    });

    childrenInput.addEventListener('change', () => {
        if (parseInt(childrenInput.value) < 0) {
            childrenInput.value = 0;
            showToast('La cantidad de niños no puede ser negativa', 'error');
        }
    });

    // Validate nights for estadia
    const nightsInput = document.getElementById('nights');
    nightsInput.addEventListener('change', () => {
        if (parseInt(nightsInput.value) < 1) {
            nightsInput.value = 1;
            showToast('Debe reservar al menos 1 noche', 'error');
        }
    });
});

// Función para descargar el PDF
function downloadPDF() {
    const doc = new jsPDF();
    const quoteDetails = document.getElementById('quoteDetails');
    const totalPrice = document.getElementById('totalPrice');
    const visitorName = document.getElementById('visitorName').value;
    
    // Configurar estilos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Nixon Tours - Cotización', 20, 20);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('Fecha de Cotización: ' + new Date().toLocaleDateString(), 20, 30);
    
    // Agregar detalles de la cotización
    let yPos = 50;
    const rows = quoteDetails.getElementsByTagName('tr');
    
    for (let row of rows) {
        const label = row.cells[0].textContent;
        const value = row.cells[1].textContent;
        doc.text(`${label} ${value}`, 20, yPos);
        yPos += 10;
    }
    
    // Agregar total
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Final: ${totalPrice.textContent}`, 20, yPos + 10);
    
    // Agregar pie de página
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const footerText = 'Esta cotización es válida por 7 días. Para reservar, contáctenos al +507 6942-0000';
    doc.text(footerText, 20, doc.internal.pageSize.height - 20);
    
    // Descargar el PDF
    doc.save(`Cotizacion_NixonTours_${visitorName.replace(/\s+/g, '_')}.pdf`);
} 