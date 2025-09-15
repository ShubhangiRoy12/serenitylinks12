// Game State
let gameState = {
    isRunning: false,
    isPaused: false,
    progress: 0,
    startTime: 0,
    currentTime: 0,
    score: 0,
    speed: 0,
    inputCount: 0,
    lastInputTime: 0,
    achievements: new Set()
};

// Game Elements
const elements = {
    progressDisplay: document.getElementById('progressDisplay'),
    timeDisplay: document.getElementById('timeDisplay'),
    scoreDisplay: document.getElementById('scoreDisplay'),
    speedDisplay: document.getElementById('speedDisplay'),
    racePlayer: document.getElementById('racePlayer'),
    progressBar: document.getElementById('progressBar'),
    startBtn: document.getElementById('startBtn'),
    resetBtn: document.getElementById('resetBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    resultsModal: document.getElementById('resultsModal'),
    closeModal: document.getElementById('closeModal'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    shareBtn: document.getElementById('shareBtn'),
    achievements: document.getElementById('achievements'),
    raceTrack: document.getElementById('raceTrack')
};

// Performance Rankings
const rankings = {
    legend: { time: 5, message: "🏆 LEGENDARY! You're a scrolling master!" },
    expert: { time: 10, message: "🥇 EXPERT! Incredible speed and precision!" },
    pro: { time: 15, message: "🥈 PRO RACER! Outstanding performance!" },
    advanced: { time: 25, message: "🥉 ADVANCED! Great racing skills!" },
    intermediate: { time: 35, message: "🎯 SOLID! Good steady progress!" },
    beginner: { time: Infinity, message: "🌟 GREAT START! Keep practicing!" }
};

// Achievement System
const achievementsList = [
    { id: 'first_race', name: 'First Race', condition: () => true, icon: 'fa-flag' },
    { id: 'speed_demon', name: 'Speed Demon', condition: () => gameState.speed > 50, icon: 'fa-bolt' },
    { id: 'quick_finish', name: 'Quick Finish', condition: () => gameState.currentTime < 15, icon: 'fa-rocket' },
    { id: 'perfect_race', name: 'Perfect Race', condition: () => gameState.currentTime < 10, icon: 'fa-crown' },
    { id: 'consistent', name: 'Consistent Racer', condition: () => gameState.inputCount > 100, icon: 'fa-chart-line' }
];

// Initialize Game
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
});

function initializeGame() {
    updateDisplay();
    resetGame();
}

function setupEventListeners() {
    // Button Controls
    elements.startBtn.addEventListener('click', startGame);
    elements.resetBtn.addEventListener('click', resetGame);
    elements.pauseBtn.addEventListener('click', togglePause);
    elements.closeModal.addEventListener('click', closeResultsModal);
    elements.playAgainBtn.addEventListener('click', playAgain);
    elements.shareBtn.addEventListener('click', shareScore);

    // Input Controls
    setupInputControls();
    
    // Prevent default scrolling on the race track
    elements.raceTrack.addEventListener('wheel', (e) => {
        if (gameState.isRunning && !gameState.isPaused) {
            e.preventDefault();
        }
    });
}

function setupInputControls() {
    // Mouse wheel
    document.addEventListener('wheel', handleMouseWheel, { passive: false });
    
    // Keyboard
    document.addEventListener('keydown', handleKeyboard);
    
    // Touch for mobile
    elements.raceTrack.addEventListener('touchstart', handleTouch, { passive: true });
    elements.raceTrack.addEventListener('click', handleClick);
}

function handleMouseWheel(e) {
    if (gameState.isRunning && !gameState.isPaused) {
        e.preventDefault();
        processInput();
    }
}

function handleKeyboard(e) {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
    if (validKeys.includes(e.code)) {
        e.preventDefault();
        processInput();
    }
}

function handleTouch(e) {
    if (gameState.isRunning && !gameState.isPaused) {
        processInput();
    }
}

function handleClick(e) {
    if (gameState.isRunning && !gameState.isPaused) {
        processInput();
    }
}

function processInput() {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    const now = Date.now();
    gameState.inputCount++;
    
    // Calculate speed based on input frequency
    if (gameState.lastInputTime > 0) {
        const timeDiff = now - gameState.lastInputTime;
        gameState.speed = Math.min(100, Math.max(0, 100 - (timeDiff / 10)));
    }
    gameState.lastInputTime = now;
    
    // Increase progress
    const increment = 0.8 + (gameState.speed / 100) * 1.2; // 0.8-2.0% per input
    gameState.progress = Math.min(100, gameState.progress + increment);
    
    // Add boost effect
    elements.racePlayer.classList.add('boosting');
    setTimeout(() => {
        elements.racePlayer.classList.remove('boosting');
    }, 300);
    
    // Update displays
    updateDisplay();
    updatePlayerPosition();
    
    // Check for completion
    if (gameState.progress >= 100) {
        finishRace();
    }
    
    // Check for achievements
    checkAchievements();
}

function startGame() {
    if (gameState.isRunning) return;
    
    gameState.isRunning = true;
    gameState.isPaused = false;
    gameState.startTime = Date.now();
    gameState.progress = 0;
    gameState.inputCount = 0;
    gameState.speed = 0;
    gameState.achievements.clear();
    elements.achievements.innerHTML = '';
    
    updateButtonStates();
    updateDisplay();
    updatePlayerPosition();
    
    // Start game loop
    gameLoop();
    
    // Show first achievement
    setTimeout(() => {
        unlockAchievement('first_race');
    }, 1000);
}

