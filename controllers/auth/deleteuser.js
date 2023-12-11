/** @format */

const { User } = require('../../models');
const { Contact } = require('../../models');

const deleteUser = async ({ body }, res) => {
	const { id } = body;

	await User.findByIdAndDelete(id);
	await Contact.deleteMany({ owner: id });

	res.status(204).json({});
};

module.exports = deleteUser;
