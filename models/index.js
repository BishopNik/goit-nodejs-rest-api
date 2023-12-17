/** @format */

const { Contact, ContactV2, contactAddSchema, contactAddSchemaV2 } = require('./contact.js');
const {
	User,
	registerSchema,
	loginSchema,
	favoriteSchema,
	verifyEmailSchema,
	deleteUserSchema,
	changeNameSchema,
	changePasswordSchema,
	repairPasswordSchema,
} = require('./user.js');

module.exports = {
	Contact,
	ContactV2,
	contactAddSchema,
	contactAddSchemaV2,
	User,
	registerSchema,
	loginSchema,
	favoriteSchema,
	verifyEmailSchema,
	deleteUserSchema,
	changeNameSchema,
	changePasswordSchema,
	repairPasswordSchema,
};
