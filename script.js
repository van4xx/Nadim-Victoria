// Плавная прокрутка при клике на индикатор скролла
document.addEventListener('DOMContentLoaded', function() {
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

    // Анимация появления элементов при прокрутке
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

    // Наблюдаем за элементами для анимации
    const elementsToAnimate = document.querySelectorAll('.section-title, .detail-card, .timeline-item, .contact-card, .photo-container');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Обработка формы RSVP
    const rsvpForm = document.querySelector('.rsvp-form');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(rsvpForm);
            const name = rsvpForm.querySelector('input[type="text"]').value;
            const phone = rsvpForm.querySelector('input[type="tel"]').value;
            const attendance = rsvpForm.querySelector('select').value;
            const guestCount = rsvpForm.querySelector('input[type="number"]').value;
            
            // Проверяем заполненность обязательных полей
            if (!name || !phone || !attendance) {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            // Имитация отправки данных
            const submitBtn = rsvpForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправляем...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
                showNotification('Спасибо! Ваш ответ получен.', 'success');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    rsvpForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Функция показа уведомлений
    function showNotification(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Добавляем стили для уведомления
        const style = document.createElement('style');
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
        
        if (!document.querySelector('#notification-styles')) {
            style.id = 'notification-styles';
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

    // Параллакс эффект для hero секции
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const speed = scrolled * 0.5;
            heroSection.style.transform = `translateY(${speed}px)`;
        }
    });

    // Анимация сердечек при клике
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
            animation: floatUp 2s ease-out forwards;
        `;
        
        // Добавляем стили анимации
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
                        transform: translateY(-100px) scale(0.5);
                    }
                }
            `;
            document.head.appendChild(heartStyle);
        }
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
    }

    // Улучшенная анимация timeline элементов
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Эффект печатания для заголовка
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                setTimeout(() => {
                    mainTitle.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }

    // Добавляем эффект ripple к кнопкам
    const buttons = document.querySelectorAll('.submit-btn, .detail-card');
    buttons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });

    function createRippleEffect(e) {
        const button = e.currentTarget;
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
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
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
        
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        ripple.className = 'ripple';
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}); 