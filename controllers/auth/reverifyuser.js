/** @format */

const { User } = require('../../models');
const { HttpError, sendMailer, createMessage } = require('../../utils');

const reVerifyUser = async ({ body }, res) => {
	const { email } = body;

	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	if (user.verify) {
		throw HttpError(400, 'Verification has already been passed');
	}

	await sendMailer(createMessage(user));

	res.status(200).json({
		message: 'Verification email sent',
	});
};

module.exports = reVerifyUser;
