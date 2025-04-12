const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Function to handle user messages and responses
function handleUserMessage(message) {
  const userMessage = document.createElement('div');
  userMessage.classList.add('chat-message', 'user-message');
  userMessage.textContent = message;
  chatBox.appendChild(userMessage);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

  // Get bot response
  const botResponse = getBotResponse(message);

  // Display bot response
  const botMessage = document.createElement('div');
  botMessage.classList.add('chat-message', 'bot-message');
  botMessage.textContent = botResponse;
  chatBox.appendChild(botMessage);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to return pre-programmed bot responses
function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! How can I help you today?";
  } else if (lowerMessage.includes('how are you')) {
    return "I'm doing great, thank you for asking!";
  } else if (lowerMessage.includes('your name')) {
    return "I am a chatbot created by you!";
  } else if (lowerMessage.includes('bye')) {
    return "Goodbye! Have a great day!";
  } else {
    return "I'm sorry, I didn't understand that. Can you try again?";
  }
}

// Send message when the button is clicked
sendButton.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message) {
    handleUserMessage(message);
    userInput.value = ''; // Clear input after sending
  }
});

// Send message when the user presses "Enter"
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
