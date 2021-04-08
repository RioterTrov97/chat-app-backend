const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: 'Name is required!',
		},
		image: {
			type: String,
			required: 'Name is required!',
		},
		description: {
			type: String,
			required: 'Name is required!',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Chatroom', chatroomSchema);
