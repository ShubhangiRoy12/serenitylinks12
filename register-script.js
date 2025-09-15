// SerenityLinks Registration JavaScript

// Global variables
let currentStep = 1;
let totalSteps = 5;
let formData = {};
let currentQuestionIndex = 0;
let quizAnswers = {};
let digitalBodyLanguageData = {};

// Personality quiz questions
const personalityQuestions = [
    {
        id: 'social_energy',
        question: "In social situations, you tend to:",
        options: [
            { text: "Feel energized by being around people", value: 'E', weight: 2 },
            { text: "Prefer smaller, intimate conversations", value: 'I', weight: 2 },
            { text: "Enjoy meeting new people regularly", value: 'E', weight: 1 },
            { text: "Need quiet time to recharge after socializing", value: 'I', weight: 1 }
        ]
    },
    {
        id: 'information_processing',
        question: "When learning something new, you prefer to:",
        options: [
            { text: "Focus on concrete facts and details", value: 'S', weight: 2 },
            { text: "See the big picture and possibilities", value: 'N', weight: 2 },
            { text: "Learn through hands-on experience", value: 'S', weight: 1 },
            { text: "Explore theoretical concepts and ideas", value: 'N', weight: 1 }
        ]
    },
    {
        id: 'decision_making',
        question: "When making important decisions, you usually:",
        options: [
            { text: "Analyze facts and logical consequences", value: 'T', weight: 2 },
            { text: "Consider how it affects people's feelings", value: 'F', weight: 2 },
            { text: "Look for the most efficient solution", value: 'T', weight: 1 },
            { text: "Think about personal values and relationships", value: 'F', weight: 1 }
        ]
    },
    {
        id: 'lifestyle_approach',
        question: "Your ideal lifestyle is:",
        options: [
            { text: "Well-organized with clear plans", value: 'J', weight: 2 },
            { text: "Flexible and spontaneous", value: 'P', weight: 2 },
            { text: "Having structure but room for changes", value: 'J', weight: 1 },
            { text: "Going with the flow and adapting", value: 'P', weight: 1 }
        ]
    },
    {
        id: 'stress_response',
        question: "When you're stressed, you typically:",
        options: [
            { text: "Talk it through with friends or family", value: 'E', weight: 1 },
            { text: "Spend time alone to process your thoughts", value: 'I', weight: 1 },
            { text: "Focus on practical solutions", value: 'S', weight: 1 },
            { text: "Look for creative alternatives", value: 'N', weight: 1 }
        ]
    },
    {
        id: 'communication_style',
        question: "In conversations, you tend to:",
        options: [
            { text: "Be direct and straightforward", value: 'T', weight: 1 },
            { text: "Be tactful and considerate", value: 'F', weight: 1 },
            { text: "Share personal experiences and feelings", value: 'F', weight: 1 },
            { text: "Focus on ideas and concepts", value: 'T', weight: 1 }
        ]
    },
    {
        id: 'work_preference',
        question: "You work best when:",
        options: [
            { text: "Following a clear schedule and deadlines", value: 'J', weight: 1 },
            { text: "Having flexibility in timing and approach", value: 'P', weight: 1 },
            { text: "Working on multiple projects simultaneously", value: 'P', weight: 1 },
            { text: "Focusing on one task at a time", value: 'J', weight: 1 }
        ]
    },
    {
        id: 'problem_solving',
        question: "When facing a problem, you:",
        options: [
            { text: "Break it down into manageable steps", value: 'S', weight: 1 },
            { text: "Brainstorm creative solutions", value: 'N', weight: 1 },
            { text: "Consider past experiences for guidance", value: 'S', weight: 1 },
            { text: "Imagine future possibilities", value: 'N', weight: 1 }
        ]
    },
    {
        id: 'emotional_expression',
        question: "You express your emotions:",
        options: [
            { text: "Openly and easily", value: 'F', weight: 1 },
            { text: "After careful consideration", value: 'T', weight: 1 },
            { text: "Through actions rather than words", value: 'T', weight: 1 },
            { text: "Through creative or artistic means", value: 'F', weight: 1 }
        ]
    },
    {
        id: 'future_planning',
        question: "Regarding the future, you:",
        options: [
            { text: "Like to plan ahead and set goals", value: 'J', weight: 1 },
            { text: "Prefer to keep options open", value: 'P', weight: 1 },
            { text: "Focus on immediate opportunities", value: 'P', weight: 1 },
            { text: "Work toward long-term objectives", value: 'J', weight: 1 }
        ]
    }
];

