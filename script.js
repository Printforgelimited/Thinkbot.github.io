console.log('Script loaded!');
const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Function to handle user messages and responses
function handleUserMessage(message) {
  const userMessage = document.createElement('div');
  userMessage.classList.add('chat-message', 'user-message');
  userMessage.textContent = message;
  chatBox.appendChild(userMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('typing-indicator');
  typingIndicator.textContent = 'ThinkBot is typing...';
  chatBox.appendChild(typingIndicator);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    const botResponse = getBotResponse(message);
    chatBox.removeChild(typingIndicator);

    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.textContent = botResponse;
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 800); // Simulate typing delay
}

// Function to return pre-programmed bot responses
function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! How can I help you today?";
  } else if (lowerMessage.includes('how are you')) {
    return "I'm doing great, thank you for asking!";
  } else if (lowerMessage.includes('your name')) {
    return "I am ThinkBot, your friendly assistant!";
  } else if (lowerMessage.includes('bye')) {
    return "Goodbye! Have a great day!";
  } else if (lowerMessage.includes('what is')) {
    try {
      const result = eval(lowerMessage.replace('what is', ''));
      if (!isNaN(result)) return `The answer is ${result}`;
    } catch (e) {}
  }

  return "I'm not sure how to answer that yet. Want to teach me?";
}

// Send message when the button is clicked
sendButton.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message) {
    handleUserMessage(message);
    userInput.value = '';
  }
});

// Send message when the user presses "Enter"
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});
