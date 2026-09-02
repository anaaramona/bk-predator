let currentImgIndex = 0;
const allImages = document.querySelectorAll('.photo-grid img');
const modal = document.getElementById("photoModal"); // Fixed ID to match your HTML
const modalImg = document.getElementById("imgFull");

// Open the Modal
function openModal(imgElement) {
    modal.style.display = "block";
    modalImg.src = imgElement.src;
    // Find which number image we just clicked
    currentImgIndex = Array.from(allImages).indexOf(imgElement);
}

// Change image with arrows
function changeModalImage(direction) {
    // This stops the modal from closing when you click the arrows
    if (event) { event.stopPropagation(); }
    
    currentImgIndex += direction;
    
    // Loop logic
    if (currentImgIndex >= allImages.length) { currentImgIndex = 0; }
    if (currentImgIndex < 0) { currentImgIndex = allImages.length - 1; }
    
    modalImg.src = allImages[currentImgIndex].src;
}

// Close the Modal
function closeModal() {
    modal.style.display = "none";
}

// Close modal if user clicks outside the image
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Keyboard Support
document.addEventListener('keydown', function(event) {
    // Only run if modal is visible
    if (modal.style.display === "block") {
        if (event.key === "ArrowLeft") changeModalImage(-1);
        if (event.key === "ArrowRight") changeModalImage(1);
        if (event.key === "Escape") closeModal();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const groupSelect = document.getElementById('groupSelect');

    // 1. Validacija za Ime i Prezime
    nameInput.addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Molimo unesite vaše ime i prezime.');
        } else if (this.value.trim().length < 3) {
            this.setCustomValidity('Ime mora sadržavati najmanje 3 slova.');
        } else {
            this.setCustomValidity('');
        }
    });

    nameInput.addEventListener('input', function () {
        // Čim korisnik krene tipkati, uklanja se poruka pogreške
        if (this.value.trim().length >= 3) {
            this.setCustomValidity('');
        }
    });

    // 2. Validacija za Broj mobitela
    phoneInput.addEventListener('invalid', function () {
        const phoneRegex = /^[0-9\+\s]{9,13}$/; // Od 9 do 13 brojeva/znakova

        if (this.validity.valueMissing) {
            this.setCustomValidity('Molimo unesite broj mobitela.');
        } else if (!phoneRegex.test(this.value.trim())) {
            this.setCustomValidity('Unesite ispravan broj mobitela (samo brojevi, min. 9 znamenki).');
        } else {
            this.setCustomValidity('');
        }
    });

    phoneInput.addEventListener('input', function () {
        const phoneRegex = /^[0-9\+\s]{9,13}$/;
        if (phoneRegex.test(this.value.trim())) {
            this.setCustomValidity('');
        }
    });

    // 3. Validacija za Odabir grupe (Select padajući izbornik)
    groupSelect.addEventListener('invalid', function () {
        if (this.validity.valueMissing) {
            this.setCustomValidity('Molimo odaberite grupu u kojoj želite trenirati.');
        } else {
            this.setCustomValidity('');
        }
    });

    groupSelect.addEventListener('change', function () {
        if (this.value !== '') {
            this.setCustomValidity('');
        }
    });
});
// Otvaranje i zatvaranje Politike privatnosti
function openPrivacyModal() {
    document.getElementById("privacyModal").style.display = "block";
}

function closePrivacyModal() {
    document.getElementById("privacyModal").style.display = "none";
}

// Zatvaranje na klik izvan modala
window.addEventListener('click', function(event) {
    const privacyModal = document.getElementById("privacyModal");
    if (event.target === privacyModal) {
        closePrivacyModal();
    }
});
// 2. Modal, listanje slika i Touch/Swipe podrška za mobitele
let currentImageIndex = 0;
let galleryImages = [];
let touchStartX = 0;
let touchEndX = 0;

window.addEventListener('DOMContentLoaded', () => {
    galleryImages = Array.from(document.querySelectorAll('.photo-grid .photo-item img'));
    
    // Dodavanje swipe gesti na modal za mobitele
    const modal = document.getElementById("photoModal");
    if (modal) {
        modal.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modal.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
});

function openModal(imgElement) {
    const modal = document.getElementById("photoModal");
    const modalImg = document.getElementById("imgFull");
    currentImageIndex = galleryImages.findIndex(img => img.src === imgElement.src);
    modal.style.display = "block";
    modalImg.src = imgElement.src;
}

function closeModal() {
    document.getElementById("photoModal").style.display = "none";
}

function changeModalImage(direction) {
    if (galleryImages.length === 0) return;
    currentImageIndex += direction;
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    document.getElementById("imgFull").src = galleryImages[currentImageIndex].src;
}

// Detekcija prijevlaza prstom (Swipe)
function handleSwipe() {
    const swipeThreshold = 50; // Minimalna udaljenost prsta za pomak
    if (touchEndX < touchStartX - swipeThreshold) {
        changeModalImage(1);  // Swipe ulijevo -> sljedeća slika
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        changeModalImage(-1); // Swipe udesno -> prethodna slika
    }
}

// Popravak za dodire na mobitelima - zatvara samo ako je kliknuta pozadina
window.onclick = function(event) {
    const modal = document.getElementById("photoModal");
    if (event.target === modal) {
        closeModal();
    }
};

document.addEventListener('keydown', function(event) {
    const modal = document.getElementById("photoModal");
    if (modal && modal.style.display === "block") {
        if (event.key === "ArrowLeft") changeModalImage(-1);
        if (event.key === "ArrowRight") changeModalImage(1);
        if (event.key === "Escape") closeModal();
    }
});