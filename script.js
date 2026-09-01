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