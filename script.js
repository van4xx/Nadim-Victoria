// Основной код для свадебного сайта
document.addEventListener('DOMContentLoaded', function() {
    // Обратный отсчет до свадьбы
    const weddingDate = new Date('August 24, 2025 15:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            document.querySelector('.countdown-container').innerHTML = '<h3 class="countdown-title">Мы поженились! 🎉</h3>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Плавная прокрутка при клике на индикатор скролла
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const photosSection = document.querySelector('.photos-section');
            if (photosSection) {
                photosSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }

    // Простая анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации
    const elementsToAnimate = document.querySelectorAll('.section-title, .detail-card, .photo-container, .invitation-card');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });

    // Добавляем CSS стили для анимации
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);



    // Функция показа уведомлений
    function showNotification(message, type = 'info') {
        // Убираем предыдущие уведомления
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Добавляем стили для уведомления (только один раз)
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 10px;
                    padding: 1rem 1.5rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    z-index: 1000;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    max-width: 300px;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .notification-success {
                    border-left: 4px solid #4CAF50;
                }
                
                .notification-error {
                    border-left: 4px solid #f44336;
                }
                
                .notification-info {
                    border-left: 4px solid #2196F3;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .notification-success i {
                    color: #4CAF50;
                }
                
                .notification-error i {
                    color: #f44336;
                }
                
                .notification-info i {
                    color: #2196F3;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Убираем уведомление через 4 секунды
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Простой эффект ripple для карточек
    const buttons = document.querySelectorAll('.detail-card, .invitation-card');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(212, 175, 55, 0.2);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            // Добавляем стили анимации ripple (только один раз)
            if (!document.querySelector('#ripple-styles')) {
                const rippleStyle = document.createElement('style');
                rippleStyle.id = 'ripple-styles';
                rippleStyle.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(rippleStyle);
            }
            
            // Удаляем предыдущий эффект ripple
            const existingRipple = button.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            ripple.className = 'ripple';
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Простая анимация сердечек при клике
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('heart-icon') || e.target.closest('.hearts')) {
            createHeartAnimation(e.clientX, e.clientY);
        }
    });

    function createHeartAnimation(x, y) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart floating-heart';
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            color: #FF69B4;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 1000;
            animation: floatUp 1.5s ease-out forwards;
        `;
        
        // Добавляем стили анимации сердечек (только один раз)
        if (!document.querySelector('#heart-animation-styles')) {
            const heartStyle = document.createElement('style');
            heartStyle.id = 'heart-animation-styles';
            heartStyle.textContent = `
                @keyframes floatUp {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-80px) scale(0.5);
                    }
                }
            `;
            document.head.appendChild(heartStyle);
        }
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    }


}); 