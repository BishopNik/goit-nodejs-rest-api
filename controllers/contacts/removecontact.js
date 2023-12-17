/** @format */

const { Contact } = require('../../models');
const { HttpError } = require('../../utils');

const removeContact = async ({ params }, res) => {
	const { contactId } = params;
	const data = await Contact.findByIdAndDelete(contactId);
	if (!data) {
		throw HttpError(404, 'Not found');
	}
	res.json({
		id: contactId,
		message: 'Delete success',
	});
};

module.exports = removeContact;
