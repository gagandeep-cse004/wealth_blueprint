// Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.status-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Initially hide all answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.display = 'none';
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });

    // Search Input Animation
    const searchInput = document.querySelector('.status-search-input');
    
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.transform = 'scale(1)';
    });

    // Search Button Click Handler
    const searchButton = document.querySelector('.status-search-btn');
    
    searchButton.addEventListener('click', () => {
        const referenceNumber = searchInput.value.trim();
        
        if (referenceNumber) {
            // Add loading state
            searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset button state
                searchButton.innerHTML = '<i class="fas fa-search"></i> Track Status';
                
                // Show timeline section (you would typically update this based on API response)
                document.querySelector('.status-timeline-section').style.display = 'block';
            }, 1500);
        }
    });

    // Quick Links Hover Effect
    const quickLinks = document.querySelectorAll('.quick-link');
    
    quickLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });

    // Action Cards Hover Effect
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}); 