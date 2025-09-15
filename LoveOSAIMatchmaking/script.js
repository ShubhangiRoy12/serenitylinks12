// Smooth scroll to matchmaking section
document.getElementById('getStartedBtn').onclick = function () {
  document.getElementById('matchmaking').scrollIntoView({ behavior: 'smooth' });
};

// Simple AI Matchmaking Demo
const matches = [
  { name: "Alex", interests: "music, travel, art", type: "friendship", emoji: "🎸" },
  { name: "Priya", interests: "tech, books, movies", type: "dating", emoji: "📚" },
  { name: "Samira", interests: "sports, food, travel", type: "longterm", emoji: "🍜" },
  { name: "Liam", interests: "gaming, tech, music", type: "friendship", emoji: "🎮" },
  { name: "Maya", interests: "art, yoga, nature", type: "dating", emoji: "🌿" },
  { name: "Diego", interests: "dance, food, movies", type: "longterm", emoji: "💃" }
];

let currentMatch = null;

document.getElementById('matchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('userName').value.trim();
  const interests = document.getElementById('userInterests').value.toLowerCase();
  const type = document.getElementById('userLookingFor').value;
  let found = matches.find(m =>
    m.type === type &&
    m.interests.split(',').some(i => interests.includes(i.trim()))
  );
  const result = document.getElementById('matchResult');
  const chatSection = document.getElementById('chatSection');
  if (found) {
    result.innerHTML = `<div class="match-card">
      <div class="match-emoji">${found.emoji}</div>
      <div class="match-name">${found.name}</div>
      <div class="match-desc">Shares your interests! Say hi and start chatting.</div>
    </div>`;
    chatSection.style.display = "block";
    document.getElementById('chatMessages').innerHTML = `<div class="chat-message match"><div class="bubble">Hi ${name}! 👋 I'm ${found.name}. Nice to meet you!</div></div>`;
    currentMatch = found;
  } else {
    result.innerHTML = `<div class="match-card no-match">
      <div class="match-emoji">🤔</div>
      <div class="match-name">No Match Found</div>
      <div class="match-desc">Try different interests or check back later!</div>
    </div>`;
    chatSection.style.display = "none";
    currentMatch = null;
  }
});

// Simple chat simulation
document.getElementById('chatForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  const chatMessages = document.getElementById('chatMessages');
  // User message
  chatMessages.innerHTML += `<div class="chat-message user"><div class="bubble">${msg}</div></div>`;
  input.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;
  // Simulate match reply
  if (currentMatch) {
    setTimeout(() => {
      const replies = [
        "That's interesting! Tell me more.",
        "😊",
        "I like that too!",
        "Haha, good one!",
        "How long have you been into that?",
        "Cool! What's your favorite?"
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      chatMessages.innerHTML += `<div class="chat-message match"><div class="bubble">${reply}</div></div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 900 + Math.random() * 800);
  }
});