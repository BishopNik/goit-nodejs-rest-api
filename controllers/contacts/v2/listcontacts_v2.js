/** @format */
const { ContactV2 } = require('../../../models');

const listContactsV2 = async ({ user }, res) => {
	const { userId } = user;

	const data = await ContactV2.find({ owner: userId }, '-createdAt -updatedAt');

	res.json(data);
};

module.exports = listContactsV2;
