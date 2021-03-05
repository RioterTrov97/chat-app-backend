const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup cross origin
app.use(cors());

//Bring in the routes
app.use('/user', require('./routes/user'));
app.use('/chatroom', require('./routes/chatroom'));
app.use('/message', require('./routes/message'));

//setup Error Handlers
const errorHandlers = require('./handlers/errorHandlers');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);

if (process.env.ENV === 'DEVELOPMENT') {
	app.use(errorHandlers.developmentErrors);
} else {
	app.use(errorHandlers.productionErrors);
}

module.exports = app;