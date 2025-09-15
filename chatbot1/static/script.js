const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

/* Ambient Sounds */
const audios = {
  cozy: document.getElementById("audio-cozy"),
  pixel: document.getElementById("audio-pixel"),
  night: document.getElementById("audio-night")
};
let currentAudio = audios.cozy;

/* Send Message */
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  const persona = document.getElementById("personaSelect").value;
  appendMessage("You", message);

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, persona })
  });

  const data = await res.json();
  appendMessage("Bot", data.reply);
  speak(data.reply);
  userInput.value = "";
}

/* Append Chat */
function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender.toLowerCase();
  msg.textContent = `${sender}: ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* Voice Input */
function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();
  recognition.onresult = function (event) {
    userInput.value = event.results[0][0].transcript;
    sendMessage();
  };
}

/* Voice Output */
function speak(text) {
  const voiceType = document.getElementById("voiceSelect").value;
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(v => voiceType === "female" ? v.name.includes("Female") || v.name.includes("Samantha") : v.name.includes("Male") || v.name.includes("Alex")) || voices[0];
  speechSynthesis.speak(utterance);
}

/* Theme Switch + Sound Control */
document.getElementById("themeSelect").addEventListener("change", (e) => {
  document.body.className = `theme-${e.target.value}`;

  // Stop current audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Play new theme audio
  currentAudio = audios[e.target.value];
  if (currentAudio) {
    currentAudio.volume = 0.4;
    currentAudio.play();
  }
});

/* Auto-play Cozy theme audio on load */
window.onload = () => {
  currentAudio.volume = 0.4;
  currentAudio.play();
};
