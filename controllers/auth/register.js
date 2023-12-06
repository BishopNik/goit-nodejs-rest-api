/** @format */

const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User } = require('../../models');
const { HttpError, sendMailer, createMessage } = require('../../utils');

const register = async ({ body }, res) => {
	const { email, password } = body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email in use');
	}
	const hashPassword = await bcrypt.hash(password, 10);

	const avatarURL = gravatar.url(email);
	const verificationToken = nanoid();

	const newUser = await User.create({
		...body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});

	await sendMailer(createMessage(newUser));

	res.status(201).json({
		user: {
			avatarURL: newUser.avatarURL,
			name: newUser.name,
			email: newUser.email,
		},
	});
};

module.exports = register;
