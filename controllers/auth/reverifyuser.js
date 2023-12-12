/** @format */

const { User } = require('../../models');
const { HttpError, sendMailer, createMessage, recoveryMessage } = require('../../utils');

const reVerifyUser = async ({ body }, res) => {
	const { email, reg } = body;

	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}

	if (reg) {
		await sendMailer(recoveryMessage(user));

		res.status(200).json({
			message: 'Password recovery message sent',
		});
	} else {
		if (user.verify) {
			throw HttpError(400, 'Verification has already been passed');
		}

		await sendMailer(createMessage(user));

		res.status(200).json({
			message: 'Verification email sent',
		});
	}
};

module.exports = reVerifyUser;
