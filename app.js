const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/user', require('./routes/user'));
app.use('/api/chatroom', require('./routes/chatroom'));
app.use('/api/message', require('./routes/message'));

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
