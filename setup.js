const fs = require('fs');
const path = require('path');

const folders = ['config', 'controllers', 'models', 'routes'];

// Create server folder
if (!fs.existsSync('server')) {
  fs.mkdirSync('server');
}

// Create subfolders in the server folder
folders.forEach(folder => {
  const folderPath = path.join('server', folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
});


// Create server.js file
const serverContent = `// Prepare for the epic finale of server initiation!

// In this enchanting script, the Express app emerges from its secret hideout in the "config" folder.With a flourish, it unleashes its powers upon the digital realms!
const express = require('./config/express.js');

// But wait, the battle for the port commences! The script valiantly checks the .env for the PORT variable.If none is found, it cleverly defaults to port 5000—solid backup plan, my friend!
const port = process.env.PORT || 5000;

// With the app ready and the port secured, a magical incantation is uttered.The app takes its rightful place, eagerly listening to incoming requests.And behold, a proclamation echoes through the realms: "Server is now running on port [port]!" The console rejoices, celebrating this momentous occasion.
const app = express.init();
app.listen(port, () => console.log(\`Server now running on port \${ port }!\`));
`;
fs.writeFileSync('server/server.js', serverContent);

// Create package.json file
const packageJson = {
  name: 'server',
  version: '1.0.0',
  description: '',
  main: 'server.js',
  scripts: {
    dev: 'nodemon server.js',
    start: 'node server.js',
    test: 'echo "Error: no test specified" && exit 1'
  },
  keywords: [],
  author: '',
  license: 'ISC',
  dependencies: {
    express: '^4.18.2',
    mongodb: '^5.6.0',
    mongoose: '^6.0.12',
    'body-parser': '^1.19.0',
    morgan: '^1.9.1'
  },
  devDependencies: {
    dotenv: '^16.1.4',
    nodemon: '^2.0.22'
  }
};

fs.writeFileSync('server/package.json', JSON.stringify(packageJson, null, 2));

// Create .env file
const envContent = `# Oh, the mysterious ".env" file! 

# It's like the secret agent of the programming world. 

# Imagine a little spy carrying all the top-secret codes and passwords, but instead of a briefcase, it's a hidden text file. 

# It hides in the shadows, whispering sweet nothings to your code. 

# It's the reason your program knows where to find all the hidden treasures, like API keys and database credentials. 

# So, next time you see ".env," remember, it's the undercover hero protecting your sensitive information and making your code feel like James Bond! 🕵️‍♂️😄

PORT=5050
DB_URI=`;

fs.writeFileSync('server/config/.env', envContent);

// Create config.js file
const configContent = `// Ah, the "config.js" file, the vault of secrets! 

// It's like a fortress for all your precious configuration variables, where passwords and sensitive information hide away from prying eyes. 

// It's the guardian of your database's username and password, ensuring they stay safe and sound. 

// Just remember to keep this file a secret, like hiding it from Git, so that your secrets don't accidentally get leaked to the world.

// Treat it like your own personal Fort Knox, protecting your code's treasures! 💰🔒


module.exports = {
    db: {
        uri: '', //place the URI of your mongo database here.
    }
};

`;

fs.writeFileSync('server/config/config.js', configContent);

// Create express.js file
const expressContent = `// Gather 'round, fellow adventurers! It's time to unveil the fantastical Express app, the hero of web servers!

// But before we unleash its power, let's summon the mighty companions: path, express, mongoose, morgan, and bodyParser. 
// They're like our trusty sidekicks, armed with super abilities to aid us on our quest.
const path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),


  // Now, behold! The exampleRouter emerges, a wise guide who knows every route in the realm.It will lead us to the land of examples, where wonders await.
  exampleRouter = require('../routes/examples.server.routes');


// But wait, there's a secret incantation! If we're not in "PRODUCTION" mode, we unleash the magical dotenv spell.It reveals the hidden.env treasures, safeguarding our precious configuration variables from lurking villains.
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: "config/.env"
  });
}


// Time to forge a connection with the database! With the mystical mongoose, we create a bond.Uncomment the lines to embrace the power of MongoDB.Choose the DB_URI from the environment or find solace in the config file's uri.
module.exports.init = () => {
  /* 
      connect to database
  */

  //uncomment to use MongoDB connection
  // mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
  //   useNewUrlParser: true
  // });
  // mongoose.set('useCreateIndex', true);
  // mongoose.set('useFindAndModify', false);


  // And lo and behold, our app springs to life! Equipped with request - logging sorcery for debugging, powered   by bodyParser to handle JSON enchantments, and joined by the valiant example router to handle incoming quests.

  // initialize app
  const app = express();

  // enable request logging for development debugging
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json());

  // add a router
  app.use('/api/example', exampleRouter);

  return app;

  // There you have it, an extraordinary Express app, ready to conquer the web with its magic! 
  // May your code flow smoothly, and may your users revel in the whimsical wonders your server brings. 🏰✨🧙‍♀️

}`;

fs.writeFileSync('server/config/express.js', expressContent);

// Create example routes
const exampleRoutesContent = `// Ah, behold the dance of routes and controllers!

// In this enchanting snippet, we witness the creation of a router, a guide to navigate the vast lands of the server.It's like a map that connects different paths within your application.


const examples = require('../controllers/examples.server.controller.js');
express = require('express'),
  router = express.Router();

// With grace and elegance, the router sets its sights on the root path('/').It's a place where adventures begin and requests await fulfillment. When a brave soul seeks this path with a GET request, the router calls upon the mighty "hello" controller from the land of examples.

// The controller, ever ready to serve, responds with its enchanting message of "hello." It's a simple greeting, but it holds the power to bring joy to the requestor.


router.route('/')
  .get(examples.hello);


// Finally, this magical router steps into the limelight, ready to guide requests and direct them to the right controllers.It emerges as a hero, ready to navigate the twists and turns of your application.
module.exports = router;

//  So, let the router be your guide, and may your controllers bring forth the magic of responses.Together, they shall lead your adventurers to wondrous destinations within your server's realm! 🌟🛤️`;

fs.writeFileSync('server/routes/examples.server.routes.js', exampleRoutesContent);

// Create example controller
const exampleControllerContent = `// Controllers: The conductors of your code.They receive requests, perform their magic with the models, and deliver responses.In this snippet, the "hello" controller simply responds with "world." They orchestrate the harmony, ensuring smooth communication and making your code sing. 🎩🎵

const Example = require('../models/examples.server.model.js');

exports.hello = function (req, res) {
  res.send('world');
};`;

fs.writeFileSync('server/controllers/examples.server.controller.js', exampleControllerContent);

// Create example model
const exampleModelContent = `// Ah, the creation of models, where dreams and data intertwine!

// In this enchanted realm, you have the power to bring forth magnificent models that define the structure and behavior of your data.With a wave of your coding wand, you can craft entities that hold the secrets of your application's inner workings.

// Unleash your creativity and create your models in this mystical space.Define the attributes, relationships, and validations that breathe life into your data.It's a dance between imagination and practicality, where you give form to your digital entities.

// So, embrace the magic of model creation and let your code sparkle with the wonders of your imagination.May your models be strong, flexible, and bring harmony to your data kingdom! ✨🏰

// Create your models here`;
fs.writeFileSync('server/models/examples.server.model.js', exampleModelContent);


const readmeContent = `
  # Node-this Project! 🚀

Welcome to my awesome Node.js server project! This project sets up a basic server structure for a Node.js application, using Express.js and MongoDB. It provides a starting point for building web applications or APIs.

## Project Structure 📁

The project has the following structure:

- 📂 server: Contains the server code and configuration files.
  - 📂 config: Configuration files, including .env and config.js.
  - 📂 controllers: Controllers for handling different routes and requests.
  - 📂 models: Models for defining data structures and interactions with the database.
  - 📂 routes: Route handlers for different endpoints.
  - 📄 server.js: The main entry point of the server application.
- 📄 package.json: Metadata and dependencies for the project.
- 📄 README.md: You're reading it right now!
  
## Getting Started 🚀

To get started with the project, follow these steps:

1. Clone the repository: \`git clone https://kwakuboateng-dev/awesome-node.git\`
    2. Install dependencies: \`cd your-repo && npm install\`
3. Configure the environment variables:
- Create a \`.env\` file in the\`server/config\` folder.
   - Add the necessary configuration variables to the \`.env\` file.For example, you might set the \`PORT\` and 
   \`DB_URI\` variables.
4. Start the server in development mode: \`npm run dev\`
5. Access the server at\`http://localhost:5000\`(or the port you specified).

## Dependencies ⚙️

The project utilizes the following dependencies:

- Express.js: A fast and minimalist web application framework for Node.js. 🚀
- MongoDB: A popular NoSQL database for storing and retrieving data. 🍃
- Mongoose: An elegant MongoDB object modeling tool for Node.js. 💎
- body - parser: A middleware for parsing request bodies. 📦
- morgan: A logging middleware for HTTP request / response logging. 🪵
- dotenv: A module for loading environment variables from a.env file. 🤫
- nodemon: A tool for automatically restarting the server during development. 🔄

## Contribution Guidelines 🤝

Contributions to this project are always welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.Let's make this project even more awesome together! 🎉

## License 📝

This project is licensed under the MIT License.


-Developed by Kwaku Boateng || @koboateng on twitter
`;

fs.writeFileSync('server/Readme.md', readmeContent);
