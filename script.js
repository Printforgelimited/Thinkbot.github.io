console.log('Script loaded!');

// Dark Mode Toggle Script
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '🌞';  // Change to Sun icon
  } else {
    darkModeToggle.textContent = '🌙';  // Change to Moon icon
  }
});

// Get bot response from OpenAI API
async function getBotResponse(userMessage) {
  const apiKey = 'your-openai-api-key'; // Replace with your OpenAI API key
  const model = 'gpt-4';  // Or use 'gpt-3.5-turbo'

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage },
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content; // Bot response
}

// Handle user input and display chat
async function handleUserMessage(message) {
  const userMessage = document.createElement('div');
  userMessage.classList.add('chat-message', 'user-message');
  userMessage.textContent = message;
  document.getElementById('chat-box').appendChild(userMessage);
  document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

  // Typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('typing-indicator');
  typingIndicator.textContent = 'ThinkBot is typing...';
  document.getElementById('chat-box').appendChild(typingIndicator);
  document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

  // Simulate delay for typing indicator
  setTimeout(async () => {
    const botResponse = await getBotResponse(message); // Fetch response from OpenAI
    document.getElementById('chat-box').removeChild(typingIndicator); // Remove typing indicator

    // Display bot response
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.textContent = botResponse;
    document.getElementById('chat-box').appendChild(botMessage);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
  }, 1500); // Wait 1.5 seconds before displaying response
}

// Send message when the button is clicked
document.getElementById('send-btn').addEventListener('click', () => {
  const message = document.getElementById('user-input').value.trim();
  if (message) {
    handleUserMessage(message);
    document.getElementById('user-input').value = ''; // Clear input after sending
  }
});

// Send message when the user presses "Enter"
document.getElementById('user-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('send-btn').click();
  }
});