// Personality type descriptions
const personalityTypes = {
    'ENFJ': {
        title: 'The Protagonist',
        emoji: '🌟',
        description: 'Charismatic and inspiring leaders, able to mesmerize listeners with their warmth and empathy.',
        traits: ['Empathetic', 'Inspiring', 'Charismatic', 'Organized'],
        color: '#ff69b4'
    },
    'ENFP': {
        title: 'The Campaigner',
        emoji: '🌈',
        description: 'Enthusiastic, creative and sociable free spirits, who always find a reason to smile.',
        traits: ['Creative', 'Enthusiastic', 'Spontaneous', 'Social'],
        color: '#ff6b6b'
    },
    'ENTJ': {
        title: 'The Commander',
        emoji: '👑',
        description: 'Bold, imaginative and strong-willed leaders who find a way or make one.',
        traits: ['Leadership', 'Strategic', 'Confident', 'Ambitious'],
        color: '#4ecdc4'
    },
    'ENTP': {
        title: 'The Debater',
        emoji: '💡',
        description: 'Smart and curious thinkers who love intellectual challenges and new ideas.',
        traits: ['Innovative', 'Curious', 'Adaptable', 'Quick-thinking'],
        color: '#45b7d1'
    },
    'ESFJ': {
        title: 'The Consul',
        emoji: '💖',
        description: 'Extraordinarily caring, social and popular people, always eager to help others.',
        traits: ['Caring', 'Social', 'Loyal', 'Practical'],
        color: '#f093fb'
    },
    'ESFP': {
        title: 'The Entertainer',
        emoji: '🎭',
        description: 'Spontaneous, energetic and enthusiastic people who light up any room.',
        traits: ['Spontaneous', 'Energetic', 'Fun-loving', 'Flexible'],
        color: '#feca57'
    },
    'ESTJ': {
        title: 'The Executive',
        emoji: '📊',
        description: 'Excellent administrators who are natural organizers and leaders.',
        traits: ['Organized', 'Practical', 'Reliable', 'Decisive'],
        color: '#26de81'
    },
    'ESTP': {
        title: 'The Entrepreneur',
        emoji: '🚀',
        description: 'Bold and practical experimenters, masters of all kinds of tools.',
        traits: ['Bold', 'Practical', 'Energetic', 'Perceptive'],
        color: '#fd79a8'
    },
    'INFJ': {
        title: 'The Advocate',
        emoji: '🔮',
        description: 'Creative and insightful, inspired and independent perfectionists.',
        traits: ['Insightful', 'Creative', 'Idealistic', 'Organized'],
        color: '#a29bfe'
    },
    'INFP': {
        title: 'The Mediator',
        emoji: '🌸',
        description: 'Poetic, kind and altruistic people, always eager to help a good cause.',
        traits: ['Idealistic', 'Creative', 'Empathetic', 'Flexible'],
        color: '#fd79a8'
    },
    'INTJ': {
        title: 'The Architect',
        emoji: '🏗️',
        description: 'Imaginative and strategic thinkers, with a plan for everything.',
        traits: ['Strategic', 'Independent', 'Analytical', 'Determined'],
        color: '#6c5ce7'
    },
    'INTP': {
        title: 'The Thinker',
        emoji: '🤔',
        description: 'Innovative inventors with an unquenchable thirst for knowledge.',
        traits: ['Analytical', 'Curious', 'Flexible', 'Independent'],
        color: '#00b894'
    },
    'ISFJ': {
        title: 'The Protector',
        emoji: '🛡️',
        description: 'Very dedicated and warm protectors, always ready to defend loved ones.',
        traits: ['Supportive', 'Reliable', 'Patient', 'Loyal'],
        color: '#00cec9'
    },
    'ISFP': {
        title: 'The Adventurer',
        emoji: '🦋',
        description: 'Flexible and charming artists, always ready to explore new possibilities.',
        traits: ['Artistic', 'Flexible', 'Gentle', 'Passionate'],
        color: '#e17055'
    },
    'ISTJ': {
        title: 'The Logistician',
        emoji: '📋',
        description: 'Practical and fact-minded, reliable and responsible individuals.',
        traits: ['Responsible', 'Practical', 'Thorough', 'Loyal'],
        color: '#0984e3'
    },
    'ISTP': {
        title: 'The Virtuoso',
        emoji: '🔧',
        description: 'Bold and practical experimenters, masters of all kinds of tools.',
        traits: ['Practical', 'Observant', 'Adaptable', 'Independent'],
        color: '#00b894'
    }
};

