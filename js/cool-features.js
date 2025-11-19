// Cool Features for Dumpsters.com
// Dark Mode, Availability Checker, Waste Identifier, and More!

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Feature 1: Dark Mode Toggle
    // ========================================
    
    const darkModeToggle = createDarkModeToggle();
    
    function createDarkModeToggle() {
        // Create toggle button
        const toggle = document.createElement('button');
        toggle.id = 'dark-mode-toggle';
        toggle.className = 'dark-mode-toggle';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.innerHTML = `
            <svg class="sun-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
            </svg>
            <svg class="moon-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style="display: none;">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
        `;
        
        document.body.appendChild(toggle);
        
        // Check for saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            enableDarkMode();
        }
        
        // Toggle event listener
        toggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
        
        return toggle;
    }
    
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateDarkModeIcon(true);
    }
    
    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        updateDarkModeIcon(false);
    }
    
    function updateDarkModeIcon(isDark) {
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        if (sunIcon && moonIcon) {
            if (isDark) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        }
    }
    
    // ========================================
    // Feature 2: Live Availability Checker
    // ========================================
    
    function createAvailabilityChecker() {
        const checkerContainer = document.querySelector('.availability-checker');
        if (!checkerContainer) return;
        
        const zipInput = checkerContainer.querySelector('#availability-zip');
        const checkBtn = checkerContainer.querySelector('#check-availability');
        const resultDiv = checkerContainer.querySelector('.availability-result');
        
        if (!zipInput || !checkBtn || !resultDiv) return;
        
        checkBtn.addEventListener('click', () => {
            const zip = zipInput.value.trim();
            
            if (!/^\d{5}$/.test(zip)) {
                showAvailabilityResult('error', 'Please enter a valid 5-digit ZIP code');
                return;
            }
            
            // Show loading state
            checkBtn.disabled = true;
            checkBtn.textContent = 'Checking...';
            
            // Simulate API call (in production, this would be a real API)
            setTimeout(() => {
                const isAvailable = Math.random() > 0.1; // 90% availability simulation
                const nextAvailable = isAvailable ? 'Today' : 'Tomorrow';
                const dumpsters = Math.floor(Math.random() * 8) + 3; // 3-10 dumpsters
                
                if (isAvailable) {
                    showAvailabilityResult('success', 
                        `✅ Great news! We have ${dumpsters} dumpsters available in your area. Next available delivery: ${nextAvailable}`
                    );
                } else {
                    showAvailabilityResult('warning', 
                        `⚠️ High demand in your area. Next available delivery: ${nextAvailable}. Reserve now to guarantee your spot!`
                    );
                }
                
                checkBtn.disabled = false;
                checkBtn.textContent = 'Check Availability';
            }, 1500);
        });
        
        // Allow Enter key to trigger check
        zipInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkBtn.click();
            }
        });
    }
    
    function showAvailabilityResult(type, message) {
        const resultDiv = document.querySelector('.availability-result');
        if (!resultDiv) return;
        
        const colors = {
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = colors[type] + '20';
        resultDiv.style.borderLeft = `4px solid ${colors[type]}`;
        resultDiv.style.padding = '16px';
        resultDiv.style.marginTop = '16px';
        resultDiv.style.borderRadius = '4px';
        resultDiv.textContent = message;
        
        // Animate in
        resultDiv.style.opacity = '0';
        resultDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            resultDiv.style.transition = 'all 0.3s ease';
            resultDiv.style.opacity = '1';
            resultDiv.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // Initialize availability checker if element exists
    createAvailabilityChecker();
    
    // ========================================
    // Feature 3: Waste Type Identifier Quiz
    // ========================================
    
    function initWasteIdentifier() {
        const quizContainer = document.querySelector('.waste-identifier-quiz');
        if (!quizContainer) return;
        
        const questions = [
            {
                question: "What type of project are you working on?",
                options: [
                    { text: "Home Cleanout", value: "residential", icon: "🏠" },
                    { text: "Construction/Demolition", value: "construction", icon: "🏗️" },
                    { text: "Landscaping/Yard Work", value: "landscaping", icon: "🌳" },
                    { text: "Renovation", value: "renovation", icon: "🔨" }
                ]
            },
            {
                question: "How much waste do you estimate?",
                options: [
                    { text: "A few pickup truck loads", value: "small", icon: "📦" },
                    { text: "Half a garage worth", value: "medium", icon: "📦📦" },
                    { text: "Full garage or more", value: "large", icon: "📦📦📦" },
                    { text: "Entire house worth", value: "xlarge", icon: "📦📦📦📦" }
                ]
            }
        ];
        
        let currentQuestion = 0;
        let answers = {};
        
        function showQuestion(index) {
            const q = questions[index];
            const html = `
                <div class="quiz-question" style="animation: slideIn 0.3s ease;">
                    <h3 style="margin-bottom: 20px; color: #333;">${q.question}</h3>
                    <div class="quiz-options" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        ${q.options.map(opt => `
                            <button class="quiz-option" data-value="${opt.value}" style="
                                padding: 20px;
                                border: 2px solid #e0e0e0;
                                border-radius: 8px;
                                background: white;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                text-align: center;
                            ">
                                <div style="font-size: 2em; margin-bottom: 10px;">${opt.icon}</div>
                                <div style="font-weight: 600;">${opt.text}</div>
                            </button>
                        `).join('')}
                    </div>
                    <div style="margin-top: 20px; color: #666;">
                        Question ${index + 1} of ${questions.length}
                    </div>
                </div>
            `;
            
            quizContainer.innerHTML = html;
            
            // Add click handlers
            quizContainer.querySelectorAll('.quiz-option').forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    this.style.borderColor = '#FF6B35';
                    this.style.backgroundColor = '#FFF5F2';
                    this.style.transform = 'translateY(-2px)';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.borderColor = '#e0e0e0';
                    this.style.backgroundColor = 'white';
                    this.style.transform = 'translateY(0)';
                });
                
                btn.addEventListener('click', function() {
                    const value = this.getAttribute('data-value');
                    answers[index] = value;
                    
                    if (currentQuestion < questions.length - 1) {
                        currentQuestion++;
                        showQuestion(currentQuestion);
                    } else {
                        showResults();
                    }
                });
            });
        }
        
        function showResults() {
            const recommendations = {
                'residential-small': { size: 10, desc: '10 Yard Dumpster', details: 'Perfect for small cleanouts' },
                'residential-medium': { size: 20, desc: '20 Yard Dumpster', details: 'Ideal for home cleanouts' },
                'residential-large': { size: 30, desc: '30 Yard Dumpster', details: 'Great for large cleanouts' },
                'construction-small': { size: 20, desc: '20 Yard Dumpster', details: 'Good for small construction' },
                'construction-medium': { size: 30, desc: '30 Yard Dumpster', details: 'Perfect for renovations' },
                'construction-large': { size: 40, desc: '40 Yard Dumpster', details: 'Best for major construction' },
                'landscaping-small': { size: 10, desc: '10 Yard Dumpster', details: 'Great for yard waste' },
                'renovation-medium': { size: 20, desc: '20 Yard Dumpster', details: 'Ideal for renovations' }
            };
            
            const key = `${answers[0]}-${answers[1]}`;
            const recommendation = recommendations[key] || { size: 20, desc: '20 Yard Dumpster', details: 'Our most popular size' };
            
            const html = `
                <div class="quiz-results" style="text-align: center; animation: fadeIn 0.5s ease;">
                    <div style="font-size: 4em; margin-bottom: 20px;">🎯</div>
                    <h2 style="color: #FF6B35; margin-bottom: 15px;">We Recommend:</h2>
                    <h3 style="font-size: 2.5em; margin-bottom: 10px;">${recommendation.desc}</h3>
                    <p style="font-size: 1.2em; color: #666; margin-bottom: 30px;">${recommendation.details}</p>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <a href="contact.html?size=${recommendation.size}" class="btn btn-primary btn-large">Get a Quote</a>
                        <button class="btn btn-outline" onclick="location.reload()">Start Over</button>
                    </div>
                </div>
            `;
            
            quizContainer.innerHTML = html;
        }
        
        // Start the quiz
        showQuestion(0);
    }
    
    // Initialize waste identifier if element exists
    initWasteIdentifier();
    
    // ========================================
    // Feature 4: Social Share Feature
    // ========================================
    
    function createShareButtons() {
        const shareContainers = document.querySelectorAll('.share-buttons');
        if (shareContainers.length === 0) return;
        
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        
        shareContainers.forEach(container => {
            const html = `
                <div class="share-buttons-group" style="display: flex; gap: 10px; align-items: center;">
                    <span style="font-weight: 600; margin-right: 10px;">Share:</span>
                    <button class="share-btn share-facebook" data-platform="facebook" title="Share on Facebook">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </button>
                    <button class="share-btn share-twitter" data-platform="twitter" title="Share on Twitter">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                    </button>
                    <button class="share-btn share-linkedin" data-platform="linkedin" title="Share on LinkedIn">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </button>
                    <button class="share-btn share-email" data-platform="email" title="Share via Email">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                    </button>
                    <button class="share-btn share-copy" data-platform="copy" title="Copy Link">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                        </svg>
                    </button>
                </div>
            `;
            
            container.innerHTML = html;
            
            // Add event listeners
            container.querySelectorAll('.share-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const platform = this.getAttribute('data-platform');
                    handleShare(platform, pageUrl, pageTitle);
                });
            });
        });
    }
    
    function handleShare(platform, url, title) {
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            email: `mailto:?subject=${title}&body=Check out this page: ${url}`
        };
        
        if (platform === 'copy') {
            navigator.clipboard.writeText(decodeURIComponent(url)).then(() => {
                showToast('Link copied to clipboard!');
            });
        } else if (urls[platform]) {
            window.open(urls[platform], '_blank', 'width=600,height=400');
        }
    }
    
    // Initialize share buttons
    createShareButtons();
    
    // ========================================
    // Feature 5: Recently Viewed Tracker
    // ========================================
    
    function trackRecentlyViewed() {
        const pagePath = window.location.pathname;
        const pageTitle = document.title;
        
        // Don't track certain pages
        if (pagePath.includes('contact') || pagePath.includes('privacy')) {
            return;
        }
        
        let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        
        // Add current page
        const currentPage = { path: pagePath, title: pageTitle, timestamp: Date.now() };
        
        // Remove if already exists
        recentlyViewed = recentlyViewed.filter(p => p.path !== pagePath);
        
        // Add to beginning
        recentlyViewed.unshift(currentPage);
        
        // Keep only last 5
        recentlyViewed = recentlyViewed.slice(0, 5);
        
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }
    
    function displayRecentlyViewed() {
        const container = document.querySelector('.recently-viewed-container');
        if (!container) return;
        
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        
        if (recentlyViewed.length <= 1) {
            container.style.display = 'none';
            return;
        }
        
        // Skip current page
        const pages = recentlyViewed.slice(1);
        
        const html = `
            <h3 style="margin-bottom: 15px; color: #333;">Recently Viewed</h3>
            <div class="recent-pages" style="display: flex; flex-direction: column; gap: 10px;">
                ${pages.map(page => `
                    <a href="${page.path}" style="
                        padding: 12px;
                        background: white;
                        border: 1px solid #e0e0e0;
                        border-radius: 6px;
                        text-decoration: none;
                        color: #333;
                        transition: all 0.2s ease;
                        display: block;
                    " class="recent-page-link">
                        <div style="font-weight: 600;">${page.title.split('|')[0].trim()}</div>
                        <div style="font-size: 0.85em; color: #666; margin-top: 4px;">
                            ${new Date(page.timestamp).toLocaleDateString()}
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = html;
        
        // Add hover effects
        container.querySelectorAll('.recent-page-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.borderColor = '#FF6B35';
                this.style.backgroundColor = '#FFF5F2';
            });
            link.addEventListener('mouseleave', function() {
                this.style.borderColor = '#e0e0e0';
                this.style.backgroundColor = 'white';
            });
        });
    }
    
    // Track current page
    trackRecentlyViewed();
    displayRecentlyViewed();
    
    // ========================================
    // Utility: Toast Notifications
    // ========================================
    
    function showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #333;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        // Remove after duration
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    
    // Make it globally available
    window.showToast = showToast;
    
    // ========================================
    // Feature 6: Smooth Scroll Enhancements
    // ========================================
    
    // Add smooth reveal animations to elements as they enter viewport
    function initScrollRevealAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optionally unobserve after reveal
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Apply to common elements
        const elementsToReveal = document.querySelectorAll('.dumpster-card, .service-category, .faq-item, .step, .reason, .feature-card');
        elementsToReveal.forEach((el, index) => {
            el.classList.add('reveal-element');
            el.style.animationDelay = `${index * 0.1}s`;
            revealObserver.observe(el);
        });
    }
    
    // Initialize scroll animations after a short delay to ensure DOM is ready
    setTimeout(initScrollRevealAnimations, 100);
    
    // ========================================
    // Feature 7: Back to Top Button
    // ========================================
    
    function createBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.id = 'back-to-top';
        backToTop.className = 'back-to-top-btn';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.innerHTML = `
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            </svg>
        `;
        
        document.body.appendChild(backToTop);
        
        // Show/hide based on scroll position
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }, 100);
        });
        
        // Scroll to top on click
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    createBackToTopButton();
    
    // ========================================
    // Feature 8: Enhanced Form Experience
    // ========================================
    
    // Add floating label effect to form inputs
    function enhanceFormInputs() {
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Add focus class for styling
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('input-focused');
                if (this.value) {
                    this.parentElement.classList.add('input-filled');
                } else {
                    this.parentElement.classList.remove('input-filled');
                }
            });
            
            // Check on load if already filled
            if (input.value) {
                input.parentElement.classList.add('input-filled');
            }
        });
    }
    
    enhanceFormInputs();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Scroll reveal animations */
.reveal-element {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-element.revealed {
    opacity: 1;
    transform: translateY(0);
}

/* Back to top button */
.back-to-top-btn {
    position: fixed;
    bottom: 150px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
    border: none;
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
    cursor: pointer;
    z-index: 9998;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

.back-to-top-btn.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.back-to-top-btn:hover {
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 107, 53, 0.4);
}

@media (max-width: 768px) {
    .back-to-top-btn {
        bottom: 150px;
        right: 15px;
        width: 45px;
        height: 45px;
    }
}

/* Enhanced form input styling */
.input-focused {
    position: relative;
}

.input-focused::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%);
    animation: slideIn 0.3s ease;
}
`;
document.head.appendChild(style);
