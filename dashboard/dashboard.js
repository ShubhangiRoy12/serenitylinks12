// Global variables
let currentDate = new Date();
let moodData = JSON.parse(localStorage.getItem('moodData')) || {};
let userMetrics = {
    typingSpeed: 56,
    emotionalResonance: 83,
    responseEnergy: 75,
    interactionFlow: 65,
    authenticityScore: 89,
    connectionDepth: 87
};
let selectedDate = null;
let typingStartTime = null;
let keystrokes = 0;
let interactionData = [];

// Harmful content detection dictionary
const harmfulWords = {
    hate: -3, kill: -5, die: -4, hurt: -2, stupid: -2, idiot: -2,
    ugly: -2, worthless: -4, pathetic: -3, loser: -2, failure: -2,
    useless: -2, damn: -1, hell: -1, shit: -2, fuck: -3, bitch: -3,
    asshole: -3, moron: -2, dumb: -1, trash: -2, garbage: -2
};

const positiveWords = {
    love: 3, amazing: 3, wonderful: 3, fantastic: 3, great: 2,
    good: 2, happy: 2, joy: 3, excited: 2, awesome: 3, brilliant: 3,
    excellent: 3, beautiful: 2, perfect: 3, incredible: 3, outstanding: 3,
    superb: 3, magnificent: 3, delightful: 2, pleasant: 2, nice: 1
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    initializeMoodModal();
    initializeTextAnalysis();
    initializeMetricTracking();
    initializeQuickActions();
    initializeMobileMenu();
    loadSampleMoodData();
    updateMetricsDisplay();
    startMetricTracking();
});

// Calendar Functions
function initializeCalendar() {
    generateCalendar();
    
    const prevButton = document.getElementById('prevMonth');
    const nextButton = document.getElementById('nextMonth');
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar();
        });
    }
}

function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonth = document.getElementById('currentMonth');
    
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    if (currentMonth) {
        currentMonth.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
    
    // Create day headers
    const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day and last day of month
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1));
    
    // Generate calendar days
    for (let i = 0; i < 42; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day.getDate();
        
        // Add styling classes
        if (day.getMonth() !== currentDate.getMonth()) {
            dayElement.classList.add('other-month');
        }
        
        if (isToday(day)) {
            dayElement.classList.add('today');
        }
        
        // Check for mood data and add activity bars
        const dateKey = formatDate(day);
        if (moodData[dateKey] || (day <= new Date() && Math.random() > 0.6)) {
            const moodLevel = moodData[dateKey] || Math.floor(Math.random() * 4) + 1;
            dayElement.classList.add('has-mood', `mood-${moodLevel}`);
            
            // Add activity bars
            const moodBars = document.createElement('div');
            moodBars.className = 'mood-bars';
            
            for (let j = 0; j < 5; j++) {
                const bar = document.createElement('div');
                bar.className = 'mood-bar';
                
                const intensity = Math.random();
                if (intensity > 0.8) {
                    bar.style.background = '#e91e63';
                    bar.style.height = '4px';
                } else if (intensity > 0.6) {
                    bar.style.background = '#4caf50';
                    bar.style.height = '3px';
                } else if (intensity > 0.3) {
                    bar.style.background = '#ffc107';
                    bar.style.height = '2px';
                } else {
                    bar.style.background = '#f44336';
                    bar.style.height = '1px';
                }
                
                moodBars.appendChild(bar);
            }
            
            dayElement.appendChild(moodBars);
        }
        
        // Add click listener
        dayElement.addEventListener('click', function() {
            if (!dayElement.classList.contains('other-month')) {
                selectedDate = day;
                showMoodModal();
            }
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// Mood Modal Functions
function initializeMoodModal() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const closeButton = document.getElementById('closeMoodModal');
    const modal = document.getElementById('moodModal');

    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            
            const mood = this.dataset.mood;
            setTimeout(() => {
                setMood(mood);
                closeMoodModal();
            }, 300);
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', closeMoodModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeMoodModal();
            }
        });
    }
}

