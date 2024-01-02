/** @format */

const { User } = require('../../models');
const { Contact } = require('../../models');

const deleteUser = async ({ params }, res) => {
	const { userId } = params;

	await User.findByIdAndDelete(userId);
	await Contact.deleteMany({ owner: userId });

	res.status(204).json({});
};

module.exports = deleteUser;
