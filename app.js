const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messagesContainer = document.querySelector('.messages');
const appContainer = document.querySelector('.app');
const intro = document.querySelector('.intro-animation');

// Attente de l’animation avant d'afficher l'app
window.addEventListener('load', () => {
  setTimeout(() => {
    intro.style.display = 'none';
    appContainer.style.display = 'block';
  }, 3000);
});

let activeUser = 1;

function addMessage(text, user) {
  if (!text.trim()) return;
  const msgEl = document.createElement('div');
  msgEl.classList.add('message');
  msgEl.classList.add(user === 1 ? 'self' : 'other');
  msgEl.textContent = text;
  messagesContainer.appendChild(msgEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const messageText = input.value;
  if (!messageText.trim()) return;
  addMessage(messageText, activeUser);
  input.value = '';
  activeUser = activeUser === 1 ? 2 : 1;
});

// Service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('✅ SW enregistré', reg))
    .catch(err => console.error('❌ SW erreur', err));
}