function showMoodModal() {
    const modal = document.getElementById('moodModal');
    if (modal && selectedDate) {
        modal.style.display = 'flex';
        
        const modalTitle = document.getElementById('modalDate');
        if (modalTitle) {
            modalTitle.textContent = selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
}

function closeMoodModal() {
    const modal = document.getElementById('moodModal');
    if (modal) {
        modal.style.display = 'none';
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(btn => btn.classList.remove('selected'));
    }
}

function setMood(mood) {
    if (selectedDate) {
        const dateKey = formatDate(selectedDate);
        moodData[dateKey] = parseInt(mood);
        localStorage.setItem('moodData', JSON.stringify(moodData));
        
        generateCalendar();
        updateMetricsBasedOnMood(mood);
    }
}

// Text Analysis Functions
function initializeTextAnalysis() {
    const textArea = document.getElementById('userInput');
    
    if (textArea) {
        textArea.addEventListener('input', function(e) {
            const text = e.target.value;
            
            trackTypingPattern(text);
            const analysis = performSentimentAnalysis(text);
            displayAnalysisResults(analysis);
            updateMetricsFromText(analysis);
        });

        textArea.addEventListener('keydown', function(e) {
            if (!typingStartTime) {
                typingStartTime = Date.now();
            }
            keystrokes++;
        });
    }
}

function trackTypingPattern(text) {
    if (text.length > 0 && typingStartTime) {
        const timeDiff = (Date.now() - typingStartTime) / 1000;
        const wpm = Math.round((keystrokes / 5) / (timeDiff / 60));
        userMetrics.typingSpeed = Math.max(1, Math.min(wpm, 120));
    }
}

function performSentimentAnalysis(text) {
    if (!text || text.trim().length === 0) {
        return { sentiment: 'neutral', score: 0, harmful: false, confidence: 0, wordCount: 0 };
    }
    
    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    let harmfulScore = 0;
    let positiveScore = 0;
    let scoredWords = 0;
    
    words.forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, '');
        
        if (harmfulWords[cleanWord]) {
            harmfulScore += harmfulWords[cleanWord];
            score += harmfulWords[cleanWord];
            scoredWords++;
        }
        
        if (positiveWords[cleanWord]) {
            positiveScore += positiveWords[cleanWord];
            score += positiveWords[cleanWord];
            scoredWords++;
        }
    });
    
    const averageScore = scoredWords > 0 ? score / scoredWords : 0;
    const isHarmful = harmfulScore < -3;
    
    let sentiment = 'neutral';
    if (averageScore > 0.5) sentiment = 'positive';
    else if (averageScore < -0.5) sentiment = 'negative';
    
    const confidence = Math.min(Math.abs(averageScore) * 30, 100);
    
    return {
        sentiment,
        score: averageScore,
        harmful: isHarmful,
        confidence: Math.round(confidence),
        wordCount: words.length,
        harmfulWords: harmfulScore < 0 ? Math.abs(harmfulScore) : 0
    };
}

