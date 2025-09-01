// Precios actualizados según especificaciones
const PRICES = {
    // Para todos los paquetes (nacionales y extranjeros): $85 x persona
    pasadia: {
        adult: 45,
        child: 22.50, // 50% descuento para menores de 5 años
        transport: 50
    },
    camping: {
        adult: 70,
        child: 35, // 50% descuento para menores de 5 años
        transport: 50
    },
    estadia: {
        standard: { // Cabaña estándar frente al mar
            adult: 85,
            child: 42.50, // 50% descuento para menores de 5 años
            additionalNight: 35,
            transport: 50
        },
        oceanfront: { // Cabaña a orilla del mar sin balcón
            adult: 106,
            child: 53, // 50% descuento para menores de 5 años
            additionalNight: 35,
            transport: 50
        },
        'oceanfront-balcony': { // Cabaña a orilla del mar con balcón
            adult: 136,
            child: 68, // 50% descuento para menores de 5 años
            additionalNight: 35,
            transport: 50
        }
    }
};

// Impuestos según nacionalidad
const TAX_RATES = {
    nacional: 7, // $7 por persona
    extranjero: 22 // $22 por persona
};

// Costo de almuerzo para salida de 3:00 PM
const LUNCH_COST = 10;

// Códigos de descuento
const DISCOUNT_CODES = {
    'NIXON10': 0.10,
    'SUMMER20': 0.20,
    'FAMILY15': 0.15
};

// Elementos del formulario
const form = document.getElementById('quotationForm');
const packageTypeInputs = document.getElementsByName('packageType');
const cabinSection = document.getElementById('cabinSection');
const nightsContainer = document.getElementById('nightsContainer');
const quoteResult = document.getElementById('quoteResult');
const quoteDetails = document.getElementById('quoteDetails');
const totalPrice = document.getElementById('totalPrice');

// Verificar que todos los elementos existan al cargar
if (!form || !quoteResult || !quoteDetails || !totalPrice) {
    console.error('Error: Algunos elementos del DOM no fueron encontrados');
}

// Mostrar/Ocultar secciones según el tipo de paquete
packageTypeInputs.forEach(input => {
    input.addEventListener('change', () => {
        const isEstadia = input.value === 'estadia';
        const isCamping = input.value === 'camping';
        
        cabinSection.style.display = isEstadia ? 'block' : 'none';
        nightsContainer.style.display = (isEstadia || isCamping) ? 'block' : 'none';
        
        // Actualizar etiqueta de noches según el tipo
        const nightsLabel = document.querySelector('label[for="nights"]');
        if (isCamping) {
            nightsLabel.textContent = 'Días de Camping';
            document.getElementById('nights').value = 2;
        } else if (isEstadia) {
            nightsLabel.textContent = 'Noches de Estadía';
            document.getElementById('nights').value = 1;
        }
    });
});

