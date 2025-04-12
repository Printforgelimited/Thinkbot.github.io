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

// Function to return pre-programmed bot responses with Fuse.js fuzzy matching
function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  const responses = [
    { question: 'hello', answer: "Hello! How can I help you today?" },
    { question: 'hi', answer: "Hello! How can I help you today?" },
    { question: 'how are you', answer: "I'm doing great, thank you for asking!" },
    { question: 'your name', answer: "I am ThinkBot, your friendly assistant!" },
    { question: 'bye', answer: "Goodbye! Have a great day!" },
    { question: 'what is', answer: "Please provide more context, I can help with definitions or math problems." },
    { question: 'what is 2+2', answer: "2 + 2 is 4." },
    { question: 'what is the capital of france', answer: "The capital of France is Paris." }
  ];

  // Fuse.js options for fuzzy matching
  const fuse = new Fuse(responses, {
    keys: ['question'], // Search in the 'question' field
    includeScore: true,  // Include match score in results
    threshold: 0.3       // Adjust the threshold for fuzzy matching (lower is stricter)
  });

  // Perform fuzzy search
  const result = fuse.search(lowerMessage);

  if (result.length > 0) {
    return result[0].item.answer; // Return the answer of the best match
  }

  return "I'm not sure how to answer that yet. Want to teach me?";
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
