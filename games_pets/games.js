// Pet Stats Management
let petStats = {
    happiness: 100,
    energy: 80,
    love: 100,
    level: 12
};

// Game State Management
let gameState = {
    currentGame: null,
    score: 0,
    currentQuestion: 0,
    questions: []
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    startPetAnimations();
});

// Initialize page functionality
function initializePage() {
    // Add click listeners for navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Add click listener for pet avatar
    const petAvatar = document.getElementById('petAvatar');
    petAvatar.addEventListener('click', function() {
        this.classList.add('pet-happy');
        setTimeout(() => this.classList.remove('pet-happy'), 500);
        updatePetStat('happiness', 5);
        showNotification('Serenity is happy! 😊');
    });

    // Initialize responsive navigation
    handleResponsiveNav();
}

// Pet Animation Functions
function startPetAnimations() {
    // Random sparkle effects around pet
    setInterval(createSparkle, 3000);
    
    // Pet stat decay simulation
    setInterval(decayPetStats, 30000); // Every 30 seconds
}

function createSparkle() {
    const petAvatar = document.getElementById('petAvatar');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Random position around pet
    const x = Math.random() * 140 - 20;
    const y = Math.random() * 140 - 20;
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    petAvatar.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => sparkle.remove(), 1500);
}

function decayPetStats() {
    updatePetStat('happiness', -1);
    updatePetStat('energy', -2);
    updatePetStat('love', -1);
}

// Pet Care Functions
function feedPet() {
    updatePetStat('happiness', 10);
    updatePetStat('energy', 15);
    showNotification('Serenity enjoyed the meal! 🍎');
    animatePetAction('feed');
}

function playWithPet() {
    updatePetStat('happiness', 15);
    updatePetStat('energy', -5);
    updatePetStat('love', 5);
    showNotification('Serenity had fun playing! 🎾');
    animatePetAction('play');
}

function lovePet() {
    updatePetStat('happiness', 8);
    updatePetStat('love', 20);
    showNotification('Serenity feels loved! ❤️');
    animatePetAction('love');
}

function updatePetStat(stat, change) {
    petStats[stat] = Math.max(0, Math.min(100, petStats[stat] + change));
    
    // Update UI
    const statBar = document.getElementById(stat + 'Bar');
    const statValue = document.getElementById(stat + 'Value');
    
    if (statBar && statValue) {
        statBar.style.width = petStats[stat] + '%';
        statValue.textContent = petStats[stat] + '%';
    }

    // Check for level up
    if (petStats.happiness >= 100 && petStats.energy >= 100 && petStats.love >= 100) {
        levelUp();
    }
}

function levelUp() {
    petStats.level++;
    const levelElement = document.querySelector('.pet-level');
    if (levelElement) {
        levelElement.textContent = petStats.level;
        levelElement.style.animation = 'none';
        setTimeout(() => {
            levelElement.style.animation = 'petFloat 1s ease-in-out';
        }, 100);
    }
    showNotification('Level Up! Serenity reached level ' + petStats.level + '! 🌟');
}

function animatePetAction(action) {
    const petAvatar = document.getElementById('petAvatar');
    petAvatar.classList.add('pet-happy');
    
    // Add action-specific effects
    switch(action) {
        case 'feed':
            petAvatar.style.transform = 'scale(1.1)';
            break;
        case 'play':
            petAvatar.style.animation = 'none';
            setTimeout(() => petAvatar.style.animation = 'petFloat 3s ease-in-out infinite', 100);
            break;
        case 'love':
            createHearts();
            break;
    }
    
    setTimeout(() => {
        petAvatar.classList.remove('pet-happy');
        petAvatar.style.transform = '';
    }, 1000);
}

function createHearts() {
    const petAvatar = document.getElementById('petAvatar');
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = (Math.random() * 100) + 'px';
            heart.style.top = (Math.random() * 100) + 'px';
            heart.style.animation = 'sparkleAnim 2s ease-in-out';
            heart.style.fontSize = '1.5rem';
            petAvatar.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 200);
    }
}

// Game Functions
function startGame(gameType) {
    gameState.currentGame = gameType;
    gameState.score = 0;
    gameState.currentQuestion = 0;
    
    const modal = document.getElementById('gameModal');
    const gameContent = document.getElementById('gameContent');
    
    // Show modal
    modal.style.display = 'block';
    
    // Load game content based on type
    switch(gameType) {
        case 'mood-decoder':
            loadMoodDecoderGame(gameContent);
            break;
        case 'scroll-race':
            loadScrollRaceGame(gameContent);
            break;
        case 'personality-jigsaw':
            loadPersonalityJigsawGame(gameContent);
            break;
        case 'scavenger-hunt':
            loadScavengerHuntGame(gameContent);
            break;
        case 'mini-pets':
            loadMiniPetsGame(gameContent);
            break;
        default:
            gameContent.innerHTML = '<h3>Game Coming Soon!</h3><p>This game is under development.</p>';
    }
}