// Emotional keywords for sentiment analysis
const emotionalKeywords = {
    sad: [
        'sad', 'depressed', 'hurt', 'pain', 'lonely', 'empty', 'hopeless', 
        'worthless', 'hate myself', 'kill myself', 'end it all', 'suicide',
        'can\'t go on', 'nobody cares', 'give up', 'tired of living',
        'self harm', 'cut myself', 'harm myself', 'dying', 'dead inside',
        'miserable', 'devastated', 'broken', 'shattered', 'lost'
    ],
    anxious: [
        'anxious', 'worried', 'scared', 'panic', 'stressed', 'overwhelmed',
        'can\'t breathe', 'heart racing', 'nervous', 'afraid', 'terrified',
        'paranoid', 'restless', 'uneasy', 'tension', 'fear'
    ],
    angry: [
        'angry', 'furious', 'rage', 'hate', 'frustrated', 'annoyed',
        'irritated', 'mad', 'pissed', 'livid', 'outraged', 'resentful'
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeRegistration();
    setupEventListeners();
    setupSentimentAnalysis();
    createFloatingElements();
});

// Initialize registration process
function initializeRegistration() {
    console.log('🌸 SerenityLinks Registration initialized');
    
    // Load quiz questions
    loadQuizQuestions();
    
    // Update progress
    updateProgress();
    
    // Add welcome animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}

// Setup event listeners
function setupEventListeners() {
    const nextStepBtn = document.getElementById('nextStep');
    const prevStepBtn = document.getElementById('prevStep');
    const submitBtn = document.getElementById('submitForm');
    const form = document.getElementById('registrationForm');
    
    // Navigation buttons
    nextStepBtn.addEventListener('click', nextStep);
    prevStepBtn.addEventListener('click', prevStep);
    
    // Form submission
    form.addEventListener('submit', handleFormSubmission);
    
    // Real-time validation
    setupRealTimeValidation();
    
    // Digital body language tracking
    setupDigitalBodyLanguageTracking();
    
    // Quiz navigation
    setupQuizNavigation();
}

// Setup real-time form validation
function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.type === 'password') {
                updatePasswordStrength(input);
            }
            clearFieldValidation(input);
        });
    });
}

// Setup sentiment analysis for form inputs
function setupSentimentAnalysis() {
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    
    textInputs.forEach(input => {
        input.addEventListener('input', function() {
            analyzeTextSentiment(this.value, this);
        });
        
        // Track typing patterns for digital body language
        input.addEventListener('keydown', function(e) {
            trackDigitalBodyLanguage(e, this);
        });
    });
}

// Setup digital body language tracking
function setupDigitalBodyLanguageTracking() {
    const allInputs = document.querySelectorAll('input, textarea, select');
    
    allInputs.forEach(input => {
        const fieldName = input.name || input.id;
        if (!digitalBodyLanguageData[fieldName]) {
            digitalBodyLanguageData[fieldName] = {
                keystrokes: [],
                pauses: [],
                corrections: 0,
                hesitations: 0,
                startTime: null,
                totalTime: 0
            };
        }
        
        input.addEventListener('focus', () => {
            digitalBodyLanguageData[fieldName].startTime = Date.now();
        });
        
        input.addEventListener('blur', () => {
            if (digitalBodyLanguageData[fieldName].startTime) {
                digitalBodyLanguageData[fieldName].totalTime += 
                    Date.now() - digitalBodyLanguageData[fieldName].startTime;
            }
        });
    });
}

