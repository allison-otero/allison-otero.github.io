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
const credentialPopup = document.getElementById('credentialPopup');
const credentialPopupTitle = document.getElementById('credential-popup-title');
const credentialPopupProvider = document.getElementById('credential-popup-provider');
const credentialPopupLink = document.getElementById('credential-popup-link');
const credentialPopupClose = document.querySelector('.credential-popup-close');
const credentialPopupTriggers = document.querySelectorAll('.credential-trigger');

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

function closeCredentialPopup() {
    if (credentialPopup) {
        credentialPopup.classList.remove('active');
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

credentialPopupTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
        credentialPopupTitle.textContent = trigger.dataset.credentialTitle;
        credentialPopupProvider.textContent = trigger.dataset.credentialProvider;
        credentialPopupLink.href = trigger.dataset.credentialUrl;
        credentialPopup.classList.add('active');
    });
});

if (contactPopupClose) {
    contactPopupClose.addEventListener('click', closeContactPopup);
}

if (credentialPopupClose) {
    credentialPopupClose.addEventListener('click', closeCredentialPopup);
}

if (contactPopup) {
    contactPopup.addEventListener('click', (event) => {
        if (event.target === contactPopup) {
            closeContactPopup();
        }
    });
}

if (credentialPopup) {
    credentialPopup.addEventListener('click', (event) => {
        if (event.target === credentialPopup) {
            closeCredentialPopup();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeContactPopup();
        closeCredentialPopup();
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
reveal();
updateBackToTop();
