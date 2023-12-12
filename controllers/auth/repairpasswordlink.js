/** @format */

const { nanoid } = require('nanoid');
const { User } = require('../../models');
const { HttpError } = require('../../utils');

const { FRONT_URL_REPAIR } = process.env;

const repairPasswordLink = async ({ params }, res) => {
	const { id } = params;

	const currentUser = await User.findById(id);

	if (!currentUser) {
		throw HttpError(404, 'User not found');
	}

	const verificationToken = nanoid();

	await User.findByIdAndUpdate(id, { verificationToken });

	res.redirect(`${FRONT_URL_REPAIR}/${id}?vt=${verificationToken}`);
};

module.exports = repairPasswordLink;
