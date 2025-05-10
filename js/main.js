// ===== CONSTANTES Y VARIABLES GLOBALES =====
const SLIDES = document.querySelectorAll('.media-slide');
const DOTS = document.querySelectorAll('.pagination-dot');
const VIDEO = document.getElementById('product-video');
const PLAY_BTN = document.getElementById('play-pause-btn');
const STICKY_BTN = document.querySelector('.sticky-cta');
const DELIVERY_TEXT = document.getElementById('delivery-date');
const REVIEW_CONTAINER = document.querySelector('.review-cards');
const SHOW_MORE_BTN = document.querySelector('.show-more-btn');
const ADD_REVIEW_BTN = document.querySelector('.add-review-btn');
const USB_CHECKBOX = document.getElementById('usb-upsell');
const CHECKOUT_BTN = document.getElementById('checkout-btn');
const CURRENT_PRICE = document.querySelector('.current-price');

// Datos de ejemplo para reseñas
const REVIEWS_DATA = [
  {
    name: "Juan P.",
    rating: 5,
    title: "No se cae NI en baches",
    text: "Los imanes son increíbles, incluso en carreteras con baches. La carga 15W es rápida como prometen.",
    date: "10 mayo 2023"
  },
  {
    name: "Laura G.",
    rating: 5,
    title: "Mejor que los de marca",
    text: "Comparé con un Soporte de 40$ y este es más estable. El cable USB-C extra fue un robo (en el buen sentido).",
    date: "8 mayo 2023"
  },
  {
    name: "Carlos M.",
    rating: 5,
    title: "Carga super rápida",
    text: "Con el cable USB-C de 3A carga mi iPhone 13 Pro en 1 hora. ¡Vale cada centavo!",
    date: "5 mayo 2023"
  },
  {
    name: "Ana R.",
    rating: 4,
    title: "Muy buen agarre",
    text: "Solo le pongo 4 estrellas porque el imán es tan fuerte que a veces cuesta sacar el teléfono.",
    date: "3 mayo 2023"
  },
  {
    name: "Ana R.",
    rating: 4,
    title: "Muy buen agarre",
    text: "Solo le pongo 4 estrellas porque el imán es tan fuerte que a veces cuesta sacar el teléfono.",
    date: "3 mayo 2023"
  },
  {
    name: "Ana R.",
    rating: 4,
    title: "Muy buen agarre",
    text: "Solo le pongo 4 estrellas porque el imán es tan fuerte que a veces cuesta sacar el teléfono.",
    date: "3 mayo 2023"
  },
  {
    name: "Ana R.",
    rating: 4,
    title: "Muy buen agarre",
    text: "Solo le pongo 4 estrellas porque el imán es tan fuerte que a veces cuesta sacar el teléfono.",
    date: "3 mayo 2023"
  },
  {
    name: "Miguel T.",
    rating: 5,
    title: "Perfecto para viajes",
    text: "Lo uso con el cable USB-C incluido en la oferta. Carga mi Android mientras uso GPS sin problemas.",
    date: "1 mayo 2023"
  }
];

// ===== FUNCIONES PRINCIPALES =====

// Control del slider de imágenes
function initSlider() {
  let currentSlide = 0;

  function showSlide(index) {
    SLIDES.forEach(slide => slide.classList.remove('active'));
    DOTS.forEach(dot => dot.classList.remove('active'));
    
    SLIDES[index].classList.add('active');
    DOTS[index].classList.add('active');
    currentSlide = index;
    
    // Manejar visibilidad del botón de video
    if (index === 0) {
      PLAY_BTN.style.display = 'flex';
      if (VIDEO.paused) {
        PLAY_BTN.innerHTML = '<i class="fas fa-play"></i>';
        PLAY_BTN.style.opacity = '0.8';
      } else {
        PLAY_BTN.innerHTML = '<i class="fas fa-pause"></i>';
        PLAY_BTN.style.opacity = '0.5';
      }
    } else {
      PLAY_BTN.style.display = 'none';
      if (!VIDEO.paused) {
        VIDEO.pause();
      }
    }
  }

  DOTS.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  showSlide(0);
}

