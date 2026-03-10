import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to significant layout elements
    const elementsToReveal = document.querySelectorAll('.section-header, .service-card, .portfolio-item, .testimonial-card, .pricing-card, .timeline-step, .problem-box, .solution-box, .faq-item, .comparative-row');

    elementsToReveal.forEach((el, index) => {
        el.classList.add('reveal');

        // Add cascading delays for grid items based on their position
        if (el.classList.contains('service-card') ||
            el.classList.contains('portfolio-item') ||
            el.classList.contains('testimonial-card') ||
            el.classList.contains('pricing-card') ||
            el.classList.contains('timeline-step')) {
            const delay = (index % 4) + 1; // 1 to 4 delay index
            el.classList.add(`reveal-delay-${delay}`);
        } else if (el.classList.contains('comparative-row')) {
            // Apply sequential delay for comparative rows independently of grid logic
            // Add custom inline delay for stagger effect (50ms per item)
            // Or use existing delay classes
            const previousRows = Array.from(el.parentElement.children).indexOf(el);
            if (previousRows >= 0) {
                el.style.transitionDelay = `${previousRows * 0.05}s`;
            }
        }
    });

    // Intersection Observer for scroll animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Timeline progress animation
    const timelineContainer = document.getElementById('timeline-container');
    const processSection = document.getElementById('process');
    const progressLine = document.querySelector('.timeline-progress-line');
    const timelineSteps = document.querySelectorAll('.timeline-step');

    if (timelineContainer && processSection && progressLine) {
        window.addEventListener('scroll', () => {
            const timelineRect = timelineContainer.getBoundingClientRect();

            // Start when the top of the timeline container enters the bottom of the viewport
            const startPoint = window.innerHeight;
            // End much sooner, for example when the timeline container is halfway up the screen
            const endPoint = window.innerHeight * 0.3; // Reaches 100% when timeline is 30% from top

            const totalDistance = startPoint - endPoint;
            const scrolledDistance = startPoint - timelineRect.top;

            let progress = (scrolledDistance / totalDistance) * 100;

            // Clamp progress between 0 and 100
            progress = Math.max(0, Math.min(100, progress));

            progressLine.style.width = `${progress}%`;

            // Activate steps based on progress
            timelineSteps.forEach((step, index) => {
                const stepThreshold = (index / (timelineSteps.length - 1)) * 100;
                if (progress >= stepThreshold - 5) { // Small buffer so it activates slightly before
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.backdropFilter = 'blur(16px)';
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(12px)';
        }
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'var(--bg-color)';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }
});
