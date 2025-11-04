// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav');
    const body = document.body;
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle hamburger animation
            const bars = this.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
            
            // Toggle nav menu
            navMenu.classList.toggle('active');
            
            // Toggle body scroll lock
            body.classList.toggle('nav-active');
            
            // Reset all dropdowns when closing the menu
            if (!navMenu.classList.contains('active')) {
                resetDropdowns();
            }
        });
    }
    
    // Close mobile menu when clicking on a link that's not a dropdown toggle
    const navLinks = document.querySelectorAll('#menu-items li a:not(.dropdown-toggle)');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't close menu if it's a dropdown menu item
            if (!this.parentElement.classList.contains('dropdown')) {
                navMenu.classList.remove('active');
                
                // Reset hamburger
                if (hamburger) {
                    const bars = hamburger.querySelectorAll('.bar');
                    bars.forEach(bar => bar.classList.remove('active'));
                }
                
                // Remove body class for iOS scroll fix
                document.body.classList.remove('nav-active');
            }
        });
    });
    
    // Handle dropdown menus
    dropdownToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', function(e) {
            // Only for mobile view
            if (window.innerWidth <= 992) {
                e.preventDefault();
                
                // Toggle active class on dropdown toggle
                this.classList.toggle('active');
                
                // Toggle active class on corresponding dropdown menu
                if (dropdownMenus[index]) {
                    dropdownMenus[index].classList.toggle('active');
                }
                
                // Close other dropdowns
                dropdownToggles.forEach((otherToggle, otherIndex) => {
                    if (otherToggle !== toggle) {
                        otherToggle.classList.remove('active');
                        if (dropdownMenus[otherIndex]) {
                            dropdownMenus[otherIndex].classList.remove('active');
                        }
                    }
                });
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            // Check if click is outside nav and hamburger
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                // Close nav menu
                navMenu.classList.remove('active');
                
                // Reset hamburger
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => bar.classList.remove('active'));
                
                // Remove body scroll lock
                body.classList.remove('nav-active');
                
                // Close all dropdowns
                dropdownToggles.forEach((toggle, index) => {
                    toggle.classList.remove('active');
                    if (dropdownMenus[index]) {
                        dropdownMenus[index].classList.remove('active');
                    }
                });
            }
        }
    });
    
    // Handle window resize to reset mobile menu state
    window.addEventListener('resize', function() {
        const isDesktop = window.innerWidth > 992;
        
        if (isDesktop) {
            // Reset mobile menu
            navMenu.classList.remove('active');
            
            // Reset hamburger
            if (hamburger) {
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => bar.classList.remove('active'));
            }
            
            // Reset dropdown menus
            dropdownToggles.forEach((toggle, index) => {
                toggle.classList.remove('active');
                if (dropdownMenus[index]) {
                    dropdownMenus[index].classList.remove('active');
                }
            });
            
            // Remove body class for iOS scroll fix
            document.body.classList.remove('nav-active');
        }
    });
    
    // Hero Promo Navigation
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Placeholder for future promo slides
    let currentPromoIndex = 0;
    const promoSlides = [
        {
            image: 'images/hero-image.svg',
            title: 'Simplifying Financial Planning in 2025',
            text: 'Read on to Stay ahead with your financial planning!'
        }
        // Add more slides here when needed
    ];
    
    // Initialize hero actions (for future expansion)
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            // Currently just one slide, but adding for future expansion
            prevBtn.classList.add('clicked');
            setTimeout(() => {
                prevBtn.classList.remove('clicked');
            }, 300);
        });
        
        nextBtn.addEventListener('click', function() {
            // Currently just one slide, but adding for future expansion
            nextBtn.classList.add('clicked');
            setTimeout(() => {
                nextBtn.classList.remove('clicked');
            }, 300);
        });
    }
        
    // Goal card hover effects with enhanced animations
    const goalCards = document.querySelectorAll('.goal-card');
    
    goalCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('.fa-arrow-right');
            arrow.style.transform = 'translateX(8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('.fa-arrow-right');
            arrow.style.transform = 'translateX(0)';
        });
    });
    
    // Process steps hover effects and interactions
    function initProcessInteractions() {
        const processStepCards = document.querySelectorAll('.process-step-card');
        
        processStepCards.forEach(card => {
            // Add hover effect for process features
            const features = card.querySelectorAll('.process-features li');
            features.forEach(feature => {
                feature.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(5px)';
                });
                
                feature.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
            
            // Add animated entry for cards when they appear in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const step = entry.target.getAttribute('data-step');
                        entry.target.style.animationDelay = `${(step - 1) * 0.2}s`;
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            });
            
            observer.observe(card);
        });
    }
    
    // Initialize the process interactions
    initProcessInteractions();

    // Animated score meter
    function initScoreMeter() {
        const meterFill = document.querySelector('.meter-fill');
        const scoreValue = document.querySelector('.score-value');
        
        if (!meterFill || !scoreValue) return;
        
        // Start with 0 width
        meterFill.style.width = '0%';
        
        // Animate to 75% width after a short delay
        setTimeout(() => {
            meterFill.style.width = '75%';
            setTimeout(() => {
                scoreValue.textContent = '75';
                scoreValue.style.opacity = '1';
            }, 800);
        }, 500);
    }

    // Call animation functions
    initScoreMeter();
    
    // Enhanced Testimonials Slider
    function initTestimonialsSlider() {
        const slider = document.querySelector('.testimonials-slider');
        const testimonials = document.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.prev-testimonial');
        const nextBtn = document.querySelector('.next-testimonial');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!slider || testimonials.length === 0) return;
        
        let currentIndex = 0;
        let isAnimating = false;
        
        // Set initial state
        updateSlider();
        
        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (isAnimating) return;
                showPreviousTestimonial();
                animateButton(this);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (isAnimating) return;
                showNextTestimonial();
                animateButton(this);
            });
        }
        
        // Animate button click
        function animateButton(btn) {
            btn.classList.add('clicked');
            setTimeout(() => {
                btn.classList.remove('clicked');
            }, 300);
        }
        
        // Indicator buttons
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (isAnimating || currentIndex === index) return;
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Auto slide every 5 seconds
        let autoSlide = setInterval(showNextTestimonial, 5000);
        
        // Pause auto slide on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(showNextTestimonial, 5000);
        });
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            if (isAnimating) return;
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swiped left
                showNextTestimonial();
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swiped right
                showPreviousTestimonial();
            }
        }
        
        function showNextTestimonial() {
            if (isAnimating) return;
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        }
        
        function showPreviousTestimonial() {
            if (isAnimating) return;
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateSlider();
        }
        
        function updateSlider() {
            isAnimating = true;
            
            // Update slider position with smooth animation
            slider.style.transition = 'transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)';
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
            
            // Reset animation flag after transition
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }
    }
    
    // Enhanced Scroll Animation
    function initScrollAnimation() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const fadeLeftElements = document.querySelectorAll('.fade-in-left');
        const fadeRightElements = document.querySelectorAll('.fade-in-right');
        
        // All animation elements
        const allAnimElements = [...fadeElements, ...fadeLeftElements, ...fadeRightElements];
        
        // Set initial opacity to 0
        allAnimElements.forEach(element => {
            element.style.opacity = '0';
        });
        
        // Init observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all elements
        allAnimElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Add classes to enable animations
    function setupAnimations() {
        // Add animation classes to sections
        document.querySelectorAll('.service-card').forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${i * 0.1}s`;
        });
        
        document.querySelectorAll('.process-step').forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${i * 0.15}s`;
        });
        
        document.querySelectorAll('.about-text').forEach(el => {
            el.classList.add('fade-in-left');
        });
        
        document.querySelectorAll('.about-image').forEach(el => {
            el.classList.add('fade-in-right');
        });
        
        document.querySelectorAll('.testimonial').forEach(el => {
            el.classList.add('fade-in');
        });
        
        document.querySelectorAll('.cta-content').forEach(el => {
            el.classList.add('fade-in');
        });
        
        document.querySelectorAll('.contact-form').forEach(el => {
            el.classList.add('fade-in-left');
        });
        
        document.querySelectorAll('.contact-info').forEach(el => {
            el.classList.add('fade-in-right');
        });
        
        document.querySelectorAll('.stat').forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${i * 0.1}s`;
        });
    }
    
    // Scroll Progress Indicator
    function initScrollProgressIndicator() {
        const scrollProgress = document.createElement('div');
        scrollProgress.className = 'scroll-progress';
        document.body.appendChild(scrollProgress);
        
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = progress + '%';
        });
    }
    
    // Add active class to navigation based on scroll position
    function initScrollSpy() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('#menu-items li a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (current && item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // Enhanced Sticky header
    function initStickyHeader() {
        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Form validation with enhanced UX
    function initFormValidation() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            // Create success message container
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.';
            contactForm.insertBefore(successMessage, contactForm.firstChild);
            
            // Enhanced form labels
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                if (!input.getAttribute('placeholder')) {
                    input.setAttribute('placeholder', ' ');
                }
                
                const label = input.previousElementSibling;
                // if (label && label.tagName === 'LABEL') {
                //     const floatingLabel = document.createElement('span');
                //     floatingLabel.className = 'floating-label';
                //     floatingLabel.textContent = label.textContent;
                //     input.parentNode.appendChild(floatingLabel);
                // }
            });
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const messageInput = document.getElementById('message');
                let isValid = true;
                
                // Simple validation
                if (nameInput.value.trim() === '') {
                    showError(nameInput, 'Name is required');
                    isValid = false;
                } else {
                    showSuccess(nameInput);
                }
                
                if (emailInput.value.trim() === '') {
                    showError(emailInput, 'Email is required');
                    isValid = false;
                } else if (!isValidEmail(emailInput.value)) {
                    showError(emailInput, 'Please enter a valid email');
                    isValid = false;
                } else {
                    showSuccess(emailInput);
                }
                
                if (messageInput.value.trim() === '') {
                    showError(messageInput, 'Message is required');
                    isValid = false;
                } else {
                    showSuccess(messageInput);
                }
                
                if (isValid) {
                    // Show loading state
                    const submitBtn = contactForm.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                    
                    // Simulate form submission delay
                    setTimeout(() => {
                        // In a real application, you would send the form data to the server here
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Show success message
                        successMessage.classList.add('active');
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            successMessage.classList.remove('active');
                        }, 5000);
                    }, 1500);
                }
            });
        }
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        
        let errorMessage = formGroup.querySelector('.error-message');
        
        if (!errorMessage) {
            errorMessage = document.createElement('small');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
        
        // Shake animation for error
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 600);
    }
    
    function showSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Enhanced Smooth scrolling for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                const headerHeight = document.querySelector('header').offsetHeight;
                
                if (targetElement) {
                    // Add page transition effect
                    const pageTransition = document.createElement('div');
                    pageTransition.className = 'page-transition';
                    document.body.appendChild(pageTransition);
                    
                    // Trigger transition
                    setTimeout(() => {
                        pageTransition.classList.add('active');
                    }, 10);
                    
                    setTimeout(() => {
                        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Remove transition
                        pageTransition.classList.remove('active');
                        
                        setTimeout(() => {
                            document.body.removeChild(pageTransition);
                        }, 500);
                    }, 300);
                }
            });
        });
    }
    
    // Dynamic background shapes
    function createBackgroundShapes() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            // Add random animated shapes to each section
            for (let i = 0; i < 2; i++) {
                const shape = document.createElement('div');
                shape.className = `shape-animation shape-${Math.floor(Math.random() * 3) + 1}`;
                shape.style.left = `${Math.random() * 90}%`;
                shape.style.top = `${Math.random() * 90}%`;
                shape.style.opacity = '0.5';
                shape.style.animationDelay = `${Math.random() * 5}s`;
                
                section.appendChild(shape);
            }
        });
    }
    
    // Add CSS classes dynamically
    document.head.insertAdjacentHTML('beforeend', `
        <style>
        /* Hamburger animation */
        .hamburger .bar:nth-child(1).active {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger .bar:nth-child(2).active {
            opacity: 0;
        }
        
        .hamburger .bar:nth-child(3).active {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        /* Enhanced animations */
        .appear {
            opacity: 1 !important;
            transform: translate(0, 0) !important;
        }
        
        /* Button click animation */
        .clicked {
            transform: scale(0.95);
        }
        
        /* Form shake animation */
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.6s;
        }
        </style>
    `);
    
    // Initialize all functions
    initStickyHeader();
    initScrollSpy();
    initTestimonialsSlider();
    setupAnimations();
    initScrollAnimation();
    initScrollProgressIndicator();
    initFormValidation();
    initSmoothScroll();
    createBackgroundShapes();

    // Feedback Card Read Review functionality
    const reviewButtons = document.querySelectorAll('.review-button');
    
    reviewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            const card = this.closest('.feedback-card');
            
            if (card.classList.contains('expanded')) {
                card.classList.remove('expanded');
                this.textContent = 'Read Review';
            } else {
                card.classList.add('expanded');
                this.textContent = 'Close';
            }
        });
    });
    
    // Allow clicking anywhere on the card to toggle expansion
    const feedbackCards = document.querySelectorAll('.feedback-card');
    feedbackCards.forEach(card => {
        card.addEventListener('click', function() {
            const button = this.querySelector('.review-button');
            if (this.classList.contains('expanded')) {
                this.classList.remove('expanded');
                button.textContent = 'Read Review';
            } else {
                this.classList.add('expanded');
                button.textContent = 'Close';
            }
        });
    });

    // Investment Plans Page
    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active before
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Investment Calculator
    const investmentAmount = document.getElementById('investment-amount');
    const investmentPeriod = document.getElementById('investment-period');
    const periodValue = document.getElementById('period-value');
    const returnRate = document.getElementById('return-rate');
    const rateValue = document.getElementById('rate-value');
    const monthlyContribution = document.getElementById('monthly-contribution');
    const investmentPlan = document.getElementById('investment-plan');
    
    // Skip if elements don't exist (not on investment page)
    if (!investmentAmount || !investmentPeriod) return;
    
    // Update sliders display values
    investmentPeriod.addEventListener('input', function() {
        periodValue.textContent = this.value + ' years';
        calculateReturns();
    });
    
    returnRate.addEventListener('input', function() {
        rateValue.textContent = this.value + '%';
        calculateReturns();
    });
    
    // Calculate on input change
    [investmentAmount, monthlyContribution, investmentPlan].forEach(element => {
        element.addEventListener('input', calculateReturns);
    });
    
    // Initial calculation
    calculateReturns();
    
    function calculateReturns() {
        const principal = parseFloat(investmentAmount.value) || 0;
        const years = parseInt(investmentPeriod.value) || 0;
        const rate = parseFloat(returnRate.value) / 100 || 0;
        const monthly = parseFloat(monthlyContribution.value) || 0;
        
        // Future value calculation
        let futureValue = principal * Math.pow(1 + rate, years);
        
        // Add monthly contributions with compounding interest
        if (monthly > 0) {
            futureValue += monthly * ((Math.pow(1 + rate/12, 12 * years) - 1) / (rate/12)) * (1 + rate/12);
        }
        
        // Update result values
        const totalContributions = principal + (monthly * 12 * years);
        const growth = futureValue - totalContributions;
        
        // Format values as Indian currency (with lakhs and crores)
        function formatIndianCurrency(amount) {
            const formatted = new Intl.NumberFormat('en-IN', {
                maximumFractionDigits: 0
            }).format(amount);
            return '₹' + formatted;
        }
        
        // Get all stat values and update them
        document.querySelectorAll('.result-stat .stat-value').forEach((element, index) => {
            switch(index) {
                case 0: // Future Value
                    element.textContent = formatIndianCurrency(Math.round(futureValue));
                    break;
                case 1: // Total Growth
                    element.textContent = formatIndianCurrency(Math.round(growth));
                    break;
                case 2: // Initial Investment
                    element.textContent = formatIndianCurrency(principal);
                    break;
                case 3: // Total Contributions
                    element.textContent = formatIndianCurrency(totalContributions);
                    break;
            }
        });
    }
    
    // Investment Plan Tabs
    const planTabs = document.querySelectorAll('.plan-tab');
    const planCards = document.querySelectorAll('.plan-card');
    
    if (planTabs.length && planCards.length) {
        planTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                planTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.textContent.trim();
                
                planCards.forEach(card => {
                    const badge = card.querySelector('.plan-badge').textContent.trim();
                    
                    if (category === 'All Plans' || badge.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Set active class on navbar link based on current page
    function setActiveNavLink() {
        const currentLocation = window.location.pathname;
        const navLinks = document.querySelectorAll('nav ul li a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Remove all active classes first
            link.classList.remove('active');
            
            // Set active class if the link path matches current location
            if (linkPath && currentLocation.includes(linkPath) && linkPath !== '/') {
                link.classList.add('active');
            } else if (linkPath === '/' && (currentLocation === '/' || currentLocation.includes('index.html'))) {
                link.classList.add('active');
            }
        });
    }
    
    // Call the function to set active nav link
    setActiveNavLink();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only proceed if it's an actual anchor link (not just "#")
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        const bars = hamburger.querySelectorAll('.bar');
                        bars.forEach(bar => bar.classList.remove('active'));
                        body.classList.remove('nav-active');
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Reset dropdowns on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            resetDropdowns();
            
            // Reset mobile menu state
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            navMenu.classList.remove('active');
            body.classList.remove('nav-active');
        }5
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Helper function to reset all dropdowns
    function resetDropdowns() {
        dropdownToggles.forEach(function(toggle, index) {
            toggle.classList.remove('active');
            dropdownMenus[index].classList.remove('active');
        });
    }

    // Function to handle mobile navigation menu
    function initMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('nav');
        const body = document.body;
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        
        // Toggle menu when hamburger is clicked
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                // Toggle active class on bars
                const bars = this.querySelectorAll('.bar');
                bars.forEach(bar => bar.classList.toggle('active'));
                
                // Toggle nav menu
                if (navMenu.classList.contains('active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }
        
        // Handle dropdown menu toggles
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                // Only apply this behavior in mobile view
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    
                    // Get parent dropdown
                    const parent = this.parentNode;
                    
                    // Get dropdown menu
                    const dropdownMenu = parent.querySelector('.dropdown-menu');
                    
                    // Check if this dropdown is already active
                    const isActive = this.classList.contains('active');
                    
                    // Close all open dropdowns
                    dropdownToggles.forEach(dt => {
                        dt.classList.remove('active');
                    });
                    
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        menu.classList.remove('active');
                    });
                    
                    // If the clicked dropdown wasn't active, open it
                    if (!isActive) {
                        this.classList.add('active');
                        if (dropdownMenu) {
                            dropdownMenu.classList.add('active');
                        }
                    }
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    closeMenu();
                }
            }
        });
        
        // Close menu when ESC key is pressed
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Helper functions
        function openMenu() {
            navMenu.classList.add('active');
            body.classList.add('nav-active');
        }
        
        function closeMenu() {
            navMenu.classList.remove('active');
            body.classList.remove('nav-active');
            
            // Reset hamburger icon
            if (hamburger) {
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => bar.classList.remove('active'));
            }
            
            // Close all dropdowns
            dropdownToggles.forEach(toggle => {
                toggle.classList.remove('active');
            });
            
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Call the function when DOM is loaded
    initMobileNavigation();
    
    // Add icon to the investment buttons
    const investmentButtons = document.querySelectorAll('.navbar-actions .btn-primary');
    investmentButtons.forEach(button => {
        if (button.textContent.includes('Plan your investments') || 
            button.textContent.includes('Plan your second income')) {
            // Check if icon already exists
            if (!button.querySelector('i')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-arrow-right';
                button.appendChild(icon);
            }
        }
    });
}); 

// Plan Your Investment ( investment plans page)

document.addEventListener('DOMContentLoaded', function () {
    // Get all necessary elements
    const investmentAmount = document.getElementById('investment-amount');
    const investmentPeriod = document.getElementById('investment-period');
    const returnRate = document.getElementById('return-rate');
    const monthlyContribution = document.getElementById('monthly-contribution');
    const investmentPlan = document.getElementById('investment-plan');
    
    const periodValue = document.getElementById('period-value');
    const rateValue = document.getElementById('rate-value');

    const resultStats = document.querySelectorAll('.result-stat .stat-value');

    function updateSliders() {
        periodValue.textContent = investmentPeriod.value + ' years';
        rateValue.textContent = returnRate.value + '%';
    }

    function calculateResults() {
        const P = parseFloat(investmentAmount.value) || 0; // initial investment
        const n = parseInt(investmentPeriod.value) || 0; // years
        const r = (parseFloat(returnRate.value) || 0) / 100; // annual return in decimal
        const M = parseFloat(monthlyContribution.value) || 0; // monthly contribution

        // Compounded monthly
        const months = n * 12;
        const monthlyRate = r / 12;

        // Future value of lump sum
        const futureValueLumpSum = P * Math.pow(1 + monthlyRate, months);

        // Future value of series (monthly contributions)
        const futureValueContributions = M * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

        const futureValue = futureValueLumpSum + futureValueContributions;

        const totalContributions = M * months;
        const totalInvestment = P + totalContributions;
        const totalGrowth = futureValue - totalInvestment;

        // Format currency
        const formatCurrency = (num) => {
            return '₹' + num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        // Update the results in the DOM
        if (resultStats.length >= 4) {
            resultStats[0].textContent = formatCurrency(futureValue);
            resultStats[1].textContent = formatCurrency(totalGrowth);
            resultStats[2].textContent = formatCurrency(P);
            resultStats[3].textContent = formatCurrency(totalContributions);
        }
    }

    function updateCalculator() {
        updateSliders();
        calculateResults();
    }

    // Event listeners
    investmentAmount.addEventListener('input', updateCalculator);
    investmentPeriod.addEventListener('input', updateCalculator);
    returnRate.addEventListener('input', updateCalculator);
    monthlyContribution.addEventListener('input', updateCalculator);
    investmentPlan.addEventListener('change', function () {
        // Optional: Adjust return rate based on selected plan
        if (investmentPlan.value === 'secure') {
            returnRate.value = 9; // average of 8-10%
        } else if (investmentPlan.value === 'balanced') {
            returnRate.value = 13.5; // average of 12-15%
        } else if (investmentPlan.value === 'accelerate') {
            returnRate.value = 21; // average of 18-24%
        }
        updateCalculator();
    });

    // Initial load
    updateCalculator();
});
