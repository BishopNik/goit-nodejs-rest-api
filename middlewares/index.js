/** @format */

const validateBody = require('./validatebody.js');
const isValidId = require('./isvalidid.js');
const authenticate = require('./v1/authenticate.js');
const authenticateV2 = require('./v2/authenticate_v2.js');
const checkOwner = require('./checkowner.js');
const upload = require('./upload.js');
const isEmptyBody = require('./isemptybody.js');

module.exports = {
	validateBody,
	isValidId,
	authenticate,
	checkOwner,
	upload,
	authenticateV2,
	isEmptyBody,
};
