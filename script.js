document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de la Pantalla de Carga ---
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const initialScreen = document.getElementById('initial-screen');
    const mainContainer = document.getElementById('main-container');
    
    // Iniciar la barra de progreso
    setTimeout(() => {
        loadingProgress.style.width = '100%';
    }, 100);
    
    // Ocultar pantalla de carga después de 3 segundos
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        initialScreen.style.display = 'flex';
        
        // Remover completamente la pantalla de carga después de la transición
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 3000);

    // --- Lógica de la Carta que Emerge ---
    const letterCard = document.getElementById('letter-card');
    const closeBtn = document.getElementById('close-btn');
    const heartsContainer = document.querySelector('.hearts-container');

    const heartsCount = 20;

    // Función para crear corazones flotantes
    function createHearts() {
        for (let i = 0; i < heartsCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heartsContainer.appendChild(heart);
        }
    }

    // Función para mostrar la carta
    function showLetter() {
        // Prevenir múltiples clics
        if (letterCard.classList.contains('show')) return;
        
        // Primero deslizar el contenido principal hacia la izquierda
        mainContainer.classList.add('slide-left');
        
        // Luego mostrar la carta deslizándose desde la derecha
        setTimeout(() => {
            letterCard.classList.add('show');
        }, 300);
    }

    // Función para ocultar la carta
    function hideLetter() {
        // Ocultar la carta primero (se desliza hacia la derecha)
        letterCard.classList.remove('show');
        
        // Luego regresar el contenido principal a su posición
        setTimeout(() => {
            mainContainer.classList.remove('slide-left');
        }, 300);
    }

    // Event listeners optimizados para móviles
    // Usar touchstart para mejor respuesta en móviles
    initialScreen.addEventListener('touchstart', (e) => {
        e.preventDefault();
        showLetter();
    }, { passive: false });

    // Mantener click para desktop
    initialScreen.addEventListener('click', (e) => {
        if (e.type === 'click' && e.touches) return; // Evitar doble ejecución
        showLetter();
    });

    // Botón de cerrar optimizado para móviles
    closeBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideLetter();
    }, { passive: false });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hideLetter();
    });

    // Cerrar carta con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideLetter();
        }
    });

    // Cerrar carta al hacer clic/touch fuera de ella
    document.addEventListener('touchstart', (e) => {
        if (letterCard.classList.contains('show') &&
            !letterCard.contains(e.target) &&
            !initialScreen.contains(e.target)) {
            hideLetter();
        }
    }, { passive: true });

    document.addEventListener('click', (e) => {
        if (letterCard.classList.contains('show') &&
            !letterCard.contains(e.target) &&
            !initialScreen.contains(e.target)) {
            hideLetter();
        }
    });

    // Prevenir zoom en doble tap en móviles
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Iniciar la creación de corazones después de que se oculte la pantalla de carga
    setTimeout(() => {
        createHearts();
    }, 3800);
});