/** @format */

const validateBody = require('./validateBody.js');
const isValidId = require('./isValidId.js');
const authenticate = require('./v1/authenticate.js');
const authenticateV2 = require('./v2/authenticate_v2.js');
const checkOwner = require('./checkowner.js');
const upload = require('./upload.js');

module.exports = {
	validateBody,
	isValidId,
	authenticate,
	checkOwner,
	upload,
	authenticateV2,
};
