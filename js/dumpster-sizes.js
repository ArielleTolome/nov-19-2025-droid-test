// Dumpster sizes page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Size calculator functionality
    const calculatorForm = document.querySelector('.calculator-form');
    if (calculatorForm) {
        const projectTypeRadios = calculatorForm.querySelectorAll('input[name="project-type"]');
        const projectSizeRadios = calculatorForm.querySelectorAll('input[name="project-size"]');
        const resultSection = document.querySelector('.calculator-result');
        
        function updateRecommendation() {
            const selectedType = calculatorForm.querySelector('input[name="project-type"]:checked');
            const selectedSize = calculatorForm.querySelector('input[name="project-size"]:checked');
            
            if (selectedType && selectedSize && resultSection) {
                const recommendation = getDumpsterRecommendation(selectedType.value, selectedSize.value);
                displayRecommendation(recommendation);
                resultSection.style.display = 'block';
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
        
        projectTypeRadios.forEach(radio => {
            radio.addEventListener('change', updateRecommendation);
        });
        
        projectSizeRadios.forEach(radio => {
            radio.addEventListener('change', updateRecommendation);
        });
    }
    
    function getDumpsterRecommendation(projectType, projectSize) {
        const recommendations = {
            'residential': {
                'small': { size: 10, name: '10 Yard Dumpster', reason: 'Perfect for garage cleanouts and small renovations' },
                'medium': { size: 20, name: '20 Yard Dumpster', reason: 'Ideal for whole-home cleanouts and major room renovations' },
                'large': { size: 30, name: '30 Yard Dumpster', reason: 'Great for extensive renovations and property cleanouts' },
                'extra-large': { size: 40, name: '40 Yard Dumpster', reason: 'Maximum capacity for estate cleanouts and multiple projects' }
            },
            'construction': {
                'small': { size: 20, name: '20 Yard Dumpster', reason: 'Suitable for small residential construction and remodels' },
                'medium': { size: 30, name: '30 Yard Dumpster', reason: 'Perfect for new builds and major renovations' },
                'large': { size: 40, name: '40 Yard Dumpster', reason: 'Ideal for commercial construction and major demolitions' },
                'extra-large': { size: 40, name: '40 Yard Dumpster', reason: 'Multiple 40-yard containers recommended for very large projects' }
            },
            'roofing': {
                'small': { size: 10, name: '10 Yard Dumpster', reason: 'Perfect for small roofing jobs (up to 25 squares)' },
                'medium': { size: 20, name: '20 Yard Dumpster', reason: 'Ideal for medium roofing projects (25-50 squares)' },
                'large': { size: 30, name: '30 Yard Dumpster', reason: 'Great for large roofing projects (50+ squares)' },
                'extra-large': { size: 40, name: '40 Yard Dumpster', reason: 'Maximum capacity for very large commercial roofing' }
            },
            'landscaping': {
                'small': { size: 10, name: '10 Yard Dumpster', reason: 'Perfect for small yard cleanups and garden projects' },
                'medium': { size: 20, name: '20 Yard Dumpster', reason: 'Ideal for moderate yard cleanups and landscaping' },
                'large': { size: 30, name: '30 Yard Dumpster', reason: 'Great for large landscaping projects and tree removal' },
                'extra-large': { size: 40, name: '40 Yard Dumpster', reason: 'Maximum capacity for major landscaping and estate cleanup' }
            },
            'demolition': {
                'small': { size: 20, name: '20 Yard Dumpster', reason: 'Suitable for small demolition projects' },
                'medium': { size: 30, name: '30 Yard Dumpster', reason: 'Perfect for medium demolition projects' },
                'large': { size: 40, name: '40 Yard Dumpster', reason: 'Ideal for large demolition projects' },
                'extra-large': { size: 40, name: '40 Yard Dumpster', reason: 'Multiple 40-yard containers recommended for very large demolitions' }
            },
            'commercial': {
                'small': { size: 20, name: '20 Yard Dumpster', reason: 'Suitable for small commercial projects' },
                'medium': { size: 30, name: '30 Yard Dumpster', reason: 'Perfect for medium commercial renovations' },
                'large': { size: 40, name: '40 Yard Dumpster', reason: 'Ideal for large commercial construction' },
                'extra-large': { size: 40, name: '40 Yard Dumpster', reason: 'Multiple containers recommended for very large commercial projects' }
            }
        };
        
        const defaultRec = { size: 20, name: '20 Yard Dumpster', reason: 'Versatile size suitable for most projects' };
        
        if (recommendations[projectType] && recommendations[projectType][projectSize]) {
            return recommendations[projectType][projectSize];
        }
        
        return defaultRec;
    }
    
    function displayRecommendation(recommendation) {
        const nameElement = document.querySelector('.dumpster-name');
        const reasonElement = document.querySelector('.dumpster-details p');
        const quoteLink = document.querySelector('.dumpster-details .btn-primary');
        
        if (nameElement) nameElement.textContent = recommendation.name;
        if (reasonElement) reasonElement.textContent = recommendation.reason;
        if (quoteLink) quoteLink.href = `contact.html?size=${recommendation.size}`;
    }
    
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
});
