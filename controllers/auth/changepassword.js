/** @format */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const { HttpError } = require('../../utils');

const { SECRET_KEY } = process.env;

const changePassword = async ({ user, body }, res) => {
	const { oldPassword, newPassword } = body;
	const { _id: id } = user;

	const currentUser = await User.findById(id);

	if (!currentUser) {
		throw HttpError(500);
	}

	const passwordCompare = await bcrypt.compare(oldPassword, currentUser.password);
	if (!passwordCompare) {
		throw HttpError(401, 'Password is wrong');
	}

	const hashPassword = await bcrypt.hash(newPassword, 10);

	const payload = {
		id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
	const updateUser = await User.findByIdAndUpdate(id, { password: hashPassword, token });

	res.json({
		token: token,
		user: {
			id: updateUser._id,
			name: updateUser.name,
			email: updateUser.email,
			avatarURL: updateUser.avatarURL,
		},
	});
};

module.exports = changePassword;
