console.log('Script loaded!');

const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

let brain = {}; // This will hold the loaded Q&A data

// Load brain.json
fetch('brain.json')
  .then(response => response.json())
  .then(data => {
    brain = data;
    console.log('Brain loaded:', brain);
  })
  .catch(error => {
    console.error('Failed to load brain.json:', error);
  });

// Handle user messages
function handleUserMessage(message) {
  // Display user message
  const userMessage = document.createElement('div');
  userMessage.classList.add('chat-message', 'user-message');
  userMessage.textContent = message;
  chatBox.appendChild(userMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Get bot response and display
  const botResponse = getBotResponse(message);
  const botMessage = document.createElement('div');
  botMessage.classList.add('chat-message', 'bot-message');
  botMessage.textContent = botResponse;
  chatBox.appendChild(botMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Match user input to the brain
function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase().trim();

  // Direct match
  if (brain[lowerMessage]) {
    return brain[lowerMessage];
  }

  // Fallback message
  return "I'm not sure how to answer that yet.";
}

// Send message on button click
sendButton.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message) {
    handleUserMessage(message);
    userInput.value = '';
  }
});

// Send message on Enter key
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