// Track digital body language patterns
function trackDigitalBodyLanguage(event, inputElement) {
    const fieldName = inputElement.name || inputElement.id;
    const timestamp = Date.now();
    
    if (!digitalBodyLanguageData[fieldName]) return;
    
    const fieldData = digitalBodyLanguageData[fieldName];
    const lastKeystroke = fieldData.keystrokes[fieldData.keystrokes.length - 1];
    
    if (lastKeystroke) {
        const timeBetweenKeys = timestamp - lastKeystroke.timestamp;
        
        // Detect hesitation (long pauses)
        if (timeBetweenKeys > 2000) {
            fieldData.pauses.push({
                duration: timeBetweenKeys,
                position: inputElement.selectionStart
            });
            
            fieldData.hesitations++;
            
            // Show gentle encouragement for long hesitation
            if (timeBetweenKeys > 5000) {
                showEncouragementMessage();
            }
        }
        
        // Detect corrections (backspace usage)
        if (event.key === 'Backspace' || event.key === 'Delete') {
            fieldData.corrections++;
        }
    }
    
    fieldData.keystrokes.push({
        key: event.key,
        timestamp: timestamp,
        position: inputElement.selectionStart
    });
}

// Analyze text for emotional content
function analyzeTextSentiment(text, inputElement) {
    const lowerText = text.toLowerCase();
    
    for (const [emotion, keywords] of Object.entries(emotionalKeywords)) {
        const foundKeywords = keywords.filter(keyword => lowerText.includes(keyword));
        
        if (foundKeywords.length > 0) {
            showSupportMessage(emotion, foundKeywords, inputElement);
            break;
        }
    }
}

