/**
 * ==========================================================================
 * JAIHO LINKS - CORE JAVASCRIPT
 * Product: Jaiho Links
 * Ecosystem: Jaiho Digital
 * Managed by: Jaiho Reach
 * Version: 1.0.0
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Navbar Scroll Effect
    const navbar = document.querySelector('.custom-navbar');
    
    const handleScroll = () => {
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // Initialize on load and listen to scroll events
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load to check initial state

    // 2. Smooth Scrolling for Anchor Links & Offset Management
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Ignore if the href is exactly "#" (used for dropdowns or null links)
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate position accounting for the fixed navbar height
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // 3. Mobile Menu Auto-Close
                // If the user is on mobile and clicks a link, close the collapsed menu
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    // Utilizing Bootstrap's native toggle behavior via click
                    if (navbarToggler) {
                        navbarToggler.click(); 
                    }
                }
            }
        });
    });

    // 4. Intersection Observer Architecture (Ready for future animation scaling)
    const setupScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a class that can be targeted in CSS for fade-ins
                    entry.target.classList.add('is-visible');
                    // Optional: Unobserve if you only want the animation to happen once
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Target primary UI elements
        const elementsToAnimate = document.querySelectorAll('.feature-card, .client-card, .process-step');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    };

    // Initialize the observer
    setupScrollAnimations();
    
    // 5. Ecosystem Telemetry / Console Branding
    console.log("%c[Jaiho Links] System Initialized", "color: #4f46e5; font-size: 14px; font-weight: bold;");
    console.log("%cManaged by Jaiho Reach | Powered by Jaiho Ecosystem", "color: #64748b; font-size: 12px;");
});