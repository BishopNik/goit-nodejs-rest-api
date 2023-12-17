/** @format */

const express = require('express');

const { validateBody, isValidId, authenticateV2 } = require('../../../middlewares');
const { contactAddSchemaV2 } = require('../../../models');
const {
	listContactsV2,
	removeContactV2,
	addContactV2,
	updateContactV2,
} = require('../../../controllers/contacts');
const { ctrlWrapper } = require('../../../utils');

const router = express.Router();

router.get('/', authenticateV2, ctrlWrapper(listContactsV2));

router.post('/', authenticateV2, validateBody(contactAddSchemaV2), ctrlWrapper(addContactV2));

router.put(
	'/:contactId',
	authenticateV2,
	isValidId,
	validateBody(contactAddSchemaV2),
	ctrlWrapper(updateContactV2)
);

router.delete('/:contactId', authenticateV2, isValidId, ctrlWrapper(removeContactV2));

module.exports = router;
