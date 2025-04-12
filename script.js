console.log('ThinkBot loaded');

const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

let brain = {};

// Load the brain.json file
fetch('brain.json')
  .then(response => response.json())
  .then(data => {
    brain = data;
    console.log('ThinkBot brain loaded');
  })
  .catch(error => {
    console.error('Error loading brain:', error);
  });

// Handle sending message
function handleUserMessage(message) {
  addMessage(message, 'user-message');

  const lowerMessage = message.toLowerCase().trim();
  let response = brain[lowerMessage] || "I'm not sure about that. Try asking another question.";

  setTimeout(() => addMessage(response, 'bot-message'), 500);
}

function addMessage(text, className) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', className);
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message) {
    handleUserMessage(message);
    userInput.value = '';
  }
});

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
