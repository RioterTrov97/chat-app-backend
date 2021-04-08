const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');
const User = mongoose.model('User');

exports.createChatroom = async (req, res) => {
	const { name, image, description } = req.body;

	const nameRegex = /^[A-Za-z\s]+$/;

	if (!nameRegex.test(name))
		throw 'Chatroom name can contain only alphabets.';

	const chatroomExists = await Chatroom.findOne({ name });

	if (chatroomExists) throw 'Chatroom with that name already exists!';

	const chatroom = new Chatroom({
		name,
		image,
		description,
		user: req.user._id,
	});

	await chatroom.save();

	res.json({
		message: 'Chatroom created!',
	});
};

exports.getChatroomName = async (req, res) => {
	const { chatroomId } = req.body;

	if (!chatroomId) throw 'No chatroom Id found!!!';

	const chatroom = await Chatroom.findOne({ _id: chatroomId });
	console.log('user Name', chatroom.user);
	const user = await User.findOne({
		_id: chatroom.user,
	});
	if (user) {
		username = user.name;
	} else {
		username = 'Anonymous';
	}

	res.json({ chatroom, username });
};

exports.getAllChatrooms = async (req, res) => {
	const chatrooms = await Chatroom.find({});

	res.json(chatrooms);
};
