console.log('Script loaded!');
const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const versionSelector = document.getElementById('version-selector');

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

  // Simulate delay for typing indicator
  setTimeout(() => {
    const botResponse = getBotResponse(message); // Get response based on the selected version
    chatBox.removeChild(typingIndicator); // Remove typing indicator

    // Display bot response
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.textContent = botResponse;
    chatBox.appendChild(botMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1500); // Wait 1.5 seconds before displaying response
}

// Function to return pre-programmed bot responses based on version
function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  const selectedVersion = versionSelector.value;

  let responses = [];

  // Define responses for different versions
  if (selectedVersion === 'basic') {
    responses = [
      { question: 'hello', answer: "Hello! How can I help you today?" },
      { question: 'hi', answer: "Hello! How can I help you today?" },
      { question: 'how are you', answer: "I'm doing great, thank you for asking!" },
      { question: 'your name', answer: "I am ThinkBot, your friendly assistant!" }
    ];
  } else if (selectedVersion === 'intermediate') {
    responses = [
      { question: 'hello', answer: "Hello! How can I assist you today?" },
      { question: 'hi', answer: "Hello! How can I help you today?" },
      { question: 'how are you', answer: "I'm doing well, thank you for asking!" },
      { question: 'your name', answer: "I am ThinkBot, designed to help you with a variety of tasks!" },
      { question: 'what is 2+2', answer: "2 + 2 equals 4." },
      { question: 'what is the capital of france', answer: "The capital of France is Paris." }
    ];
  } else if (selectedVersion === 'advanced') {
    responses = [
      { question: 'hello', answer: "Hello! I'm ThinkBot, ready to help with anything!" },
      { question: 'hi', answer: "Hi there! How can I assist you today?" },
      { question: 'how are you', answer: "I'm doing great, thanks for asking!" },
      { question: 'your name', answer: "I am ThinkBot, an advanced AI chatbot." },
      { question: 'what is the weather today', answer: "I can look up the weather for you if you enable that feature!" },
      { question: 'what is the square root of 16', answer: "The square root of 16 is 4." },
      { question: 'calculate 45*9', answer: "45 * 9 equals 405." }
    ];
  }

  // Fuse.js options for fuzzy matching
  const fuse = new Fuse(responses, {
    keys: ['question'], // Search in the 'question' field
    includeScore: true,  // Include match score in results
    threshold: 0.4,      // Lower threshold for better matching flexibility
    useExtendedSearch: true  // Allow partial matches (like "whats" for "what's")
  });

  // Perform fuzzy search
  const result = fuse.search(lowerMessage);

  // Return the best matching response
  if (result.length > 0 && result[0].score < 0.4) {
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
