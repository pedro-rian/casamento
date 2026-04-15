document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initMobileMenu();
    initScrollAnimations();
    initFAQ();
    initPixModal();
    initMusicPlayer();
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
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
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
