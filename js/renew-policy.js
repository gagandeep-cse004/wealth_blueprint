// Renew Policy Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize dropdown menus
    initDropdownMenus();
    
    // Initialize form tabs
    initFormTabs();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize the OTP button functionality
    initOtpButton();
    
    // Form validation
    initFormValidation();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Initialize animations for benefits section
    initBenefitsAnimation();
    
    // Initialize stats counters animation
    initStatsCounters();
    
    // Initialize process timeline animation
    initProcessTimeline();
});

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const menuItems = document.getElementById('menu-items');
    
    if (hamburger && menuItems) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            menuItems.classList.toggle('active');
        });
    }
}

// Dropdown menus for navbar
function initDropdownMenus() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const parent = this.parentElement;
            const dropdownMenu = parent.querySelector('.dropdown-menu');
            
            // Close all other open dropdowns
            document.querySelectorAll('.dropdown').forEach(item => {
                if (item !== parent && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.dropdown-menu').style.display = 'none';
                }
            });
            
            // Toggle current dropdown
            parent.classList.toggle('active');
            
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'block';
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(item => {
                item.classList.remove('active');
                const menu = item.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = 'none';
                }
            });
        }
    });
}

// Form tabs functionality
function initFormTabs() {
    const formTabs = document.querySelectorAll('.form-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    formTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            formTabs.forEach(t => t.classList.remove('active'));
            
            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current tab
            this.classList.add('active');
            
            // Show the corresponding tab pane
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
}

// FAQ accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class for current item
            item.classList.toggle('active');
            
            // Optional: Close other items when one is opened
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

// OTP button functionality
function initOtpButton() {
    const otpButtons = document.querySelectorAll('.btn-otp');
    
    otpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const mobileInput = document.getElementById(target);
            
            // Basic validation - check if mobile number is valid
            if (mobileInput && validateMobile(mobileInput.value)) {
                // Simulate OTP sending
                this.disabled = true;
                this.textContent = 'Sending...';
                
                setTimeout(() => {
                    this.textContent = 'OTP Sent';
                    
                    // Start countdown timer
                    let seconds = 30;
                    const intervalId = setInterval(() => {
                        seconds--;
                        this.textContent = `Resend in ${seconds}s`;
                        
                        if (seconds <= 0) {
                            clearInterval(intervalId);
                            this.textContent = 'Resend OTP';
                            this.disabled = false;
                        }
                    }, 1000);
                    
                    // Show OTP input field
                    const otpInputId = this.getAttribute('data-otp-field');
                    if (otpInputId) {
                        const otpInputContainer = document.getElementById(otpInputId);
                        if (otpInputContainer) {
                            otpInputContainer.style.display = 'block';
                        }
                    }
                }, 1500);
            } else {
                // Show error message
                showError(mobileInput, 'Please enter a valid 10-digit mobile number');
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const renewForms = document.querySelectorAll('.renew-form');
    
    renewForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate required fields
            const requiredInputs = form.querySelectorAll('input[required]');
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    showError(input, 'This field is required');
                } else {
                    clearError(input);
                }
            });
            
            // Validate policy number format
            const policyInput = form.querySelector('input[name="policy_number"]');
            if (policyInput && policyInput.value.trim()) {
                if (!validatePolicyNumber(policyInput.value)) {
                    isValid = false;
                    showError(policyInput, 'Invalid policy number format');
                }
            }
            
            // Validate mobile number
            const mobileInput = form.querySelector('input[name="mobile"]');
            if (mobileInput && mobileInput.value.trim()) {
                if (!validateMobile(mobileInput.value)) {
                    isValid = false;
                    showError(mobileInput, 'Please enter a valid 10-digit mobile number');
                }
            }
            
            // Validate email format
            const emailInput = form.querySelector('input[name="email"]');
            if (emailInput && emailInput.value.trim()) {
                if (!validateEmail(emailInput.value)) {
                    isValid = false;
                    showError(emailInput, 'Please enter a valid email address');
                }
            }
            
            // If form is valid, submit it (or show success message)
            if (isValid) {
                showFormSuccess(form);
            }
        });
    });
}

// Smooth scroll functionality
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Validation helpers
function validatePolicyNumber(policyNumber) {
    // Example validation: Alphanumeric with min 6 chars
    return /^[a-zA-Z0-9]{6,}$/.test(policyNumber);
}

function validateMobile(mobile) {
    // Basic validation for 10-digit number
    return /^[6-9]\d{9}$/.test(mobile);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    // Remove any existing error message
    clearError(input);
    
    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
    
    // Add error class to input
    input.classList.add('error');
    input.style.borderColor = 'var(--error-color)';
}

