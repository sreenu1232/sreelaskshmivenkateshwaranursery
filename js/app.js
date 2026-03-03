/**
 * APP.JS
 * Interactions and Intersection Observers for Sree Lakshmi Venkateshwara Nursery
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Mobile Navigation Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    /* --- 2. Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 4px 20px -5px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        }
    });

    /* --- 3. Scroll Animations (Intersection Observer) --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class
                entry.target.classList.add('is-visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Get all elements with the animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    /* --- 4. Visit Nursery Modal --- */
    const visitBtn = document.getElementById('visit-nursery-btn');
    const visitModal = document.getElementById('visit-nursery-modal');
    const visitModalBackdrop = document.getElementById('visit-modal-backdrop');
    const visitModalClose = document.getElementById('visit-modal-close');

    function openVisitModal() {
        if (!visitModal) return;
        visitModal.classList.add('is-open');
        visitModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeVisitModal() {
        if (!visitModal) return;
        visitModal.classList.remove('is-open');
        visitModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (visitBtn) {
        visitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openVisitModal();
        });
    }
    if (visitModalBackdrop) visitModalBackdrop.addEventListener('click', closeVisitModal);
    if (visitModalClose) visitModalClose.addEventListener('click', closeVisitModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && visitModal && visitModal.classList.contains('is-open')) {
            closeVisitModal();
        }
    });

});
