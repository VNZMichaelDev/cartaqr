// Configuración inicial cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  // Establecer la fecha actual
  setCurrentDate()

  // Inicializar animaciones
  initializeAnimations()

  // Configurar el botón de música
  setupMusicButton()

  // Agregar efectos de hover a las fotos
  setupPhotoEffects()

  // Configurar efectos de scroll
  setupScrollEffects()
})

// Función para establecer la fecha actual
function setCurrentDate() {
  const dateElement = document.getElementById("currentDate")
  const today = new Date()
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  dateElement.textContent = today.toLocaleDateString("es-ES", options)
}

// Inicializar animaciones de entrada
function initializeAnimations() {
  // Animación de aparición gradual para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar elementos que deben animarse
  const animatedElements = document.querySelectorAll(".photo-frame, .video-frame, .paragraph")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(el)
  })
}

// Configurar el botón de música
function setupMusicButton() {
  const musicBtn = document.getElementById("musicBtn")
  let isPlaying = false

  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      // Aquí puedes agregar tu música de fondo
      playBackgroundMusic()
      musicBtn.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">Pausar</span>'
      musicBtn.style.background = "linear-gradient(135deg, #28a745, #20c997)"
      isPlaying = true
    } else {
      pauseBackgroundMusic()
      musicBtn.innerHTML = '<span class="music-icon">🎵</span><span class="music-text">Música</span>'
      musicBtn.style.background = "linear-gradient(135deg, #d63384, #e91e63)"
      isPlaying = false
    }
  })
}

// Función para reproducir música (puedes agregar tu archivo de audio)
function playBackgroundMusic() {
  // Ejemplo de cómo agregar música de fondo
  // const audio = new Audio('tu-cancion-romantica.mp3');
  // audio.loop = true;
  // audio.volume = 0.3;
  // audio.play();

  // Por ahora, solo mostramos una notificación
  showNotification("🎵 ¡Música romántica activada!")
}

function pauseBackgroundMusic() {
  // audio.pause();
  showNotification("🔇 Música pausada")
}

// Efectos especiales para las fotos
function setupPhotoEffects() {
  const photos = document.querySelectorAll(".photo")

  photos.forEach((photo) => {
    photo.addEventListener("click", function () {
      // Efecto de zoom al hacer clic
      this.style.transform = "scale(1.1)"
      this.style.transition = "transform 0.3s ease"

      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 300)

      // Crear corazones flotantes
      createFloatingHearts(this)
    })
  })
}

// Crear corazones flotantes al hacer clic en las fotos
function createFloatingHearts(element) {
  const hearts = ["💖", "💕", "💗", "💝"]
  const rect = element.getBoundingClientRect()

  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div")
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
    heart.style.position = "fixed"
    heart.style.left = rect.left + Math.random() * rect.width + "px"
    heart.style.top = rect.top + "px"
    heart.style.fontSize = "1.5rem"
    heart.style.pointerEvents = "none"
    heart.style.zIndex = "9999"
    heart.style.animation = "floatUp 2s ease-out forwards"

    document.body.appendChild(heart)

    setTimeout(() => {
      heart.remove()
    }, 2000)
  }
}

// Efectos de scroll suaves
function setupScrollEffects() {
  let ticking = false

  function updateScrollEffects() {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    // Efecto parallax sutil en elementos flotantes
    const floatingElements = document.querySelectorAll(".floating-heart, .floating-tulip")
    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.1
      element.style.transform = `translateY(${rate * speed}px)`
    })

    ticking = false
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestTick)
}

// Función para mostrar notificaciones
function showNotification(message) {
  const notification = document.createElement("div")
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #d63384, #e91e63);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(214, 51, 132, 0.3);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        animation: slideInRight 0.5s ease-out;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.5s ease-in forwards"
    setTimeout(() => notification.remove(), 500)
  }, 3000)
}

// Agregar estilos de animación para las notificaciones
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Función para agregar más tulipanes al hacer scroll
let tulipCount = 0
window.addEventListener("scroll", () => {
  if (window.scrollY > 500 && tulipCount < 3) {
    createRandomTulip()
    tulipCount++
  }
})

function createRandomTulip() {
  const tulip = document.createElement("div")
  tulip.textContent = "🌷"
  tulip.style.cssText = `
        position: fixed;
        font-size: 2rem;
        opacity: 0.6;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        animation: gentleFloat 8s ease-in-out infinite;
    `

  document.body.appendChild(tulip)

  setTimeout(() => {
    tulip.remove()
  }, 8000)
}

// Agregar animación suave para los tulipanes aleatorios
const tulipStyle = document.createElement("style")
tulipStyle.textContent = `
    @keyframes gentleFloat {
        0%, 100% { 
            transform: translateY(0px) rotate(-2deg); 
        }
        50% { 
            transform: translateY(-15px) rotate(2deg); 
        }
    }
`
document.head.appendChild(tulipStyle)
