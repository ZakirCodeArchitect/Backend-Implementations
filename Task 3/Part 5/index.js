const http = require('http');
const url = require('url');
const fs = require('fs');
const readline = require('readline');

// Set up the server to listen for incoming messages
const PORT = 8080;
const chatHistoryFile = 'chat_history.txt';

// Function to save chat messages to a file
function logMessage(message) {
  fs.appendFile(chatHistoryFile, message + '\n', (err) => {
    if (err) console.error('Error saving message:', err);
  });
}

// Create the server to receive messages
http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const message = parsedUrl.query.message;

  if (message) {
    const receivedMessage = `Received message: ${message}`;
    console.log(receivedMessage);

    // Log the received message to chat history
    logMessage(receivedMessage);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Message received\n');
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('No message found in the request\n');
  }
}).listen(PORT, () => {
  console.log(`Listening for incoming messages on port ${PORT}`);
});

// Set up command line interface to send messages
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to send a message to another node
function sendMessage(ip, message) {
  const requestUrl = `http://${ip}:${PORT}/?message=${encodeURIComponent(message)}`;

  http.get(requestUrl, (res) => {
    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`Server response: ${data}`);
    });
  }).on('error', (err) => {
    console.error('Error sending message:', err.message);
  });
}

// Chat prompt for sending messages
function chatPrompt() {
  rl.question('Enter recipient IP: ', (ip) => {
    rl.question('Enter your message: ', (message) => {
      const outgoingMessage = `Sending to ${ip}: ${message}`;
      console.log(outgoingMessage);

      // Log outgoing message to chat history
      logMessage(outgoingMessage);

      sendMessage(ip, message);

      // Prompt for next message
      chatPrompt();
    });
  });
}

// Start the chat prompt
chatPrompt();
