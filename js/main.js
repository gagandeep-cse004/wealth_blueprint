// Plans Filtering
document.addEventListener('DOMContentLoaded', function() {
    const planTabs = document.querySelectorAll('.plan-tab');
    const planCards = document.querySelectorAll('.plan-card');
    
    // Set default active tab
    if (planTabs.length > 0) {
        planTabs[0].classList.add('active');
    }
    
    // Handle tab clicks
    planTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            planTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to current tab
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter plan cards
            planCards.forEach(card => {
                // Hide all cards first with animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    // Show or hide based on filter
                    if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
    
    // Initialize - show all plans initially
    planCards.forEach(card => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
    
    // 3D Tilt Effect for plan cards
    planCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            // Calculate position of mouse relative to card center
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation values based on mouse position
            const rotateY = mouseX / 15;
            const rotateX = -mouseY / 15;
            
            // Apply the rotation transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
            card.style.transition = 'all 0.5s ease';
        });
    });
    
    // Animate milestone cards on scroll
    const animateOnScroll = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(animateOnScroll, options);
    
    // Observe milestone cards
    document.querySelectorAll('.milestone-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Check if this item is already active
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const answer = faqItem.querySelector('.faq-answer');
                    if (answer) answer.classList.remove('open');
                });
                
                // If the clicked item wasn't active, make it active
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) answer.classList.add('open');
                    this.classList.add('active');
                }
            });
        }
    });
    
    // Auto-open first FAQ item
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        firstItem.classList.add('active');
        const firstAnswer = firstItem.querySelector('.faq-answer');
        if (firstAnswer) firstAnswer.classList.add('open');
        const firstQuestion = firstItem.querySelector('.faq-question');
        if (firstQuestion) firstQuestion.classList.add('active');
    }
    
    // Feature icon animations
    document.querySelectorAll('.feature-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) icon.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) icon.style.transform = '';
        });
    });
});

// Animate elements when they become visible
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-header, .plan-card, .plan-tabs');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Initial check on page load
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
}); 