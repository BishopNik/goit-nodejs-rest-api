/** @format */

const express = require('express');

const { validateBody, isValidId, authenticateV2, isEmptyBody } = require('../../../middlewares');
const { contactAddSchemaV2 } = require('../../../models');
const {
	listContactsV2,
	removeContactV2,
	addContactV2,
	updateContactV2,
} = require('../../../controllers/contacts');
const { ctrlWrapper } = require('../../../utils');

const router = express.Router();

router.use(authenticateV2);

router.get('/', ctrlWrapper(listContactsV2));

router.post('/', isEmptyBody, validateBody(contactAddSchemaV2), ctrlWrapper(addContactV2));

router.put(
	'/:contactId',
	isEmptyBody,
	isValidId,
	validateBody(contactAddSchemaV2),
	ctrlWrapper(updateContactV2)
);

router.delete('/:contactId', isValidId, ctrlWrapper(removeContactV2));

module.exports = router;
