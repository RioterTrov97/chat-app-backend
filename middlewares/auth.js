const jwt = require('jwt-then');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = async (req, res, next) => {
	try {
		if (!req.headers.authorization) throw 'Forbidden!!';
		const token = req.headers.authorization.split(' ')[1];
		const payload = await jwt.verify(token, process.env.SECRET);
		const user = await User.findOne({
			_id: payload.id,
		});
		req.user = user;
		req.token = token;
		next();
	} catch (err) {
		res.status(401).json({
			message: 'Forbidden 🚫🚫🚫',
		});
	}
};
