/** @format */

const { BASE_URL } = process.env;

const createMessage = ({ name, email, verificationToken }) => {
	const confirmEmail = {
		to: email,
		subject: 'Confirm email',
		html: `<p>Dear ${name},</p>
        <p>Please confirm your email by clicking the following link:</p>
        <p><a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Confirm Email</a></p>`,
	};
	return confirmEmail;
};

const recoveryMessage = ({ _id, name, email }) => {
	const confirmEmail = {
		to: email,
		subject: 'Recovery password message',
		html: `<p>Dear ${name},</p>
        <p>Please confirm your email by clicking the following link:</p>
        <p><a target="_blank" href="${BASE_URL}/api/auth/repair/${_id}">Recovery password</a></p>`,
	};
	return confirmEmail;
};

module.exports = { createMessage, recoveryMessage };
