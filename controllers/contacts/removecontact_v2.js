/** @format */

const { ContactV2 } = require('../../models');
const { HttpError } = require('../../utils');

const removeContactV2 = async ({ user, params }, res) => {
	const { contactId } = params;
	const { userId } = user;

	const deleteContact = await ContactV2.findById(contactId);
	if (deleteContact.owner !== userId) {
		throw HttpError(403, 'Owner error');
	}

	const data = await ContactV2.findByIdAndDelete(contactId);
	if (!data) {
		throw HttpError(404, 'Not found');
	}
	res.json({
		id: contactId,
		message: 'Delete success',
	});
};

module.exports = removeContactV2;
