/** @format */

const { User } = require('../../models');

const changeName = async ({ user, body }, res) => {
	const { name } = body;
	const { _id: id } = user;

	await User.findByIdAndUpdate(id, { name });

	res.status(201).json({
		user: {
			name,
		},
	});
};

module.exports = changeName;
