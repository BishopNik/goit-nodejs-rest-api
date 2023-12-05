/** @format */

const validateBody = require('./validateBody.js');
const isValidId = require('./isValidId.js');
const authenticate = require('./authenticate.js');
const checkOwner = require('./checkowner.js');
const upload = require('./upload.js');

module.exports = {
	validateBody,
	isValidId,
	authenticate,
	checkOwner,
	upload,
};
