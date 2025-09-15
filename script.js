// SerenityLinks JavaScript - Main functionality and interactions

// Global variables
let currentUser = null;
let isProcessing = false;

// Emotional keywords for sentiment analysis
const sadWords = [
    'sad', 'depressed', 'hurt', 'pain', 'lonely', 'empty', 'hopeless', 
    'worthless', 'hate myself', 'kill myself', 'end it all', 'suicide',
    'can\'t go on', 'nobody cares', 'give up', 'tired of living',
    'self harm', 'cut myself', 'harm myself', 'dying', 'dead inside'
];

const anxiousWords = [
    'anxious', 'worried', 'scared', 'panic', 'stressed', 'overwhelmed',
    'can\'t breathe', 'heart racing', 'nervous', 'afraid'
];

// DOM Elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createFloatingElements();
    setupEventListeners();
});

// Initialize application
function initializeApp() {
    console.log('🌸 SerenityLinks initialized');
    
    // Check if user is returning
    const savedUser = localStorage.getItem('serenityUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        console.log('Welcome back!', currentUser.name);
    }
    
    // Add some welcome animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}

// Create additional floating elements
function createFloatingElements() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const additionalEmojis = ['🌸', '🦋', '✨', '💫', '🌺', '🌙', '⭐', '🌼'];
    
    // Add more floating elements periodically
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFloatingElement(heartsContainer, additionalEmojis);
        }
    }, 3000);
}

// Create a single floating element
function createFloatingElement(container, emojiArray) {
    const element = document.createElement('div');
    element.className = 'heart';
    element.textContent = emojiArray[Math.floor(Math.random() * emojiArray.length)];
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDuration = (Math.random() * 4 + 4) + 's';
    element.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    container.appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, 8000);
}

// Setup event listeners
function setupEventListeners() {
    // Modal close events
    document.addEventListener('click', function(e) {
        if (e.target === loginModal) hideLogin();
        if (e.target === signupModal) hideSignup();
    });
    
    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
    
    // Input monitoring for sentiment analysis
    setupSentimentAnalysis();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideLogin();
            hideSignup();
        }
    });
}

// Show login modal
function showLogin() {
    hideSignup(); // Hide signup if open
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on email input
    setTimeout(() => {
        document.getElementById('email').focus();
    }, 300);
    
    // Add entrance animation
    addSparkleEffect();
}

// Hide login modal
function hideLogin() {
    loginModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    clearForm('loginForm');
}

// Show signup modal
function showSignup() {
    hideLogin(); // Hide login if open
    signupModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on name input
    setTimeout(() => {
        document.getElementById('signupName').focus();
    }, 300);
    
    addSparkleEffect();
}

// Hide signup modal
function hideSignup() {
    signupModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    clearForm('signupForm');
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    if (isProcessing) return;
    isProcessing = true;
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    submitBtn.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        if (validateLogin(email, password)) {
            showSuccessMessage('Welcome back! 💖');
            // Redirect to homepage after success
            setTimeout(() => {
                window.location.href = 'homepage/homepage.html';
            }, 2000);
        } else {
            showErrorMessage('Invalid credentials. Please try again. 😔');
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        isProcessing = false;
    }, 2000);
}

// Validate login credentials (mock validation)
function validateLogin(email, password) {
    // In a real app, this would make an API call
    const savedUsers = JSON.parse(localStorage.getItem('serenityUsers') || '[]');
    const user = savedUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('serenityUser', JSON.stringify(user));
        return true;
    }
    
    // Demo login - allow any email with "demo" password
    if (password === 'demo') {
        currentUser = { name: 'Demo User', email: email };
        localStorage.setItem('serenityUser', JSON.stringify(currentUser));
        return true;
    }
    
    return false;
}

// Create new account (mock creation)
function createAccount(name, email, password) {
    try {
        // Check if user already exists
        const savedUsers = JSON.parse(localStorage.getItem('serenityUsers') || '[]');
        const existingUser = savedUsers.find(u => u.email === email);
        
        if (existingUser) {
            showErrorMessage('An account with this email already exists! 😊');
            return false;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password, // In real app, this would be hashed
            joinDate: new Date().toISOString(),
            emotionalProfile: {
                moodHistory: [],
                preferences: {},
                digitalBodyLanguage: {}
            }
        };
        
        // Save user
        savedUsers.push(newUser);
        localStorage.setItem('serenityUsers', JSON.stringify(savedUsers));
        
        // Set as current user
        currentUser = newUser;
        localStorage.setItem('serenityUser', JSON.stringify(newUser));
        
        return true;
    } catch (error) {
        console.error('Error creating account:', error);
        return false;
    }
}

