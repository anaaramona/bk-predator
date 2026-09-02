document.addEventListener('DOMContentLoaded', () => {
    // --- GALERIJA LOGIKA ---
    let currentImageIndex = 0;
    const galleryImages = Array.from(document.querySelectorAll('.photo-grid .photo-item img'));
    const photoModal = document.getElementById("photoModal");
    const imgFull = document.getElementById("imgFull");

    // Dodaj click event na sve slike iz galerije
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openModal(img.src);
        });
    });

    function openModal(src) {
        photoModal.style.display = "block";
        imgFull.src = src;
    }

    function closeModal() {
        photoModal.style.display = "none";
    }

    function changeModalImage(direction) {
        if (galleryImages.length === 0) return;
        currentImageIndex += direction;

        if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        }

        imgFull.src = galleryImages[currentImageIndex].src;
    }

    // Dodir na lijevu/desnu stranu slike za prebacivanje
    imgFull.addEventListener('click', (e) => {
        e.stopPropagation(); // Sprečava zatvaranje modala
        const rect = imgFull.getBoundingClientRect();
        const clickX = e.clientX - rect.left; // Točka dodira u odnosu na sliku
        
        if (clickX > rect.width / 2) {
            changeModalImage(1); // Klik na desnu polovicu -> Sljedeća
        } else {
            changeModalImage(-1); // Klik na lijevu polovicu -> Prethodna
        }
    });

    // Touch / Swipe geste za mobitele
    let touchStartX = 0;
    let touchEndX = 0;

    photoModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    photoModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimalna udaljenost u pikselima za prepoznavanje swipe-a
        if (touchEndX < touchStartX - swipeThreshold) {
            changeModalImage(1);  // Swipe ulijevo -> Sljedeća slika
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            changeModalImage(-1); // Swipe udesno -> Prethodna slika
        }
    }

    // Event listeneri za kontrole modalne galerije
    document.getElementById("closePhotoModalBtn").addEventListener('click', closeModal);
    
    document.getElementById("prevImageBtn").addEventListener('click', (e) => {
        e.stopPropagation();
        changeModalImage(-1);
    });

    document.getElementById("nextImageBtn").addEventListener('click', (e) => {
        e.stopPropagation();
        changeModalImage(1);
    });

    // --- KALKULATOR KATEGORIJA ---
    const btnCheckWeight = document.getElementById('btnCheckWeight');
    if (btnCheckWeight) {
        btnCheckWeight.addEventListener('click', checkClass);
    }

    function checkClass() {
        let w = parseFloat(document.getElementById('weightInput').value);
        let res = document.getElementById('weightResult');
        
        if (isNaN(w)) { 
            res.innerHTML = "Unesite kilograme!"; 
            return; 
        }

        if (w < 47) res.innerHTML = "Below Senior Classes";
        else if (w < 50) res.innerHTML = "Flyweight (Muha)";
        else if (w < 55) res.innerHTML = "Bantamweight (Bantam)";
        else if (w < 60) res.innerHTML = "Lightweight (Laka)";
        else if (w < 65) res.innerHTML = "Welterweight (Velter)";
        else if (w < 70) res.innerHTML = "Light Middleweight (Polusrednja)";
        else if (w < 75) res.innerHTML = "Middleweight (Srednja)";
        else if (w < 80) res.innerHTML = "Light Heavyweight (Poluteška)";
        else if (w < 85) res.innerHTML = "Cruiserweight";
        else if (w < 90) res.innerHTML = "Heavyweight (Teška)";
        else res.innerHTML = "Super Heavyweight (Superteška)";
    }

    // --- POLITIKA PRIVATNOSTI MODAL ---
    const privacyModal = document.getElementById("privacyModal");
    const openPrivacyBtn = document.getElementById("openPrivacyBtn");
    const closePrivacyBtn = document.getElementById("closePrivacyBtn");
    const understandPrivacyBtn = document.getElementById("understandPrivacyBtn");

    if (openPrivacyBtn) {
        openPrivacyBtn.addEventListener('click', () => privacyModal.style.display = "block");
    }
    if (closePrivacyBtn) {
        closePrivacyBtn.addEventListener('click', () => privacyModal.style.display = "none");
    }
    if (understandPrivacyBtn) {
        understandPrivacyBtn.addEventListener('click', () => privacyModal.style.display = "none");
    }

    // --- OBAVIJEST CLOSE ---
    const closeNoticeBtn = document.getElementById("closeNoticeBtn");
    if (closeNoticeBtn) {
        closeNoticeBtn.addEventListener('click', () => {
            document.getElementById('floatingNotice').style.display = 'none';
        });
    }

    // --- GLOBAL EVENT LISTENERI (Zatvaranje na klik izvan / Tipkovnica) ---
    window.addEventListener('click', (event) => {
        if (event.target === photoModal) closeModal();
        if (event.target === privacyModal) privacyModal.style.display = "none";
    });

    document.addEventListener('keydown', (event) => {
        if (photoModal && photoModal.style.display === "block") {
            if (event.key === "ArrowLeft") changeModalImage(-1);
            if (event.key === "ArrowRight") changeModalImage(1);
            if (event.key === "Escape") closeModal();
        }
        if (privacyModal && privacyModal.style.display === "block") {
            if (event.key === "Escape") privacyModal.style.display = "none";
        }
    });
});