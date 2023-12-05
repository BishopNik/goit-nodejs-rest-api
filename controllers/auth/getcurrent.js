/** @format */

const { User } = require('../../models');

const getCurrent = async ({ user }, res) => {
	const { _id: id } = user;

	const currentUser = await User.findOne({ id });

	res.json({
		avatarURL: currentUser.avatarURL,
		name: currentUser.name,
		email: currentUser.email,
	});
};

module.exports = getCurrent;
