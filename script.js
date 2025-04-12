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

// Function to return pre-programmed bot responses with fuzzy matching
function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  const responses = [
    { question: 'hello', answer: "Hello! How can I help you today?" },
    { question: 'hi', answer: "Hello! How can I help you today?" },
    { question: 'how are you', answer: "I'm doing great, thank you for asking!" },
    { question: 'your name', answer: "I am ThinkBot, your friendly assistant!" },
    { question: 'bye', answer: "Goodbye! Have a great day!" },
    { question: 'what is', answer: "Please provide more context, I can help with definitions or math problems." },
  ];

  // Fuzzy matching function (basic version)
  const bestMatch = findBestMatch(lowerMessage, responses);

  if (bestMatch) {
    return bestMatch.answer;
  }

  return "I'm not sure how to answer that yet. Want to teach me?";
}

// Simple fuzzy match based on substring occurrence (this can be more advanced)
function findBestMatch(message, responses) {
  let bestMatch = null;
  let highestMatchScore = 0;

  responses.forEach(response => {
    const score = calculateMatchScore(message, response.question);
    if (score > highestMatchScore) {
      bestMatch = response;
      highestMatchScore = score;
    }
  });

  return bestMatch;
}

// A very basic similarity score function using substring occurrence
function calculateMatchScore(message, question) {
  const commonWords = message.split(' ').filter(word => question.includes(word));
  return commonWords.length / question.split(' ').length;  // Simple ratio of matching words
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
