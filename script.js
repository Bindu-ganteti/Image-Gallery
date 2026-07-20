// =============================
// Image Gallery JavaScript
// =============================

// Elements
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const caption = document.querySelector(".caption");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const filterButtons = document.querySelectorAll(".filter-btn");

let currentImages = [];
let currentIndex = 0;

// =============================
// Filter Images
// =============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Active Button
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (filter === "all" || item.classList.contains(filter)) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});

// =============================
// Open Lightbox
// =============================

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        // Get only visible images
        currentImages = [...document.querySelectorAll(".gallery-item")]
            .filter(img => img.style.display !== "none");

        currentIndex = currentImages.indexOf(item);

        showImage();

        lightbox.classList.add("active");

    });

});

// =============================
// Show Current Image
// =============================

function showImage() {

    const image = currentImages[currentIndex].querySelector("img");

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    caption.textContent = image.alt;

}

// =============================
// Next Image
// =============================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= currentImages.length) {

        currentIndex = 0;

    }

    showImage();

});

// =============================
// Previous Image
// =============================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentImages.length - 1;

    }

    showImage();

});

// =============================
// Close Lightbox
// =============================

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});

// Close by clicking outside image

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");

    }

});

// =============================
// Keyboard Support
// =============================

document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

    if (e.key === "Escape") {

        closeBtn.click();

    }

});