// Handle signup form submission
function handleSignup(e) {
    e.preventDefault();
    
    if (isProcessing) return;
    isProcessing = true;
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match! 😅');
        isProcessing = false;
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    submitBtn.disabled = true;
    
    // Simulate signup process
    setTimeout(() => {
        if (createAccount(name, email, password)) {
            showSuccessMessage('Welcome to SerenityLinks! 🌸');
            // Redirect to homepage after success
            setTimeout(() => {
                window.location.href = 'homepage/homepage.html';
            }, 2000);
        } else {
            showErrorMessage('Something went wrong. Please try again. 😔');
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        isProcessing = false;
    }, 2500);
}

// Setup sentiment analysis for form inputs
function setupSentimentAnalysis() {
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    
    textInputs.forEach(input => {
        input.addEventListener('input', function() {
            analyzeTextSentiment(this.value, this);
        });
        
        input.addEventListener('keydown', function(e) {
            // Track typing patterns for digital body language analysis
            trackDigitalBodyLanguage(e, this);
        });
    });
}

// Analyze text for emotional content
function analyzeTextSentiment(text, inputElement) {
    const lowerText = text.toLowerCase();
    
    // Check for concerning words
    const foundSadWords = sadWords.filter(word => lowerText.includes(word));
    const foundAnxiousWords = anxiousWords.filter(word => lowerText.includes(word));
    
    if (foundSadWords.length > 0) {
        showSupportMessage('sad', inputElement);
    } else if (foundAnxiousWords.length > 0) {
        showSupportMessage('anxious', inputElement);
    }
}

// Track digital body language patterns
function trackDigitalBodyLanguage(event, inputElement) {
    const timestamp = Date.now();
    
    // Store typing patterns (simplified version)
    if (!inputElement.digitalSignature) {
        inputElement.digitalSignature = {
            keystrokes: [],
            pauses: [],
            startTime: timestamp
        };
    }
    
    const signature = inputElement.digitalSignature;
    const lastKeystroke = signature.keystrokes[signature.keystrokes.length - 1];
    
    if (lastKeystroke) {
        const timeBetweenKeys = timestamp - lastKeystroke.timestamp;
        
        // Detect hesitation (long pauses)
        if (timeBetweenKeys > 2000) {
            signature.pauses.push({
                duration: timeBetweenKeys,
                position: inputElement.selectionStart
            });
            
            // Show gentle encouragement for hesitation
            if (timeBetweenKeys > 5000) {
                showEncouragementMessage(inputElement);
            }
        }
    }
    
    signature.keystrokes.push({
        key: event.key,
        timestamp: timestamp,
        position: inputElement.selectionStart
    });
}

// Show support message for users in distress
function showSupportMessage(emotionType, inputElement) {
    const supportMessages = {
        sad: {
            message: "We noticed you might be going through a tough time. Remember, you're not alone. 💙",
            resources: "Would you like to connect with our support community?"
        },
        anxious: {
            message: "Feeling overwhelmed? Take a deep breath. We're here for you. 🌸",
            resources: "Try our calming breathing exercise?"
        }
    };
    
    const message = supportMessages[emotionType];
    if (message && !inputElement.supportShown) {
        inputElement.supportShown = true;
        
        // Create floating support message
        const supportDiv = document.createElement('div');
        supportDiv.className = 'support-message';
        supportDiv.innerHTML = `
            <div class="support-content">
                <p>${message.message}</p>
                <p><small>${message.resources}</small></p>
                <button onclick="this.parentElement.parentElement.remove()">💖 Thank you</button>
            </div>
        `;
        
        document.body.appendChild(supportDiv);
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (supportDiv.parentNode) {
                supportDiv.remove();
            }
        }, 10000);
    }
}

// Show encouragement for hesitation
function showEncouragementMessage(inputElement) {
    const encouragements = [
        "Take your time, there's no rush 💫",
        "Your thoughts matter to us 🌸",
        "We're here when you're ready 💖",
        "Every feeling is valid 🦋"
    ];
    
    const message = encouragements[Math.floor(Math.random() * encouragements.length)];
    showToast(message, 'encouragement');
}

// Show success message
function showSuccessMessage(message) {
    showToast(message, 'success');
}

// Show error message
function showErrorMessage(message) {
    showToast(message, 'error');
}

// Generic toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
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

// Add sparkle effect
function addSparkleEffect() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 2000);
        }, i * 200);
    }
}

// Learn more functionality
function learnMore() {
    const features = [
        "🧠 Digital Body Language Analysis - Understand emotions through typing patterns",
        "💬 AI Matchmaking - Find meaningful connections based on compatibility", 
        "🌸 Whisper Walls - Share anonymous supportive messages",
        "🎮 Mini Games & Pets - Interactive companions for emotional support",
        "🏠 Culture Hub - Connect with people sharing similar interests",
        "🛡️ Safe Space - AI moderated environment with mental health support"
    ];
    
    let featureText = "✨ SerenityLinks Features:\n\n";
    features.forEach(feature => {
        featureText += feature + "\n";
    });
    
    featureText += "\n💖 Ready to start your journey of meaningful connections?";
    
    if (confirm(featureText)) {
        showLogin();
    }
}

// Clear form data
function clearForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.digitalSignature = null;
        input.supportShown = false;
    });
}

// Add CSS for dynamic elements
const dynamicStyles = `
    .support-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #fff3e0, #e8f5e8);
        border: 2px solid #ff69b4;
        border-radius: 15px;
        padding: 1rem;
        max-width: 300px;
        z-index: 1001;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        animation: slideInRight 0.5s ease;
    }
    
    .support-content button {
        background: linear-gradient(45deg, #ff69b4, #9370db);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        margin-top: 0.5rem;
        font-size: 0.9rem;
    }
    
    .toast {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(10px);
        padding: 1rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 1002;
        transition: transform 0.3s ease;
        border: 2px solid;
    }
    
    .toast.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .toast-success {
        border-color: #4caf50;
        color: #2e7d32;
    }
    
    .toast-error {
        border-color: #f44336;
        color: #c62828;
    }
    
    .toast-encouragement {
        border-color: #ff69b4;
        color: #8b5a83;
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .toast-content button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: inherit;
    }
    
    .sparkle {
        position: fixed;
        pointer-events: none;
        z-index: 1000;
        font-size: 20px;
        animation: sparkleFloat 2s ease-out forwards;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg) translateY(-100px);
        }
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Export functions for global access (if needed)
window.showLogin = showLogin;
window.hideLogin = hideLogin;
window.showSignup = showSignup;
window.hideSignup = hideSignup;
window.learnMore = learnMore;

console.log('🌸 SerenityLinks script loaded successfully!');