function gameLoop() {
    if (!gameState.isRunning) return;
    
    if (!gameState.isPaused) {
        gameState.currentTime = (Date.now() - gameState.startTime) / 1000;
        gameState.score = Math.max(0, Math.floor(1000 - (gameState.currentTime * 10) + (gameState.speed * 5)));
        
        // Decay speed over time
        gameState.speed = Math.max(0, gameState.speed * 0.95);
        
        updateDisplay();
    }
    
    requestAnimationFrame(gameLoop);
}

function finishRace() {
    gameState.isRunning = false;
    gameState.currentTime = (Date.now() - gameState.startTime) / 1000;
    gameState.score = Math.max(0, Math.floor(1000 - (gameState.currentTime * 10) + (gameState.speed * 5)));
    
    updateButtonStates();
    showResults();
    checkAchievements();
}

function resetGame() {
    gameState.isRunning = false;
    gameState.isPaused = false;
    gameState.progress = 0;
    gameState.currentTime = 0;
    gameState.score = 0;
    gameState.speed = 0;
    gameState.inputCount = 0;
    gameState.lastInputTime = 0;
    gameState.achievements.clear();
    
    elements.achievements.innerHTML = '';
    updateButtonStates();
    updateDisplay();
    updatePlayerPosition();
    closeResultsModal();
}

function togglePause() {
    if (!gameState.isRunning) return;
    
    gameState.isPaused = !gameState.isPaused;
    
    if (gameState.isPaused) {
        elements.pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
    } else {
        elements.pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        gameState.startTime += Date.now() - gameState.pauseTime;
    }
    
    if (gameState.isPaused) {
        gameState.pauseTime = Date.now();
    }
}

function updateDisplay() {
    elements.progressDisplay.textContent = gameState.progress.toFixed(1) + '%';
    elements.timeDisplay.textContent = gameState.currentTime.toFixed(1) + 's';
    elements.scoreDisplay.textContent = gameState.score.toLocaleString();
    elements.speedDisplay.textContent = Math.floor(gameState.speed);
    elements.progressBar.style.width = gameState.progress + '%';
}

function updatePlayerPosition() {
    const maxPosition = 92; // Account for player width and track margins
    const position = 2 + (gameState.progress / 100) * maxPosition;
    elements.racePlayer.style.left = position + '%';
}

function updateButtonStates() {
    elements.startBtn.disabled = gameState.isRunning;
    elements.pauseBtn.disabled = !gameState.isRunning;
    elements.resetBtn.disabled = false;
    
    if (gameState.isRunning) {
        elements.startBtn.innerHTML = '<i class="fas fa-play"></i> Racing...';
    } else {
        elements.startBtn.innerHTML = '<i class="fas fa-play"></i> Start Race';
    }
}

function checkAchievements() {
    achievementsList.forEach(achievement => {
        if (!gameState.achievements.has(achievement.id) && achievement.condition()) {
            unlockAchievement(achievement.id);
        }
    });
}

function unlockAchievement(achievementId) {
    const achievement = achievementsList.find(a => a.id === achievementId);
    if (!achievement || gameState.achievements.has(achievementId)) return;
    
    gameState.achievements.add(achievementId);
    
    const achievementElement = document.createElement('div');
    achievementElement.className = 'achievement';
    achievementElement.innerHTML = `
        <i class="fas ${achievement.icon}"></i>
        <span>${achievement.name}</span>
    `;
    
    elements.achievements.appendChild(achievementElement);
}

function showResults() {
    const rank = getRank(gameState.currentTime);
    
    document.getElementById('finalTime').textContent = gameState.currentTime.toFixed(1) + 's';
    document.getElementById('finalScore').textContent = gameState.score.toLocaleString();
    document.getElementById('finalRank').textContent = rank.name;
    document.getElementById('performanceMessage').textContent = rank.message;
    
    elements.resultsModal.style.display = 'block';
}

function getRank(time) {
    for (const [name, rank] of Object.entries(rankings)) {
        if (time <= rank.time) {
            return { name: name.toUpperCase(), message: rank.message };
        }
    }
    return { name: 'BEGINNER', message: rankings.beginner.message };
}

function closeResultsModal() {
    elements.resultsModal.style.display = 'none';
}

function playAgain() {
    closeResultsModal();
    resetGame();
    setTimeout(() => {
        startGame();
    }, 500);
}

function shareScore() {
    const rank = getRank(gameState.currentTime);
    const shareText = `🏁 Scroll Race Results 🏁\n⏰ Time: ${gameState.currentTime.toFixed(1)}s\n⭐ Score: ${gameState.score.toLocaleString()}\n🏆 Rank: ${rank.name}\n\nCan you beat my time? Try the Scroll Race challenge!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Scroll Race Results',
            text: shareText
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Results copied to clipboard!');
        });
    }
}

// Prevent context menu on right click during game
document.addEventListener('contextmenu', function(e) {
    if (gameState.isRunning && !gameState.isPaused) {
        e.preventDefault();
    }
});

// Handle visibility change (pause when tab not active)
document.addEventListener('visibilitychange', function() {
    if (gameState.isRunning && !gameState.isPaused && document.hidden) {
        togglePause();
    }
});