// Calcular cotización
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Verificar campos requeridos
    const visitorName = document.getElementById('visitorName').value;
    const visitorType = document.getElementById('visitorType').value;
    const departureTime = document.getElementById('departureTime').value;
    const travelDate = document.getElementById('travelDate').value;
    
    if (!visitorName || !visitorType || !departureTime || !travelDate) {
        form.classList.add('was-validated');
        showToast('Por favor, complete todos los campos requeridos', 'error');
        return;
    }
    
    // Obtener valores adicionales del formulario
    const packageType = document.querySelector('input[name="packageType"]:checked').value;
    const adults = parseInt(document.getElementById('adults').value);
    const children = parseInt(document.getElementById('children').value);
    const transport = document.getElementById('transport').checked;
    const photography = document.getElementById('photography').checked;
    const discountCode = document.getElementById('discountCode').value.toUpperCase();
    
    let subtotal = 0;
    let details = [];
    let totalPersons = adults + children;

    // Información del cliente
    details.push({
        item: 'Nombre del Cliente',
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
        value: new Date(travelDate).toLocaleDateString('es-ES'),
        price: null
    });
    details.push({
        item: 'Horario de Salida',
        value: departureTime === '8am' ? '8:00 AM' : '3:00 PM (con almuerzo)',
        price: null
    });

    // Calcular precio del paquete
    if (packageType === 'pasadia') {
        const prices = PRICES.pasadia;
        const adultPrice = prices.adult * adults;
        const childPrice = prices.child * children;
        subtotal = adultPrice + childPrice;

        details.push({
            item: `Pasadía - Adultos (${adults})`,
            value: null,
            price: adultPrice
        });
        if (children > 0) {
            details.push({
                item: `Pasadía - Niños menores de 5 años (${children})`,
                value: null,
                price: childPrice
            });
        }

        // Transporte para pasadía
        if (transport) {
            const transportCost = prices.transport * totalPersons;
            subtotal += transportCost;
            details.push({
                item: 'Transporte 4x4',
                value: null,
                price: transportCost
            });
        }

    } else if (packageType === 'camping') {
        const prices = PRICES.camping;
        const adultPrice = prices.adult * adults;
        const childPrice = prices.child * children;
        subtotal = adultPrice + childPrice;

        details.push({
            item: `Camping - Adultos (${adults})`,
            value: null,
            price: adultPrice
        });
        if (children > 0) {
            details.push({
                item: `Camping - Niños menores de 5 años (${children})`,
                value: null,
                price: childPrice
            });
        }

        // Transporte para camping
        if (transport) {
            const transportCost = prices.transport * totalPersons;
            subtotal += transportCost;
            details.push({
                item: 'Transporte 4x4',
                value: null,
                price: transportCost
            });
        }

    } else if (packageType === 'estadia') {
        const cabinType = document.querySelector('input[name="cabinType"]:checked').value;
        const nights = parseInt(document.getElementById('nights').value);
        const prices = PRICES.estadia[cabinType];
        
        const adultPrice = prices.adult * adults;
        const childPrice = prices.child * children;
        const additionalNightsPrice = nights > 1 ? prices.additionalNight * (nights - 1) * totalPersons : 0;
        
        subtotal = adultPrice + childPrice + additionalNightsPrice;

        const cabinNames = {
            'standard': 'Cabaña Estándar Frente al Mar',
            'oceanfront': 'Cabaña Orilla del Mar (Sin Balcón)',
            'oceanfront-balcony': 'Cabaña Orilla del Mar (Con Balcón)'
        };

        details.push({
            item: `${cabinNames[cabinType]} - Adultos (${adults})`,
            value: null,
            price: adultPrice
        });
        if (children > 0) {
            details.push({
                item: `${cabinNames[cabinType]} - Niños menores de 5 años (${children})`,
                value: null,
                price: childPrice
            });
        }
        if (additionalNightsPrice > 0) {
            details.push({
                item: `Noches adicionales (${nights - 1} noches)`,
                value: null,
                price: additionalNightsPrice
            });
        }

        // Transporte para estadía
        if (transport) {
            const transportCost = prices.transport * totalPersons;
            subtotal += transportCost;
            details.push({
                item: 'Transporte 4x4',
                value: null,
                price: transportCost
            });
        }
    }

    // Costo de almuerzo si sale a las 3:00 PM
    if (departureTime === '3pm') {
        const lunchCost = LUNCH_COST * totalPersons;
        subtotal += lunchCost;
        details.push({
            item: 'Almuerzo incluido (3:00 PM)',
            value: null,
            price: lunchCost
        });
    }

    // Servicio fotográfico
    if (photography) {
        subtotal += 80;
        details.push({
            item: 'Servicio Fotográfico',
            value: null,
            price: 80
        });
    }

    // Subtotal
    details.push({
        item: 'Subtotal',
        value: null,
        price: subtotal,
        isSubtotal: true
    });

    // Aplicar descuento si hay código válido
    let discount = 0;
    if (discountCode && DISCOUNT_CODES.hasOwnProperty(discountCode)) {
        discount = subtotal * DISCOUNT_CODES[discountCode];
        details.push({
            item: `Descuento (${discountCode})`,
            value: null,
            price: -discount
        });
    }

    // Calcular impuestos
    const taxPerPerson = TAX_RATES[visitorType];
    const totalTax = taxPerPerson * totalPersons;
    details.push({
        item: `ITBMS (${visitorType === 'nacional' ? '$7' : '$22'} por persona)`,
        value: null,
        price: totalTax
    });

    // Total final
    const total = subtotal - discount + totalTax;

    // Mostrar resultados
    displayQuote(details, total, {
        visitorName,
        visitorType,
        packageType,
        travelDate,
        departureTime,
        adults,
        children,
        totalPersons
    });
    
    quoteResult.style.display = 'block';

    // Desplazar a resultados
    quoteResult.scrollIntoView({ behavior: 'smooth' });
});

// Mostrar detalles de la cotización
function displayQuote(details, total, customerInfo) {
    // Guardar información para la factura
    window.currentQuote = {
        details,
        total,
        customerInfo,
        quoteDate: new Date()
    };

    quoteDetails.innerHTML = details.map(detail => {
        if (detail.price === null) {
            return `
                <tr>
                    <td><strong>${detail.item}:</strong></td>
                    <td class="text-end">${detail.value}</td>
                </tr>
            `;
        }
        
        const rowClass = detail.isSubtotal ? 'table-info fw-bold' : '';
        const priceColor = detail.price < 0 ? 'text-success' : '';
        
        return `
            <tr class="${rowClass}">
                <td>${detail.item}:</td>
                <td class="text-end ${priceColor}">$${Math.abs(detail.price).toFixed(2)}</td>
            </tr>
        `;
    }).join('');

    totalPrice.textContent = `$${total.toFixed(2)}`;
}