function loadMoodDecoderGame(container) {
    const questions = [
        {
            text: "Someone sends: 'I'm fine... really.' with a long pause before responding. What emotion are they likely feeling?",
            options: ["Happiness", "Sadness", "Anger", "Anxiety"],
            correct: 1
        },
        {
            text: "A message reads: 'Whatever, I don't care anymore 🙄'. What's the primary emotion?",
            options: ["Indifference", "Frustration", "Joy", "Fear"],
            correct: 1
        },
        {
            text: "Someone types: 'OMG!!! I can't believe this happened!!!' What are they feeling?",
            options: ["Excitement", "Shock", "Anger", "Sadness"],
            correct: 0
        }
    ];
    
    gameState.questions = questions;
    displayMoodQuestion(container);
}

function displayMoodQuestion(container) {
    const question = gameState.questions[gameState.currentQuestion];
    
    container.innerHTML = `
        <div class="game-interface">
            <h3>Mood Decoder Quiz</h3>
            <div class="game-score">Score: ${gameState.score} / ${gameState.questions.length}</div>
            <div class="game-question">${question.text}</div>
            <div class="game-options">
                ${question.options.map((option, index) => 
                    `<button class="option-btn" onclick="answerMoodQuestion(${index})">${option}</button>`
                ).join('')}
            </div>
        </div>
    `;
}

function answerMoodQuestion(selectedIndex) {
    const question = gameState.questions[gameState.currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        gameState.score++;
        showNotification('Correct! Great emotional insight! 🎉');
    } else {
        showNotification('Not quite. Keep practicing your empathy skills! 💪');
    }
    
    gameState.currentQuestion++;
    
    if (gameState.currentQuestion < gameState.questions.length) {
        setTimeout(() => {
            displayMoodQuestion(document.getElementById('gameContent'));
        }, 1500);
    } else {
        finishGame();
    }
}