function clearError(input) {
    // Remove error class from input
    input.classList.remove('error');
    input.style.borderColor = '';
    
    // Remove any existing error message
    const parent = input.parentNode;
    const errorMessage = parent.querySelector('.error-message');
    if (errorMessage) {
        parent.removeChild(errorMessage);
    }
}

function showFormSuccess(form) {
    // Hide the form
    form.style.display = 'none';
    
    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="text-align: center; padding: 30px 0;">
            <div style="width: 70px; height: 70px; background-color: var(--success-color); border-radius: 50%; 
                        display: flex; justify-content: center; align-items: center; margin: 0 auto 20px;">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
                </svg>
            </div>
            <h3 style="font-size: 24px; color: var(--text-color); margin-bottom: 15px;">Request Submitted Successfully!</h3>
            <p style="color: var(--text-light); margin-bottom: 20px;">We've received your policy renewal request. Our team will process it and get back to you shortly.</p>
            <p style="font-weight: 600; color: var(--primary-color);">Reference ID: REQ-${generateReferenceId()}</p>
        </div>
    `;
    
    // Insert success message after form
    const formContainer = form.closest('.tab-pane.active');
    formContainer.appendChild(successDiv);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth' });
}

// Generate random reference ID
function generateReferenceId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Animated number counter for statistics
function initStatsCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the count animation for all statistics
                const statNumbers = document.querySelectorAll('.stat-number');
                
                statNumbers.forEach(statNumber => {
                    const targetValue = parseInt(statNumber.getAttribute('data-value'));
                    animateCounter(statNumber, targetValue);
                });
                
                // Only trigger once
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    
    // Observe the stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounter(element, targetValue) {
    // Format the target value with commas if it's a large number
    const formattedTargetValue = targetValue.toLocaleString();
    
    // Determine increment size based on the target value
    let increment = 1;
    if (targetValue > 100) increment = Math.ceil(targetValue / 100);
    if (targetValue > 1000) increment = Math.ceil(targetValue / 50);
    if (targetValue > 10000) increment = Math.ceil(targetValue / 30);
    if (targetValue > 100000) increment = Math.ceil(targetValue / 20);
    if (targetValue > 1000000) increment = Math.ceil(targetValue / 15);
    
    let currentValue = 0;
    const duration = 2000; // ms
    const interval = 30; // ms
    const steps = duration / interval;
    const incrementPerStep = Math.ceil(targetValue / steps);
    
    // Use the larger of our two increment calculations
    increment = Math.max(increment, incrementPerStep);
    
    const symbol = element.querySelector('.stat-symbol').outerHTML;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        // Update the counter text (keeping the symbol)
        element.innerHTML = currentValue.toLocaleString() + symbol;
        
        // Add a scaling animation effect on each step
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 15);
        
    }, interval);
}

// Initialize animations for benefits cards
function initBenefitsAnimation() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    // Set initial state (hidden)
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    // Create an observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When card comes into view, make it visible with animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe each card
    benefitCards.forEach(card => {
        observer.observe(card);
    });
    
    // Animate the CTA button
    const benefitsCta = document.querySelector('.benefits-cta');
    if (benefitsCta) {
        benefitsCta.style.opacity = '0';
        benefitsCta.style.transform = 'translateY(20px)';
        benefitsCta.style.transition = 'all 0.6s ease 0.6s';
        
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        ctaObserver.observe(benefitsCta);
    }
}

// Initialize animations for the process timeline
function initProcessTimeline() {
    // Animate process steps on scroll
    const processSteps = document.querySelectorAll('.process-step');
    
    if (processSteps.length > 0) {
        processSteps.forEach((step, index) => {
            // Set initial state
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = `all 0.6s ease ${index * 0.2}s`;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate the step when it comes into view
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });
            
            observer.observe(step);
        });
    }
    
    // Make timeline dots interactive
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const processStepsArray = Array.from(processSteps);
    
    timelineDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const stepNum = parseInt(this.getAttribute('data-step'));
            
            if (stepNum && stepNum <= processStepsArray.length) {
                // Get the corresponding step
                const targetStep = processStepsArray[stepNum - 1];
                
                // Highlight the step
                processStepsArray.forEach(step => step.classList.remove('active'));
                targetStep.classList.add('active');
                
                // Scroll to the step
                targetStep.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Add pulse animation to the step
                targetStep.classList.add('pulse-animation');
                setTimeout(() => {
                    targetStep.classList.remove('pulse-animation');
                }, 1500);
            }
        });
    });
    
    // Add hover effects to process CTA
    const processCta = document.querySelector('.process-cta .btn-primary');
    if (processCta) {
        processCta.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'translateX(5px)';
        });
        
        processCta.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = '';
        });
    }
} 