function displayAnalysisResults(analysis) {
    const resultsContainer = document.getElementById('analysisResults');
    if (!resultsContainer || analysis.wordCount === 0) return;
    
    const moodPredictions = {
        'positive': ['Optimistic & Energetic', 'Cheerful & Motivated', 'Enthusiastic & Confident'],
        'negative': ['Contemplative & Reflective', 'Introspective & Thoughtful', 'Processing & Adjusting'],
        'neutral': ['Balanced & Steady', 'Calm & Focused', 'Centered & Composed']
    };
    
    const recommendations = {
        'positive': [
            '🌟 Keep up the positive momentum!',
            '🎯 Channel this energy into your goals',
            '🤝 Share your positivity with others',
            '🎨 Try a creative activity to express yourself'
        ],
        'negative': [
            '💙 Practice some self-care today',
            '🌱 Consider journaling your thoughts',
            '🚶‍♂️ Take a gentle walk outside',
            '☕ Reach out to a trusted friend'
        ],
        'neutral': [
            '⚖️ Your balanced state is valuable',
            '🎯 Good time for focused work',
            '📚 Perfect for learning something new',
            '🧘 Consider a short meditation'
        ]
    };
    
    const mood = moodPredictions[analysis.sentiment][Math.floor(Math.random() * 3)];
    const recs = recommendations[analysis.sentiment];
    
    let html = `
        <div class="ai-mood-prediction">
            <h4>Predicted Mood: <span class="mood-status">${mood}</span></h4>
            <p>Confidence: <span class="confidence-score">${analysis.confidence}%</span></p>
        </div>
    `;
    
    if (analysis.harmful) {
        html += `
            <div class="harmful-content-warning" style="background: rgba(255, 193, 7, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #ffc107;">
                <h4 style="color: #f57c00; margin-bottom: 0.5rem;">⚠️ Digital Wellness Notice</h4>
                <p style="color: #666; margin: 0;">We detected some challenging language. Consider reframing your thoughts more positively for better emotional wellbeing.</p>
            </div>
        `;
    }
    
    html += `
        <div class="ai-recommendations-list">
            <h4>💡 Personalized Recommendations:</h4>
            <ul>
    `;
    
    recs.forEach(rec => {
        html += `<li>${rec}</li>`;
    });
    
    html += `
            </ul>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
}

// Metric Tracking Functions
function initializeMetricTracking() {
    document.addEventListener('click', function() {
        interactionData.push({
            type: 'click',
            timestamp: Date.now()
        });
        updateInteractionMetrics();
    });
    
    document.addEventListener('scroll', function() {
        interactionData.push({
            type: 'scroll',
            timestamp: Date.now()
        });
        updateInteractionMetrics();
    });
}

function startMetricTracking() {
    setInterval(() => {
        updateMetricsDisplay();
        simulateRealisticMetricChanges();
    }, 3000);
}

function updateMetricsFromText(analysis) {
    if (analysis.wordCount === 0) return;
    
    // Update emotional resonance based on sentiment
    if (analysis.sentiment === 'positive') {
        userMetrics.emotionalResonance = Math.min(userMetrics.emotionalResonance + 3, 100);
        userMetrics.authenticityScore = Math.min(userMetrics.authenticityScore + 2, 100);
    } else if (analysis.harmful) {
        userMetrics.emotionalResonance = Math.max(userMetrics.emotionalResonance - 5, 0);
        userMetrics.authenticityScore = Math.max(userMetrics.authenticityScore - 3, 0);
    }
    
    // Update response energy based on text characteristics
    const wordsPerSecond = analysis.wordCount / 10; // Approximate
    userMetrics.responseEnergy = Math.round(Math.min(wordsPerSecond * 15, 100));
    
    // Update connection depth based on text quality
    if (analysis.wordCount > 20 && !analysis.harmful) {
        userMetrics.connectionDepth = Math.min(userMetrics.connectionDepth + 2, 100);
    }
    
    updateMetricsDisplay();
}

function updateInteractionMetrics() {
    const recentInteractions = interactionData.filter(
        interaction => Date.now() - interaction.timestamp < 30000
    );
    
    userMetrics.interactionFlow = Math.min(recentInteractions.length * 3, 100);
}

function updateMetricsBasedOnMood(mood) {
    const moodMultipliers = {
        1: { emotionalResonance: -5, responseEnergy: -10, connectionDepth: -3 },
        2: { emotionalResonance: 0, responseEnergy: 0, connectionDepth: 0 },
        3: { emotionalResonance: 5, responseEnergy: 8, connectionDepth: 3 },
        4: { emotionalResonance: 10, responseEnergy: 15, connectionDepth: 5 }
    };
    
    const multiplier = moodMultipliers[mood] || moodMultipliers[2];
    
    userMetrics.emotionalResonance = Math.max(0, Math.min(100, 
        userMetrics.emotionalResonance + multiplier.emotionalResonance));
    userMetrics.responseEnergy = Math.max(0, Math.min(100, 
        userMetrics.responseEnergy + multiplier.responseEnergy));
    userMetrics.connectionDepth = Math.max(0, Math.min(100, 
        userMetrics.connectionDepth + multiplier.connectionDepth));
    
    updateMetricsDisplay();
}

function simulateRealisticMetricChanges() {
    // Add small random variations to simulate real usage
    Object.keys(userMetrics).forEach(key => {
        const change = (Math.random() - 0.5) * 2; // -1 to +1
        userMetrics[key] = Math.max(0, Math.min(100, userMetrics[key] + change));
    });
}

function updateMetricsDisplay() {
    // Update typing speed
    updateMetricCard('typing', `${Math.round(userMetrics.typingSpeed)} WPM`, userMetrics.typingSpeed);
    
    // Update emotional resonance
    updateMetricCard('emotional', `${Math.round(userMetrics.emotionalResonance)}%`, userMetrics.emotionalResonance);
    
    // Update response energy
    updateMetricCard('energy', `${(5 - (userMetrics.responseEnergy / 100 * 4)).toFixed(1)}s`, userMetrics.responseEnergy);
    
    // Update interaction flow
    updateMetricCard('flow', `${Math.round(userMetrics.interactionFlow * 1.27)} clicks`, userMetrics.interactionFlow);
    
    // Update authenticity score
    updateMetricCard('authenticity', `${Math.round(userMetrics.authenticityScore)}%`, userMetrics.authenticityScore);
    
    // Update connection depth
    updateMetricCard('connection', `${(userMetrics.connectionDepth / 100 * 10).toFixed(1)}/10`, userMetrics.connectionDepth);
}

function updateMetricCard(metricType, value, percentage) {
    const card = document.querySelector(`[data-metric="${metricType}"]`);
    if (!card) return;
    
    const valueElement = card.querySelector('.metric-value');
    const progressFill = card.querySelector('.progress-fill');
    const progressText = card.querySelector('.progress-text');
    
    if (valueElement) valueElement.textContent = value;
    if (progressFill) progressFill.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `Progress: ${Math.round(percentage)}%`;
}

// Quick Actions and Mobile Menu
function initializeQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    const messages = {
        'whisper': '🤫 Whisper Walls - Share anonymous thoughts safely!',
        'connections': '🔍 Find Connections - Discover like-minded people!',
        'pet': '🐾 Virtual Pet - Your digital companion awaits!',
        'community': '👥 Join Communities - Connect with supportive groups!'
    };
    
    alert(messages[action] || 'Feature coming soon!');
}

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Data Management
function loadSampleMoodData() {
    const today = new Date();
    
    // Generate sample data for the current month
    for (let i = 1; i <= today.getDate(); i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), i);
        const dateKey = formatDate(date);
        
        if (!moodData[dateKey] && Math.random() > 0.4) {
            moodData[dateKey] = Math.floor(Math.random() * 4) + 1;
        }
    }
    
    localStorage.setItem('moodData', JSON.stringify(moodData));
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Digital Body Language Hub initialized successfully!');
});