// Show support message for users in distress
function showSupportMessage(emotionType, keywords, inputElement) {
    if (inputElement.supportShown) return;
    inputElement.supportShown = true;
    
    const supportMessages = {
        sad: {
            icon: '💙',
            title: 'We\'re here for you',
            message: 'We noticed you might be going through a difficult time. Remember, you\'re valued and not alone.',
            resources: 'Would you like to connect with mental health resources?'
        },
        anxious: {
            icon: '🌸',
            title: 'Take a breath',
            message: 'Feeling overwhelmed is okay. Let\'s take this one step at a time.',
            resources: 'Try our guided breathing exercise?'
        },
        angry: {
            icon: '💆‍♀️',
            title: 'Let\'s find calm',
            message: 'Strong emotions are valid. Let\'s work through this together.',
            resources: 'Would you like some calming techniques?'
        }
    };
    
    const config = supportMessages[emotionType];
    if (!config) return;
    
    const supportDiv = document.createElement('div');
    supportDiv.className = 'support-message';
    supportDiv.innerHTML = `
        <div class="support-icon">${config.icon}</div>
        <div class="support-content">
            <h4>${config.title}</h4>
            <p>${config.message}</p>
            <p><small>${config.resources}</small></p>
            <div class="support-actions">
                <button class="btn-support" onclick="showSupportResources()">Get Support</button>
                <button class="btn-close" onclick="closeSupportMessage(this)">Thank you</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(supportDiv);
    
    // Log for mental health tracking
    console.log(`⚠️ Emotional support triggered: ${emotionType}`, keywords);
    
    // Auto remove after 15 seconds if not interacted with
    setTimeout(() => {
        if (supportDiv.parentNode) {
            supportDiv.remove();
        }
    }, 15000);
}

// Show encouragement for hesitation
function showEncouragementMessage() {
    const encouragements = [
        "Take your time, there's no rush 💫",
        "Your thoughts and feelings matter 🌸",
        "We're here when you're ready 💖",
        "Every step forward is progress 🦋",
        "You're doing great so far ✨"
    ];
    
    const message = encouragements[Math.floor(Math.random() * encouragements.length)];
    showToast(message, 'info');
}

// Close support message
function closeSupportMessage(button) {
    const supportMessage = button.closest('.support-message');
    if (supportMessage) {
        supportMessage.style.animation = 'slideOutToRight 0.5s ease forwards';
        setTimeout(() => {
            if (supportMessage.parentNode) {
                supportMessage.remove();
            }
        }, 500);
    }
}

// Show support resources
function showSupportResources() {
    const resources = `🆘 Mental Health Resources:

📞 Crisis Hotlines:
• National Suicide Prevention Lifeline: 988
• Crisis Text Line: Text HOME to 741741
• International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

🌐 Online Support:
• BetterHelp: Professional counseling
• 7 Cups: Free emotional support
• SAMHSA: Substance abuse and mental health services

💝 Remember: Seeking help is a sign of strength, not weakness. You matter, and your life has value.`;

    alert(resources);
}

// Validate individual field
function validateField(field) {
    const fieldGroup = field.closest('.form-group');
    const feedback = fieldGroup.querySelector('.field-feedback');
    
    clearFieldValidation(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        setFieldValidation(field, 'error', 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            setFieldValidation(field, 'error', 'Please enter a valid email address');
            return false;
        }
    }
    
    // Password validation
    if (field.type === 'password' && field.value) {
        if (field.value.length < 6) {
            setFieldValidation(field, 'error', 'Password must be at least 6 characters');
            return false;
        }
    }
    
    // Confirm password validation
    if (field.id === 'confirmPassword' && field.value) {
        const password = document.getElementById('password').value;
        if (field.value !== password) {
            setFieldValidation(field, 'error', 'Passwords do not match');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(field.value)) {
            setFieldValidation(field, 'error', 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Date of birth validation
    if (field.type === 'date' && field.value) {
        const birthDate = new Date(field.value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        
        if (age < 13) {
            setFieldValidation(field, 'error', 'You must be at least 13 years old');
            return false;
        }
        if (age > 120) {
            setFieldValidation(field, 'error', 'Please enter a valid birth date');
            return false;
        }
    }
    
    // If validation passes
    if (field.value.trim()) {
        setFieldValidation(field, 'valid', 'Looks good!');
    }
    
    return true;
}

// Set field validation state
function setFieldValidation(field, state, message) {
    const fieldGroup = field.closest('.form-group');
    const feedback = fieldGroup.querySelector('.field-feedback');
    
    fieldGroup.classList.remove('valid', 'invalid');
    fieldGroup.classList.add(state);
    
    if (feedback) {
        feedback.textContent = message;
        feedback.className = `field-feedback ${state}`;
    }
}

// Clear field validation
function clearFieldValidation(field) {
    const fieldGroup = field.closest('.form-group');
    const feedback = fieldGroup.querySelector('.field-feedback');
    
    fieldGroup.classList.remove('valid', 'invalid');
    if (feedback) {
        feedback.textContent = '';
        feedback.className = 'field-feedback';
    }
}

// Update password strength indicator
function updatePasswordStrength(passwordField) {
    const password = passwordField.value;
    const strengthIndicator = passwordField.parentNode.querySelector('.password-strength');
    
    if (!strengthIndicator) return;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    
    // Uppercase check
    if (/[A-Z]/.test(password)) strength++;
    
    // Lowercase check
    if (/[a-z]/.test(password)) strength++;
    
    // Number check
    if (/\d/.test(password)) strength++;
    
    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    // Update indicator
    strengthIndicator.className = 'password-strength';
    if (strength < 2) {
        strengthIndicator.classList.add('weak');
    } else if (strength < 4) {
        strengthIndicator.classList.add('medium');
    } else {
        strengthIndicator.classList.add('strong');
    }
}

// Navigation functions
function nextStep() {
    if (!validateCurrentStep()) return;
    
    saveStepData();
    
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        updateProgress();
        updateNavigationButtons();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
        updateNavigationButtons();
    }
}

// Validate current step
function validateCurrentStep() {
    const currentStepElement = document.querySelector('.form-step.active');
    const requiredFields = currentStepElement.querySelectorAll('input[required], select[required]');
    
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Special validation for step 3 (interests)
    if (currentStep === 3) {
        const checkedHobbies = currentStepElement.querySelectorAll('input[name="hobbies"]:checked');
        if (checkedHobbies.length === 0) {
            showToast('Please select at least one hobby or interest', 'warning');
            isValid = false;
        }
    }
    
    // Special validation for step 4 (quiz completion)
    if (currentStep === 4) {
        const totalQuestions = personalityQuestions.length;
        const answeredQuestions = Object.keys(quizAnswers).length;
        
        if (answeredQuestions < totalQuestions) {
            showToast('Please complete all personality quiz questions', 'warning');
            isValid = false;
        }
    }
    
    return isValid;
}

// Save step data
function saveStepData() {
    const currentStepElement = document.querySelector('.form-step.active');
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            if (input.name === 'hobbies' && input.checked) {
                if (!formData.hobbies) formData.hobbies = [];
                formData.hobbies.push(input.value);
            }
        } else if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.value;
            }
        } else {
            formData[input.name || input.id] = input.value;
        }
    });
    
    // Save digital body language data for current step
    formData.digitalBodyLanguage = digitalBodyLanguageData;
}

// Show specific step
function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    const targetStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
        
        // Focus first input in step
        setTimeout(() => {
            const firstInput = targetStep.querySelector('input, select, textarea');
            if (firstInput) firstInput.focus();
        }, 300);
    }
    
    // Update step indicators
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        
        if (stepNum === stepNumber) {
            step.classList.add('active');
        } else if (stepNum < stepNumber) {
            step.classList.add('completed');
        }
    });
}

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = progress + '%';
}

// Update navigation buttons
function updateNavigationButtons() {
    const nextBtn = document.getElementById('nextStep');
    const prevBtn = document.getElementById('prevStep');
    const submitBtn = document.getElementById('submitForm');
    
    prevBtn.disabled = currentStep === 1;
    
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

// Quiz functionality
function loadQuizQuestions() {
    const quizContainer = document.querySelector('.quiz-questions');
    
    personalityQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = `quiz-question ${index === 0 ? 'active' : ''}`;
        questionDiv.dataset.questionId = question.id;
        
        questionDiv.innerHTML = `
            <div class="question-text">${question.question}</div>
            <div class="question-options">
                ${question.options.map((option, optionIndex) => `
                    <button type="button" class="option-button" 
                            data-value="${option.value}" 
                            data-weight="${option.weight}"
                            onclick="selectQuizOption('${question.id}', '${option.value}', ${option.weight}, this)">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        `;
        
        quizContainer.appendChild(questionDiv);
    });
    
    document.getElementById('totalQuestions').textContent = personalityQuestions.length;
}

