/** @format */

const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { HttpError } = require('../../utils');

const repairPassword = async ({ body }, res) => {
	const { id, verificationToken, password } = body;

	const currentUser = await User.findById(id);

	if (!currentUser) {
		throw HttpError(404, 'User not found');
	}

	if (verificationToken !== currentUser.verificationToken) {
		throw HttpError(403, 'Error verification token');
	}

	const hashPassword = await bcrypt.hash(password, 10);

	await User.findByIdAndUpdate(id, { verificationToken: '', password: hashPassword });

	res.status(200).json({
		user: {
			name: currentUser.name,
			email: currentUser.email,
		},
	});
};

module.exports = repairPassword;
