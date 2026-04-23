document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initMobileMenu();
    initScrollAnimations();
    initFAQ();
    initPixModal();
    initMusicPlayer();
    initMapTabs();
});

function initCountdown() {
    const weddingDate = new Date('2026-10-10T10:00:00').getTime();
    
    function update() {
        const now = new Date().getTime();
        const diff = weddingDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(1, '0');
            document.getElementById('hours').textContent = String(hours).padStart(1, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(1, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(1, '0');
        }
    }

    update();
    setInterval(update, 1000);
}

function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    toggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(function(el) {
        observer.observe(el);
    });
}

function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            item.classList.toggle('active');
        });
    });
}

function initPixModal() {
    const modal = document.getElementById('pix-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const giftName = document.getElementById('modal-gift-name');
    const giftPrice = document.getElementById('modal-gift-price');

    document.querySelectorAll('.gift-card button').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const card = this.closest('.gift-card');
            giftName.textContent = card.dataset.name;
            giftPrice.textContent = 'R$ ' + parseFloat(card.dataset.value).toFixed(2).replace('.', ',');
            modal.classList.remove('hiding');
            requestAnimationFrame(function() {
                modal.classList.add('active');
            });
        });
    });

    const customGiftBtn = document.getElementById('btn-custom-gift');
    if (customGiftBtn) {
        customGiftBtn.addEventListener('click', function() {
            giftName.textContent = 'Presente personalizado';
            giftPrice.textContent = 'Valor livre';
            modal.classList.remove('hiding');
            requestAnimationFrame(function() {
                modal.classList.add('active');
            });
        });
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.classList.add('hiding');
        setTimeout(function() {
            modal.classList.remove('hiding');
        }, 300);
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function initMusicPlayer() {
    const audio = document.getElementById('background-music');
    const toggleCollapsed = document.getElementById('music-toggle-collapsed');
    const toggleExpanded = document.getElementById('music-toggle');
    const expandedPanel = document.getElementById('music-expanded');
    let isPlaying = false;

    toggleCollapsed.addEventListener('click', function() {
        expandedPanel.classList.add('active');
        toggleCollapsed.classList.add('hidden');
        audio.play().catch(function() {
            console.log('Reprodução automática bloqueada');
        });
        isPlaying = true;
    });

    toggleExpanded.addEventListener('click', function() {
        audio.pause();
        audio.currentTime = 0;
        expandedPanel.classList.remove('active');
        toggleCollapsed.classList.remove('hidden');
        isPlaying = false;
    });
}

function initMapTabs() {
    const tabs = document.querySelectorAll('.map-tab');
    const mapCerimonia = document.getElementById('map-cerimonia');
    const mapRecepcao = document.getElementById('map-recepcao');

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const target = this.dataset.target;

            tabs.forEach(function(t) {
                t.classList.remove('active');
            });
            this.classList.add('active');

            if (target === 'cerimonia') {
                mapCerimonia.classList.remove('hidden');
                mapRecepcao.classList.add('hidden');
            } else {
                mapCerimonia.classList.add('hidden');
                mapRecepcao.classList.remove('hidden');
            }
        });
    });
}
