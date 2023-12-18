/** @format */

const listContacts = require('./v1/listcontacts.js');
const getContactById = require('./v1/getcontactbyid.js');
const removeContact = require('./v1/removecontact.js');
const addContact = require('./v1/addcontact.js');
const updateContact = require('./v1/updatecontact.js');
const listContactsV2 = require('./v2/listcontacts_v2.js');
const addContactV2 = require('./v2/addcontact_v2.js');
const removeContactV2 = require('./v2/removecontact_v2.js');
const updateContactV2 = require('./v2/updatecontact_v2.js');

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	listContactsV2,
	addContactV2,
	removeContactV2,
	updateContactV2,
};
