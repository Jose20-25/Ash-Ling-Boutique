// Promociones de Temporada - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializePromotions();
    initializeAnimations();
    initializeProgressBar();
    initializeNotificationForm();
    initializeFloatingIcons();
});

// Inicializar promociones
function initializePromotions() {
    console.log('🎉 Página de Promociones de Temporada cargada');
    
    // Añadir efectos de hover a las tarjetas de categorías
    const categoryCards = document.querySelectorAll('.promo-category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(233, 30, 99, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Añadir efectos a las tarjetas de recompensas
    const rewardCards = document.querySelectorAll('.reward-card');
    rewardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.reward-icon i').style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.reward-icon i').style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Inicializar animaciones
function initializeAnimations() {
    // Animación de aparición en scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll(
        '.promo-category-card, .reward-card, .expectation-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Añadir delays escalonados
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Inicializar barra de progreso animada
function initializeProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill) {
        const targetProgress = parseInt(progressFill.dataset.progress);
        let currentProgress = 0;
        
        const progressInterval = setInterval(() => {
            currentProgress += 1;
            progressFill.style.width = `${currentProgress}%`;
            progressText.textContent = `${currentProgress}% Completado`;
            
            if (currentProgress >= targetProgress) {
                clearInterval(progressInterval);
                // Añadir efecto de brillo al completar
                progressFill.style.boxShadow = '0 0 20px var(--dorado-luxury)';
            }
        }, 30);
    }
}

// Inicializar formulario de notificaciones
function initializeNotificationForm() {
    const notificationForm = document.querySelector('.notification-form');
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationInput = document.querySelector('.notification-input');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = notificationInput.value.trim();
            if (validateEmail(email)) {
                // Simular registro exitoso
                showNotificationSuccess();
                notificationInput.value = '';
            } else {
                showNotificationError();
            }
        });
    }
}

// Validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar mensaje de éxito
function showNotificationSuccess() {
    const button = document.querySelector('.notification-btn');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check"></i> ¡Registrado!';
    button.style.background = 'var(--btn-accent)';
    button.style.color = 'var(--negro-elegante)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        button.style.color = '';
    }, 3000);
    
    // Mostrar mensaje flotante
    showFloatingMessage('¡Perfecto! Te notificaremos cuando lancemos las promociones', 'success');
}

// Mostrar mensaje de error
function showNotificationError() {
    const input = document.querySelector('.notification-input');
    input.style.borderColor = '#ff4757';
    input.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        input.style.borderColor = '';
        input.style.animation = '';
    }, 1000);
    
    showFloatingMessage('Por favor, ingresa un email válido', 'error');
}

// Mostrar mensaje flotante
function showFloatingMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `floating-message ${type}`;
    messageDiv.textContent = message;
    
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.padding = '15px 20px';
    messageDiv.style.borderRadius = '25px';
    messageDiv.style.zIndex = '10000';
    messageDiv.style.fontWeight = '600';
    messageDiv.style.transform = 'translateX(400px)';
    messageDiv.style.transition = 'all 0.3s ease';
    
    if (type === 'success') {
        messageDiv.style.background = 'var(--btn-accent)';
        messageDiv.style.color = 'var(--negro-elegante)';
    } else {
        messageDiv.style.background = '#ff4757';
        messageDiv.style.color = 'white';
    }
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(400px)';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

// Inicializar iconos flotantes
function initializeFloatingIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Posición aleatoria
        icon.style.left = `${Math.random() * 80 + 10}%`;
        icon.style.top = `${Math.random() * 60 + 20}%`;
        
        // Animación de flotación
        icon.style.animationDelay = `${index * 0.5}s`;
        
        // Añadir hover effect
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.style.color = 'var(--dorado-luxury)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.color = '';
        });
    });
}

// Efectos de partículas para sparkles
function createSparkleEffect() {
    const sparkles = document.querySelectorAll('.sparkle');
    
    sparkles.forEach(sparkle => {
        const delay = Math.random() * 2;
        sparkle.style.animationDelay = `${delay}s`;
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    createSparkleEffect();
    
    // Añadir efectos de pulsación a los indicadores
    const pulseIndicators = document.querySelectorAll('.pulse-indicator');
    pulseIndicators.forEach((indicator, index) => {
        indicator.style.animationDelay = `${index * 0.3}s`;
    });
});

// Animación de entrada para el hero
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.promo-hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});

// Efectos especiales para la categoría especial
document.addEventListener('DOMContentLoaded', function() {
    const specialCard = document.querySelector('.promo-category-card.special');
    if (specialCard) {
        setInterval(() => {
            specialCard.style.boxShadow = '0 0 30px var(--dorado-luxury)';
            setTimeout(() => {
                specialCard.style.boxShadow = '';
            }, 1000);
        }, 3000);
    }
});

// CSS personalizado para animaciones adicionales
const additionalStyles = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .floating-message {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
`;

// Añadir estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
