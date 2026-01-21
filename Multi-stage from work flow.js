class FormStage {
    constructor(stageNumber, title, description = '', fields = []) {
        this.stageNumber = stageNumber;
        this.title = title;
        this.description = description;
        this.fields = fields;
        this.isValid = false;
    }
    
    addField(field) {
        this.fields.push(field);
        return this;
    }
    
    validate(formData) {
        const errors = {};
        let stageIsValid = true;
        
        this.fields.forEach(field => {
            const fieldValidation = field.validate(formData[field.id]);
            
            if (!fieldValidation.valid) {
                errors[field.id] = fieldValidation.message;
                stageIsValid = false;
            }
        });
        
        this.isValid = stageIsValid;
        return {
            valid: stageIsValid,
            errors: errors
        };
    }
}

class FormField {
    constructor(id, label, type = 'text', options = {}) {
        this.id = id;
        this.label = label;
        this.type = type; 
        this.required = options.required !== false;
        this.minLength = options.minLength || 0;
        this.maxLength = options.maxLength || null;
        this.pattern = options.pattern || null;
        this.choices = options.choices || [];
        this.value = '';
    }
    
    validate(value) {
        if (this.required && (!value || value.trim() === '')) {
            return {
                valid: false,
                message: `${this.label} is required`
            };
        }
        
        if (!value) return { valid: true };
        
        switch (this.type) {
            case 'text':
                return this.validateText(value);
            case 'email':
                return this.validateEmail(value);
            case 'tel':
                return this.validatePhone(value);
            case 'select':
                return this.validateSelect(value);
            case 'checkbox':
                return this.validateCheckbox(value);
            case 'textarea':
                return this.validateTextarea(value);
            default:
                return { valid: true };
        }
    }
    
    validateText(value) {
        const trimmed = value.trim();
        
        if (this.minLength && trimmed.length < this.minLength) {
            return {
                valid: false,
                message: `${this.label} must be at least ${this.minLength} characters`
            };
        }
        
        if (this.maxLength && trimmed.length > this.maxLength) {
            return {
                valid: false,
                message: `${this.label} must not exceed ${this.maxLength} characters`
            };
        }
        
        if (this.pattern && !new RegExp(this.pattern).test(trimmed)) {
            return {
                valid: false,
                message: `${this.label} format is invalid`
            };
        }
        
        return { valid: true };
    }
    
    validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(value)) {
            return {
                valid: false,
                message: `${this.label} must be a valid email address`
            };
        }
        
        return { valid: true };
    }
    
    validatePhone(value) {
        const phoneRegex = /^\d{10}$/;
        const digitsOnly = value.replace(/\D/g, '');
        
        if (!phoneRegex.test(digitsOnly)) {
            return {
                valid: false,
                message: `${this.label} must be 10 digits`
            };
        }
        
        return { valid: true };
    }
    
    validateSelect(value) {
        if (!value || value === '') {
            return {
                valid: false,
                message: `Please select a ${this.label}`
            };
        }
        
        return { valid: true };
    }
    
    validateCheckbox(value) {
        if (!value || value.length === 0) {
            return {
                valid: false,
                message: `Please select at least one ${this.label}`
            };
        }
        
        return { valid: true };
    }
    
    validateTextarea(value) {
        const trimmed = value.trim();
        
        if (this.minLength && trimmed.length < this.minLength) {
            return {
                valid: false,
                message: `${this.label} must be at least ${this.minLength} characters`
            };
        }
        
        if (this.maxLength && trimmed.length > this.maxLength) {
            return {
                valid: false,
                message: `${this.label} must not exceed ${this.maxLength} characters`
            };
        }
        
        return { valid: true };
    }
}

class MultiStageForm {
    constructor(title = 'Multi-Stage Form') {
        this.title = title;
        this.stages = [];
        this.currentStage = 0;
        this.formData = {};
        this.validationErrors = {};
    }
    
    addStage(stage) {
        this.stages.push(stage);
        return this;
    }
    
    getCurrentStage() {
        return this.stages[this.currentStage];
    }
    
    getStage(stageNumber) {
        return this.stages[stageNumber - 1];
    }
    
    nextStage() {
        const currentStage = this.getCurrentStage();
        const validation = currentStage.validate(this.formData);
        
        if (!validation.valid) {
            this.validationErrors = validation.errors;
            return {
                success: false,
                message: 'Please fix validation errors before proceeding',
                errors: validation.errors
            };
        }
        
        if (this.currentStage < this.stages.length - 1) {
            this.currentStage++;
            this.validationErrors = {};
            
            return {
                success: true,
                message: `Moved to stage ${this.currentStage + 1}`,
                stage: this.getCurrentStage().stageNumber
            };
        }
        
        return {
            success: false,
            message: 'Already at last stage'
        };
    }
    
    previousStage() {
        if (this.currentStage > 0) {
            this.currentStage--;
            this.validationErrors = {};
            
            return {
                success: true,
                message: `Moved to stage ${this.currentStage + 1}`,
                stage: this.getCurrentStage().stageNumber
            };
        }
        
        return {
            success: false,
            message: 'Already at first stage'
        };
    }
    
    setFieldValue(fieldId, value) {
        this.formData[fieldId] = value;
        return this;
    }
    
