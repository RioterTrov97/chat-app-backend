const mongoose = require('mongoose');
const Message = mongoose.model('Message');

exports.getAllMessages = async (req, res) => {
	const { chatroomId } = req.body;

	if (!chatroomId) throw 'Chatroom does not exist';

	const messages = await Message.find({
		chatroom: chatroomId,
	});

	if (!messages) throw 'Please add a message!';

	res.json(messages);
};
