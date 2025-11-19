// Services page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Category tab switching functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryContents = document.querySelectorAll('.service-category-content');
    
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // Update active tab
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show/hide content
                categoryContents.forEach(content => {
                    if (content.id === category) {
                        content.classList.add('active');
                        content.style.display = 'block';
                        // Smooth scroll to top of content
                        setTimeout(() => {
                            content.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                    } else {
                        content.classList.remove('active');
                        content.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
