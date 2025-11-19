// Main JavaScript functionality for Dumpsters.com website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = navMenu.classList.contains('active') 
                    ? getMobileMenuTransform(index) 
                    : '';
            });
        });
    }
    
    // Helper function for mobile menu animation
    function getMobileMenuTransform(index) {
        const transforms = [
            'rotate(45deg) translate(5px, 5px)',
            'scale(0)',
            'rotate(-45deg) translate(7px, -6px)'
        ];
        return transforms[index];
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
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            faqQuestions.forEach(q => {
                q.parentElement.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Form validation helper
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    showError(field, 'This field is required');
                } else {
                    field.classList.remove('error');
                    removeError(field);
                }
                
                // Email validation
                if (field.type === 'email' && field.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                        showError(field, 'Please enter a valid email address');
                    }
                }
                
                // Phone validation
                if (field.type === 'tel' && field.value) {
                    const phonePattern = /^[\d\s\-\(\)]+$/;
                    if (!phonePattern.test(field.value) || field.value.replace(/\D/g, '').length < 10) {
                        isValid = false;
                        field.classList.add('error');
                        showError(field, 'Please enter a valid phone number');
                    }
                }
                
                // ZIP code validation
                if (field.id === 'zip-code' && field.value) {
                    const zipPattern = /^\d{5}$/;
                    if (!zipPattern.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                        showError(field, 'Please enter a valid 5-digit ZIP code');
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Scroll to first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        // Remove error on input
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    removeError(this);
                }
            });
        });
    });
    
    // Helper functions for error handling
    function showError(field, message) {
        removeError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc2626';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '4px';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeError(field) {
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Date input validation - set min date to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        const today = new Date().toISOString().split('T')[0];
        input.setAttribute('min', today);
    });
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            } else if (value.length >= 3) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            }
            e.target.value = value;
        });
    });
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                const originalContent = this.innerHTML;
                this.innerHTML = '<div style="text-align: center; padding: 20px;"><h3>Thank you for subscribing!</h3><p>Check your email for confirmation.</p></div>';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.querySelector('input[type="email"]').value = '';
                }, 3000);
            }
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply fade animation to elements
    const animatedElements = document.querySelectorAll('.dumpster-card, .service-category, .reason, .faq-item, .step');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });
    
    // Category filtering for blog and services
    const categoryTabs = document.querySelectorAll('.category-tab');
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // Update active tab
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Filter content
                const filterableItems = document.querySelectorAll('.post-card, .service-category-content');
                filterableItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Counter animation for statistics
    const counterElements = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = entry.target;
                target.dataset.animated = 'true';
                
                const text = target.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                const suffix = text.replace(/[\d,]/g, '');
                const duration = 2000;
                const step = number / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(current).toLocaleString() + ' ' + suffix;
                }, 16);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(element => {
        counterObserver.observe(element);
    });
    
    // Quick quote form (homepage)
    const quickQuoteForm = document.querySelector('.quick-quote-form');
    if (quickQuoteForm) {
        quickQuoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                zipCode: this.querySelector('#zip-code').value,
                dumpsterSize: this.querySelector('#dumpster-size').value,
                projectType: this.querySelector('#project-type').value,
                phone: this.querySelector('#phone').value
            };
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Getting Quote...';
            submitButton.disabled = true;
            
            // Simulate API call (replace with actual implementation)
            setTimeout(() => {
                // Show success message
                this.innerHTML = '<div class="quote-success"><h3>Your Quote is Ready!</h3><p>We\'ve sent pricing information to your phone. Our team will call you shortly to confirm details.</p><a href="contact.html" class="btn btn-primary">Complete Your Booking</a></div>';
            }, 2000);
        });
    }
    
    // Size calculator (dumpster sizes page)
    const sizeCalculatorForm = document.querySelector('.calculator-form');
    if (sizeCalculatorForm) {
        const radioInputs = sizeCalculatorForm.querySelectorAll('input[type="radio"]');
        const resultSection = document.querySelector('.calculator-result');
        
        radioInputs.forEach(input => {
            input.addEventListener('change', function() {
                // Check if both selections are made
                const projectType = sizeCalculatorForm.querySelector('input[name="project-type"]:checked');
                const projectSize = sizeCalculatorForm.querySelector('input[name="project-size"]:checked');
                
                if (projectType && projectSize) {
                    // Show recommendation
                    const dumpsterRecommendation = getDumpsterRecommendation(projectType.value, projectSize.value);
                    updateRecommendedDumpster(dumpsterRecommendation);
                    resultSection.style.display = 'block';
                }
            });
        });
    }
    
    // Helper function for dumpster recommendations
    function getDumpsterRecommendation(projectType, projectSize) {
        const recommendations = {
            'residential': {
                'small': { size: 10, desc: 'Small Projects', reason: 'Perfect for garage cleanouts and small renovations' },
                'medium': { size: 20, desc: 'Medium Projects', reason: 'Ideal for whole-home cleanouts and major room renovations' },
                'large': { size: 30, desc: 'Large Projects', reason: 'Great for extensive renovations and property cleanouts' },
                'extra-large': { size: 40, desc: 'Very Large Projects', reason: 'Maximum capacity for estate cleanouts and multiple projects' }
            },
            'construction': {
                'small': { size: 20, desc: 'Small Construction', reason: 'Suitable for small residential construction and remodels' },
                'medium': { size: 30, desc: 'Medium Construction', reason: 'Perfect for new builds and major renovations' },
                'large': { size: 40, desc: 'Large Construction', reason: 'Ideal for commercial construction and major demolitions' },
                'extra-large': { size: 40, desc: 'Very Large Construction', reason: 'Multiple 40-yard containers recommended for very large projects' }
            }
            // Add more project types as needed
        };
        
        const defaultRec = { size: 20, desc: 'Standard Size', reason: 'Versatile size suitable for most projects' };
        
        if (recommendations[projectType] && recommendations[projectType][projectSize]) {
            return recommendations[projectType][projectSize];
        }
        
        // Fallback logic
        if (projectSize === 'small') return { size: 10, desc: 'Small Projects', reason: 'Compact size for limited space' };
        if (projectSize === 'medium') return { size: 20, desc: 'Medium Projects', reason: 'Most popular and versatile size' };
        if (projectSize === 'large') return { size: 30, desc: 'Large Projects', reason: 'High capacity for major projects' };
        if (projectSize === 'extra-large') return { size: 40, desc: 'Very Large Projects', reason: 'Maximum capacity available' };
        
        return defaultRec;
    }
    
    // Update recommended dumpster display
    function updateRecommendedDumpster(recommendation) {
        if (!recommendation) return;
        
        const sizeElement = document.querySelector('.dumpster-name');
        const descElement = document.querySelector('.dumpster-details p');
        const quoteLink = document.querySelector('.dumpster-details .btn-primary');
        
        if (sizeElement && descElement && quoteLink) {
            sizeElement.textContent = `${recommendation.size} Yard Dumpster`;
            descElement.textContent = recommendation.reason;
            quoteLink.href = `contact.html?size=${recommendation.size}`;
        }
    }
    
    // Service area search functionality
    const locationSearchForm = document.querySelector('.location-search-form');
    if (locationSearchForm) {
        locationSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const location = this.querySelector('#location-search').value;
            
            if (location) {
                // Redirect to contact page with location
                window.location.href = `contact.html?location=${encodeURIComponent(location)}`;
            }
        });
    }
    
    // Cookie consent (simple implementation)
    if (!localStorage.getItem('cookieConsent')) {
        // Create cookie banner (implementation depends on design requirements)
        console.log('Cookie consent banner would be shown here');
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Show loading state utility
function showLoading(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<span class="loading"></span> Loading...';
    element.disabled = true;
    return originalContent;
}

// Restore button state
function restoreButton(element, originalContent) {
    element.innerHTML = originalContent;
    element.disabled = false;
}