// Validación del formulario
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar jsPDF
    if (typeof window.jspdf !== 'undefined') {
        window.jsPDF = window.jspdf.jsPDF;
    }

    // Establecer fecha mínima como hoy
    const travelDate = document.getElementById('travelDate');
    const today = new Date().toISOString().split('T')[0];
    travelDate.min = today;

    // Validar adultos y niños
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

    // Validar noches para estadía
    const nightsInput = document.getElementById('nights');
    nightsInput.addEventListener('change', () => {
        if (parseInt(nightsInput.value) < 1) {
            nightsInput.value = 1;
            showToast('Debe reservar al menos 1 noche', 'error');
        }
    });
});

// Función para cargar imagen y convertir a base64 circular
function loadImageAsBase64(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Para evitar problemas de CORS
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Hacer el canvas cuadrado para el círculo
            const size = Math.min(this.width, this.height);
            canvas.width = size;
            canvas.height = size;
            
            // Crear máscara circular
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            
            // Dibujar la imagen centrada en el círculo
            const offsetX = (size - this.width) / 2;
            const offsetY = (size - this.height) / 2;
            ctx.drawImage(this, offsetX, offsetY);
            
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = src;
    });
}

// Función para generar factura profesional en PDF
async function downloadPDF() {
    if (!window.currentQuote) {
        showToast('No hay cotización para descargar', 'error');
        return;
    }

    const { details, total, customerInfo, quoteDate } = window.currentQuote;
    const doc = new jsPDF();
    
    // Intentar cargar el logo
    let logoBase64 = null;
    try {
        logoBase64 = await loadImageAsBase64('assets/img/hero/NIXONTOURS1080 (1).png');
        console.log('Logo cargado exitosamente');
    } catch (error) {
        console.log('No se pudo cargar el logo:', error);
    }
    
    // Configuración de colores
    const primaryColor = [0, 123, 191]; // Azul profesional
    const secondaryColor = [108, 117, 125]; // Gris
    const lightGray = [240, 240, 240];
    
    // Header con colores profesionales
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 50, 'F');
    
    // Logo circular de la empresa
    if (logoBase64) {
        // Añadir el logo circular (ya procesado en canvas)
        const logoSize = 35; // Tamaño del logo circular
        const logoX = 20;
        const logoY = 8;
        
        doc.addImage(logoBase64, 'PNG', logoX, logoY, logoSize, logoSize);
        
        // Información de la empresa al lado del logo
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.text('Agencia de Turismo', 65, 20);
        doc.text('Panamá Guna Yala', 65, 30);
    } else {
        // Solo texto si no hay logo
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(32);
        doc.text('NIXON TOURS', 20, 25);
        
        doc.setFontSize(12);
        doc.text('Agencia de Turismo', 20, 35);
        doc.text('Panamá Guna Yala', 20, 42);
    }
    
    // Información de la empresa en el header (lado derecho)
    doc.setFontSize(10);
    doc.text('RUC: 10-711-1351 DV 00', 120, 20);
    doc.text('Nixon López - Asesor', 120, 28);
    doc.text('infonixontours@gmail.com', 120, 36);
    doc.text('Tel: +507 6825-2312', 120, 44);
    
    // Línea separadora
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(2);
    doc.line(20, 55, 190, 55);
    
    // Título de la factura
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('COTIZACIÓN DE SERVICIOS TURÍSTICOS', 20, 70);
    
    // Número de cotización (debajo del título)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const quoteNumber = `COT-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000)}`;
    doc.text(`No. Cotización: ${quoteNumber}`, 20, 78);
    
    // Información del cliente
    let currentY = 90;
    doc.setFillColor(...lightGray);
    doc.rect(20, currentY - 5, 170, 10, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('INFORMACIÓN DEL CLIENTE', 25, currentY);
    
    // Primera línea de datos del cliente (2 datos)
    currentY += 12;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Nombre: ${customerInfo.visitorName}`, 25, currentY);
    doc.text(`Tipo: ${customerInfo.visitorType === 'nacional' ? 'Nacional' : 'Extranjero'}`, 120, currentY);
    
    // Segunda línea de datos del cliente (2 datos)
    currentY += 8;
    doc.text(`Fecha de Cotización: ${quoteDate.toLocaleDateString('es-ES')}`, 25, currentY);
    doc.text(`Fecha de Viaje: ${new Date(customerInfo.travelDate).toLocaleDateString('es-ES')}`, 120, currentY);
    
    // Tabla de servicios
    let tableY = currentY + 20;
    
    // Header de la tabla
    doc.setFillColor(...lightGray);
    doc.rect(20, tableY - 5, 170, 12, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text('DESCRIPCIÓN', 25, tableY);
    doc.text('PRECIO', 155, tableY);
    
    // Línea del header
    doc.setDrawColor(...secondaryColor);
    doc.setLineWidth(1);
    doc.line(20, tableY + 3, 190, tableY + 3);
    
    // Contenido de la tabla
    tableY += 15;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    details.forEach(detail => {
        if (detail.price !== null) {
            // Alternar color de fondo para mejor legibilidad
            if (detail.isSubtotal) {
                doc.setFillColor(250, 250, 250);
                doc.rect(20, tableY - 4, 170, 10, 'F');
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11);
            } else {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(10);
            }
            
            doc.setTextColor(0, 0, 0);
            if (detail.price < 0) {
                doc.setTextColor(0, 150, 0); // Verde para descuentos
            }
            
            // Truncar texto largo si es necesario
            let itemText = detail.item;
            if (itemText.length > 45) {
                itemText = itemText.substring(0, 42) + '...';
            }
            
            doc.text(itemText, 25, tableY);
            doc.text(`$${Math.abs(detail.price).toFixed(2)}`, 155, tableY);
            
            tableY += 10;
        }
    });
    
    // Línea antes del total
    tableY += 5;
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(2);
    doc.line(20, tableY, 190, tableY);
    
    // Total final
    tableY += 10;
    doc.setFillColor(...primaryColor);
    doc.rect(20, tableY - 5, 170, 15, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('TOTAL FINAL:', 25, tableY + 2);
    doc.text(`$${total.toFixed(2)}`, 155, tableY + 2);
    
    // Nota importante sobre lo que NO está incluido
    tableY += 15;
    
    // Fondo para la nota importante (más compacto)
    doc.setFillColor(255, 245, 245); // Fondo rosa claro
    doc.rect(20, tableY - 3, 170, 32, 'F');
    
    doc.setTextColor(220, 53, 69); // Color rojo para llamar la atención
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('NOTA IMPORTANTE - LO QUE NO ESTÁ INCLUIDO:', 25, tableY);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const notIncluded = [
        '• Cocteles, bebidas alcohólicas y refrescos',
        '• Platos adicionales con camarón, cangrejos y otros mariscos especiales',
        '• Accesorios de aseo personal (toalla, repelente, protector solar)',
        '• Artículos de higiene personal y medicamentos',
        '• Actividades acuáticas adicionales no especificadas'
    ];
    
    notIncluded.forEach((item, index) => {
        doc.text(item, 25, tableY + 8 + (index * 4.5));
    });

    // Espacio adicional antes del footer
    tableY += 20;
    
    // Pie de página
    const footerY = doc.internal.pageSize.height - 15;
    
    // Línea separadora del pie
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(1);
    doc.line(20, footerY - 8, 190, footerY - 8);
    
    // Contenido del pie de página en una sola fila
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    
    // Email a la izquierda
    doc.text('infonixontours@gmail.com', 20, footerY);
    
    // Número de teléfono a la derecha
    doc.text('WhatsApp: +507 6825-2312', 130, footerY);
    
    // Descargar el PDF
    const fileName = `Factura_NixonTours_${customerInfo.visitorName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
    doc.save(fileName);
}

// Función para mostrar mensajes toast (si existe)
function showToast(message, type = 'info') {
    // Esta función debe implementarse si hay un sistema de toast
    console.log(`${type.toUpperCase()}: ${message}`);
}

// Función de prueba para debuggear
function testQuote() {
    console.log('Ejecutando prueba de cotización...');
    
    const testDetails = [
        { item: 'Prueba', value: 'Test', price: null },
        { item: 'Pasadía - Adultos (2)', value: null, price: 90 },
        { item: 'Subtotal', value: null, price: 90, isSubtotal: true },
        { item: 'ITBMS ($7 por persona)', value: null, price: 14 }
    ];
    
    const testTotal = 104;
    const testCustomerInfo = {
        visitorName: 'Test User',
        visitorType: 'nacional',
        packageType: 'pasadia',
        travelDate: '2025-01-10',
        departureTime: '8am',
        adults: 2,
        children: 0,
        totalPersons: 2
    };
    
    displayQuote(testDetails, testTotal, testCustomerInfo);
    quoteResult.style.display = 'block';
    
    console.log('Prueba completada');
}

// Hacer la función disponible globalmente para pruebas
window.testQuote = testQuote;