// NAVIGATION LOGIC OMITTED FOR SINGLE PAGE

// Modal logic
const modal = document.getElementById('whisperModal');
document.getElementById('shareWhisperBtn').onclick = () => modal.style.display = 'block';
document.getElementById('closeModal').onclick = () => modal.style.display = 'none';
document.getElementById('cancelWhisper').onclick = () => modal.style.display = 'none';

// Track textarea
const textElem = document.getElementById('whisperText');
const charCountElem = document.getElementById('charCount');
textElem.oninput = () => charCountElem.textContent = textElem.value.length;

// Mood selection for modal
let selectedMood = null;
document.querySelectorAll('.mood-option').forEach(btn => {
    btn.onclick = e => {
        selectedMood = btn.dataset.mood;
        document.querySelectorAll('.mood-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
    };
});

// Save whisper
document.getElementById('submitWhisper').onclick = () => {
    const text = textElem.value.trim();
    if (!text || !selectedMood) return showToast('Please write something and select a mood!');
    const whisper = {
        text,
        mood: selectedMood,
        time: new Date().toLocaleString(),
        reactions: [0, 0, 0, 0, 0]
    };
    const data = JSON.parse(localStorage.getItem('whispers') || '[]');
    data.push(whisper);
    localStorage.setItem('whispers', JSON.stringify(data));
    modal.style.display = 'none';
    textElem.value = '';
    charCountElem.textContent = '0';
    selectedMood = null;
    document.querySelectorAll('.mood-option').forEach(b => b.classList.remove('selected'));
    showToast('Whisper shared!');
    renderWhispers();
};

// Render whispers
function renderWhispers(filter = 'all') {
    const container = document.getElementById('whispersGrid');
    if (!container) return;
    const data = JSON.parse(localStorage.getItem('whispers') || '[]');
    container.innerHTML = '';
    data
        .filter(w => filter === 'all' || w.mood === filter)
        .reverse()
        .forEach((w, idx) => {
        const card = document.createElement('div');
        card.className = 'whisper-card';
        card.innerHTML = `
            <div class="whisper-mood">${formatMood(w.mood)}</div>
            <p>${w.text}</p>
            <div class="whisper-time">${w.time}</div>
            <div class="whisper-actions">
                <span class="whisper-emoji" data-idx="${idx}" data-emo="0">😊 <span class="emoji-count">${w.reactions?.[0]||0}</span></span>
                <span class="whisper-emoji" data-idx="${idx}" data-emo="1">❤️ <span class="emoji-count">${w.reactions?.[1]||0}</span></span>
                <span class="whisper-emoji" data-idx="${idx}" data-emo="2">👏 <span class="emoji-count">${w.reactions?.[2]||0}</span></span>
                <span class="whisper-emoji" data-idx="${idx}" data-emo="3">😢 <span class="emoji-count">${w.reactions?.[3]||0}</span></span>
                <span class="whisper-emoji" data-idx="${idx}" data-emo="4">🌟 <span class="emoji-count">${w.reactions?.[4]||0}</span></span>
            </div>
        `;
        container.appendChild(card);
    });
    // Add emoji click
    document.querySelectorAll('.whisper-emoji').forEach(btn => {
        btn.onclick = function () {
            const idx = data.length - 1 - parseInt(btn.dataset.idx); // reversed!
            const emo = parseInt(btn.dataset.emo);
            data[idx].reactions[emo] = (data[idx].reactions[emo] || 0) + 1;
            localStorage.setItem('whispers', JSON.stringify(data));
            renderWhispers(filter);
        };
    });
}
function formatMood(mood) {
    switch(mood) {
        case 'motivation': return '💪 Motivation';
        case 'lovely-feelings': return '💖 Lovely Feelings';
        case 'happy': return '😊 Happy';
        case 'sad': return '😢 Sad';
        case 'excited': return '🌟 Excited';
        default: return mood;
    }
}
document.querySelectorAll('.mood-filter').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.mood-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderWhispers(btn.dataset.mood);
    };
});
renderWhispers();

// Toast notifications
function showToast(msg) {
    const cont = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    cont.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}
