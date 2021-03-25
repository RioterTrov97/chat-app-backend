const mongoose = require('mongoose');
const User = mongoose.model('User');
const sha256 = require('js-sha256');
const jwt = require('jwt-then');

exports.register = async (req, res) => {
	const { name, email, password } = req.body;

	const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

	if (!emailRegex.test(email))
		throw 'Email is not supported from your domain.';
	if (password.length < 6)
		throw 'Password must be atleast 6 characters long.';

	const userExists = await User.findOne({
		email,
	});

	if (userExists) throw 'User with same email already exits.';

	const user = new User({
		name,
		email,
		password: sha256(password + process.env.SALT),
	});

	await user.save();

	const token = await jwt.sign({ id: user._id }, process.env.SECRET);

	res.json({
		message: 'User [' + name + '] registered successfully!',
		user: { id: user._id, name: user.name, email: user.email },
		token,
	});
};

exports.checkToken = async (req, res) => {
	console.log('Checking token.....');
	res.json({
		user: { id: req.user._id, name: req.user.name, email: req.user.email },
		token: req.token,
	});
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({
		email,
		password: sha256(password + process.env.SALT),
	});

	if (!user) throw 'Email and Password did not match.';

	const token = await jwt.sign({ id: user.id }, process.env.SECRET);

	res.json({
		message: 'User logged in successfully!',
		user: { id: user._id, name: user.name, email: user.email },
		token,
	});
};
