class Question {
    constructor(id, text, type, options = {}) {
        this.id = id;
        this.text = text;
        this.type = type; 
        this.required = options.required !== false;
        this.minLength = options.minLength || 0;
        this.maxLength = options.maxLength || null;
        this.minSelections = options.minSelections || 1;
        this.choices = options.choices || [];
        this.value = null;
    }
}

class Survey {
    constructor(title, description = '') {
        this.title = title;
        this.description = description;
        this.questions = [];
        this.responses = {};
    }
    
    addQuestion(question) {
        this.questions.push(question);
        this.responses[question.id] = null;
        return this;
    }
    
    validateText(value, minLen, maxLen) {
        const trimmed = value.trim();
        
        if (minLen && trimmed.length < minLen) {
            return {
                valid: false,
                message: `Minimum ${minLen} characters required`
            };
        }
        
        if (maxLen && trimmed.length > maxLen) {
            return {
                valid: false,
                message: `Maximum ${maxLen} characters allowed`
            };
        }
        
        return { valid: true };
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            return {
                valid: false,
                message: 'Please enter a valid email address'
            };
        }
        
        return { valid: true };
    }
    
    validateRadio(value) {
        if (!value) {
            return {
                valid: false,
                message: 'Please select one option'
            };
        }
        
        return { valid: true };
    }
    
    validateCheckbox(selectedValues, minRequired) {
        if (selectedValues.length < minRequired) {
            return {
                valid: false,
                message: `Please select at least ${minRequired} option(s)`
            };
        }
        
        return { valid: true };
    }
    
    validateTextarea(value, minLen, maxLen) {
        const trimmed = value.trim();
        
        if (minLen && trimmed.length < minLen) {
            return {
                valid: false,
                message: `Minimum ${minLen} characters required`
            };
        }
        
        if (maxLen && trimmed.length > maxLen) {
            return {
                valid: false,
                message: `Maximum ${maxLen} characters allowed`
            };
        }
        
        return { valid: true };
    }
    
    validateQuestion(questionId, value) {
        const question = this.questions.find(q => q.id === questionId);
        
        if (!question) {
            return { valid: false, message: 'Question not found' };
        }
        
        if (question.required && !value) {
            return { valid: false, message: 'This field is required' };
        }
        
        switch (question.type) {
            case 'text':
                return this.validateText(value, question.minLength, question.maxLength);
                
            case 'email':
                return value ? this.validateEmail(value) : { valid: !question.required };
                
            case 'radio':
                return this.validateRadio(value);
                
            case 'checkbox':
                return this.validateCheckbox(value || [], question.minSelections);
                
            case 'textarea':
                return this.validateTextarea(value, question.minLength, question.maxLength);
                
            default:
                return { valid: true };
        }
    }
    
    validateAllResponses() {
        const errors = {};
        let isValid = true;
        
        this.questions.forEach(question => {
            const validation = this.validateQuestion(question.id, this.responses[question.id]);
            
            if (!validation.valid) {
                errors[question.id] = validation.message;
                isValid = false;
            }
        });
        
        return {
            isValid,
            errors
        };
    }
    
    setResponse(questionId, value) {
        if (this.responses.hasOwnProperty(questionId)) {
            this.responses[questionId] = value;
        }
        return this;
    }
    
    getResponse(questionId) {
        return this.responses[questionId];
    }
    
    getAllResponses() {
        return {
            title: this.title,
            timestamp: new Date().toISOString(),
            responses: this.responses
        };
    }
    
    submitSurvey() {
        const validation = this.validateAllResponses();
        
        if (!validation.isValid) {
            return {
                success: false,
                errors: validation.errors,
                message: 'Please fix validation errors'
            };
        }
        
        return {
            success: true,
            message: 'Survey submitted successfully',
            data: this.getAllResponses()
        };
    }
}

const customerSurvey = new Survey(
    'Customer Feedback Survey',
    'Please answer all questions to complete the survey'
);

customerSurvey.addQuestion(
    new Question('q1_name', 'What is your name?', 'text', {
        required: true,
        minLength: 3,
        maxLength: 50
    })
);

customerSurvey.addQuestion(
    new Question('q2_email', 'Your email address', 'email', {
        required: true
    })
);

customerSurvey.addQuestion(
    new Question('q3_satisfaction', 'How satisfied are you with our service?', 'radio', {
        required: true,
        choices: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied']
    })
);

customerSurvey.addQuestion(
    new Question('q4_services', 'Which services did you use? (Select at least 2)', 'checkbox', {
        required: true,
        minSelections: 2,
        choices: ['Product Delivery', 'Customer Support', 'Returns & Refunds', 'Warranty Service']
    })
);

customerSurvey.addQuestion(
    new Question('q5_feedback', 'Please share your feedback', 'textarea', {
        required: true,
        minLength: 10,
        maxLength: 500
    })
);

console.log('=== Survey: Customer Feedback ===\n');

customerSurvey.setResponse('q1_name', 'John Doe');
customerSurvey.setResponse('q2_email', 'john@example.com');
customerSurvey.setResponse('q3_satisfaction', 'Very Satisfied');
customerSurvey.setResponse('q4_services', ['Product Delivery', 'Customer Support']);
customerSurvey.setResponse('q5_feedback', 'Great experience with your service. Would recommend to others!');

const result = customerSurvey.submitSurvey();
console.log('Submission Result:', result);

if (result.success) {
    console.log('\nSurvey Data:', JSON.stringify(result.data, null, 2));
}

console.log('\n=== Testing Validation Errors ===\n');

const testSurvey = new Survey('Test Survey');
testSurvey.addQuestion(
    new Question('test_q1', 'Name', 'text', { required: true, minLength: 5 })
);
testSurvey.addQuestion(
    new Question('test_q2', 'Email', 'email', { required: true })
);

testSurvey.setResponse('test_q1', 'Jo'); 
testSurvey.setResponse('test_q2', 'invalid-email');

const errorResult = testSurvey.submitSurvey();
console.log('Validation Errors:', errorResult.errors);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Question,
        Survey
    };
}
