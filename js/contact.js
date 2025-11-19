// Contact page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // URL parameter handling for pre-filled form fields
    const urlParams = new URLSearchParams(window.location.search);
    
    // Pre-fill form fields from URL parameters
    function fillFormFromParams() {
        const form = document.getElementById('quote-form');
        if (!form) return;
        
        // Map URL parameter names to form field IDs
        const paramFieldMap = {
            'location': 'zip-code',
            'size': 'dumpster-size',
            'service': 'project-type',
            'phone': 'phone',
            'email': 'email'
        };
        
        // Populate fields from URL parameters
        for (const [param, fieldId] of Object.entries(paramFieldMap)) {
            const value = urlParams.get(param);
            const field = form.querySelector(`#${fieldId}`);
            
            if (value && field) {
                field.value = value;
                
                // Trigger change event for select elements
                if (field.tagName === 'SELECT') {
                    field.dispatchEvent(new Event('change'));
                }
            }
        }
        
        // Set delivery date to tomorrow by default
        const deliveryDateField = form.querySelector('#delivery-date');
        if (deliveryDateField && !deliveryDateField.value) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 2); // Add 2 days for better availability
            deliveryDateField.value = tomorrow.toISOString().split('T')[0];
        }
    }
    
    // Project type handling - show/hide specific options
    const projectTypeSelect = document.querySelector('#project-type');
    const dumpsterSizeSelect = document.querySelector('#dumpster-size');
    
    function updateDumpsterSizeRecommendations() {
        if (!dumpsterSizeSelect) return;
        
        const projectType = projectTypeSelect ? projectTypeSelect.value : '';
        
        // Clear existing options
        dumpsterSizeSelect.innerHTML = '<option value="">I\'m not sure (Help me choose)</option>';
        
        // Add size options with recommendations based on project type
        const sizeOptions = getSizeOptionsForProject(projectType);
        sizeOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            if (option.recommended) {
                optionElement.selected = true;
            }
            dumpsterSizeSelect.appendChild(optionElement);
        });
    }
    
    function getSizeOptionsForProject(projectType) {
        const commonSizes = [
            { value: '10', text: '10 Yard - Small Projects' },
            { value: '20', text: '20 Yard - Medium Projects (Most Popular)', recommended: true },
            { value: '30', text: '30 Yard - Large Projects' },
            { value: '40', text: '40 Yard - Very Large Projects' }
        ];
        
        // Custom recommendations based on project type
        const projectSizeMap = {
            'residential-cleanup': [
                { value: '10', text: '10 Yard - Small cleanouts and garage cleanup' },
                { value: '20', text: '20 Yard - Whole house cleanouts (Recommended)', recommended: true },
                { value: '30', text: '30 Yard - Estate cleanouts and large properties' }
            ],
            'kitchen-remodel': [
                { value: '10', text: '10 Yard - Small kitchen updates' },
                { value: '20', text: '20 Yard - Complete kitchen remodel (Recommended)', recommended: true },
                { value: '30', text: '30 Yard - Multiple room renovations' }
            ],
            'roofing': [
                { value: '10', text: '10 Yard - Small roofing jobs (Recommended)', recommended: true },
                { value: '20', text: '20 Yard - Medium roofing projects' },
                { value: '30', text: '30 Yard - Large commercial roofing' }
            ],
            'demolition': [
                { value: '20', text: '20 Yard - Small demolition projects' },
                { value: '30', text: '30 Yard - Medium demolition (Recommended)', recommended: true },
                { value: '40', text: '40 Yard - Large demolition projects' }
            ]
        };
        
        return projectSizeMap[projectType] || commonSizes;
    }
    
    // Heavy materials checkbox - affects size recommendations
    const heavyMaterialsCheckbox = document.querySelector('#heavy-materials');
    
    function updateSizeForHeavyMaterials() {
        if (!dumpsterSizeSelect || !heavyMaterialsCheckbox) return;
        
        const hasHeavyMaterials = heavyMaterialsCheckbox.checked;
        const projectType = projectTypeSelect ? projectTypeSelect.value : '';
        
        if (hasHeavyMaterials) {
            // For heavy materials, recommend smaller dumpsters due to weight limits
            const warningDiv = document.createElement('div');
            warningDiv.className = 'heavy-materials-warning';
            warningDiv.style.background = '#fef3c7';
            warningDiv.style.border = '1px solid #f59e0b';
            warningDiv.style.padding = '12px';
            warningDiv.style.borderRadius = '8px';
            warningDiv.style.marginTop = '8px';
            warningDiv.innerHTML = '<strong>Note:</strong> For heavy materials like concrete, shingles, or dirt, smaller dumpsters are recommended to stay within weight limits. You may need multiple containers.';
            
            // Remove existing warning if any
            const existingWarning = dumpsterSizeSelect.parentNode.querySelector('.heavy-materials-warning');
            if (existingWarning) {
                existingWarning.remove();
            }
            
            dumpsterSizeSelect.parentNode.appendChild(warningDiv);
        } else {
            // Remove warning if unchecked
            const existingWarning = dumpsterSizeSelect.parentNode.querySelector('.heavy-materials-warning');
            if (existingWarning) {
                existingWarning.remove();
            }
        }
    }
    
    // Street placement checkbox - show permit information
    const streetPlacementCheckbox = document.querySelector('#street-placement');
    
    function showPermitInformation() {
        if (!streetPlacementCheckbox) return;
        
        const needsPermit = streetPlacementCheckbox.checked;
        const permitInfoDiv = document.createElement('div');
        permitInfoDiv.className = 'permit-information';
        permitInfoDiv.style.background = '#f0f9ff';
        permitInfoDiv.style.border = '1px solid #3b82f6';
        permitInfoDiv.style.padding = '12px';
        permitInfoDiv.style.borderRadius = '8px';
        permitInfoDiv.style.marginTop = '8px';
        permitInfoDiv.innerHTML = `
            <strong>Permit Required:</strong> Since you need street placement, a municipal permit will likely be required. 
            <ul style="margin-top: 8px; margin-left: 20px; color: #6b7280;">
                <li>Permits typically cost $25-$150</li>
                <li>Processing time: 3-10 business days</li>
                <li>We can help you with the permit process</li>
            </ul>
        `;
        
        // Find the checkbox group and add/remove permit info
        const checkboxGroup = streetPlacementCheckbox.closest('.checkbox-group');
        const existingInfo = checkboxGroup.querySelector('.permit-information');
        
        if (needsPermit && !existingInfo) {
            checkboxGroup.appendChild(permitInfoDiv);
        } else if (!needsPermit && existingInfo) {
            existingInfo.remove();
        }
    }
    
    // Form submission handling
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const isValid = validateQuoteForm();
            if (!isValid) return;
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalContent = submitButton.innerHTML;
            
            // Collect form data
            const formData = {
                firstName: document.querySelector('#first-name').value,
                lastName: document.querySelector('#last-name').value,
                company: document.querySelector('#company').value,
                phone: document.querySelector('#phone').value,
                email: document.querySelector('#email').value,
                zipCode: document.querySelector('#zip-code').value,
                projectType: document.querySelector('#project-type').value,
                dumpsterSize: document.querySelector('#dumpster-size').value,
                deliveryDate: document.querySelector('#delivery-date').value,
                deliveryAddress: document.querySelector('#delivery-address').value,
                deliveryInstructions: document.querySelector('#delivery-instructions').value,
                projectDescription: document.querySelector('#project-description').value,
                streetPlacement: document.querySelector('#street-placement').checked,
                heavyMaterials: document.querySelector('#heavy-materials').checked,
                multipleDumpsters: document.querySelector('#multiple-dumpsters').checked,
                urgency: document.querySelector('#urgency').checked,
                contactConsent: document.querySelector('#contact-consent').checked,
                newsletter: document.querySelector('#newsletter').checked
            };
            
            // Show submitting state
            submitButton.innerHTML = '<span class="loading"></span> Submitting...';
            submitButton.disabled = true;
            
            // Simulate API call (replace with actual backend integration)
            setTimeout(() => {
                // Show success message
                const successMessage = createSuccessMessage(formData);
                this.parentNode.innerHTML = successMessage;
                
                // Scroll to top of success message
                this.parentNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Track conversion (analytics integration)
                if (typeof gtag === 'function') {
                    gtag('event', 'form_submit', {
                        'event_category': 'Quote Request',
                        'event_label': formData.projectType
                    });
                }
                
            }, 2000); // Simulate 2 second processing
        });
    }
    
    function validateQuoteForm() {
        let isValid = true;
        const requiredFields = quoteForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showFieldError(field, 'This field is required');
            } else {
                hideFieldError(field);
            }
        });
        
        // Validate specific field types
        const emailField = quoteForm.querySelector('#email');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                showFieldError(emailField, 'Please enter a valid email address');
            }
        }
        
        const zipCodeField = quoteForm.querySelector('#zip-code');
        if (zipCodeField && zipCodeField.value) {
            const zipRegex = /^\d{5}$/;
            if (!zipRegex.test(zipCodeField.value)) {
                isValid = false;
                showFieldError(zipCodeField, 'Please enter a valid 5-digit ZIP code');
            }
        }
        
        const phoneField = quoteForm.querySelector('#phone');
        if (phoneField && phoneField.value) {
            const phoneDigits = phoneField.value.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                isValid = false;
                showFieldError(phoneField, 'Please enter a valid 10-digit phone number');
            }
        }
        
        // Validate delivery date is not in the past
        const deliveryDateField = quoteForm.querySelector('#delivery-date');
        if (deliveryDateField && deliveryDateField.value) {
            const selectedDate = new Date(deliveryDateField.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                isValid = false;
                showFieldError(deliveryDateField, 'Delivery date cannot be in the past');
            }
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        hideFieldError(field); // Remove existing error
        
        field.classList.add('error');
        field.style.borderColor = '#dc2626';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc2626';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '4px';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function hideFieldError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function createSuccessMessage(formData) {
        return `
            <div class="success-message" style="text-align: center; padding: 40px;">
                <div class="success-icon" style="width: 80px; height: 80px; background: #10b981; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                    <svg style="width: 40px; height: 40px;" fill="white" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                </div>
                <h2 style="color: #1f2937; margin-bottom: 16px;">Thank You, ${formData.firstName}!</h2>
                <p style="color: #6b7280; margin-bottom: 24px;">Your quote request has been received successfully. One of our dumpster specialists will contact you within 2 hours to discuss your ${formData.projectType} project.</p>
                
                <div class="quote-summary" style="background: #f9fafb; padding: 24px; border-radius: 8px; margin-bottom: 32px; text-align: left;">
                    <h3 style="margin-bottom: 16px;">Request Summary:</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 14px;">
                        <div><strong>Service Area:</strong> ${formData.zipCode}</div>
                        <div><strong>Project Type:</strong> ${formatProjectType(formData.projectType)}</div>
                        <div><strong>Preferred Size:</strong> ${formData.dumpsterSize ? formData.dumpsterSize + ' Yard' : 'Not specified'}</div>
                        <div><strong>Delivery Date:</strong> ${formatDate(formData.deliveryDate)}</div>
                        <div><strong>Phone:</strong> ${formData.phone}</div>
                        <div><strong>Email:</strong> ${formData.email}</div>
                    </div>
                </div>
                
                <div class="next-steps" style="margin-bottom: 32px;">
                    <h3 style="margin-bottom: 12px;">What Happens Next?</h3>
                    <div style="text-align: left; max-width: 500px; margin: 0 auto;">
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                            <div style="width: 32px; height: 32px; background: #2563eb; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-weight: bold;">1</div>
                            <div>Our team reviews your request and checks availability</div>
                        </div>
                        <div style="display: flex; align-items: center; margin-bottom: 12px;">
                            <div style="width: 32px; height: 32px; background: #2563eb; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-weight: bold;">2</div>
                            <div>You'll receive a detailed quote with pricing and options</div>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 32px; height: 32px; background: #2563eb; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin-right: 12px; font-weight: bold;">3</div>
                            <div>Confirm your booking and schedule delivery</div>
                        </div>
                    </div>
                </div>
                
                <div class="contact-info" style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                    <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
                    <p style="margin: 8px 0;">Call us directly: <a href="tel:888-478-3867" style="color: #2563eb; font-weight: bold;">888-478-DUMP (3867)</a></p>
                    <p style="margin: 0;">Mention your quote request for faster service.</p>
                </div>
                
                <div style="font-size: 14px; color: #9ca3af;">
                    <p>A confirmation email has been sent to ${formData.email}</p>
                </div>
            </div>
        `;
    }
    
    function formatProjectType(projectType) {
        return projectType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    // Initialize event listeners
    function initializeContactForm() {
        // Pre-fill from URL parameters
        fillFormFromParams();
        
        // Set up event listeners
        if (projectTypeSelect) {
            projectTypeSelect.addEventListener('change', updateDumpsterSizeRecommendations);
        }
        
        if (heavyMaterialsCheckbox) {
            heavyMaterialsCheckbox.addEventListener('change', updateSizeForHeavyMaterials);
        }
        
        if (streetPlacementCheckbox) {
            streetPlacementCheckbox.addEventListener('change', showPermitInformation);
        }
        
        // Initialize size recommendations
        updateDumpsterSizeRecommendations();
    }
    
    // Run initialization
    initializeContactForm();
});
