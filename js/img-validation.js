// img-validation.js - Full Featured Image Modal

document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    
    const teamMembers = Array.from(document.querySelectorAll('.team-member'));
    let currentIndex = 0;

    // Navigation Arrows
    const prevBtn = document.createElement('div');
    prevBtn.className = 'modal-nav prev';
    prevBtn.innerHTML = '‹';
    modal.appendChild(prevBtn);

    const nextBtn = document.createElement('div');
    nextBtn.className = 'modal-nav next';
    nextBtn.innerHTML = '›';
    modal.appendChild(nextBtn);

    function showImage(index) {
        if (index < 0) index = teamMembers.length - 1;
        if (index >= teamMembers.length) index = 0;
        
        currentIndex = index;
        const member = teamMembers[index];
        const imgSrc = member.getAttribute('data-src') || member.querySelector('img').src;
        modalImg.src = imgSrc;
    }

    // Open modal
    teamMembers.forEach((member, index) => {
        member.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Navigation
    function goNext() { showImage(currentIndex + 1); }
    function goPrev() { showImage(currentIndex - 1); }

    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('click', goPrev);

    // Close Modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'visible';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (modal.style.display !== 'flex') return;
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") goNext();
        if (e.key === "ArrowLeft") goPrev();
    });

    // Mouse Wheel / Trackpad Support (PC)
    modal.addEventListener('wheel', (e) => {
        if (modal.style.display !== 'flex') return;
        e.preventDefault();
        if (e.deltaY > 0) goNext();
        else goPrev();
    }, { passive: false });

    // ==================== SWIPE SUPPORT FOR PHONES ====================
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 70) {           // Minimum swipe distance
            if (diff > 0) {
                goNext();   // Swipe Left → Next
            } else {
                goPrev();   // Swipe Right → Previous
            }
        }
    });

    console.log("✅ Image Modal with Swipe + Wheel + Arrows Loaded");
});