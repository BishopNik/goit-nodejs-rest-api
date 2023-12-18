/** @format */

const { ContactV2 } = require('../../../models');
const { HttpError } = require('../../../utils');

const updateContactV2 = async ({ params, body, user }, res) => {
	const { contactId } = params;
	const { contact } = body;
	const { userId } = user;

	const updateContact = await ContactV2.findById(contactId);
	if (updateContact.owner !== userId) {
		throw HttpError(403, 'Owner error');
	}

	const data = await ContactV2.findByIdAndUpdate(
		contactId,
		{ ...contact, owner: userId },
		{ new: true }
	);
	if (!data) {
		throw HttpError(404, 'Not found');
	}
	res.status(200).json(data);
};

module.exports = updateContactV2;