    getFieldValue(fieldId) {
        return this.formData[fieldId] || null;
    }
    
    getAllFormData() {
        return { ...this.formData };
    }
    
    getProgress() {
        return Math.round(((this.currentStage + 1) / this.stages.length) * 100);
    }
    
    validateAllStages() {
        const allErrors = {};
        let allValid = true;
        
        this.stages.forEach((stage, index) => {
            const validation = stage.validate(this.formData);
            
            if (!validation.valid) {
                allErrors[`stage_${index + 1}`] = validation.errors;
                allValid = false;
            }
        });
        
        return {
            valid: allValid,
            errors: allErrors
        };
    }
    
    submitForm() {
        const validation = this.validateAllStages();
        
        if (!validation.valid) {
            return {
                success: false,
                message: 'Please fix all validation errors',
                errors: validation.errors
            };
        }
        
        return {
            success: true,
            message: 'Form submitted successfully',
            data: this.getAllFormData(),
            timestamp: new Date().toISOString()
        };
    }
    
    getStatus() {
        return {
            currentStage: this.currentStage + 1,
            totalStages: this.stages.length,
            progress: this.getProgress(),
            isFirstStage: this.currentStage === 0,
            isLastStage: this.currentStage === this.stages.length - 1,
            canProceed: !Object.keys(this.validationErrors).length > 0,
            formData: this.getAllFormData()
        };
    }
    
    generateSummary() {
        return {
            title: this.title,
            status: this.getStatus(),
            stages: this.stages.map((stage, index) => ({
                number: stage.stageNumber,
                title: stage.title,
                fieldCount: stage.fields.length,
                isComplete: stage.isValid
            })),
            completionPercentage: this.getProgress()
        };
    }
}

const registrationForm = new MultiStageForm('User Registration');

const stage1 = new FormStage(
    1,
    'Personal Information',
    'Let\'s start with your basic details'
);

stage1
    .addField(new FormField('firstName', 'First Name', 'text', { 
        required: true, 
        minLength: 2 
    }))
    .addField(new FormField('lastName', 'Last Name', 'text', { 
        required: true, 
        minLength: 2 
    }))
    .addField(new FormField('email', 'Email Address', 'email', { 
        required: true 
    }))
    .addField(new FormField('phone', 'Phone Number', 'tel', { 
        required: true 
    }));

const stage2 = new FormStage(
    2,
    'Address Information',
    'Where do you currently reside?'
);

stage2
    .addField(new FormField('street', 'Street Address', 'text', { 
        required: true, 
        minLength: 5 
    }))
    .addField(new FormField('city', 'City', 'text', { 
        required: true, 
        minLength: 2 
    }))
    .addField(new FormField('state', 'State/Province', 'text', { 
        required: true, 
        minLength: 2 
    }))
    .addField(new FormField('zipcode', 'Zip/Postal Code', 'text', { 
        required: true, 
        pattern: '^[a-zA-Z0-9]{5,6}$' 
    }));

const stage3 = new FormStage(
    3,
    'Your Preferences',
    'Tell us about your preferences'
);

stage3
    .addField(new FormField('interests', 'Primary Interest', 'select', { 
        required: true,
        choices: ['Technology', 'Business', 'Education', 'Health & Wellness']
    }))
    .addField(new FormField('communication', 'Communication Methods', 'checkbox', { 
        required: true,
        choices: ['Email', 'SMS', 'Phone Call']
    }))
    .addField(new FormField('bio', 'Additional Comments', 'textarea', { 
        required: false, 
        maxLength: 200 
    }));

const stage4 = new FormStage(
    4,
    'Review Your Information',
    'Please verify all details before submitting'
);

registrationForm
    .addStage(stage1)
    .addStage(stage2)
    .addStage(stage3)
    .addStage(stage4);

console.log('=== Multi-Stage Form Workflow ===\n');
console.log('Form Status:', registrationForm.getStatus());

registrationForm
    .setFieldValue('firstName', 'John')
    .setFieldValue('lastName', 'Doe')
    .setFieldValue('email', 'john@example.com')
    .setFieldValue('phone', '1234567890')
    .setFieldValue('street', '123 Main Street')
    .setFieldValue('city', 'New York')
    .setFieldValue('state', 'NY')
    .setFieldValue('zipcode', '10001')
    .setFieldValue('interests', 'Technology')
    .setFieldValue('communication', ['Email', 'SMS'])
    .setFieldValue('bio', 'I am interested in learning more about your services.');

console.log('\n=== Stage Navigation ===');
console.log('Current Stage:', registrationForm.getCurrentStage().title);

const next1 = registrationForm.nextStage();
console.log('Next Stage Result:', next1);
console.log('Current Stage:', registrationForm.getCurrentStage().title);

const next2 = registrationForm.nextStage();
console.log('Next Stage Result:', next2);

const next3 = registrationForm.nextStage();
console.log('Next Stage Result:', next3);

console.log('\n=== Form Summary ===');
console.log(JSON.stringify(registrationForm.generateSummary(), null, 2));

console.log('\n=== Form Submission ===');
const submitResult = registrationForm.submitForm();
console.log('Submission Result:', submitResult);

if (submitResult.success) {
    console.log('\nForm Data:', submitResult.data);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FormField,
        FormStage,
        MultiStageForm
    };
}