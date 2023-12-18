/** @format */

const { ContactV2 } = require('../../../models');

const addContactV2 = async ({ body, user }, res) => {
	const { contact } = body;
	const { userId } = user;

	const data = await ContactV2.create({
		...contact,
		owner: userId,
	});

	res.status(201).json(data);
};

module.exports = addContactV2;
