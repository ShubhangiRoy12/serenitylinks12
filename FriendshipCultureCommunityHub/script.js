// Sample data
const groupsData = [
  { name: 'Love Birds Club', description: 'Meet singles, make friends, and celebrate love together.' },
  { name: 'South Asian Food Lovers', description: 'Share & try regional dishes together.' },
  { name: 'Folk Music Fans', description: 'Live performances, playlists & discussions.' },
  { name: 'Festival Photographers', description: 'Capture culture through your lens.' },
  { name: 'Book Club – Regional Authors', description: 'Reading and discussing local literature.' }
];

const eventsData = [
  { name: 'Love Birds Mixer', date: 'Oct 14 • 7:00 PM', location: 'Rose Garden' },
  { name: 'Diwali Community Night', date: 'Nov 1 • 6:00 PM', location: 'Town Hall' },
  { name: 'Folk Music Night', date: 'Oct 12 • 7:30 PM', location: 'Riverside Stage' },
  { name: 'Street Food Tour', date: 'Oct 20 • 5:00 PM', location: 'Old City Market' },
  { name: 'Book Exchange Fair', date: 'Nov 10 • 4:00 PM', location: 'Community Center' }
];

// Add confetti animation for join/RSVP success
function showConfetti(target) {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('span');
    dot.className = 'confetti-dot';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.background = `hsl(${Math.random() * 360},90%,80%)`;
    dot.style.animationDelay = `${Math.random()}s`;
    confetti.appendChild(dot);
  }
  target.parentElement.appendChild(confetti);
  setTimeout(() => confetti.remove(), 1200);
}

function renderGroups() {
  const container = document.getElementById('groupsList');
  if (!container) return;
  container.innerHTML = '';
  groupsData.forEach((g, idx) => {
    const div = document.createElement('div');
    div.className = 'group-item';
    div.innerHTML = `
      <div class="group-info">
        <h4>${g.name} <span class="group-heart">💖</span></h4>
        <p class="muted">${g.description}</p>
      </div>
      <button class="join-btn btn" data-group="${idx}">Join</button>
    `;
    container.appendChild(div);
  });
}

function renderEvents() {
  const container = document.getElementById('eventList');
  if (!container) return;
  container.innerHTML = '';
  eventsData.forEach((e, idx) => {
    const div = document.createElement('div');
    div.className = 'event-item';
    div.innerHTML = `
      <div class="event-info">
        <h4>${e.name} <span class="event-heart">💞</span></h4>
        <p class="muted">${e.date} · ${e.location}</p>
      </div>
      <button class="rsvp-btn btn alt" data-event="${idx}">RSVP</button>
    `;
    container.appendChild(div);
  });
}

function handleJoinClick(e) {
  if (e.target.classList.contains('join-btn')) {
    const groupIdx = e.target.getAttribute('data-group');
    const group = groupsData[groupIdx];
    e.target.textContent = "Joined 💗";
    e.target.disabled = true;
    showConfetti(e.target);
    setTimeout(() => {
      alert(`You have joined "${group.name}"! Welcome to the community!`);
    }, 400);
  }
}

function handleRSVPClick(e) {
  if (e.target.classList.contains('rsvp-btn')) {
    const eventIdx = e.target.getAttribute('data-event');
    const event = eventsData[eventIdx];
    e.target.textContent = "RSVP'd 💌";
    e.target.disabled = true;
    showConfetti(e.target);
    setTimeout(() => {
      alert(`You have RSVP'd for "${event.name}"! See you there!`);
    }, 400);
  }
}

function handleSidebarRSVP(e) {
  if (e.target.matches('.rsvp-container .btn, .rsvp-container a')) {
    e.target.textContent = "RSVP'd 💌";
    e.target.classList.add('disabled');
    e.target.style.pointerEvents = 'none';
    showConfetti(e.target);
    setTimeout(() => {
      alert('Thank you for your RSVP!');
    }, 400);
  }
}

function handleNavClick(e) {
  if (e.target.closest('.main-nav a')) {
    e.preventDefault();
    document.querySelectorAll('.main-nav a').forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderGroups();
  renderEvents();

  // Group join button
  const groupsList = document.getElementById('groupsList');
  if (groupsList) {
    groupsList.addEventListener('click', handleJoinClick);
  }

  // Event RSVP button (if eventList exists)
  const eventList = document.getElementById('eventList');
  if (eventList) {
    eventList.addEventListener('click', handleRSVPClick);
  }

  // Sidebar RSVP button
  document.body.addEventListener('click', handleSidebarRSVP);

  // Navigation bar active state
  const mainNav = document.querySelector('.main-nav');
  if (mainNav) {
    mainNav.addEventListener('click', handleNavClick);
  }
});

/* --- Confetti CSS (add to your styles.css) ---
.confetti {
  position: absolute;
  left: 50%; top: 0;
  width: 0; height: 0;
  pointer-events: none;
  z-index: 10;
}
.confetti-dot {
  position: absolute;
  width: 12px; height: 12px;
  border-radius: 50%;
  opacity: 0.8;
  animation: confetti-fall 1s cubic-bezier(.23,1.01,.32,1) forwards;
}
@keyframes confetti-fall {
  to {
    transform: translateY(60px) scale(0.7) rotate(360deg);
    opacity: 0;
  }
}
----------------------------------------------- */
