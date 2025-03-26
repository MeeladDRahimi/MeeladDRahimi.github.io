document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');

    // Toggle mobile menu - only for small screens
    function setupMobileMenu() {
        if (window.innerWidth <= 995) {
            menuToggle.style.display = 'block';

            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        } else {
            menuToggle.style.display = 'none';
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }

    // Initialize mobile menu
    setupMobileMenu();

    // Highlight current page in navigation
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (currentPage === linkPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    highlightCurrentPage();

    // Typing animation (only on home page)
    function initTypingAnimation() {
        const typingText = document.querySelector('.typing-text span');
        if (!typingText) return;

        const words = ["", "", "", "", ""];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            typingText.textContent = currentChar;

            if (!isDeleting && charIndex < currentWord.length) {
                // Typing forward
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                // Deleting backward
                charIndex--;
                setTimeout(type, 50);
            } else {
                // Change word
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, 1000);
            }
        }

        // Start the typing animation
        type();
    }

    initTypingAnimation();

    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        if (skillItems.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target.getAttribute('data-skill-level');
                    const progressBar = entry.target.querySelector('.skill-progress');
                    progressBar.style.width = `${skillLevel}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillItems.forEach(item => {
            observer.observe(item);
        });
    }

    animateSkillBars();

    // Handle window resize
    window.addEventListener('resize', function() {
        setupMobileMenu();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project card hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});