function setupQuizNavigation() {
    const prevBtn = document.getElementById('prevQuestion');
    const nextBtn = document.getElementById('nextQuestion');
    
    prevBtn.addEventListener('click', () => navigateQuiz(-1));
    nextBtn.addEventListener('click', () => navigateQuiz(1));
}

function selectQuizOption(questionId, value, weight, button) {
    // Remove previous selection
    const questionDiv = button.closest('.quiz-question');
    questionDiv.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Mark current selection
    button.classList.add('selected');
    
    // Save answer
    quizAnswers[questionId] = { value, weight };
    
    // Auto-advance after a short delay
    setTimeout(() => {
        if (currentQuestionIndex < personalityQuestions.length - 1) {
            navigateQuiz(1);
        } else {
            // Quiz completed, calculate personality type
            calculatePersonalityType();
        }
    }, 800);
}

function navigateQuiz(direction) {
    const questions = document.querySelectorAll('.quiz-question');
    
    // Hide current question
    questions[currentQuestionIndex].classList.remove('active');
    
    // Update index
    currentQuestionIndex += direction;
    currentQuestionIndex = Math.max(0, Math.min(currentQuestionIndex, questions.length - 1));
    
    // Show new question
    questions[currentQuestionIndex].classList.add('active');
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('quizProgressFill').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    
    // Update navigation buttons
    document.getElementById('prevQuestion').disabled = currentQuestionIndex === 0;
    document.getElementById('nextQuestion').textContent = 
        currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
}

// Calculate personality type based on quiz answers
function calculatePersonalityType() {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    // Calculate scores
    Object.values(quizAnswers).forEach(answer => {
        scores[answer.value] += answer.weight;
    });
    
    // Determine personality type
    const personality = [
        scores.E >= scores.I ? 'E' : 'I',
        scores.S >= scores.N ? 'S' : 'N',
        scores.T >= scores.F ? 'T' : 'F',
        scores.J >= scores.P ? 'J' : 'P'
    ].join('');
    
    // Store result
    formData.personalityType = personality;
    formData.personalityScores = scores;
    
    // Display result
    displayPersonalityResult(personality);
    
    // Show completion message
    showToast('Personality quiz completed! 🎉', 'success');
}

