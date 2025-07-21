//Creates a new directory for your project and navigate into it
//Open your terminal or command prompt and run
mkdir my-express-app
cd my-express-app

//Initialize a new Node.js project.
//While inside your my-express-app directory, run
npm init -y

//Install Express.js and required dependencies
npm install express

//Create your basic Express server file.

//Create a new file named app.js (or server.js, index.js – common conventions) in your my-express-app directory.

//Implement the basic Express server and "Hello World" route.
//Open app.js and type
// Import the express module
const express = require('express');

// Create an Express application instance
const app = express();

// Define the port the server will listen on
const port = 3000;

// Implement a "Hello World" route at the root endpoint ("/")
// This route handler sends the text "Hello World!" as a response
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server and make it listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

//Run your Express server.
//Save the app.js file. Go back to your terminal, make sure you are still in the my-express-app directory, and run
node app.js

//the messege Express server listening at http://localhost:3000 will be displayed
//Test your server.

//Open your web browser and navigate to http://localhost:3000.

//You should see "Hello World!" displayed in your browser.
