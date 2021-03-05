const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');

exports.createChatroom = async (req, res) => {
	const { name } = req.body;

	const nameRegex = /^[A-Za-z\s]+$/;

	if (!nameRegex.test(name))
		throw 'Chatroom name can contain only alphabets.';

	const chatroomExists = await Chatroom.findOne({ name });

	if (chatroomExists) throw 'Chatroom with that name already exists!';

	const chatroom = new Chatroom({
		name,
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
	res.json(chatroom);
};

exports.getAllChatrooms = async (req, res) => {
	const chatrooms = await Chatroom.find({});

	res.json(chatrooms);
};
