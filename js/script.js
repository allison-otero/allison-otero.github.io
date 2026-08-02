const modal = document.getElementById('successModal');
const form = document.getElementById('contact-form');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactPopup = document.getElementById('contactPopup');
const contactPopupTitle = document.getElementById('contact-popup-title');
const contactPopupValue = document.getElementById('contact-popup-value');
const contactPopupClose = document.querySelector('.contact-popup-close');
const contactPopupTriggers = document.querySelectorAll('.contact-popup-trigger');
const backToTop = document.querySelector('.back-to-top');
const experienceItems = document.querySelectorAll('.experience-item');
const autoplayVideos = document.querySelectorAll('.local-video-grid video[autoplay]');

function showModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

function closeContactPopup() {
    if (contactPopup) {
        contactPopup.classList.remove('active');
    }
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

if (form) {
    form.addEventListener('submit', function(ev) {
        ev.preventDefault();
        const data = new FormData(form);

        fetch('https://formspree.io/f/xgopkgdl', {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then((response) => {
            if (response.ok) {
                showModal();
                form.reset();
            }
        });
    });
}

contactPopupTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
        contactPopupTitle.textContent = trigger.dataset.popupTitle;
        contactPopupValue.textContent = trigger.dataset.popupValue;
        contactPopup.classList.add('active');
    });
});

if (contactPopupClose) {
    contactPopupClose.addEventListener('click', closeContactPopup);
}

if (contactPopup) {
    contactPopup.addEventListener('click', (event) => {
        if (event.target === contactPopup) {
            closeContactPopup();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeContactPopup();
    }
});

function updateBackToTop() {
    if (!backToTop) {
        return;
    }

    backToTop.classList.toggle('visible', window.scrollY > 520);
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function startAutoplayVideos() {
    autoplayVideos.forEach((video) => {
        video.muted = true;
        video.defaultMuted = true;
        video.play().catch(() => {});
    });
}

experienceItems.forEach((item) => {
    const marker = item.querySelector('.experience-marker');
    const markerLabel = marker ? marker.querySelector('.experience-toggle') : null;

    if (!marker) {
        return;
    }

    marker.addEventListener('click', () => {
        const isOpen = item.classList.toggle('is-open');
        marker.setAttribute('aria-expanded', String(isOpen));
        if (markerLabel) {
            markerLabel.textContent = isOpen ? 'View Less' : 'View More';
        }
    });
});

function reveal() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((element) => {
        const revealTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if (revealTop < window.innerHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
window.addEventListener('scroll', updateBackToTop);
window.addEventListener('load', reveal);
window.addEventListener('load', updateBackToTop);
window.addEventListener('load', startAutoplayVideos);
reveal();
updateBackToTop();
startAutoplayVideos();