function loadScrollRaceGame(container) {
    let racePosition = 0;
    let raceActive = false;
    let raceStartTime = null;
    
    container.innerHTML = `
        <div class="game-interface">
            <h3>Scroll Race</h3>
            <div class="game-score">Position: 0%</div>
            <div class="scroll-race-track">
                <div class="race-player" id="racePlayer" style="left: 0%;">🏃</div>
            </div>
            <p>Scroll as fast as you can to reach 100%!</p>
            <button onclick="startRace()" id="startRaceBtn" class="option-btn">Start Race</button>
        </div>
    `;
    
    // Add scroll event listener for race
    window.startRace = function() {
        raceActive = true;
        raceStartTime = Date.now();
        document.getElementById('startRaceBtn').style.display = 'none';
        
        const handleScroll = function() {
            if (!raceActive) return;
            
            racePosition = Math.min(100, racePosition + 2);
            const player = document.getElementById('racePlayer');
            const scoreElement = container.querySelector('.game-score');
            
            if (player) {
                player.style.left = racePosition + '%';
                scoreElement.textContent = `Position: ${Math.round(racePosition)}%`;
            }
            
            if (racePosition >= 100) {
                const endTime = Date.now();
                const raceTime = ((endTime - raceStartTime) / 1000).toFixed(1);
                raceActive = false;
                gameState.score = Math.max(0, 100 - parseInt(raceTime));
                showNotification(`Race completed in ${raceTime} seconds! 🏁`);
                window.removeEventListener('scroll', handleScroll);
                setTimeout(finishGame, 2000);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
    };
}

function loadPersonalityJigsawGame(container) {
    const puzzlePieces = [
        { id: 1, symbol: '🌟', trait: 'Optimistic' },
        { id: 2, symbol: '🤝', trait: 'Collaborative' },
        { id: 3, symbol: '🎨', trait: 'Creative' },
        { id: 4, symbol: '🔍', trait: 'Analytical' },
        { id: 5, symbol: '❤️', trait: 'Empathetic' },
        { id: 6, symbol: '⚡', trait: 'Energetic' },
        { id: 7, symbol: '🧘', trait: 'Calm' },
        { id: 8, symbol: '🎯', trait: 'Focused' },
        { id: 9, symbol: '💡', trait: 'Innovative' }
    ];
    
    let selectedPieces = [];
    let shuffledPieces = [...puzzlePieces].sort(() => Math.random() - 0.5);
    
    container.innerHTML = `
        <div class="game-interface">
            <h3>Personality Jigsaw</h3>
            <div class="game-score">Selected: ${selectedPieces.length} / 3</div>
            <p>Choose 3 pieces that best represent your personality:</p>
            <div class="puzzle-grid">
                ${shuffledPieces.map(piece => 
                    `<div class="puzzle-piece" onclick="selectPuzzlePiece(${piece.id})" data-id="${piece.id}">
                        ${piece.symbol}
                    </div>`
                ).join('')}
            </div>
            <div id="selectedTraits"></div>
        </div>
    `;
    
    window.selectPuzzlePiece = function(pieceId) {
        if (selectedPieces.includes(pieceId)) return;
        if (selectedPieces.length >= 3) return;
        
        selectedPieces.push(pieceId);
        const piece = document.querySelector(`[data-id="${pieceId}"]`);
        piece.classList.add('correct');
        
        const scoreElement = container.querySelector('.game-score');
        scoreElement.textContent = `Selected: ${selectedPieces.length} / 3`;
        
        if (selectedPieces.length === 3) {
            const traits = selectedPieces.map(id => 
                puzzlePieces.find(p => p.id === id).trait
            ).join(', ');
            
            const traitsDiv = document.getElementById('selectedTraits');
            traitsDiv.innerHTML = `<p style="margin-top: 2rem; padding: 1rem; background: #e8f5e8; border-radius: 10px;">Your personality traits: <strong>${traits}</strong></p>`;
            
            gameState.score = 100;
            setTimeout(finishGame, 3000);
        }
    };
}

function loadScavengerHuntGame(container) {
    const riddles = [
        {
            clue: "I connect hearts without wires, spread love without fires. What am I?",
            answer: "friendship",
            hint: "Think about emotional connections..."
        },
        {
            clue: "I'm silent but heard, invisible but felt. I carry your deepest thoughts. What am I?",
            answer: "whisper",
            hint: "Something you share secretly..."
        },
        {
            clue: "I grow stronger when shared, lighter when divided. What am I?",
            answer: "happiness",
            hint: "An emotion that multiplies..."
        }
    ];
    
    let currentRiddle = 0;
    
    function displayRiddle() {
        const riddle = riddles[currentRiddle];
        container.innerHTML = `
            <div class="game-interface">
                <h3>Whisper Wall Scavenger Hunt</h3>
                <div class="game-score">Riddle ${currentRiddle + 1} of ${riddles.length}</div>
                <div class="game-question">${riddle.clue}</div>
                <input type="text" id="riddleAnswer" placeholder="Enter your answer..." style="width: 100%; padding: 1rem; border-radius: 10px; border: 2px solid #ddd; margin: 1rem 0;">
                <button onclick="checkRiddleAnswer()" class="option-btn">Submit Answer</button>
                <div id="hintArea"></div>
            </div>
        `;
    }
    
    window.checkRiddleAnswer = function() {
        const userAnswer = document.getElementById('riddleAnswer').value.toLowerCase().trim();
        const correctAnswer = riddles[currentRiddle].answer;
        
        if (userAnswer === correctAnswer) {
            gameState.score += 33;
            showNotification('Correct! You found the treasure! 🏆');
            currentRiddle++;
            
            if (currentRiddle < riddles.length) {
                setTimeout(displayRiddle, 1500);
            } else {
                setTimeout(finishGame, 2000);
            }
        } else {
            const hintArea = document.getElementById('hintArea');
            hintArea.innerHTML = `<p style="color: #ff6b6b; margin-top: 1rem;">❌ Not quite right. Hint: ${riddles[currentRiddle].hint}</p>`;
        }
    };
    
    displayRiddle();
}

function loadMiniPetsGame(container) {
    const pets = [
        { name: 'Bubbles', mood: 'happy', hunger: 50, energy: 80 },
        { name: 'Shadow', mood: 'sleepy', hunger: 30, energy: 40 },
        { name: 'Spark', mood: 'excited', hunger: 70, energy: 90 }
    ];
    
    let currentPet = 0;
    
    function displayPet() {
        const pet = pets[currentPet];
        const moodEmoji = pet.mood === 'happy' ? '😊' : pet.mood === 'sleepy' ? '😴' : '🤩';
        
        container.innerHTML = `
            <div class="game-interface">
                <h3>Mini Pets Care</h3>
                <div class="game-score">Caring for: ${pet.name} ${moodEmoji}</div>
                <div style="font-size: 4rem; margin: 2rem 0;">${moodEmoji}</div>
                <div style="text-align: left; max-width: 300px; margin: 0 auto;">
                    <div class="stat">
                        <span class="stat-label">Hunger:</span>
                        <div class="stat-bar">
                            <div class="stat-fill happiness" style="width: ${pet.hunger}%"></div>
                        </div>
                        <span class="stat-value">${pet.hunger}%</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Energy:</span>
                        <div class="stat-bar">
                            <div class="stat-fill energy" style="width: ${pet.energy}%"></div>
                        </div>
                        <span class="stat-value">${pet.energy}%</span>
                    </div>
                </div>
                <div class="game-options">
                    <button class="option-btn" onclick="careMiniPet('feed')">🍎 Feed</button>
                    <button class="option-btn" onclick="careMiniPet('play')">🎾 Play</button>
                    <button class="option-btn" onclick="careMiniPet('rest')">😴 Rest</button>
                    <button class="option-btn" onclick="switchMiniPet()">➡️ Next Pet</button>
                </div>
            </div>
        `;
    }
// Pet```ats Management
let```tStats = {
    happiness:```0,
    energy: 80```   love: 100,
    level```2
};

// Game```ate Management
let gameState = {```  currentGame: null,
    score: 0,```  currentQuestion: 0,```  questions: []```

// Initialize when DOM```ads
document.addEventListener('DOMContent```ded', function() {
    ```tializePage();
    startPetAnimations();
});

// Initialize page```nctionality
function initializePage() {```  // Add click listeners for navigation
    const```vItems = document.querySelectorAll('.```-item');
    navItems```rEach(item => {
        item.addEventListener('click', function(```{
            e.preventDefault();
            nav```ms.forEach(nav => nav.classList.remove('active```;
            this.classList.add('active');
        ```
    });

    // Ad```lick listener for pet avatar
    const petAv```r = document.getElementById('petAv```r');
    if (petAvatar) {
        ```Avatar.addEventListener('click', function()```            this.classList.ad```pet-happy');
            setTimeout``` => this.classList.remove('```-happy'), 500);
            ```atePetStat('happiness', 5```            showNotification('Se```ity is happy```');
        });```  }

    handle```ponsiveNav();
    initializeModal```
}

// Initialize modal functionality
function initializeModal() {```  const modal = document.getElementById('gameModal');
    const close``` = document.querySelector('.close');

    if (close```) {
        closeBtn.addEventListener('click', close```al);
    }

    if (modal) {
        window```dEventListener('click', function(event) {
            if (event.```get === modal) {
                closeModal();
            }
        });```  }
}

// Pet Animation Functions
function startPetAnim```ons() {
    setInterval(createSp```le, 3000);
    setInterval(dec```etStats, 30000);
}```unction createSparkle() {
    const pet```tar = document.getElementById('pet```tar');
    if (!```Avatar) return;

    ```st sparkle = document.createElement('```');
    sparkle.className```'sparkle';
    ```  const x = Math.random() * 140```20;
    const y = Math.```dom() * 140 - ```
    sparkle.style.left = x```'px';
    spark```style.top = y +```x';
    
    pet```tar.appendChild(sparkle);```  setTimeout(() => sparkle.```ove(), 1500```}

function decayP```tats() {
    updatePetStat('happiness', -```
    updatePetStat```nergy', -2);
    updatePetStat```ove', -1);
}

//```t Care Functions
function fee```t() {
    updatePetStat```appiness', 10);
    updatePetS```('energy', 15```    showNotification('Se```ity enjoyed the meal! 🍎');```  animatePetAction('feed');```
function playWithPet() {
    updateP```tat('happiness', 15);
    updatePetStat```nergy', -5);
    updatePetStat('love', ```
    showNotification('```enity had fun playing! 🎾');```  animatePetAction('play```
}

function lov```t() {
    updateP```tat('happiness', 8);
    updatePetStat```ove', 20);
    showNotification('```enity feels loved! ❤️');
    animat```tAction('love');
}

function update```Stat(stat, change```
    petStats[stat] =```th.max(0, Math.min(100, petStats[stat] + change));
    
    const stat``` = document.getElementByI```tat + 'Bar');
    ```st statValue = document.getElementById(stat + ```lue');
    
    if (statBar &&```atValue) {
        statBar.style.width = pet```ts[stat] + '%';
        statValue.textContent = pet```ts[stat] + '%';
    }```   if (petStats.happiness >= 100 ```petStats.energy >= 100 ```petStats.love >= 100) {
        level```);
    }
}```unction levelUp() {
    pet```ts.level++;
    const levelElement = document.querySelector```pet-level');
    if (levelElement) {
        level```ment.textContent = petStats.level;
        ```elElement.style.animation = 'none```        setTimeout(() => {
            levelElement.style.animation =```etFloat 1s ease-in-out';
        }, 100```    }
    showNotification('Level Up! Se```ity reached level ' + petStats.level +``` 🌟');
}

function animatePetAction(action) {```  const petAvatar = ```ument.getElementById('petAvatar');
    if (!petAvatar) return```    petAvatar.classList.add('pet-happy```
    
    switch(action) {
        case ```ed':
            petAvatar.style.transform = 'scale```1)';
            break;
        case 'play':```          petAvatar.style.```mation = 'none';
            setTimeout(() => petAv```r.style.animation = '```Float 3s ease-in-out infinite```100);
            break;
        case```ove':
            createHearts();
            break```   }
    
    setTimeout(() => {```      petAvatar.classList.remove('pet-happy');
        ```Avatar.style.transform =```;
    }, 1000);
}

function createHearts```{
    const petAvatar```document.getElementById('petAvatar```
    if (!petAvatar```eturn;

    for (let```= 0; i < 5; i++) {
        setTimeout``` => {
            const heart =```cument.createElement('div');
            ```rt.innerHTML = '❤️';
            ```rt.style.position = 'absolute';```          heart.style.left = (Math.random() * 100)```'px';
            heart.style.top```(Math.random() * ```) + 'px';
            heart.style.animation```'sparkleAnim 2s ease-in-out```            heart.style.fontSize = '1```em';
            petAvatar.appendChild(heart);
            ```          setTimeout(() => heart.remove(), 2000);
        },```* 200);
    }
}

// Game Functions
function```artGame(gameType) {
    gameState```rrentGame = gameType;```  gameState.score = 0```   gameState.currentQuestion```0;
    
    ```st modal = document.getElementById('game```al');
    const gameContent =```cument.getElementById('gameContent');```  
    modal.style.display = 'block```    
    switch(gameType) {
        case```ood-decoder':
            ```dMoodDecoderGame(gameContent);
            break;```      case 'scroll-race':```          loadScrollRaceGame(```eContent);
            break;```      case 'personality-jig```':
            loadPersonality```sawGame(gameContent);
            break;
        case```cavenger-hunt':
            loa```avengerHuntGame(gameContent);
            break;```      case 'mini-pets':```          loadMiniPetsGame```meContent);
            break;
        ```ault:
            gameContent.innerHTML```'<h3>Game Coming Soon```h3><p>This game is under development.```>';
    }
}```/ Complete Mini Pets Game
function loadMini```sGame(container) {```  const pets = [
        { name: 'Bubbles', mood: 'happy', hunger: 50, energy: 80, coins: 10 },
        { name: 'Shadow', mood: 'sleepy', hunger: 30, energy: 40, coins: 15 },
        { name: 'Spark', mood: 'excited', hunger: 70, energy: 90, coins: 5 }
    ];
    
    let currentPet = 0```   let userCo``` = 25;
    
    function displayP```) {
        const pet =```ts[currentPet];
        ```st moodEmoji = pet.mood === 'happy' ? '```: pet.mood === 'sleepy' ? '```: '🤩';
        
        container.innerHTML =```            <div class="game-interface">
                <h3```ni Pets Care</h3```               <div class="game```ore">Your Coins: ${userCoins}```/div>
                <div```ass="pet-display-mini```                    <h```{pet.name} ${moodEmoji}</h4```                   <div style```ont-size: 4rem```argin: 1rem 0;">${moodEm```}</div>
                </div>
                <div style```ext-align: left; max```dth: 300px; margin``` auto;">
                    <div class="stat">```                      <span class="stat-label">Hunger:</span>```                      <div class="stat-bar">
                            <div class```tat-fill happiness" style="width: ${pet.hunger}%```/div>
                        </div>
                        <span class="```t-value">${pet.hunger}%</span>
                    ```iv>
                    <div class="stat">
                        ```an class="stat-label">Energy:</span>
                        <div```ass="stat-bar">
                            <div class="stat-fill```ergy" style="width: ${pet.energy}%"></div>```                      </div>
                        <span class="stat-value"```pet.energy}%</span>
                    </div>```              </div>
                <div class="```e-options">
                    <button class="option-btn" onclick```areMiniPet('feed')" ${userCoins ``` ? 'disabled' : ''``` Feed (5💰)</button>
                    ```tton class="option-btn" onclick```areMiniPet('play')" ${userCoins < ``` 'disabled' : ''``` Play (3💰)</button>
                    <button class="option-btn"```click="careMiniPet('```t')">😴 Rest (Free```button>
                    <button class```ption-btn" onclick="switchMiniPet()">➡```ext Pet</button>
                </div>```              <p style="font-size: 0.9rem```olor: #666; margin-top: 1rem;">Care```r pets to earn coins and see them```ppy!</p>
            </div>```      `;
    }
    
    window.careMiniPet = function(action```
        const pet = pets[currentPet];```      
        switch(action) {
            case ```ed':
                if (userCoins >= 5)```                    userCoins -= 5;
                    pet```nger = Math.max(0, pet.hunger - 20```                    pet.moo``` 'happy';
                    ```rCoins += 2```                   showNotification(`${pet.name} enjoyed the meal! +```oins`);
                }```              break;
            case 'play':
                if (user```ns >= 3) {```                  userCoins -= 3```                   pet.energy =```th.min(100, pet.energy + ```;
                    pet.mood =```xcited';
                    user```ns += 3;
                    showNotification(`${pet.name} had fun playing```3 coins`);
                }
                break;
            ```e 'rest':
                pet```ergy = Math.min(100```et.energy + 25```                pet.mood = ```eepy';
                userCo``` += 1;
                showNotification(`${pet.name} is```ll rested! +1 coin`);
                break;
        ```       
        displayPet();
    };
    ```  window.switchMiniPet = function```{
        currentPet =```urrentPet + 1)```pets.length;
        display```();
    };
    ```  displayPet();
    game```te.score = userCoins;
}```/ Complete Mood Decoder Game
function loa```odDecoderGame(container) {
    const questions = [
        {
            text: "Someone sends: 'I'm fine... really.' with a long pause before responding. What emotion are they likely feeling?",
            options: ["Happiness", "Sadness", "Anger", "Anxiety"],
            correct: 1
        ```        {
            text:``` message reads: 'Whatever``` don't care anymore 🙄'.```at's the primary emotion?",
            options: ["Indifference", "Frustration", "Joy", "Fear"],
            correct: 1```      },
        {
            text: "Someone types: '```!!! I can't believe this happened!!```What are they feeling?",
            options:``` ["Excitement", "Shock", "Anger", "Sadness"],
            correct: 0```      },
        {
            text: "A voice```ip sounds tired and monotone: 'Yeah``` sure... sounds great.' What do you```tect?",
            options: ["Enthusiasm", "Sarcasm/Disinterest", "Confusion", "Anger"],
            correct: 1```      },
        {
            text```Text message: 'I guess```ll just stay home```night 😔' What's the underlying```eling?",
            options: ["Relief", "Loneliness", "Anger", "Excitement"],
            correct: 1```      }
    ];
    
    game```te.questions = questions;
    displayMoodQuestion(```tainer);
}

function displayMoodQuestion(container) {
    ```st question = gameState.questions[gameState.currentQuestion];
    
    container.innerHTML = `
        <div class="game-interface```            <h3>Mood Decoder Quiz</h3>```          <div class="game-```re">Score: ${gameState.score} /```gameState.questions.length}</div>
            <div class="```e-question">${question.text}```iv>
            <div class="```e-options">
                ${question```tions.map((option, index) => 
                ``` `<button class="option-```" onclick="answerMoo```estion(${index})">${option}</button>`
                ```oin('')}
            </div```           <div class="progress```r">
                <div class```rogress-fill" style="width```{(gameState.current```stion / gameState.questions.length``` 100}%"></div>
            </div>
        ```iv>
    `;
}

function answerMoodQuestion(selecte```dex) {
    const question =```meState.questions[gameState.currentQuestion];
    const isCorrect = selectedIndex === question.```rect;
    
    if (```orrect) {
        game```te.score++;
        showNot```cation('Correct! Great emotional insight```');
    } else {
        showNotification```ot quite. Keep practicing your emp```y skills! 💪');
    }
    
    gameState```rrentQuestion++;
    
    if (gameState.currentQuestion```gameState.questions.length)```        setTimeout(() => {
            displayMoo```estion(document.getElementById('gameContent'));
        ```1500);
    } else {
        ```ishGame();
    }
}```/ Complete Scroll Race Game
function loa```rollRaceGame(container) {```  let racePosition = 0;
    let r```Active = false;
    let```ceStartTime = null;
    let```ceInterval = null;
    ```  container.innerHTML = `
        <div```ass="game-interface">
            ```>Scroll Race```3>
            <div class="game-score">Position```%</div>
            ```v class="scroll-race-track```                <div class="race```ayer" id="racePlayer" style="left: 0%;">```div>
                ```v class="finish-line">```div>
            ```iv>
            <p>``` mouse wheel, arrow keys, or space```r to scroll!</p>
            <button```click="startRace()" i```startRaceBtn" class="option```n">Start Race</button>
            ```v id="raceInstructions">``` ready to scroll``` fast as you can!</div>```      </div>
    `;
    
    window```artRace = function() {```      raceActive```true;
        raceStart```e = Date.now();
        ```ePosition = 0;
        ```ument.getElementById('start```eBtn').style.display = 'none';```      document.getElementById('raceIn```uctions').style.display = ```ne';
        
        const```ndleScrollInput```function(e) {
            if (!```eActive) return;
            ```          e```eventDefault();
            r```Position =```th.min(100```acePosition + 3```            const player = document.getElementById('racePlayer```
            const scoreElement```container.querySelector('.game-score');```          
            if (player) {
                player.style.left```racePosition + '%';
                scoreElement.textContent = `Position: ${Math.round(racePosition)}%```            }
            
            if (racePosition >=```0) {
                const endTime = Date.now();
                ```st raceTime = ((endTime - raceStartTime)```1000).toFixed(1);
                r```Active = false;
                game```te.score = Math.max(0, ``` - parseInt(raceTime```
                showNotification(`Race completed in ${raceTime} seconds! ```;
                cleanup();
                setTimeout```nishGame, 2000);
            }
        };```      
        const cleanup = function() {
            window```moveEventListener('wheel', handleScrollInput);
            window```moveEventListener('keydown',```ndleKeyScroll);
            clear```erval(raceInterval);
        ```        
        const handleKeyScroll = function(e```
            if (e.key === 'ArrowDown```| e.key === 'Ar```Up' || e.key === ' ')```                handleScrollInput(e);
            }```      };
        
        window.addEventListener('wheel', handleScrollInput```        window.addEventListener('keydown', handleKeyScroll);```      
        // Auto progress for```mo
        raceInterval = setInterval``` => {
            if (r```Active && racePosition < ```) {
                handleScrollInput({```eventDefault: () => {} });
            ```       }, 200);
    };
}```/ Complete Personality Jig``` Game
function loadPersonalityJigsawGame(container)```    const puzzlePieces = [
        { id: 1, symbol: '🌟', trait: 'Optimistic' },
        { id: 2, symbol: '🤝', trait: 'Collaborative' },
        { id: 3, symbol: '🎨', trait: 'Creative' },
        { id: 4, symbol: '🔍', trait: 'Analytical' },
        { id: 5, symbol: '❤️', trait: 'Empathetic' },
        { id: 6, symbol: '⚡', trait: 'Energetic' },
        { id: 7, symbol: '🧘', trait: 'Calm' },
        { id: 8, symbol: '🎯', trait: 'Focused' },
        { id: 9, symbol: '💡', trait: 'Innovative' }
    ];
    
    let```lectedPieces = [];
    let shuffledPieces = [...puzzlePieces].sort(() => Math.random() -```5);
    
    container.innerHTML = `
        ```v class="game-interface">
            <h3>Personality```gsaw</h3>
            <div class="game-```re">Selected: ${selectedPieces.length} /```/div>
            <p```oose 3 pieces that best```present your personality:</p>
            <div class="```zle-grid">
                ${shuffledPieces.map(piece``` 
                    `<div class="```zle-piece" onclick="selectPuzz```iece(${piece.id})" data-id="${piece.id}">
                ```     ${piece.symbol}
                    ```iv>`
                ).join('')```           </div>
            ```v id="selecte```aits"></div>
        </div>
    `;
    
    window.selectPuzzlePiece```function(pieceId) {```      if (selectedPieces.includes```eceId)) return;
        if```electedPieces.length >=``` return;
        
        selectedPieces.push(```ceId);
        const piece = ```ument.querySelector(`[data-id="${pieceId}"]`);
        piece.classList.add('correct```
        piece.style.pointerEvents = 'none';```      
        const scoreElement = container.querySelector('.game-```re');
        scoreElement.textContent = `Selected: ${selectedP```es.length} / 3`;
        
        if```electedPieces.length === 3) {
            const traits```selectedPieces.map(id => ```              puzzlePieces.find(p => p.id ===```).trait
            ).join(', ');
            ```          const traitsDiv = document.getElementById('selectedTraits```
            traitsDiv.innerHTML````<p style="margin-```: 2rem; padding: 1rem; background: #```5e8; border-radius: 10```">Your personality traits: <strong>${traits}</strong></p>```            
            gameState.score =```0;
            setTimeout(finishGame, 3```);
        }
    };
}```/ Complete Scavenger Hunt Game
function loadScavenger```tGame(container) {
    const ri```es = [
        {
            clue: "I connect hearts without wires, spread love without fires. What am I?",
            answer: "friendship",
            hint: "Think about emotional connections..."
        },
        {
            clue: "I'm silent but heard, invisible but felt. I carry your deepest thoughts. What am I?",
            answer: "whisper",
            hint: "Something you share secretly..."
        },
        {
            clue: "I grow stronger when shared, lighter when divided. What am I?",
            answer: "happiness",
            hint: "An emotion that multiplies..."
        },
        {
            clue: "I have no body but can fill a room, I have no voice but can break silence. What am I?",
            answer: "laughter",
            hint: "A joyful sound..."
        }
    ];
    
    let```rrentRiddle = 0;```  
    function displayRiddle() {
        ```st riddle = riddles[currentRiddle];
        container```nerHTML = `
            <div class="game-interface">
                ```>Whisper Wall```avenger Hunt</h3>```              <div class="game-score">```dle ${currentRiddle + 1}``` ${riddles.length}</div>```              <div class="game```estion">${riddle.clue}</div>
                <input```pe="text" id="riddleAnswer```laceholder="Enter your answer..." style="width: 100%; padding:```em; border```dius: 10px; border: 2px soli```ddd; margin: 1rem 0;```nt-size: 1rem;">
                <button```click="checkRiddleAnswer()" class="option-```">Submit Answer</button>
                <div i```hintArea"></div>
                ```v class="progress-bar">
                    <div```ass="progress-fill" style="```th: ${(currentRiddle / riddles```ngth) * 100}%"></div>
                </div>```          </div>
        `;
        ```      setTimeout(() => {
            ```ument.getElementById('riddleAnswer').focus```
        }, 100);
    }
    
    ```dow.checkRiddleAnswer = function```{
        const userAnswer = document.getElementById('riddle```wer').value.toLowerCase().trim();
        const correct```wer = riddles[currentRiddle].answer;```      
        if (userAnswer```= correctAnswer) {
            game```te.score += 25;
            showNotification('```rect! You found the treasure! 🏆');
            ```rentRiddle++;
            
            if (currentRiddle ```iddles.length) {
                setTimeout(displayRiddle, ```0);
            } else {
                setTimeout```nishGame, 2000);
            }
        }```se {
            const hintArea = document.getElementById('```tArea');
            hintArea.innerHTML = `<p style```olor: #ff6b6b; margin-```: 1rem; padding: 1rem; background: #```6e6; border-radius```0px;">❌ Not quite right```int: ${riddles[currentRiddle].```t}</p>`;
        }
    };
    
    ```playRiddle();
}

// Game completion function
function finishGame() {```  const gameContent```document.getElementById('gameContent');```  const gameType```gameState.currentGame```   
    let```ssage = '';
    let points = 0;
    
    ```tch(gameType) {
        case 'mood-```oder':
            points = gameState.score *```;
            message = `You score```{gameState.score}/${gameState.questions.length}```rrect answers!```            break;
        case```croll-race':
            ```nts = gameState.score;```          message = `Amazing speed! You earned ${points```oints!`;
            break;```      case 'personality-jigsaw':
            points = ```;
            message = `Personality revealed! You earned ${points} points!```            break;
        case```cavenger-hunt':```          points = gameState.score;
            message =```reat detective work! You earned ${points} points```
            break;
        ```e 'mini-pets':
            points = gameState.```re;
            message = `You earned ${points} coins caring```r pets!`;
            break;```  }
    
    gameContent.innerHTML = `
        ```v class="game-interface">
            <h3>Game Complete!```3>
            <div class="game-complete```                <div class="score```splay">
                    <h```tyle="color: #4c```0; font-size: 2.```m; margin: 1rem```">${points} Points!```2>
                    <p```yle="font-size: 1.2rem```argin-bottom: 2rem;">${message}</p>```              </div>
                <div class="completion```imation" style="font-size: 3```; margin: 1rem 0;">```div>
            </div>
            <div```yle="display: flex; gap: 1rem```ustify-content: center; flex```ap: wrap;">
                ```tton onclick="closeModal()" class="option-btn">```se</button>
                <button onclick="start```e('${gameType}')" class="option-```" style="background: #667```;">Play Again</button>
            ```iv>
        </div>```  `;
    
    update```Stat('happiness', Math```n(10, points / 10));
}```/ Modal and utility functions
function close```al() {
    const modal = document.getElementById('gameModal```
    modal.style.display = 'none';
    game```te.currentGame = null;
}

function handleRespon```eNav() {
    const nav```gle = document.querySelector('.nav-toggle');
    const navMenu```document.querySelector('.nav-menu');
    
    if```avToggle && navMenu) {
        navToggle.addEventListener```lick', () => {
            navMenu.classList.toggle('active```
        });
    }```
function showNotification(message)```    const existing = document.querySelector('.notification');```  if (existing) {
        existing.remove();
    }```  
    const notification = document.```ateElement('div');
    notification.className = 'notification';
    ```ification.textContent = message;
    ```  document.body.appendChild(notification);```  
    setTimeout(() => notification.classList```d('show'), 100);
    ```  setTimeout(() => {
        notification```assList.remove('show');
        setTimeout(() => notification.remove(),```0);
    }, 3```);
}

function viewFullLeaderboard() {
    const```aderboardData = [
        { rank: 1, name: 'CozyHeart92', level: 25, score: 2840, avatar: '🌟' },
        { rank: 2, name: 'EmpatheticSoul', level: 24, score: 2750, avatar: '❤️' },
        { rank: 3, name: 'DigitalHugger', level: 23, score: 2690, avatar: '🤗' },
        { rank: 4, name: 'WarmConnection', level: 22, score: 2580, avatar: '🔥' },
        { rank: 5, name: 'You', level: 21, score: 2420, avatar: '👤' },
        { rank: 6, name: 'KindSpirit', level: 20, score: 2380, avatar: '✨' },
        { rank: 7, name: 'GentleVibes', level: 19, score: 2340, avatar: '🌸' },
        { rank: 8, name: 'CompassionateOne', level: 18, score: 2290, avatar: '🕊️' },
        { rank: 9, name: 'TenderHeart', level: 17, score: 2250, avatar: '💝' },
        { rank: 10, name: 'SoftWhisper', level: 16, score: 2200, avatar: '🌙' }
    ];
    
    const```dal = document.getElementById('gameModal');
    const game```tent = document.getElementById('gameContent');
    ```  modal.style.display = 'block```    
    gameContent.innerHTML = `
        ```v class="game-interface">
            <h3```ll Leaderboard</h3>```          <div class="full-leaderboard">
                ${```derboardData.map(player => `
                    <div class="leaderboard-item```player.name === 'You' ? '```k-you' : ''}">
                        ```v class="rank">${player.rank}</div>
                        ```v class="player-info">
                            <h```{player.avatar} ${player.name}</h4>```                          <p>Level ${```yer.level}</p>
                ```     </div>
                        <div```ass="score">
                            <span```ass="score-icon">```span>
                            ```an>${player.score}</span>```                      </div>
                ``` </div>
                `).join('')}
            </div>```          <button onclick="closeModal()" class="```ion-btn">Close</button>```      </div>
    ```}
