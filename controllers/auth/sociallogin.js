/** @format */

const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { nanoid } = require('nanoid');
const { bucket } = require('./changeavatar');
const { sendMailer, createMessage } = require('../../utils');

const { SECRET_KEY, FRONTEND_URL } = process.env;

const socialLogin = async (req, res) => {
	const { sid, name, picture, email, email_verified: verifyEmail } = req.oidc.user;
	if (!sid) {
		res.redirect(`${FRONTEND_URL}/My-Phonebook/login`);
		return;
	}

	const user = await User.findOne({ email });
	let token = user ? jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '12h' }) : null;

	// Загружаем изображение в Firebase Cloud Storage
	let avatarURL;
	if (!user) {
		const { data } = await axios.get(picture, { responseType: 'arraybuffer' });
		const file = bucket.file(`${sid}_${picture}`);
		await file.save(data, {
			metadata: {
				contentType: 'image/jpeg',
			},
		});
		const [url] = await file.getSignedUrl({
			action: 'read',
			expires: '01-01-2035',
		});
		avatarURL = url;
	}

	const userLogin = !user
		? await User.create({
				name,
				email,
				password: await bcrypt.hash(sid, 10),
				token,
				avatarURL,
				verificationToken: nanoid(),
		  })
		: await User.findByIdAndUpdate(user._id, { token });

	if (!user) {
		token = jwt.sign({ id: userLogin._id }, SECRET_KEY, { expiresIn: '12h' });
		await User.findByIdAndUpdate(userLogin._id, { token });
	}

	if (verifyEmail === false) {
		await sendMailer(createMessage(userLogin));
	}

	token
		? res.redirect(`${FRONTEND_URL}/My-Phonebook/social_auth?token=${token}`)
		: res.redirect(`${FRONTEND_URL}/My-Phonebook/login`);
};

module.exports = socialLogin;