// Control del video
function initVideoControls() {
  PLAY_BTN.style.display = 'flex';
  PLAY_BTN.style.opacity = '0.8';
  
  function togglePlay() {
    if (VIDEO.paused) {
      VIDEO.play()
        .then(() => {
          PLAY_BTN.innerHTML = '<i class="fas fa-pause"></i>';
          PLAY_BTN.style.opacity = '0.5';
        })
        .catch(error => {
          console.error("Error al reproducir:", error);
          PLAY_BTN.innerHTML = '<i class="fas fa-play"></i>';
          PLAY_BTN.style.opacity = '0.8';
        });
    } else {
      VIDEO.pause();
      PLAY_BTN.innerHTML = '<i class="fas fa-play"></i>';
      PLAY_BTN.style.opacity = '0.8';
    }
  }

  PLAY_BTN.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlay();
  });

  VIDEO.addEventListener('click', togglePlay);
  
  VIDEO.addEventListener('mouseenter', () => {
    PLAY_BTN.style.opacity = '0.8';
  });
  
  VIDEO.addEventListener('mouseleave', () => {
    if (!VIDEO.paused) {
      PLAY_BTN.style.opacity = '0.5';
    }
  });

  VIDEO.addEventListener('play', () => {
    PLAY_BTN.innerHTML = '<i class="fas fa-pause"></i>';
    PLAY_BTN.style.opacity = '0.5';
  });
  
  VIDEO.addEventListener('pause', () => {
    PLAY_BTN.innerHTML = '<i class="fas fa-play"></i>';
    PLAY_BTN.style.opacity = '0.8';
  });
}

// Calculador de fecha de entrega
function calculateDeliveryDate() {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const today = new Date();
  
  const fastDelivery = new Date(today);
  fastDelivery.setDate(today.getDate() + 3);
  
  DELIVERY_TEXT.innerHTML = `Llega <strong>${fastDelivery.toLocaleDateString('es-ES', options)}</strong> (Envío rápido)`;
}

// Gestión del botón flotante
function initStickyButton() {
  let lastScroll = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > lastScroll && currentScroll > 200) {
      STICKY_BTN.classList.add('hidden');
    } else if (currentScroll < lastScroll || currentScroll <= 200) {
      STICKY_BTN.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
  });
}

// Cargar reseñas dinámicamente
function loadReviews(initialLoad = true) {
  if (initialLoad) {
    REVIEW_CONTAINER.innerHTML = '';
  }
  
  const reviewsToShow = initialLoad ? REVIEWS_DATA.slice(0, 2) : REVIEWS_DATA;
  
  reviewsToShow.forEach(review => {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    const reviewHTML = `
      <div class="review-card">
        <div class="reviewer-meta">
          <span class="reviewer-name">${review.name}</span>
          <span class="review-stars">${stars}</span>
        </div>
        <p class="review-title">"${review.title}"</p>
        <p class="review-text">${review.text}</p>
        <p class="review-date">Publicado el ${review.date}</p>
      </div>
    `;
    
    REVIEW_CONTAINER.insertAdjacentHTML('beforeend', reviewHTML);
  });
}

// Manejar el upsell del USB y actualización de precios
function handleUpsell() {
  function updatePrices() {
    if (USB_CHECKBOX.checked) {
      // Precio CON cable
      CHECKOUT_BTN.innerHTML = '<i class="fas fa-shopping-cart"></i> Comprar ahora - $39.98';
      CHECKOUT_BTN.href = "checkout.html?usb=true";
      CURRENT_PRICE.textContent = '$39.98';
    } else {
      // Precio SIN cable
      CHECKOUT_BTN.innerHTML = '<i class="fas fa-shopping-cart"></i> Comprar ahora - $34.99';
      CHECKOUT_BTN.href = "checkout.html?usb=false";
      CURRENT_PRICE.textContent = '$34.99';
    }
  }

  // Escuchar cambios en el checkbox
  USB_CHECKBOX.addEventListener('change', updatePrices);
  
  // Inicializar al cargar
  updatePrices();
}

// ===== EVENT LISTENERS ADICIONALES =====
function setupEventListeners() {
  // Botón "Mostrar más reseñas"
  SHOW_MORE_BTN.addEventListener('click', () => {
    loadReviews(false);
    SHOW_MORE_BTN.style.display = 'none';
  });
  
  // Botón "Añadir reseña"
  ADD_REVIEW_BTN.addEventListener('click', () => {
    const name = prompt("¿Cuál es tu nombre?");
    if (name) {
      const reviewText = prompt("Escribe tu reseña:");
      if (reviewText) {
        const rating = prompt("Calificación (1-5 estrellas):");
        if (rating && rating >= 1 && rating <= 5) {
          const newReview = {
            name: name,
            rating: parseInt(rating),
            title: "Nueva reseña",
            text: reviewText,
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
          };
          
          REVIEWS_DATA.unshift(newReview);
          loadReviews(true);
          alert("¡Gracias por tu reseña!");
        }
      }
    }
  });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  // Configuración inicial del video
  VIDEO.controls = false;
  VIDEO.muted = false;
  
  // Iniciar todas las funcionalidades
  initSlider();
  initVideoControls();
  calculateDeliveryDate();
  initStickyButton();
  loadReviews();
  handleUpsell();
  setupEventListeners();
});