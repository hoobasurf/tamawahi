// Sélecteurs DOM
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messagesContainer = document.querySelector('.messages');

// Utilisateur actif (1 ou 2)
let activeUser = 1;

// Fonction pour créer et afficher un message
function addMessage(text, user) {
  if (!text.trim()) return; // ignore message vide

  const msgEl = document.createElement('div');
  msgEl.classList.add('message');
  if (user === 1) {
    msgEl.classList.add('self');
  } else {
    msgEl.classList.add('other');
  }
  msgEl.textContent = text;

  messagesContainer.appendChild(msgEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // scroll bas
}

// Gestion formulaire
form.addEventListener('submit', e => {
  e.preventDefault();
  const messageText = input.value;
  if (!messageText.trim()) return;

  addMessage(messageText, activeUser);
  input.value = '';
  
  // Alterner utilisateur (1 -> 2 -> 1 ...)
  activeUser = activeUser === 1 ? 2 : 1;
});

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service worker enregistré:', reg))
      .catch(err => console.log('Erreur Service Worker:', err));
  });
}
