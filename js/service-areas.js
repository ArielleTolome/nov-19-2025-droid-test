// Service areas page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Location search functionality
    const locationSearchForm = document.querySelector('.location-search-form');
    if (locationSearchForm) {
        locationSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('#location-search');
            const location = searchInput.value.trim();
            
            if (location) {
                // Redirect to contact page with location parameter
                window.location.href = `contact.html?location=${encodeURIComponent(location)}`;
            } else {
                // Show error message
                if (!searchInput.nextElementSibling || !searchInput.nextElementSibling.classList.contains('error-message')) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message';
                    errorDiv.textContent = 'Please enter a location';
                    errorDiv.style.color = '#dc2626';
                    errorDiv.style.fontSize = '14px';
                    errorDiv.style.marginTop = '4px';
                    searchInput.parentNode.appendChild(errorDiv);
                }
            }
        });
    }
    
    // Popular location links
    const locationLinks = document.querySelectorAll('.location-link');
    locationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Smooth scroll to anchor links
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
    
    // Highlight current region when scrolling
    const regions = document.querySelectorAll('.service-region');
    const regionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Could add active state styling here if needed
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.3 });
    
    regions.forEach(region => {
        regionObserver.observe(region);
    });
});
