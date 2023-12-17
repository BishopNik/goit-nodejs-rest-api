/** @format */

const listContacts = require('./listcontacts.js');
const getContactById = require('./getcontactbyid.js');
const removeContact = require('./removecontact.js');
const addContact = require('./addcontact.js');
const updateContact = require('./updatecontact.js');
const listContactsV2 = require('./listcontacts_v2.js');
const addContactV2 = require('./addcontact_v2.js');
const removeContactV2 = require('./removecontact_v2.js');
const updateContactV2 = require('./updatecontact_v2.js');

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
