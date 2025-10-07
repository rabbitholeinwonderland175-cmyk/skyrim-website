// Чистый JavaScript - смена темы
document.addEventListener('DOMContentLoaded', function() {
    const themeButton = document.getElementById('themeButton');
    const body = document.body;
    
    // Проверяем сохранённую тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeButton.textContent = 'Светлая тема';
    }
    
    // Обработчик смены темы
    themeButton.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            themeButton.textContent = 'Светлая тема';
            localStorage.setItem('theme', 'dark');
        } else {
            themeButton.textContent = 'Тёмная тема';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Проверка формы подписки
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const formMessage = document.getElementById('formMessage');
            
            if (validateEmail(email)) {
                formMessage.textContent = 'Спасибо за подписку!';
                formMessage.style.color = 'green';
                formMessage.style.backgroundColor = 'rgba(72, 187, 120, 0.2)';
                newsletterForm.reset();
            } else {
                formMessage.textContent = 'Пожалуйста, введите корректный email!';
                formMessage.style.color = 'red';
                formMessage.style.backgroundColor = 'rgba(245, 101, 101, 0.2)';
            }
        });
    }
    
    // Функция валидации email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Кнопка "Показать/Скрыть" для дополнительной информации о сюжете
    const showMoreBtn = document.getElementById('showMore');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            const moreStory = document.getElementById('moreStory');
            moreStory.classList.toggle('hidden');
            showMoreBtn.textContent = moreStory.classList.contains('hidden') ? 
                'Узнать больше о сюжете' : 'Скрыть дополнительную информацию';
        });
    }
    
    // Обработчик для кнопки "Начать путешествие"
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            alert('Ваше путешествие по Скайриму начинается! Fus Ro Dah!');
            // Прокрутка к разделу рас
            document.getElementById('races').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
});

    


function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}// Добавляем в существующий script.js

// Функционал галереи локаций
document.addEventListener('DOMContentLoaded', function() {
    initializeLocationsGallery();
});

function initializeLocationsGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const locationCards = document.querySelectorAll('.location-card');
    const shuffleBtn = document.getElementById('shuffleLocations');
    const showAllBtn = document.getElementById('showAllLocations');
    
    // Фильтрация по типам
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Активный класс для кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Фильтрация карточек
            locationCards.forEach(card => {
                if (filter === 'all' || card.dataset.type === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Перемешивание локаций
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function() {
            const grid = document.querySelector('.locations-grid');
            const cards = Array.from(grid.children);
            
            // Анимация перемешивания
            cards.forEach(card => {
                card.classList.add('shuffling');
            });
            
            // Перемешиваем массив
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                grid.appendChild(cards[j]);
            }
            
            // Убираем анимацию
            setTimeout(() => {
                cards.forEach(card => {
                    card.classList.remove('shuffling');
                });
            }, 500);
            
            showNotification('Локации перемешаны!');
        });
    }
    
    // Показать все локации
    if (showAllBtn) {
        showAllBtn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
            
            locationCards.forEach(card => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            });
            
            showNotification('Показаны все локации!');
        });
    }
    
    // Эффект при наведении на карточки локаций
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const type = this.dataset.type;
            const stats = this.querySelectorAll('.location-stats span');
            
            stats.forEach(stat => {
                stat.style.transform = 'scale(1.1)';
                stat.style.transition = 'transform 0.3s ease';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const stats = this.querySelectorAll('.location-stats span');
            stats.forEach(stat => {
                stat.style.transform = 'scale(1)';
            });
        });
    });
}