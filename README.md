# Classify
Classify is a website where users can buy and sell cars. Our aim with this Full Stack project was the design and development of an online car sales platform, similar to standvirtual. It should be noted that CLASSIFY is not an online sales platform by itself. The transactions themselves take place outside the system, in an environment agreed upon by the related parties. The implementation follows a REST-api architecture.

### Technologies
A Javascript stack was used for easier and faster deployment, comprised of **Express** and **Node.js** for the back-end, **MySQL** for the database and **React** for the front-end. A different relational database can also be used since the data modeling, associations and queries are handled with object-relational mapping using **Sequelize**. We also use **MongoDB** for the external ads and **Stream-chat API** for enabling the user to build real-time chat quickly. The user can swiftly ship in-app messaging with the tool's highly reliable chat infrastructure.

###Overview vídeo 
See how the project turned out: [Click](https://l20rr.github.io/overview/)


## Requirements & Setup
### Back-end
1. For the back-end MySQL or a similar relational database is required as well as the installation of [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

2. In the [database.js](server/config/database.js) file add your personal MySQL settings.

3. To install express, cors and other necessary modules, in the [server](server/) folder run: `npm install`

4. To connect sequelize to the database, run the command: `sequelize init`

- When the server starts with a "clean" database, the tables are automatically created based on the object-oriented models defined in [models](server/models/).
- Also, a user with the administrator role is automatically created with the username: admin and initial password: MyP@ssw0rd, which can be changed.

To start up the server simply run in the [server](server/) directory: 

```
node index
```

### Front-end
For the front-end all the necessary dependencies are defined in the `package.json` file. To install them simply run in the [client](client/) directory: `npm install`

To start up the front-end in the [client](client/) directory run: 

```
npm start
```

## Design
For the design of the application we used pure CSS and a few Material UI components. A few animations were added for the page transitions, as well as the editing page. 

## Tools
The website was built using [Express](https://expressjs.com), [Node.js](https://nodejs.org/en/), [MySQL](https://www.mysql.com), [Sequelize](https://sequelize.org), [Stream-Chat](https://getstream.io/chat/), [MongoDB](https://www.mongodb.com/) and [React](https://reactjs.org).
