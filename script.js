// --- Scroll Reveal ---
function scrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 5;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollReveal);
scrollReveal();

// --- Galeria de Fotos ---
const photos = [
  { id: 1, src: "img2/ft01.jpg", caption: "te amo linda" },
  { id: 2, src: "img2/ft02.jpg", caption: "🌳" },
  { id: 3, src: "img2/ft03.jpg", caption: "😍" },
  { id: 4, src: "img2/ft04.jpg", caption: "te amo princesa" },
  { id: 5, src: "img2/ft05.jpg", caption: "🎂" },
  { id: 6, src: "img2/ft06.jpg", caption: "🎄" },
  { id: 7, src: "img2/ft07.jpg", caption: "🏔️" },
  { id: 8, src: "img2/ft08.jpg", caption: "🏠" },
  { id: 9, src: "img2/ft09.jpg", caption: "🏖️" },
  { id: 10, src: "img2/ft010.jpg", caption: "🍿" }
];

let currentPhotoIndex = 0;
let isAnimating = false;

const photoStack = document.getElementById("photoStack");
const indicators = document.getElementById("indicators");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initializeGallery();
  createFloatingHearts();
  preloadImages();
});

// Inicializar galeria
function initializeGallery() {
  createPhotoCards();
  createIndicators();
  updateDisplay();
  setupEventListeners();
}

// Criar cards de fotos
function createPhotoCards() {
  if (!photoStack) return;
  photoStack.innerHTML = "";
  photos.forEach((photo, index) => {
    const photoCard = document.createElement("div");
    photoCard.className = "photo-card";
    photoCard.dataset.index = index;
    photoCard.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" class="photo-image">
      <div class="photo-overlay">${photo.caption}</div>
    `;
    photoCard.addEventListener("click", () => {
      if (!isAnimating) nextPhoto();
    });
    photoStack.appendChild(photoCard);
  });
}

// Criar indicadores
function createIndicators() {
  if (!indicators) return;
  indicators.innerHTML = "";
  photos.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    indicator.dataset.index = index;
    indicator.addEventListener("click", () => {
      if (!isAnimating) goToPhoto(index);
    });
    indicators.appendChild(indicator);
  });
}

// Atualizar display
function updateDisplay() {
  const photoCards = document.querySelectorAll(".photo-card");
  const indicatorElements = document.querySelectorAll(".indicator");
  photoCards.forEach((card, index) => {
    card.className = "photo-card";
    if (index === currentPhotoIndex) {
      card.classList.add("active");
    } else if (index === getNextIndex()) {
      card.classList.add("next");
    } else if (index === getPrevIndex()) {
      card.classList.add("prev");
    } else {
      card.classList.add("hidden");
    }
  });
  indicatorElements.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentPhotoIndex);
  });
}

// Próxima foto
function nextPhoto() {
  if (isAnimating) return;
  isAnimating = true;
  currentPhotoIndex = getNextIndex();
  setTimeout(() => {
    updateDisplay();
    isAnimating = false;
  }, 100);
}

// Foto anterior
function prevPhoto() {
  if (isAnimating) return;
  isAnimating = true;
  currentPhotoIndex = getPrevIndex();
  setTimeout(() => {
    updateDisplay();
    isAnimating = false;
  }, 100);
}

// Ir para foto específica
function goToPhoto(index) {
  if (isAnimating || index === currentPhotoIndex) return;
  isAnimating = true;
  currentPhotoIndex = index;
  setTimeout(() => {
    updateDisplay();
    isAnimating = false;
  }, 100);
}

// Obter próximo índice
function getNextIndex() {
  return (currentPhotoIndex + 1) % photos.length;
}

// Obter índice anterior
function getPrevIndex() {
  return (currentPhotoIndex - 1 + photos.length) % photos.length;
}

// Configurar event listeners
function setupEventListeners() {
  // Navegação por teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      nextPhoto();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevPhoto();
    }
  });

  // Touch/swipe para mobile
  let startX = 0;
  let endX = 0;
  if (photoStack) {
    photoStack.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    photoStack.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    }, { passive: true });
  }
  function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextPhoto();
      } else {
        prevPhoto();
      }
    }
  }
}

// Criar corações flutuantes
function createFloatingHearts() {
  const heartsContainer = document.querySelector(".floating-hearts");
  if (!heartsContainer) return;
  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = ["💕", "💖", "💗", "💝", "💘"][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = Math.random() * 8 + 8 + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => {
      if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 12000);
  }
  setInterval(createHeart, 3000);
  for (let i = 0; i < 3; i++) {
    setTimeout(createHeart, i * 1000);
  }
}

// Easter egg - clique rápido
let clickCount = 0;
let clickTimer = null;
document.addEventListener("click", () => {
  clickCount++;
  if (clickTimer) clearTimeout(clickTimer);
  clickTimer = setTimeout(() => {
    if (clickCount >= 10) {
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const heartsContainer = document.querySelector(".floating-hearts");
          if (!heartsContainer) return;
          const heart = document.createElement("div");
          heart.className = "floating-heart";
          heart.textContent = "💖";
          heart.style.left = Math.random() * 100 + "%";
          heart.style.animationDuration = "4s";
          heart.style.fontSize = "2.5rem";
          heart.style.opacity = "0.8";
          heartsContainer.appendChild(heart);
          setTimeout(() => {
            if (heart.parentNode) heart.parentNode.removeChild(heart);
          }, 4000);
        }, i * 100);
      }
    }
    clickCount = 0;
  }, 2000);
});

// Preload das imagens
function preloadImages() {
  photos.forEach((photo) => {
    const img = new Image();
    img.src = photo.src;
  });
}

// Efeito de partículas no clique
if (photoStack) {
  photoStack.addEventListener("click", (e) => {
    createClickEffect(e.clientX, e.clientY);
  });
}

function createClickEffect(x, y) {
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.width = "6px";
    particle.style.height = "6px";
    particle.style.background = "#ff6b9d";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1000";
    const angle = (i / 6) * Math.PI * 2;
    const velocity = 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    document.body.appendChild(particle);
    let posX = x;
    let posY = y;
    let opacity = 1;
    const animate = () => {
      posX += vx * 0.02;
      posY += vy * 0.02;
      opacity -= 0.02;
      particle.style.left = posX + "px";
      particle.style.top = posY + "px";
      particle.style.opacity = opacity;
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(particle);
      }
    };
    animate();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loadingOverlay = document.getElementById("romantic-loading");
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.add("fade-out");
      setTimeout(() => {
        loadingOverlay.style.display = "none";
      }, 800); // tempo do fade
    }, 1200); // loading fica no máximo 1,2s
  }
});