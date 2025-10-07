// jQuery код
$(document).ready(function() {
    
    // Скрытие/показание списка фракций с анимацией
    $('#toggleFactions').click(function() {
        $('.factions-list').slideToggle(600);
        $(this).text(function(i, text) {
            return text === 'Скрыть/Показать фракции' ? 'Показать фракции' : 'Скрыть/Показать фракции';
        });
    });
    
    // Анимация списка драконов
    $('#animateDragons').click(function() {
        $('.dragons-list li').each(function(index) {
            $(this).delay(200 * index).fadeTo(300, 0.3).fadeTo(300, 1);
        });
    });
    
    // Плавная прокрутка для навигационных ссылок
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
    
    // Эффект при наведении на карточки особенностей
    $('.feature-card').hover(
        function() {
            $(this).css('transform', 'translateY(-10px) scale(1.05)');
            $(this).find('h3').css('color', '#ffed4a');
        },
        function() {
            $(this).css('transform', 'translateY(0) scale(1)');
            $(this).find('h3').css('color', '#ffd700');
        }
    );
    
});

$(document).ready(function() {
    
    // Улучшенная анимация драконов
    $('#animateDragons').click(function() {
        $('.dragon-card').each(function(index) {
            $(this).delay(200 * index)
                   .animate({ opacity: 0.3 }, 300)
                   .animate({ opacity: 1 }, 300)
                   .animate({ 
                       marginTop: '-10px',
                       marginBottom: '10px'
                   }, 200)
                   .animate({ 
                       marginTop: '0px',
                       marginBottom: '0px'
                   }, 200);
        });
    });
    
    // Эффект при наведении на карточки драконов
    $('.dragons-grid').on('mouseenter', '.dragon-card', function() {
        $(this).find('h3').css('color', '#ffed4a');
        $(this).find('.dragon-stats span').css({
            'background': 'rgba(255, 237, 74, 0.3)',
            'transform': 'scale(1.1)'
        });
    }).on('mouseleave', '.dragon-card', function() {
        $(this).find('h3').css('color', '#ffd700');
        $(this).find('.dragon-stats span').css({
            'background': 'rgba(255, 215, 0, 0.1)',
            'transform': 'scale(1)'
        });
    });
})

$(document).ready(function() {
    
    // Плавное появление галереи при загрузке
    $('.locations-gallery').hide().fadeIn(1200);
    
    // Улучшенная фильтрация с анимацией
    $('.filter-btn').click(function() {
        const filter = $(this).data('filter');
        
        // Плавное переключение активной кнопки
        $('.filter-btn').not(this).animate({ opacity: 0.7 }, 200);
        $(this).animate({ opacity: 1 }, 200);
        
        // Анимация фильтрации карточек
        if (filter === 'all') {
            $('.location-card').fadeIn(400).css({
                'opacity': '0',
                'transform': 'scale(0.8)'
            }).animate({
                'opacity': '1',
                'transform': 'scale(1)'
            }, 400);
        } else {
            $('.location-card').each(function() {
                if ($(this).data('type') === filter) {
                    $(this).fadeIn(400).css({
                        'opacity': '0',
                        'transform': 'scale(0.8)'
                    }).animate({
                        'opacity': '1',
                        'transform': 'scale(1)'
                    }, 400);
                } else {
                    $(this).animate({
                        'opacity': '0',
                        'transform': 'scale(0.8)'
                    }, 400, function() {
                        $(this).hide();
                    });
                }
            });
        }
    });
    
    // Эффект параллакса для изображений локаций
    $('.location-card').mousemove(function(e) {
        const $card = $(this);
        const $img = $card.find('img');
        const cardWidth = $card.width();
        const cardHeight = $card.height();
        const mouseX = e.pageX - $card.offset().left;
        const mouseY = e.pageY - $card.offset().top;
        
        const moveX = (mouseX - cardWidth / 2) / 20;
        const moveY = (mouseY - cardHeight / 2) / 20;
        
        $img.css({
            'transform': `scale(1.1) translate(${moveX}px, ${moveY}px)`
        });
    });
    
    $('.location-card').mouseleave(function() {
        $(this).find('img').css({
            'transform': 'scale(1.1) translate(0, 0)'
        });
    });
    
    // Подсветка статистики локаций
    $('.location-stats span').hover(
        function() {
            $(this).animate({
                'backgroundColor': 'rgba(255, 237, 74, 0.4)',
                'color': '#fff'
            }, 200);
        },
        function() {
            $(this).animate({
                'backgroundColor': 'rgba(255, 215, 0, 0.2)',
                'color': '#ffd700'
            }, 200);
        }
    );
    
    // Анимация счетчика при фильтрации
    function updateLocationsCount() {
        const visibleCount = $('.location-card:visible').length;
        const totalCount = $('.location-card').length;
        
        $('.locations-gallery h2').append(`<span class="count-badge">${visibleCount}/${totalCount}</span>`);
        
        // Удаляем старый бейдж если есть
        setTimeout(() => {
            $('.count-badge').not(':last').remove();
        }, 100);
    }
    
    // Обновляем счетчик при фильтрации
    $('.filter-btn').click(function() {
        setTimeout(updateLocationsCount, 500);
    });
    
    // Инициализация счетчика
    updateLocationsCount();
});