// SerenityLinks Homepage JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Theme switching functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    const html = document.documentElement;
    
    // Load saved theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateActiveThemeButton(savedTheme);
    
    // Theme button click handlers
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateActiveThemeButton(theme);
            
            // Add transition effect
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    });
    
    function updateActiveThemeButton(activeTheme) {
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === activeTheme) {
                btn.classList.add('active');
            }
        });
    }
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger icon
        if (mobileMenu.classList.contains('active')) {
            this.textContent = '✕';
        } else {
            this.textContent = '☰';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
    });
    
    // Navigation link functionality
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link (only for desktop nav)
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add backdrop blur effect on scroll
        if (currentScrollY > 50) {
            navbar.style.backdropFilter = 'blur(30px)';
            navbar.style.background = 'var(--nav-bg)';
        } else {
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle animation to icon
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Floating elements animation enhancement
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 500));
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Stagger animation for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    const cardIndex = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${cardIndex * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .discover-title, .discover-subtitle, .cta-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add dynamic background particles (optional enhancement)
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--primary-color)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.3';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.zIndex = '-1';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const duration = Math.random() * 3000 + 2000;
        const drift = (Math.random() - 0.5) * 100;
        
        particle.animate([
            { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
            { transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px)`, opacity: 0.3 },
            { transform: `translateY(-${window.innerHeight + 200}px) translateX(${drift * 2}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => {
            particle.remove();
        };
    }
    
    // Create particles periodically (light theme only)
    setInterval(() => {
        if (html.getAttribute('data-theme') === 'light' && Math.random() > 0.7) {
            createParticle();
        }
    }, 1000);
    
    // Pixel theme special effects
    function addPixelEffects() {
        const theme = html.getAttribute('data-theme');
        
        if (theme === 'pixel') {
            // Add retro scan lines effect
            const scanlines = document.createElement('div');
            scanlines.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 1000;
                background: repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 255, 65, 0.03) 2px,
                    rgba(0, 255, 65, 0.03) 4px
                );
                animation: scanlines 0.1s linear infinite;
            `;
            
            // Add scan lines animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes scanlines {
                    0% { transform: translateY(0px); }
                    100% { transform: translateY(4px); }
                }
            `;
            
            if (!document.querySelector('.pixel-effects')) {
                scanlines.className = 'pixel-effects';
                document.head.appendChild(style);
                document.body.appendChild(scanlines);
            }
        } else {
            // Remove pixel effects
            const pixelEffects = document.querySelector('.pixel-effects');
            if (pixelEffects) {
                pixelEffects.remove();
            }
        }
    }
    
    // Watch for theme changes to add/remove pixel effects
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                addPixelEffects();
            }
        });
    });
    
    themeObserver.observe(html, { attributes: true });
    addPixelEffects(); // Initial check
    
    // Console Easter Egg
    console.log(`
    ╔═══════════════════════════════════════╗
    ║            SerenityLinks              ║
    ║     The Warmth of Digital Bonds       ║
    ║                                       ║
    ║  Welcome to your cozy digital space!  ║
    ║  🌸 Built with love and care 💖       ║
    ╚═══════════════════════════════════════╝
    `);
    
    // Add some fun interactions
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg - show special message
            alert('🎉 You found the secret! Welcome to SerenityLinks, fellow adventurer! 💖');
            konamiCode = [];
            
            // Add temporary rainbow effect
            document.body.style.animation = 'rainbow 2s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });
    
    // Add rainbow animation for easter egg
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
});