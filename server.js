require('dotenv').config();

let port = process.env.PORT || 8000;

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

mongoose.connection.on('error', (err) => {
	console.log('Mongoose Connection ERROR: ' + err.message);
});

mongoose.connection.once('open', () => {
	console.log('MongoDB Connected!');
});

//Bring in the models
require('./models/User');
require('./models/Chatroom');
require('./models/Message');

const app = require('./app');

const server = app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
	},
});

const jwt = require('jwt-then');

const Message = mongoose.model('Message');
const User = mongoose.model('User');

io.use(async (socket, next) => {
	try {
		const token = socket.handshake.query.token;
		const payload = await jwt.verify(token, process.env.SECRET);
		socket.userId = payload.id;
		next();
	} catch (err) {}
});

io.on('connection', (socket) => {
	console.log('Connected: ' + socket.userId);

	socket.on('disconnect', () => {
		console.log('Disconnected: ' + socket.userId);
	});

	socket.on('joinRoom', (chatroomId) => {
		socket.join(chatroomId);
		console.log('A user joined chatroom: ' + chatroomId);
	});

	socket.on('leaveRoom', (chatroomId) => {
		socket.leave(chatroomId);
		console.log('A user left chatroom: ' + chatroomId);
	});

	socket.on('ChatroomMessage', async (chatroomId, message) => {
		if (message && message.trim().length > 0) {
			const user = await User.findOne({ _id: socket.userId });
			const newMessage = new Message({
				chatroom: chatroomId,
				user: socket.userId,
				name: user.name,
				message,
			});
			io.to(chatroomId).emit('newMessage');
			await newMessage.save();
		}
	});
});