function displayPersonalityResult(personalityType) {
    const resultContainer = document.getElementById('personalityResult');
    const typeInfo = personalityTypes[personalityType] || personalityTypes['INFP']; // Fallback
    
    resultContainer.innerHTML = `
        <div class="personality-type">${typeInfo.emoji}</div>
        <div class="personality-title">${typeInfo.title}</div>
        <div class="personality-description">${typeInfo.description}</div>
        <div class="personality-traits">
            ${typeInfo.traits.map(trait => `<span class="trait-tag">${trait}</span>`).join('')}
        </div>
        <div class="personality-code">
            <strong>Your Type: ${personalityType}</strong>
        </div>
    `;
    
    // Apply theme color
    resultContainer.style.borderColor = typeInfo.color;
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) return;
    
    saveStepData();
    
    // Show loading state
    const submitBtn = document.getElementById('submitForm');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating your profile...';
    submitBtn.disabled = true;
    
    // Simulate registration process
    setTimeout(() => {
        processRegistration();
    }, 3000);
}

function processRegistration() {
    try {
        // Prepare final user data
        const userData = {
            ...formData,
            id: Date.now(),
            registrationDate: new Date().toISOString(),
            profileComplete: true,
            digitalSignature: generateDigitalSignature()
        };
        
        // Save to localStorage (in real app, this would be sent to server)
        const existingUsers = JSON.parse(localStorage.getItem('serenityUsers') || '[]');
        
        // Check if email already exists
        const existingUser = existingUsers.find(user => user.email === userData.email);
        if (existingUser) {
            showToast('An account with this email already exists!', 'error');
            resetSubmitButton();
            return;
        }
        
        // Add new user
        existingUsers.push(userData);
        localStorage.setItem('serenityUsers', JSON.stringify(existingUsers));
        localStorage.setItem('serenityUser', JSON.stringify(userData));
        
        // Show success and redirect
        showToast('Welcome to SerenityLinks! 🎉', 'success');
        
        setTimeout(() => {
            window.location.href = 'homepage\homepage.html';
        }, 2000);
        
    } catch (error) {
        console.error('Registration error:', error);
        showToast('Something went wrong. Please try again.', 'error');
        resetSubmitButton();
    }
}

function resetSubmitButton() {
    const submitBtn = document.getElementById('submitForm');
    submitBtn.innerHTML = '<i class="fas fa-heart"></i> Complete Registration';
    submitBtn.disabled = false;
}

function generateDigitalSignature() {
    // Analyze digital body language patterns
    const signature = {
        averageTypingSpeed: 0,
        hesitationPattern: 0,
        correctionRate: 0,
        totalEngagementTime: 0,
        emotionalMarkers: []
    };
    
    const fields = Object.values(digitalBodyLanguageData);
    
    if (fields.length > 0) {
        signature.averageTypingSpeed = fields.reduce((sum, field) => {
            const keystrokes = field.keystrokes.length;
            const time = field.totalTime || 1;
            return sum + (keystrokes / (time / 1000));
        }, 0) / fields.length;
        
        signature.hesitationPattern = fields.reduce((sum, field) => 
            sum + field.hesitations, 0) / fields.length;
        
        signature.correctionRate = fields.reduce((sum, field) => 
            sum + field.corrections, 0) / fields.length;
        
        signature.totalEngagementTime = fields.reduce((sum, field) => 
            sum + (field.totalTime || 0), 0);
    }
    
    return signature;
}

// Utility functions
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(toast);
    
    // Show animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 5000);
}

function createFloatingElements() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const emojis = ['🌸', '🦋', '✨', '💫', '🌺', '🌙', '⭐', '🌼'];
    
    setInterval(() => {
        if (Math.random() > 0.8) {
            const element = document.createElement('div');
            element.className = 'heart';
            element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            element.style.left = Math.random() * 100 + '%';
            element.style.animationDuration = (Math.random() * 4 + 4) + 's';
            element.style.fontSize = (Math.random() * 10 + 15) + 'px';
            
            heartsContainer.appendChild(element);
            
            setTimeout(() => {
                if (element.parentNode) {
                    element.remove();
                }
            }, 8000);
        }
    }, 2000);
}

// Add CSS animations for slideOut
const additionalStyles = `
    @keyframes slideOutToRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

console.log('🌸 SerenityLinks Registration script loaded successfully!');