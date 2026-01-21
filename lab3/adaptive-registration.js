const roleRules = {
    student: {
        minPasswordLength: 8,
        requireNumbers: true,
        requireSpecialChars: false,
        info: "Password must be at least 8 characters with numbers."
    },
    teacher: {
        minPasswordLength: 10,
        requireNumbers: true,
        requireSpecialChars: true,
        info: "Password must be at least 10 characters with numbers and special characters."
    },
    admin: {
        minPasswordLength: 12,
        requireNumbers: true,
        requireSpecialChars: true,
        requireUppercase: true,
        info: "Password must be at least 12 characters with uppercase, numbers, and special characters."
    }
};

let registrationData = {
    name: '',
    email: '',
    age: '',
    role: '',
    password: '',
    confirmPassword: '',
    skills: []
};

function validateName(name) {
    return name.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(name);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = email.split('@')[1];
    return emailRegex.test(email) && domain !== undefined;
}

function validateAge(age) {
    return age >= 18 && age <= 120;
}

function validatePassword(password, role) {
    if (!roleRules[role]) return false;
    
    const rules = roleRules[role];
    let isValid = password.length >= rules.minPasswordLength;
    
    if (rules.requireNumbers) {
        isValid = isValid && /\d/.test(password);
    }
    
    if (rules.requireSpecialChars) {
        isValid = isValid && /[!@#$%^&*]/.test(password);
    }
    
    if (rules.requireUppercase) {
        isValid = isValid && /[A-Z]/.test(password);
    }
    
    return isValid;
}

function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword && password.length > 0;
}

function getPasswordStrength(password, role) {
    const rules = roleRules[role];
    let strength = 0;
    
    if (password.length >= rules.minPasswordLength) strength++;
    if (/\d/.test(password)) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    
    if (strength <= 1) return { level: 'weak', text: 'Weak' };
    if (strength <= 2) return { level: 'medium', text: 'Medium' };
    return { level: 'strong', text: 'Strong' };
}

function handleRegistration(formData) {
    console.log('Registration Data:', formData);
    return {
        success: true,
        message: 'Registration successful!',
        data: formData
    };
}

function displayError(fieldId, message) {
    console.error(`[${fieldId}]: ${message}`);
    return {
        fieldId: fieldId,
        error: message,
        timestamp: new Date()
    };
}

function completeRegistrationValidation(data) {
    const errors = [];
    
    if (!validateName(data.name)) {
        errors.push(displayError('name', 'Name must be at least 3 characters and contain only letters.'));
    }
    
    if (!validateEmail(data.email)) {
        errors.push(displayError('email', 'Please enter a valid email address.'));
    }
    
    if (!validateAge(data.age)) {
        errors.push(displayError('age', 'Age must be between 18 and 120.'));
    }
    
    if (!data.role || !roleRules[data.role]) {
        errors.push(displayError('role', 'Please select a valid role.'));
    }
    
    if (!validatePassword(data.password, data.role)) {
        errors.push(displayError('password', roleRules[data.role].info));
    }
    
    if (!validatePasswordMatch(data.password, data.confirmPassword)) {
        errors.push(displayError('confirmPassword', 'Passwords do not match.'));
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

const testData = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
    role: 'student',
    password: 'Student123',
    confirmPassword: 'Student123',
    skills: ['JavaScript', 'HTML', 'CSS']
};

const validation = completeRegistrationValidation(testData);
console.log('Validation Result:', validation);

if (validation.isValid) {
    const result = handleRegistration(testData);
    console.log('Registration Result:', result);
} else {
    console.log('Validation failed with errors:', validation.errors);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateName,
        validateEmail,
        validateAge,
        validatePassword,
        validatePasswordMatch,
        getPasswordStrength,
        completeRegistrationValidation,
        handleRegistration,
        roleRules
    };
}